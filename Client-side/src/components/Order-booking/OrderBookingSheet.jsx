import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../UI/Sheet";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../UI/Tabs";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../UI/Form";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import {
    CalendarIcon,
    CircleCheckIcon,
    CircleXIcon,
    Plus,
    SquareChartGantt,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../UI/Popover";
import { Calendar } from "../UI/Calender";
import { cn } from "../../lib/utils";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../Hooks/use-toast";
import { setSelectedSalesOrder, setIsOpen, setIsSaved, clearSelectedSalesOrder } from "../../Redux/Slices/orderBookingSlice";
import { ChooseSalesOrder } from "./ChooseSalesOrder";
import { fetchSettings } from "../../Redux/Slices/settingsSlice";

const subCategories = {
    "Integrated Solution": [
        "Automation Solution",
        "Turnkey C & I Solution",
        "OT Security Solutions",
        "Digitalization Solution",
    ],
    "Specialized Services": [
        "Automation Tech Services",
        "OT Security Services",
        "Digitalization Services",
    ],
    "Product/Platform": [
        "iiotNext Platform",
        "iiotNext Micredge",
    ],
};

const OrderBookingSheet = ({ fetchData }) => {
    const dispatch = useDispatch();
    const { toast } = useToast();

    const [tabValue, setTabValue] = useState("order-details");
    const isOpen = useSelector((state) => state.selectedSalesOrder.isOpen);
    const isSaved = useSelector((state) => state.selectedSalesOrder.isSaved);
    const source = useSelector((state) => state.selectedSalesOrder.source);
    const selectedSalesOrder = useSelector((state) => state.selectedSalesOrder.salesOrder);
    const selectedSalesOrderName = useSelector((state) => state.selectedSalesOrder.salesOrderName);
    const settings = useSelector((state) => state.settings.settings);
    const usdToInr = settings?.usdToinr

    console.log("OrderBookingSheet settings: ", selectedSalesOrder);

    useEffect(() => {
        if (!settings || Object.keys(settings).length === 0) {
            dispatch(fetchSettings());
        }
    }, [dispatch, settings]);

    const formSchema = z.object({
        salesOrderDate: z.date(),
        customerName: z.string(),
        currency: z.string(),
        salesOrderValue: z.number(),
        company: z.string(),
        adjustment: z.preprocess(
            (val) => {
                if (val === '' || val === undefined || val === null) return 0;
                if (typeof val === 'string' && /^-?\d*(\.\d*)?$/.test(val)) return parseFloat(val);
                return val;
            },
            z.number().refine(
                (val) => typeof val === "number" && !isNaN(val),
                { message: "Adjustment must be a number (can be negative/positive/decimal)" }
            )
        ),
        adjustedSalesValue: z.number(),
        adjustedSalesValueUsd: z.number(),
        category: z.string().min(1, { message: "Category is required" }),
        subCategory: z.string().min(1, { message: "Sub Category is required" }),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            salesOrderDate: null,
            customerName: "",
            currency: "",
            salesOrderValue: 0,
            company: "",
            adjustment: 0,
            adjustedSalesValue: 0,
            adjustedSalesValueUsd: 0,
            category: "",
            subCategory: "",
        },
    });

    useEffect(() => {
        async function fetchSalesOrderDetails() {
            if (source === "dropdown" && selectedSalesOrderName) {
                try {
                    const res = await axios.post(`${import.meta.env.VITE_CS365_URI}/api/orders/order-booking`,
                        { name: selectedSalesOrderName });
                    const data = res.data;
                    dispatch(setIsSaved(true));

                    const currency = data.currency || "";
                    const salesValue = parseFloat(data.net_total) || 0;

                    let usdValue;
                    if (currency === 'INR') {
                        usdValue = salesValue / (usdToInr || 1);
                    } else {
                        usdValue = salesValue;
                    }

                    form.reset({
                        salesOrderDate: data.transaction_date ? new Date(data.transaction_date) : null,
                        customerName: data.customer || "",
                        currency: currency,
                        salesOrderValue: salesValue,
                        company: data.company || "",
                        adjustment: 0,
                        adjustedSalesValue: salesValue,
                        adjustedSalesValueUSD: usdValue,
                        category: "",
                        subCategory: "",
                    });
                } catch (err) {
                    console.error("fetch failed : ", err);
                }
            }
        }
        fetchSalesOrderDetails();
    }, [selectedSalesOrderName, usdToInr]);

    useEffect(() => {
        if (!selectedSalesOrder) return;

        const currency = selectedSalesOrder.currency || "";
        const adjustedValue = parseFloat(selectedSalesOrder.adjustedSalesValue) || 0;

        let usdValue;
        if (currency === 'INR') {
            usdValue = adjustedValue / (usdToInr || 1);
        } else {
            usdValue = adjustedValue;
        }

        form.reset({
            salesOrderDate: selectedSalesOrder.salesOrderDate ? new Date(selectedSalesOrder.salesOrderDate) : null,
            customerName: selectedSalesOrder.customerName || "",
            currency: currency,
            salesOrderValue: parseFloat(selectedSalesOrder.salesOrderValue) || 0,
            company: selectedSalesOrder.company || "",
            adjustment: parseFloat(selectedSalesOrder.adjustment) || 0,
            adjustedSalesValue: selectedSalesOrder.adjustedSalesValue || 0,
            adjustedSalesValueUsd: selectedSalesOrder.adjustedSalesValueUsd || 0,
            category: selectedSalesOrder.category || "",
            subCategory: selectedSalesOrder.subCategory || "",
        });
    }, [selectedSalesOrder, usdToInr]);

    async function onSubmit(values) {
        try {
            const currency = values.currency;
            const adjustedValue = parseFloat(values.adjustedSalesValue) || 0;
            const company = values.company;

            // Calculate values based on currency
            let usdValue, inrValue;
            if (currency === 'INR') {
                inrValue = adjustedValue;
                usdValue = adjustedValue / (usdToInr || 1);
            } else {
                usdValue = adjustedValue;
                if (company === "CONSYST Middle East FZ-LLC") {
                     inrValue = adjustedValue * (settings?.usdToaed || 1);
                }else{
                inrValue = adjustedValue * (usdToInr || 1);}
            }
                // Prepare data to save
                const dataToSave = {
                    ...values,
                    salesOrderName: selectedSalesOrderName,
                    adjustedSalesValueLocal: inrValue.toFixed(2) || 0,
                    // adjustedSalesValue: adjustedValue,
                    // adjustedSalesValueUsd: usdValue.toFixed(2) || 0,
                };

                await axios.post(`${import.meta.env.VITE_CS365_URI}/api/orders/save-order`, dataToSave);
                fetchData();
                dispatch(setIsSaved(true));
                toast({
                    title: "Order Saved",
                    description: "Order has been successfully saved.",
                    icon: <CircleCheckIcon className="mr-4" color="green" />,
                });
            } catch (error) {
                toast({
                    title: "Order Not Saved",
                    description: "There was an error saving the order.",
                    variant: "destructive",
                    icon: <CircleXIcon className="mr-4" color="red" />,
                });
            }
        }

    const handleSheetClose = (value) => {
            if (!value) {
                form.reset({
                    salesOrderDate: null,
                    customerName: "",
                    currency: "",
                    salesOrderValue: 0,
                    company: "",
                    adjustment: 0,
                    adjustedSalesValue: 0,
                    category: "",
                    subCategory: "",
                });
                dispatch(clearSelectedSalesOrder());
                dispatch(setSelectedSalesOrder(""));
                dispatch(setIsSaved(false));
                setTabValue("order-details");
            }
            dispatch(setIsOpen(value));
        };

        return (
            <Sheet
                open={isOpen}
                onOpenChange={handleSheetClose}
            >
                <SheetTrigger asChild>
                    <Button className="bg-[var(--csred)] hover:bg-[var(--csred)]/90">
                        <Plus className="mr-2 h-4 w-4" /> Add Order
                    </Button>
                </SheetTrigger>
                <SheetContent className="min-w-[800px] overflow-auto">
                    <SheetHeader>
                        <SheetTitle className="text-2xl font-bold">Order Booking</SheetTitle>
                        <ChooseSalesOrder />
                        <Tabs value={tabValue} onValueChange={setTabValue}>
                            <TabsList>
                                <TabsTrigger value="order-details">
                                    <SquareChartGantt className="mr-2 h-4 w-4" /> Order Details
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="order-details">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)}>
                                        <div className="flex justify-between">
                                            <h1>Basic Order Info</h1>
                                            <Button
                                                className="bg-[var(--csblue)] hover:bg-[var(--csblue)]/90 px-8"
                                                type="submit"
                                            >
                                                Save
                                            </Button>
                                        </div>
                                        <div className="mt-4 grid w-full grid-cols-[1fr_2fr_1fr] gap-6">
                                            {/* Sales Order Date */}
                                            <FormField
                                                control={form.control}
                                                name="salesOrderDate"
                                                render={({ field }) => (
                                                    <FormItem className="pointer-events-none">
                                                        <FormLabel>Sales Order Date</FormLabel>
                                                        <FormControl>
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        variant="outline"
                                                                        className={cn(
                                                                            "w-[240px] pl-3 text-left font-normal",
                                                                            !field.value && "text-[var(--muted-foreground)]"
                                                                        )}
                                                                    >
                                                                        {field.value && !isNaN(new Date(field.value)) ? (
                                                                            format(new Date(field.value), "PPP")
                                                                        ) : (
                                                                            <span className="text-muted-foreground">Pick a date</span>
                                                                        )}
                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-auto p-0" align="start">
                                                                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                                                </PopoverContent>
                                                            </Popover>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            {/* Customer Name */}
                                            <FormField
                                                control={form.control}
                                                name="customerName"
                                                render={({ field }) => (
                                                    <FormItem className="pointer-events-none">
                                                        <FormLabel>Customer Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="ACME Inc." {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <div></div>
                                            {/* Currency */}
                                            <FormField
                                                control={form.control}
                                                name="currency"
                                                render={({ field }) => (
                                                    <FormItem className="pointer-events-none">
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
                                                    <FormItem className="pointer-events-none">
                                                        <FormLabel>Sales Order Value</FormLabel>
                                                        <FormControl>
                                                            <Input type="number" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <div></div>
                                            {/* Company */}
                                            <FormField
                                                control={form.control}
                                                name="company"
                                                render={({ field }) => (
                                                    <FormItem className="pointer-events-none col-span-2">
                                                        <FormLabel>Company</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="ACME Inc." {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <div></div>
                                            {/* Adjustment */}
                                            <FormField
                                                control={form.control}
                                                name="adjustment"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Adjustment</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                inputMode="decimal"
                                                                value={field.value === 0 ? '' : field.value}
                                                                onChange={e => {
                                                                    const val = e.target.value;
                                                                    if (val === '' || val === '-' || /^-?\d*(\.\d*)?$/.test(val)) {
                                                                        field.onChange(val);
                                                                        const num = parseFloat(val) || 0;
                                                                        const salesOrderValue = parseFloat(form.getValues("salesOrderValue")) || 0;
                                                                        const currency = form.getValues("currency");

                                                                        // Update adjusted sales value
                                                                        const adjustedValue = salesOrderValue + num;
                                                                        form.setValue("adjustedSalesValue", adjustedValue);

                                                                        // Update USD value based on currency
                                                                        let usdValue;
                                                                        if (currency === 'INR') {
                                                                            usdValue = adjustedValue / (usdToInr || 1);
                                                                        } else {
                                                                            usdValue = adjustedValue;
                                                                        }
                                                                        form.setValue("adjustedSalesValueUsd", usdValue);
                                                                    }
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            {/* Adjusted Sales Value */}
                                            <FormField
                                                control={form.control}
                                                name="adjustedSalesValue"
                                                render={({ field }) => (
                                                    <FormItem className="pointer-events-none">
                                                        <FormLabel>Adjusted Sales Value</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <div></div>
                                            {/* Adjusted Sales Value (USD) - Full width */}
                                            <FormField
                                                control={form.control}
                                                name="adjustedSalesValueUsd"
                                                render={({ field }) => (
                                                    <FormItem className="pointer-events-none col-span-2">
                                                        <FormLabel>Adjusted Sales Value (USD)</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                value={!isNaN(field.value) ? field.value.toLocaleString(undefined, {
                                                                    minimumFractionDigits: 2,
                                                                    maximumFractionDigits: 2
                                                                }) : ''}
                                                                readOnly
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <div></div>
                                            {/* Category */}
                                            <FormField
                                                control={form.control}
                                                name="category"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Category</FormLabel>
                                                        <FormControl>
                                                            <select {...field} className="w-full border rounded-md p-1.5">
                                                                <option value="">Select Category</option>
                                                                <option value="Integrated Solution">Integrated Solution</option>
                                                                <option value="Specialized Services">Specialized Services</option>
                                                                <option value="Product/Platform">Product/Platform</option>
                                                            </select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            {/* Sub Category */}
                                            <FormField
                                                control={form.control}
                                                name="subCategory"
                                                render={({ field }) => {
                                                    const category = form.watch("category");
                                                    const options = subCategories[category] || [];
                                                    return (
                                                        <FormItem>
                                                            <FormLabel>Sub Category</FormLabel>
                                                            <FormControl>
                                                                <select
                                                                    {...field}
                                                                    className="w-full border rounded-md p-1.5"
                                                                    disabled={!category}
                                                                >
                                                                    <option value="">Select Sub Category</option>
                                                                    {options.map((sub) => (
                                                                        <option key={sub} value={sub}>{sub}</option>
                                                                    ))}
                                                                </select>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    );
                                                }}
                                            />
                                        </div>
                                    </form>
                                </Form>
                            </TabsContent>
                        </Tabs>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        );
    };

    export default OrderBookingSheet;