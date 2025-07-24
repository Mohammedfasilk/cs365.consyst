import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { Separator } from "../UI/Separator";
import {
  CircleCheckIcon,
  CircleXIcon,
  Plus,
  SquareChartGantt,
} from "lucide-react";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../UI/Select";
import { Textarea } from "../UI/TextArea";
import {
  setIsOpen,
  setSelectedNoticeId,
} from "../../Redux/Slices/noticeSheetSlice";

import { useToast } from "../../Hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string(),
  type: z.string().min(1, { message: "Type is required" }), // 👈 string instead of array
  category: z.string().min(1, { message: "Category is required" }),
  banner: z.any().optional(),
});
function NoticeSheet({ onSuccess }) {
  const dispatch = useDispatch();
  const { selectedNoticeId, isOpen } = useSelector(
    (state) => state.noticeSheet
  );

  const categories = [
    { label: "Reminder" },
    { label: "Annoucement" },
    { label: "Celebration" },
    { label: "Event" },
  ];

  const type = [{ label: "Horizontal Card" }, { label: "Vertical Card" }];

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
  const [bannerImage, setBannerImage] = useState();

  const { toast } = useToast();

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
    try {
      const payload = {
        ...values,
        banner: values.banner || null, // include base64 image string if available
        id: selectedNoticeId || undefined,
      };

      await axios.post(
        `${import.meta.env.VITE_CS365_URI}/api/notices`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      toast({
        title: "Notice Saved",
        description: "Notice has been successfully saved.",
        icon: <CircleCheckIcon className="mr-4" color="green" />,
      });

      form.reset();
      dispatch(setSelectedNoticeId(""));
      dispatch(setIsOpen(false));
      onSuccess();
    } catch (err) {
      toast({
        title: "Notice Not Saved",
        description: "There was an error saving the Notice.",
        variant: "destructive",
        icon: <CircleXIcon className="mr-4" color="red" />,
      });
    }
  };

  //    const form = useForm({
  //   // your schema/resolver and defaults
  // });
  useEffect(() => {
    async function fetchSelectedNotice(id) {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_CS365_URI}/api/notices/${id}`
        );
        const data = res.data;

        form.setValue("title", data.title || "");
        form.setValue("description", data.description || "");
        form.setValue("category", data.category || "");
        form.setValue("type", data.type || "");

        // To show the existing banner as preview
        if (data.banner) {
          setBannerImage(data.banner);
          form.setValue("banner", data.banner); 
        }
      } catch (error) {
        console.error("Failed to fetch selected notice:", error);
      }
    }

    if (selectedNoticeId) {
      fetchSelectedNotice(selectedNoticeId);
    }
  }, [selectedNoticeId]);

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

 
  return (
    <Sheet
      open={isOpen}
      onOpenChange={(value) => {
        if (!value) {
          dispatch(setSelectedNoticeId(""));
          form.reset();
          setBannerImage(null); // clear preview
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
                              <Textarea
                                className="w-xl h-20"
                                placeholder="description"
                                {...field}
                              />
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
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;

                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    const base64 = reader.result;
                                    field.onChange(base64); // store base64 string in form
                                    setBannerImage(base64); // update preview
                                  };
                                  reader.readAsDataURL(file);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch("banner") ? (
                        <div className="mt-2">
                          <img
                            src={form.watch("banner")} // base64 directly
                            alt="Preview"
                            className="w-full max-h-60 object-contain rounded border"
                          />
                        </div>
                      ) : bannerImage ? (
                        <div className="mt-2">
                          <img
                            src={bannerImage}
                            alt="Banner"
                            className="w-full max-h-60 object-contain rounded border"
                          />
                        </div>
                      ) : null}
                    </div>
                  </form>

  
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
