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
import EmailSignature from "./Emailsignature";
import { MultiSelect } from "../UI/MultiSelect";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsOpen,
  setSelectedSignatureName,
} from "../../Redux/Slices/signatureSheetSlice";

// import { useSignatureSheetStore } from "@/utils/zustandStore"
// import { createSignature, fetchSignature } from "@/utils/actions"
// import { useToast } from "@/hooks/use-toast"
// import EmailSignature from "./signature"
// import { MultiSelect } from "@/components/ui/multi-select"

//Schema definition
const formSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  designation: z.string().min(1, { message: "Designation is required" }),
  phNumber: z
  .coerce
  .number()
  .int()
  .refine((n) => n.toString().length <= 10, {
    message: "Phone number must be 10 digits",
  }),
  addresses: z
    .array(z.string())
    .nonempty({ message: "Addresses should not be empty" }),
});

export const SignatureSheet = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { selectedSignatureName, isOpen } = useSelector(
    (state) => state.signatureSheet
  );

  const [addresses, setAddresses] = useState([
    { label: "demo" },
    { label: "sample" },
  ]);

  const [filteredAddresses, setFilteredAddresses] = useState([]);
  const [legalDisclaimer, setLegalDisclaimer] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [triggerRender, toggleTriggerRender] = useState(false);

  // const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      designation: "",
      phNumber: "",
      addresses: [],
    },
  });

  const formValues = form.getValues();

  const onSubmit = async (values) => {
    const signatureValues = {
      full_name: values.fullName,
      designation: values.designation,
      phNumber: values.phNumber,
      addresses: values.addresses,
    };

    try {
      const result = await axios.post(
        `${import.meta.env.VITE_CS365_URI}/api/signature`,
        signatureValues
      );

      onSuccess();
      form.reset();
    } catch (error) {
      console.error("Error saving signature:", error.message);
    }
  };
  //    const form = useForm({
  //   // your schema/resolver and defaults
  // });
  useEffect(() => {
    async function fetchSelectedSignature(full_name) {
      const response = await axios.get(
        `${import.meta.env.VITE_CS365_URI}/api/signature`
      );
      const signatures = response.data;
      const data = signatures.filter(
        (signature) => signature?.full_name == full_name
      )[0];

      if (data) {
        form.setValue("fullName", data.full_name);
        form.setValue("phNumber", data.phNumber);
        form.setValue("designation", data.designation);
        form.setValue("addresses", data.addresses || []);

        setResetKey((prevKey) => prevKey + 1);
      }
    }

    if (!selectedSignatureName) return;

    fetchSelectedSignature(selectedSignatureName);
  }, [selectedSignatureName]);

  // useEffect(() => {
  //   async function fetchSettings() {
  //     const response = await fetch("/api/settings", { cache: "no-store" })
  //     const data = await response.json()

  //     setAddresses(data.addresses || [])
  //     setLegalDisclaimer(data.legal_disclaimer || "")
  //   }

  //   fetchSettings()
  // }, [isOpen])

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
          <Plus className="mr-2 h-4 w-4" /> Add Signature
        </Button>
      </SheetTrigger>

      <SheetContent className="min-w-[800px] overflow-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Signature</SheetTitle>
          <div className="">
            <Tabs defaultValue="project-details">
              <TabsList>
                <TabsTrigger value="project-details">
                  <SquareChartGantt className="mr-2 h-4 w-4" /> Signature
                  Details
                </TabsTrigger>
              </TabsList>
              <TabsContent value="project-details">
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
                        name="fullName"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div></div>
                      <FormField
                        control={form.control}
                        name="designation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Designation</FormLabel>
                            <FormControl>
                              <Input placeholder="CEO" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ph Number</FormLabel>
                            <FormControl>
                              <Input placeholder="123-456-7890" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div></div>
                      <FormField
                        control={form.control}
                        name="addresses"
                        render={({ field }) => {
                          const options = Array.isArray(addresses)
                            ? addresses.map((a) => ({
                                value: a.label,
                                label: a.label,
                              }))
                            : [];
                          return (
                            <FormItem className="col-span-2">
                              <FormLabel>Addresses</FormLabel>
                              <FormControl>
                                <MultiSelect
                                  key={resetKey}
                                  options={options}
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  placeholder="Select addresses"
                                  variant="destructive"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
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
                      <EmailSignature
                        name={formValues.fullName}
                        designation={formValues.designation}
                        addresses={filteredAddresses}
                        phone={formValues.phNumber}
                        disclaimer={legalDisclaimer}
                      />
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
};
