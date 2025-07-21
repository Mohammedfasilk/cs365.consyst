import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { Separator } from "../UI/Separator";
import { Plus, SquareChartGantt } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../UI/Form";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../UI/Sheet";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../UI/Tabs";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsOpen,
  setSelectedSignatureName,
} from "../../Redux/Slices/signatureSheetSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../UI/Select";
import { Textarea } from "../UI/TextArea";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string(),
  type: z.string().min(1, { message: "Type is required" }), // 👈 string instead of array
  category: z.string().min(1, { message: "Category is required" }),
  banner: z.any().optional(),
});
function NoticeSheet() {
  const dispatch = useDispatch();
  const { selectedSignatureName, isOpen } = useSelector(
    (state) => state.signatureSheet
  );

  const categories = [
    { label: "Reminder" },
    { label: "Annoucement" },
    { label: "Celebration" },
    { label: "Event" },
  ];

  const type = [{label:'Horizontal Card'},{label:'Vertical Card'}]

  //   useEffect(()=>{
  //     async function fetchAddress(){
  //       const res = await axios.get(`${import.meta.env.VITE_CS365_URI}/api/emailSignature`)
  //       setAddresses(res.data)
  //     }
  //     fetchAddress()
  //   },[isOpen])

  const [filteredAddresses, setFilteredAddresses] = useState([]);
  const [legalDisclaimer, setLegalDisclaimer] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [triggerRender, toggleTriggerRender] = useState(false);
  const [bannerImage, setBannerImage] = useState();

  // const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "",
      category: "",
    },
  });

  const formValues = form.getValues();

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("type",values.type);
    formData.append("category",values.category);

    if (values.banner) {
      formData.append("banner", values.banner);
    }
    for (const pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}
    
    try {
      await axios.post(
        `${import.meta.env.VITE_CS365_URI}/api/notices`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      form.reset();
    } catch (err) {
      console.error(err);
    }
  };

  //    const form = useForm({
  //   // your schema/resolver and defaults
  // });
  useEffect(() => {
    async function fetchSelectedSignature(full_name) {
      //   const response = await axios.get(
      //     `${import.meta.env.VITE_CS365_URI}/api/signature`
      //   );
      //   const signatures = response.data;
      //   const data = signatures.filter(
      //     (signature) => signature?.full_name == full_name
      //   )[0];
      //   if (data) {
      //     form.setValue("fullName", data.full_name);
      //     form.setValue("phNumber", data.phNumber);
      //     form.setValue("designation", data.designation);
      //     form.setValue("addresses", data.addresses || []);
      //     setResetKey((prevKey) => prevKey + 1);
      //   }
    }

    if (!selectedSignatureName) return;

    fetchSelectedSignature(selectedSignatureName);
  }, [selectedSignatureName]);

  useEffect(() => {
    async function fetchSettings() {
      const res = await axios.get(
        `${import.meta.env.VITE_CS365_URI}/api/emailSignatureGlobal`,
        { cache: "no-store" }
      );
      const data = res.data;

      setLegalDisclaimer(data.legalDisclaimer || "");
      setBannerImage(data.banner);
    }

    fetchSettings();
  }, []);

  const generateSignature = async () => {
    const selected = form.getValues("addresses");
    const ordered = selected
      .map((sel) => addresses.find((a) => a.label === sel))
      .filter((a) => a !== undefined);

    setFilteredAddresses(ordered);

    toggleTriggerRender(false);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toggleTriggerRender(true);
  };
  return (
    <Sheet
      open={isOpen}
      onOpenChange={(value) => {
        if (!value) {
          dispatch(setSelectedSignatureName(""));
          toggleTriggerRender(false);
          form.reset();
        }
        dispatch(setIsOpen(value));
      }}
    >
      <SheetTrigger asChild>
        <Button className="bg-[var(--csred)] hover:bg-[var(--csred)]/90">
          <Plus className="mr-2 h-4 w-4" /> Add Notice
        </Button>
      </SheetTrigger>

      <SheetContent className="min-w-[800px] overflow-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Notice</SheetTitle>
          <div className="">
            <Tabs defaultValue="notice-details">
              <TabsList>
                <TabsTrigger value="notice-details">
                  <SquareChartGantt className="mr-2 h-4 w-4" /> Notice Details
                </TabsTrigger>
              </TabsList>
              <TabsContent value="notice-details">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex justify-between">
                      <h1>Basic Information</h1>
                      <Button className="bg-[var(--csblue)] hover:bg-[var(--csblue)]/90 px-8">
                        Save
                      </Button>
                    </div>

                    <div className="mt-4 grid w-full grid-cols-[1fr_2fr_1fr] gap-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div></div>
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea className='w-xl h-20' placeholder="description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mt-5">
                        <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat.label} value={cat.label}>
                                  {cat.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    </div>
                    <div className="mt-5">
                        
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {type.map((cat) => (
                                  <SelectItem key={cat.label} value={cat.label}>
                                    {cat.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col mt-5">
                      <FormField
                        control={form.control}
                        name="banner"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>Banner Image</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  field.onChange(e.target.files?.[0])
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch("banner") && (
                        <div className="mt-2">
                          <img
                            src={URL.createObjectURL(form.watch("banner"))}
                            alt="Preview"
                            className="w-full max-h-60 object-contain rounded border"
                          />
                        </div>
                      )}
                    </div>
                  </form>

                  <Button
                    className="mt-4 bg-[var(--csblue)] hover:bg-[var(--csblue)]/90 px-8"
                    size="sm"
                    onClick={generateSignature}
                  >
                    Preview
                  </Button>

                  <Separator className="mt-4 mb-4" />

                  {triggerRender && filteredAddresses.length !== 0 && (
                    <div className="mt-4 gap-6">
                      {/* <EmailSignature
                        name={formValues.fullName}
                        designation={formValues.designation}
                        addresses={filteredAddresses}
                        phone={formValues.phNumber}
                        disclaimer={legalDisclaimer}
                        banner={bannerImage}
                      /> */}
                    </div>
                  )}
                </Form>
              </TabsContent>
            </Tabs>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default NoticeSheet;
