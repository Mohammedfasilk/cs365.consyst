import { useState, useEffect } from "react";
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
  CalendarCheckIcon,
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
import { ChooseProject } from "../UI/ChooseProject";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedProject,
  setIsOpen,
  setSelectedProjectName,
} from "../../Redux/Slices/SelectedProject";
import GanttChart from "./GanttChart";

const ProjectSheet = ({fetchData}) => {
  const [project, setProject] = useState(null);
  const dispatch = useDispatch();

  const selectedProject = useSelector((state) => state.selectedProject.project);  
  const selectedProjectName = useSelector((state)=> state.selectedProject.selectedProjectName)
  
  const isOpen = useSelector((state) => state.selectedProject.isOpen);
  //   const { toast } = useToast();
  const formSchema = z.object({
  customerName: z.string(),
  customerPoValue: z.number(),
  customerPoDate: z.date(),
  commencementDate: z.date(),
  contractEndDate: z.date(),
  materialDeliveryDate: z.date(),
  fatDate: z.date(),
  projectCurrency: z.string(),
  projectDescription: z.string(),
  company: z.string(),
})

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerPoValue: 0,
      customerPoDate: null,
      commencementDate: null,
      contractEndDate: null,
      fatDate: null,
      materialDeliveryDate: null,
      projectCurrency: "",
      projectDescription: "",
      company: "",
    },
  });

  async function onSubmit(values) {
    const projectValues = {
      project_name: selectedProjectName,
      customer_name: values.customerName,
      customer_po_value: values.customerPoValue,
      customer_po_date: values.customerPoDate,
      commencement_date: values.commencementDate,
      contract_end_date: values.contractEndDate,
      fat_date: values.fatDate,
      material_delivery_date: values.materialDeliveryDate,
      project_currency: values.projectCurrency,
      project_description: values.projectDescription,
      company: values.company,
      stage: "open",
      status: "draft",
    };

   const createProject = async ()=>{
      try {

        const res = await axios.post(
          `${import.meta.env.VITE_CS365_URI}/api/projects/save-project`,
          projectValues
        );

        fetchData();
        
      } catch (error) {
        console.error("Error Saving Project:", error);
      }
    };
    
    createProject();
    
      
    // if (result?.error) {
    //   toast({
    //     title: "Project Not Saved",
    //     description: "There was an error saving the project.",
    //     variant: "destructive",
    //     icon: <CircleXIcon className="mr-4" color="red" />,
    //   });
    //   return;
    // }

    toast({
      title: "Project Saved",
      description: "The project has been successfully saved.",
      icon: <CircleCheckIcon className="mr-4" color="green" />,
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesOrderId = {
          sales_order: selectedProject?.sales_order || "",
        };

        const res = await axios.post(
          `${import.meta.env.VITE_CS365_URI}/api/projects/sales-order`,
          salesOrderId
        );

        const salesOrder = res.data[0];

        if (salesOrder) {
          const {
            po_date,
            customer_name,
            company,
            currency,
            base_rounded_total,
          } = salesOrder;
          const { project_name } = selectedProject || {};

          if (po_date) form.setValue("customerPoDate", new Date(po_date));
          form.setValue("customerName", customer_name || "");
          form.setValue("projectCurrency", currency || "");
          form.setValue("company", company || "");
          form.setValue("projectDescription", project_name || "");
          form.setValue("customerPoValue", base_rounded_total || 0);
        }
      } catch (error) {
        console.error("Error fetching sales-order list:", error);
      }
    };

    fetchData();
  }, [selectedProject]);

  useEffect(() => {
    async function fetchSelectedProject(project_name) {
      try {
  
          const res = await axios.get(
            `${import.meta.env.VITE_CS365_URI}/api/projects`
          );
  
          const projects = res.data ;
         
          
          const data = projects.filter((project)=> project?.project_name == project_name)[0]
          
      if (data) {
        setProject(data);
        form.setValue("customerName", data.customer_name);
        form.setValue("projectCurrency", data.project_currency);
        form.setValue("customerPoDate", new Date(data.customer_po_date));
        form.setValue("customerPoValue", data.customer_po_value);
        form.setValue("projectDescription", data.project_description);
        form.setValue("company", data.company);
        form.setValue("commencementDate", new Date(data.commencement_date));
        form.setValue("contractEndDate", new Date(data.contract_end_date));
        form.setValue("fatDate", new Date(data.fat_date));
        form.setValue(
          "materialDeliveryDate",
          new Date(data.material_delivery_date)
        );
      }
      } catch (error) {
          console.error("Error fetching  projects:", error);
        }
    }

    if (selectedProjectName) {
      fetchSelectedProject(selectedProjectName);
        }
  }, [selectedProjectName]);

  return (
    <Sheet
    open={isOpen}
    onOpenChange={(value) => {
      if (!value) {
       dispatch(clearSelectedProject())
       dispatch(setSelectedProjectName(''))
       setProject(null);
       form.reset();
      }
      dispatch(setIsOpen(value));
    }}
    >
      <SheetTrigger asChild>
        <Button className="bg-[var(--csred)] hover:bg-[var(--csred)]/90">
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[800px] overflow-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Project</SheetTitle>
          <ChooseProject />
          <div>
            <Tabs defaultValue="project-details">
              <TabsList>
                <TabsTrigger value="project-details">
                  <SquareChartGantt className="mr-2 h-4 w-4" /> Project Details
                </TabsTrigger>
                <TabsTrigger value="terms-and-conditions">
                  <Handshake className="mr-2 h-4 w-4" /> Terms and Conditions
                </TabsTrigger>
                <TabsTrigger value="budget">
                  <Receipt className="mr-2 h-4 w-4" /> Budget
                </TabsTrigger>
                <TabsTrigger value="timeline">
                  <CalendarCheckIcon className="mr-2 h-4 w-4" /> Timeline
                </TabsTrigger>
              </TabsList>

              <TabsContent value="project-details">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex justify-between">
                      <h1>Basic Information</h1>
                      <Button
                        className="bg-[var(--csblue)] hover:bg-[var(--csblue)]/90 px-8"
                        type="submit"
                      >
                        Save
                      </Button>
                    </div>
                    <div className="mt-4 grid w-full grid-cols-[1fr_2fr_1fr] gap-6">
                      <FormField
                        control={form.control}
                        name="customerPoDate"
                        render={({ field }) => (
                          <FormItem className="pointer-events-none">
                            <FormLabel>Customer PO Date</FormLabel>
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
                      <FormField
                        control={form.control}
                        name="customerName"
                        render={({ field }) => (
                          <FormItem className="pointer-events-none">
                            <FormLabel>Customer Name</FormLabel>
                            <FormControl>
                              <Input placeholder="ACME Inc." {...field} />
                              {/* <ProjectFilterInput placeholder="Choose Customer..." /> */}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div></div>
                      <FormField
                        control={form.control}
                        name="projectCurrency"
                        render={({ field }) => (
                          <FormItem className="pointer-events-none">
                            <FormLabel>Project Currency</FormLabel>
                            <FormControl>
                              <Input {...field} />
                              {/* <Select {...field}>
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Select Currency" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="INR">INR</SelectItem>
                                  <SelectItem value="USD">USD</SelectItem>
                                  <SelectItem value="AED">AED</SelectItem>
                                </SelectContent>
                              </Select> */}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="customerPoValue"
                        render={({ field }) => (
                          <FormItem className="pointer-events-none">
                            <FormLabel>Customer PO Value</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div></div>
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem className="pointer-events-none col-span-2">
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                              <Input placeholder="ACME Inc." {...field} />
                              {/* <ProjectFilterInput placeholder="Choose Customer..." /> */}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div></div>
                      <FormField
                        control={form.control}
                        name="projectDescription"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>Project Description</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Separator className="mt-8 mb-4" />
                    <h1>Important Dates</h1>
                    <div className="mt-4 grid grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="commencementDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Commencement Date</FormLabel>
                            <FormControl>
                              {/* <Input
                                type="date"
                                {...field}
                                value={
                                  field.value && !isNaN(new Date(field.value))
                                    ? new Date(field.value)
                                        .toISOString()
                                        .split("T")[0]
                                    : ""
                                }
                              /> */}
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
                                        !field.value &&
                                          "text-muted-[var(--foreground)]"
                                      )}
                                    >
                                      {field.value &&
                                      !isNaN(new Date(field.value)) ? (
                                        format(new Date(field.value), "PPP")
                                      ) : (
                                        <span>Pick a date</span>
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
                                    // disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="h-2"></div>
                      <FormField
                        control={form.control}
                        name="fatDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>FAT Date</FormLabel>
                            <FormControl>
                              {/* <Input type="date" {...field} value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : ''} /> */}
                              <div>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant="outline"
                                        className={cn(
                                          "w-[240px] pl-3 text-left font-normal",
                                          !field.value &&
                                            "text-muted-[var(--foreground)]"
                                        )}
                                      >
                                        {field.value &&
                                        !isNaN(new Date(field.value)) ? (
                                          format(new Date(field.value), "PPP")
                                        ) : (
                                          <span>Pick a date</span>
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
                                      // disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="h-2"></div>
                      <FormField
                        control={form.control}
                        name="materialDeliveryDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Material Delivery Date</FormLabel>
                            <FormControl>
                              {/* <Input type="date" {...field} value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : ''} /> */}
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
                                        !field.value &&
                                          "text-muted-[var(--foreground)]"
                                      )}
                                    >
                                      {field.value &&
                                      !isNaN(new Date(field.value)) ? (
                                        format(new Date(field.value), "PPP")
                                      ) : (
                                        <span>Pick a date</span>
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
                                    // disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="h-2"></div>

                      <FormField
                        control={form.control}
                        name="contractEndDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contract End Date</FormLabel>
                            <FormControl>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
                                        !field.value &&
                                          "text-muted-[var(--foreground)]"
                                      )}
                                    >
                                      {field.value &&
                                      !isNaN(new Date(field.value)) ? (
                                        format(new Date(field.value), "PPP")
                                      ) : (
                                        <span>Pick a date</span>
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
                                    // disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="budget">
                <CostEstimationTable project={project} />
              </TabsContent>

              <TabsContent value="timeline"><GanttChart/></TabsContent>
            </Tabs>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default ProjectSheet;
