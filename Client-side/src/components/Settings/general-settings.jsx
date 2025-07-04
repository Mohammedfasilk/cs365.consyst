import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { CalendarIcon, CircleCheckIcon, CircleXIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "../../lib/utils";
import { Calendar } from "../UI/Calender";
import { Popover, PopoverContent, PopoverTrigger } from "../UI/Popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../UI/Form";
import { useToast } from "../../Hooks/use-toast";
import dayjs from "dayjs";
import { useSessionUser } from "../../Hooks/useSessionUser";

export default function GeneralSettings() {
  const { toast } = useToast();
  const sessionUser = useSessionUser();

  const form = useForm({
    defaultValues: {
      currentFyStartDate: null,
      usdToinr: "",
      usdToaed: "",
      cmefTarget: "",
      ctiplTarget: "",
      cdiplTarget: "",
      groupTarget: "",
    },
  });

  const calculateGroupTargetUSD = (values) => {
    const { usdToinr, cmefTarget, ctiplTarget, cdiplTarget } = values;
    if (
      !usdToinr ||
      usdToinr === 0 ||
      !cmefTarget ||
      !ctiplTarget ||
      !cdiplTarget
    ) {
      return 0;
    }

    const group_value =
      Number(cmefTarget) +
      Number(ctiplTarget) / Number(usdToinr) +
      
      Number(cdiplTarget) / Number(usdToinr);

    return parseFloat(group_value.toFixed(2));
  };

  const onSubmit = async (values) => {
  try {
    const { groupTarget, currentFyStartDate, ...rest } = values;

    const payload = {
      ...rest,
      groupTarget,
      currentFyStartDate: currentFyStartDate
        ? dayjs(currentFyStartDate).format("YYYY-MM-DD")
        : null,
    };

    await axios.post(`${import.meta.env.VITE_CS365_URI}/api/settings`, payload);

    toast({
      title: "Saved Successfully",
      description: "Settings have been successfully saved.",
      icon: <CircleCheckIcon className="mr-4" color="green" />,
    });
    const actData = {
                    field: "settings",
                    data: {
                      username: sessionUser,
                      date: new Date().toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                      }),
                      activity: `Updated global settings`,
                    },
                  };
                  const act = await axios.post(
                    `${import.meta.env.VITE_CS365_URI}/api/activity`,
                    actData
                  );
  } catch (error) {
    toast({
      title: "Save Failed",
      description: "There was an error saving the settings.",
      variant: "destructive",
      icon: <CircleXIcon className="mr-4" color="red" />,
    });
  }
};

  useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_CS365_URI}/api/settings`,
          { cache: "no-store" }
        );
        const data = response.data;
        form.setValue("cdiplTarget", data.cdiplTarget || "");
        form.setValue("currentFyStartDate", new Date(data.currentFyStartDate));
        form.setValue("usdToinr", data.usdToinr || "");
        form.setValue("usdToaed", data.usdToaed || "");
        form.setValue("cmefTarget", data.cmefTarget || "");
        form.setValue("ctiplTarget", data.ctiplTarget || "");
        form.setValue("groupTarget", data.groupTarget || "");
      } catch (error) {
        console.error("Failed to fetch settings", error);
      }
    }

    fetchSettings();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between">
          <h1>Global Settings</h1>
          <Button
            className="bg-[var(--csblue)] hover:bg-[var(--csblue)]/90 px-8"
            type="submit"
          >
            Save
          </Button>
        </div>

        <div className="mt-4 mb-8">
          <FormField
            control={form.control}
            name="currentFyStartDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Current FY Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-[var(--foreground)]"
                        )}
                      >
                        {field.value && !isNaN(new Date(field.value)) ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}

                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <h1>Exchange Rates</h1>
        <div className="grid w-full gap-6 grid-cols-[1fr_1fr_1fr_1fr] mt-4 mb-8">
          {["usdToinr", "usdToaed"].map((name) => (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`1 USD = ? ${
                    name === "usdToinr" ? "INR" : "AED"
                  }`}</FormLabel>
                  <FormControl>
                    <Input
                      className="shadow"
                      {...field}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        const values = form.getValues();
                        const group_value = calculateGroupTargetUSD(values);
                        form.setValue("groupTarget", group_value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <h1>Sales Targets (Current FY)</h1>
        <div className="grid w-full grid-cols-[1fr_1fr_1fr] gap-6 mt-4 mb-8">
          {[
            { name: "cmefTarget", label: "CMEF Target (AED)" },
            { name: "ctiplTarget", label: "CTIPL Target (INR)" },
            { name: "cdiplTarget", label: "CDIPL Target (INR)" },
          ].map(({ name, label }) => (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <Input
                      className="text-right shadow"
                      {...field}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
                        const values = form.getValues();
                        const group_value = calculateGroupTargetUSD(values);
                        form.setValue("groupTarget", group_value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <FormField
            control={form.control}
            name="groupTarget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Group Target (USD)</FormLabel>
                <FormControl>
                  <Input disabled className="text-right shadow" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
