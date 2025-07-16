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
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "../../lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "../UI/Popover";
import { Calendar } from "../UI/Calender";

const formSchema = z.object({
  currency: z.string().min(1, "Currency is required"),
  salesOrderValue: z.number().min(0, "Sales Order Value is required"),
  entries: z
    .array(
      z.object({
        date: z.date({ required_error: "Date is required" }),
        description: z.string().min(1, "Description is required"),
        amount: z.number().min(0.01, "Amount must be positive"),
      })
    )
    .min(1, "At least one entry is required"),
});

const BillingPlanDetails = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currency: "",
      salesOrderValue: 0,
      entries: [],
    },
  });

  const { control, handleSubmit } = form;
  const { fields, append } = useFieldArray({
    control,
    name: "entries",
  });

  const onSubmit = (values) => {
    console.log("Submitted Values:", values);
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sales Order Value */}
            <FormField
              control={form.control}
              name="salesOrderValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sales Order Value</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="decimal"
                      placeholder="Enter order value"
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
                  })
                }
                className="flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Entry
              </Button>
            </div>

            {fields.map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4 border border-[var(--input)] shadow-sm p-4 rounded-lg"
              >
                {/* Date */}
                <FormField
                  control={form.control}
                  name={`entries.${index}.date`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
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
                          <PopoverContent className="w-auto p-0" align="start">
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
              </div>
            ))}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BillingPlanDetails;
