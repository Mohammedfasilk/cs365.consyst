import { useState, useEffect, use } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../UI/Sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../UI/Tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../UI/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import {
  Activity,
  CalendarCheckIcon,
  CalendarCog,
  CalendarIcon,
  CircleCheckIcon,
  CircleXIcon,
  Handshake,
  Plus,
  Receipt,
  SquareChartGantt,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../UI/Popover";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { cn } from "../../lib/utils";
import { format } from "date-fns";
import { Textarea } from "../UI/TextArea";
import { Calendar } from "../UI/Calender";
import CostEstimationTable from "../CostEstimationTable";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedProject,
  setIsOpen,
  setIsSaved,
  setSelectedProjectName,
  setSelectedProjectStatus,
} from "../../Redux/Slices/SelectedProject";
import { useToast } from "../../Hooks/use-toast";
import { useSessionUser } from "../../Hooks/useSessionUser";
import { fetchSettings } from "../../Redux/Slices/settingsSlice";
import { MultiSelect } from "../UI/MultiSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../UI/Select";
import { Switch } from "../UI/Switch";
import { EventsTable } from "./EventsTable";
import { EventColumn } from "./EventColumns";

const CalendarSheet = ({ fetchData }) => {
  const [project, setProject] = useState(null);
  const dispatch = useDispatch();
  const sessionUser = useSessionUser();

  const selectedProject = useSelector((state) => state.selectedProject.project);
  const { settings } = useSelector((state) => state.settings);

  useEffect(() => {
    if (!settings || Object.keys(settings).length === 0) {
      dispatch(fetchSettings());
    }
  }, [dispatch, settings]);

  const selectedProjectName = useSelector(
    (state) => state.selectedProject.selectedProjectName
  );

  const isOpen = useSelector((state) => state.selectedProject.isOpen);

  const isSaved = useSelector((state) => state.selectedProject.isSaved);

  const selectedStatus = useSelector(
    (state) => state.selectedProject.selectedProjectStatus
  );
 const [users, setUsers] = useState([]);
  const categories = [
    { label: "Strict Dates" },
    { label: "Flexible" },
  ];
  const [calendarId, setCalendarId] = useState("68822cadb7fa41dcaf2eab47");
  const { toast } = useToast();

  const calendarSchema = z.object({
  calendarTitle: z.string().min(1, "Calendar title is required"),
  yearType: z.enum(["FY", "CY"], {
    required_error: "Year type is required",
  }),
  sharedWith: z.array(z.string()).optional(), // usernames/emails
});

  const eventSchema = z.object({
  eventTitle: z.string().min(1, "Event title is required"),
  date: z.preprocess(
    (val) => (val instanceof Date ? val : new Date(val)),
    z.date({ required_error: "Date is required" })
  ),
  category: z.string().min(1, "Category is required"),
  monthlyRecurring: z.boolean().optional(),
});


  const calendarForm = useForm({
    resolver: zodResolver(calendarSchema),
    defaultValues: {
      calendarTitle: "",
      yearType: "FY",
      sharedWith: [],
    },
  });
  
  const eventForm = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      eventTitle: "",
      date: "",
      category: "",
      monthlyRecurring: false,
    },
  });

  async function onSubmit(values) {

        const calendarvalues = {
          title: values.calendarTitle,
          year_type: values.yearType,
          shared_with: values.sharedWith,
        };

        const createCalendar = async () => {

          try {
            const res = await axios.post(
              `${import.meta.env.VITE_CS365_URI}/api/calendar/create`,
              calendarvalues
            );
            // fetchData();
            if (res == null || res?.error) {
              toast({
                title: "Calendar Not Saved",
                description: "There was an error saving Calendar.",
                variant: "destructive",
                icon: <CircleXIcon className="mr-4" color="red" />,
              });
              return;
            }

            // dispatch(setIsSaved(true));


            toast({
              title: "Calendar Saved",
              description: "The calendar has been successfully saved.",
              icon: <CircleCheckIcon className="mr-4" color="green" />,
            });
          } catch (error) {
            console.error("Error Saving Calendar:", error);
            toast({
                title: "Calendar Not Saved",
                description: "There was an error saving Calendar.",
                variant: "destructive",
                icon: <CircleXIcon className="mr-4" color="red" />,
              });
          }
        };

        createCalendar();
  }
  async function onEventSubmit(values) {
        console.log("Event Values:", values);
        
        const eventvalues = {
          calendarId: calendarId,
          eventId: null,
          title: values.eventTitle,
          date: values.date,
          category: values.category,
          recurring: values.monthlyRecurring,
        };

        const createEvent = async () => {

          try {
            const res = await axios.post(
              `${import.meta.env.VITE_CS365_URI}/api/calendar/create-event`,
              eventvalues
            );
            // fetchData();
            if (res == null || res?.error) {
              toast({
                title: "Event Not Saved",
                description: "There was an error saving Event.",
                variant: "destructive",
                icon: <CircleXIcon className="mr-4" color="red" />,
              });
              return;
            }

            // dispatch(setIsSaved(true));


            toast({
              title: "Event Saved",
              description: "The event has been successfully saved.",
              icon: <CircleCheckIcon className="mr-4" color="green" />,
            });
          } catch (error) {
            console.error("Error Saving Calendar:", error);
            toast({
                title: "Event Not Saved",
                description: "There was an error saving event.",
                variant: "destructive",
                icon: <CircleXIcon className="mr-4" color="red" />,
              });
          }
        };

        createEvent();
  }

    useEffect(() => {
      const fetchUsers = async () => {
        try {

          const res = await axios.get(
            `${import.meta.env.VITE_CS365_URI}/api/user`
          );
          setUsers(res.data?.map(user => user.name))
          
        } catch (error) {
          console.error("Error fetching users list:", error);
        }
      };

      fetchUsers();
    }, []);

  //   useEffect(() => {
  //     async function fetchSelectedProject(project_name) {
  //       try {
  //         const res = await axios.get(
  //           `${import.meta.env.VITE_CS365_URI}/api/projects`
  //         );

  //         const projects = res.data;

  //         const data = await projects.filter(
  //           (project) => project?.project_name == project_name
  //         )[0];

  //         if (data) {
  //           dispatch(setSelectedProjectStatus(data.status));
  //           dispatch(setIsSaved(true));
  //           setProject(data);
  //           form.setValue("customerName", data.customer_name);
  //           form.setValue("projectCurrency", data.project_currency);
  //           form.setValue("customerPoDate", new Date(data.customer_po_date));
  //           form.setValue("customerPoValue", data.customer_po_value);
  //           form.setValue("projectDescription", data.project_description);
  //           form.setValue("company", data.company);
  //           form.setValue("commencementDate", new Date(data.commencement_date));
  //           form.setValue("contractEndDate", new Date(data.contract_end_date));
  //           form.setValue("fatDate", new Date(data.fat_date));
  //           form.setValue(
  //             "materialDeliveryDate",
  //             new Date(data.material_delivery_date)
  //           );
  //         } else {
  //           form.reset();
  //         }
  //       } catch (error) {
  //         console.error("Error fetching  projects:", error);
  //       }
  //     }

  //     if (selectedProjectName) {
  //       fetchSelectedProject(selectedProjectName);
  //     }
  //   }, [selectedProjectName]);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(value) => {
        if (!value) {
          dispatch(clearSelectedProject());
          dispatch(setSelectedProjectName(""));
          dispatch(setIsSaved(false));
          setProject(null);
          eventForm.reset();
          calendarForm.reset();
        }
        dispatch(setIsOpen(value));
      }}
    >
      <SheetTrigger asChild>
        <Button className="bg-[var(--csred)] hover:bg-[var(--csred)]/90">
          <Plus className="mr-2 h-4 w-4" /> Add Calendar
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[800px] overflow-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Calendar</SheetTitle>
          <div>
            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">
                  <SquareChartGantt className="mr-2 h-4 w-4" /> Details
                </TabsTrigger>
                <div>
                  <TabsTrigger value="events">
                    <CalendarCog className="mr-2 h-4 w-4" /> Events
                  </TabsTrigger>
                </div>
              </TabsList>

              <TabsContent value="details">
                <Form {...calendarForm}>
                  <form onSubmit={calendarForm.handleSubmit(onSubmit)}>
                    <div className="flex justify-between">
                      <h1>Basic Details</h1>
                      <Button
                        className="bg-[var(--csblue)] hover:bg-[var(--csblue)]/90 px-8"
                        type="submit"
                      >
                        Save
                      </Button>
                    </div>
                    <div className="mt-4 grid w-full grid-cols-[1fr_2fr_1fr] gap-6">
                      <FormField
                        control={calendarForm.control}
                        name="calendarTitle"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>Calendar Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={calendarForm.control}
                        name="yearType"
                        render={({ field }) => (
                          <FormItem className="col-span-2 mt-2">
                            <FormLabel>Year Type</FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-6 mt-2">
                                <label className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    value="FY"
                                    checked={field.value === "FY"}
                                    onChange={field.onChange}
                                    className="accent-blue-600"
                                  />
                                  <span>FY</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    value="CY"
                                    checked={field.value === "CY"}
                                    onChange={field.onChange}
                                    className="accent-blue-600"
                                  />
                                  <span>CY</span>
                                </label>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Separator className="mt-8 mb-4" />
                    <FormField
                      control={calendarForm.control}
                      name="sharedWith"
                      render={({ field }) => {
                        const options = Array.isArray(users)
                          ? users.map((a) => ({
                              value: a,
                              label: a,
                            }))
                          : [];
                        return (
                          <FormItem className="col-span-2">
                            <FormLabel>Share With</FormLabel>
                            <FormControl>
                              <MultiSelect
                                options={options}
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                placeholder="Select Users"
                                variant="destructive"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="events">
                <Form {...eventForm}>
                  <form onSubmit={eventForm.handleSubmit(onEventSubmit)}>
                    <div className="flex justify-between">
                      <h1>Event Details</h1>
                      <div className="flex flex-col gap-2">
                        <Button
                          className="bg-[var(--csblue)] hover:bg-[var(--csblue)]/90 px-8"
                          type="submit"
                          // disabled={loading}
                        >
                          Save
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 grid w-full grid-cols-[2fr_2fr_1fr] gap-6">
                      <FormField
                        control={eventForm.control}
                        name="eventTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={eventForm.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                              {/* <Input readOnly {...field} /> */}
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
                                        !field.value &&
                                          "text-[var(--muted-foreground)]"
                                      )}
                                    >
                                      {field.value &&
                                      !isNaN(new Date(field.value)) ? (
                                        format(new Date(field.value), "PPP")
                                      ) : (
                                        <span className="text-muted-foreground">
                                          Pick a date
                                        </span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="col-span-2 max-w-xl">
                        <FormField
                          control={eventForm.control}
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
                                    <SelectItem
                                      key={cat.label}
                                      value={cat.label}
                                    >
                                      {cat.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={eventForm.control}
                          name="monthlyRecurring"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2 mt-5 p-2">
                              <div className="space-y-0.5">
                                <FormLabel>Monthly Recurring</FormLabel>
                              </div>
                              <FormControl>
                                <Switch
                                    className="mt-1"
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </form>
                </Form>

                <Separator className="mt-8 mb-4" />

                <div>
                  <EventsTable
                    columns={EventColumn()}
                    data={[]}
                    onRowClick={(row) => {
                      eventForm.setValue("eventTitle", row.title);
                      eventForm.setValue("date", row.date);
                      eventForm.setValue("category", row.category);
                      eventForm.setValue("monthlyRecurring", row.recurring);
                      setResetKey((prevKey) => prevKey + 1);
                    }}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default CalendarSheet;
