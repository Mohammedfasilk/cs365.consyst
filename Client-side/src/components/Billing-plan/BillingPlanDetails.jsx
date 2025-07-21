import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../UI/Form";
import {
  CalendarIcon,
  CircleCheckIcon,
  CircleXIcon,
  Cross,
  Plus,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "../../lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "../UI/Popover";
import { Calendar } from "../UI/Calender";
import axios from "axios";
import { useToast } from "../../Hooks/use-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings } from "../../Redux/Slices/settingsSlice";

const formSchema = z.object({
  currency: z.string().min(1, "Currency is required"),
  adjustedSalesValue: z.number().min(0, "Sales Order Value is required"),
  entries: z
    .array(
      z.object({
        date: z.date({ required_error: "Date is required" }),
        description: z.string().min(1, "Description is required"),
        amount: z.number().min(0.01, "Amount must be positive"),
        invoiced: z.boolean().optional(), // <-- added field
      })
    )
    .min(1, "At least one entry is required"),
});

const BillingPlanDetails = ({ billingPlan, refresh, refreshPlan }) => {
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.settings);
  const { toast } = useToast();

  useEffect(() => {
    if (!settings || Object.keys(settings).length === 0) {
      dispatch(fetchSettings());
    }
  }, [dispatch, settings]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currency: billingPlan?.currency || "",
      adjustedSalesValue: billingPlan?.adjustedSalesValue || 0,
      entries:
        billingPlan?.billing_plans?.map((plan) => ({
          date: new Date(plan.date),
          description: plan.description,
          amount: plan.amount,
          invoiced: plan.invoiced ?? false, // <-- default invoiced status
        })) || [],
    },
  });

  const { control, handleSubmit } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "entries",
  });

  const onSubmit = async (values) => {
  const company = billingPlan?.company;
  const currency = billingPlan?.currency;

  let exchangeRate = 1;

  if (company === "CONSYST Middle East FZ-LLC" && currency === "USD") {
    exchangeRate = settings?.usdToaed;
  } else if (company === "CONSYST Digital Industries Pvt. Ltd" && currency === "USD") {
    exchangeRate = settings?.usdToinr;
  } else {
    exchangeRate = settings?.usdToinr;
  }

  const updatedBillingPlans = values.entries.map((plan, index) => {
    const original = billingPlan.billing_plans?.[index];

    const base = {
      ...plan,
      date: new Date(plan.date),
      invoiced: plan.invoiced ?? false,
    };

    let amount = plan.amount;
    let convertedAmount = 0;

    // Handle company-specific logic
    if (company === "CONSYST Digital Industries Pvt. Ltd") {
      if (currency === "USD") {
        convertedAmount = +(amount * exchangeRate).toFixed(2); // USD → INR
      } else if (currency === "INR") {
        amount = +(amount / exchangeRate).toFixed(2); // convert INR → USD
        convertedAmount = +(plan.amount).toFixed(2); // keep original INR as converted
      }
    } else if (company === "CONSYST Middle East FZ-LLC" && currency === "USD") {
      convertedAmount = +(amount / exchangeRate).toFixed(2); // USD → AED
    } else {
      convertedAmount = +(amount / exchangeRate).toFixed(2); // default USD → INR
    }

    // New entry
    if (!original) {
      return {
        ...base,
        amount,
        converted_amount: convertedAmount,
        status: "draft",
      };
    }

    // Check changes
    const hasChanged =
      plan.amount !== original.amount ||
      new Date(plan.date).toISOString() !== new Date(original.date).toISOString() ||
      plan.description !== original.description ||
      plan.invoiced !== original.invoiced;

    return {
      ...base,
      amount,
      converted_amount: plan.amount !== original.amount
        ? convertedAmount
        : original.converted_amount ?? convertedAmount,
      status: hasChanged ? "draft" : original.status,
    };
  });

    const payload = {
      ...billingPlan,
      billing_plans: updatedBillingPlans,
    };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_CS365_URI}/api/billing-plan/create`,
        payload
      );
      refreshPlan();
      refresh();
      toast({
        title: "Billing Plan Saved",
        description: "Billing plan has been successfully saved.",
        icon: <CircleCheckIcon className="mr-4" color="green" />,
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "There was an error saving the billing plan.",
        variant: "destructive",
        icon: <CircleXIcon className="mr-4" color="red" />,
      });
      console.log(error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1>Billing Plan Info</h1>
            <Button
              type="submit"
              className="bg-[var(--csblue)] hover:bg-[var(--csblue)]/90 px-8"
            >
              Save
            </Button>
          </div>

          {/* Top fields: Currency & Sales Order Value */}
          <div className="mt-4 grid w-full grid-cols-[1fr_2fr_1fr] gap-6">
            {/* Currency */}
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sales Order Value */}
            <FormField
              control={form.control}
              name="adjustedSalesValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adjusted Sales Order Value</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div></div>
          </div>

          {/* Dynamic Entries Section */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">Billing Plan Entries</h2>
              <Button
                type="button"
                onClick={() =>
                  append({
                    date: new Date(),
                    description: "",
                    amount: 0,
                    isNew: true, // flag to mark as new
                  })
                }
                className="flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Entry
              </Button>
            </div>

            {fields.map((item, index) => (
              <div className="flex border border-[var(--input)] w-full shadow-sm p-4 rounded-lg mb-4 space-x-5 items-center">
                <div
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-4 gap-6 "
                >
                  {/* Date */}
                  <FormField
                    control={form.control}
                    name={`entries.${index}.date`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Planned Bill Date</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? format(field.value, "PPP")
                                  : "Pick a date"}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name={`entries.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Amount */}
                  <FormField
                    control={form.control}
                    name={`entries.${index}.amount`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            inputMode="decimal"
                            placeholder="Enter amount"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`entries.${index}.invoiced`}
                    render={({ field }) => (
                      <FormItem className="flex space-x-2 items-center">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            className="form-checkbox h-4 w-4 mt-2 text-blue-600"
                          />
                        </FormControl>
                        <FormLabel>Invoiced</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
                {item.isNew && (
                  <div className="hover:text-red-500">
                    <X onClick={() => remove(index)} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BillingPlanDetails;
