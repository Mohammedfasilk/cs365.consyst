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
import {
    setSelectedBillingPlan,
    setSelectedBillingPlanName,
    setIsOpen,
    setIsSaved,
    clearSelectedBillingPlan,
} from "../../Redux/Slices/BillingPlanSlice";
import { ChooseBillingPlan } from "./ChooseBillingPlan";
import { fetchSettings } from "../../Redux/Slices/settingsSlice";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../UI/Select";
import BillingPlanDetails from "./BillingPlanDetails";

const BillingPlanSheet = ({ fetchData }) => {
    const dispatch = useDispatch();
    const { toast } = useToast();

    const [tabValue, setTabValue] = useState("billing-details");
    const isOpen = useSelector((state) => state.billingPlan?.isOpen);
    const isSaved = useSelector((state) => state.billingPlan?.isSaved);
    const source = useSelector((state) => state.billingPlan?.source);
    const selectedBillingPlan = useSelector((state) => state.billingPlan?.billingPlan);
    const billingPlanName = useSelector((state) => state.billingPlan?.billingPlanName);

    const settings = useSelector((state) => state.settings.settings);
    const usdToInr = settings?.usdToinr;

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
                if (val === "" || val === undefined || val === null) return 0;
                if (typeof val === "string" && /^-?\d*(\.\d*)?$/.test(val))
                    return parseFloat(val);
                return val;
            },
            z
                .number()
                .refine(
                    (val) => typeof val === "number" && !isNaN(val),
                    {
                        message:
                            "Adjustment must be a number (can be negative/positive/decimal)",
                    }
                )
        ),
        adjustedSalesValue: z.number(),
        adjustedSalesValueUsd: z.number(),
        country: z.string().min(1, { message: "Country is required" }),
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
            country: "",
            category: "",
            subCategory: "",
        },
    });

    useEffect(() => {
        async function fetchSalesOrderDetails() {
            if (source === "dropdown" && selectedSalesOrderName) {
                try {
                    const res = await axios.get(
                        `${import.meta.env.VITE_CS365_URI}/api/orders`,
                        { name: selectedSalesOrderName }
                    );
                    const data = res.data;
                    dispatch(setIsSaved(true));

                    const currency = data.currency || "";
                    const salesValue = parseFloat(data.net_total) || 0;

                    let usdValue;
                    if (currency === "INR") {
                        usdValue = salesValue / (usdToInr || 1);
                    } else {
                        usdValue = salesValue;
                    }

                    form.reset({
                        salesOrderDate: data.transaction_date
                            ? new Date(data.transaction_date)
                            : null,
                        customerName: data.customer || "",
                        currency: currency,
                        salesOrderValue: salesValue,
                        company: data.company || "",
                        adjustment: 0,
                        adjustedSalesValue: salesValue,
                        adjustedSalesValueUsd: usdValue,
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
        const adjustedValue =
            parseFloat(selectedSalesOrder.adjustedSalesValue) || 0;

        let usdValue;
        if (currency === "INR") {
            usdValue = adjustedValue / (usdToInr || 1);
        } else {
            usdValue = adjustedValue;
        }

        form.reset({
            salesOrderDate: selectedSalesOrder.salesOrderDate
                ? new Date(selectedSalesOrder.salesOrderDate)
                : null,
            customerName: selectedSalesOrder.customerName || "",
            currency: currency,
            salesOrderValue:
                parseFloat(selectedSalesOrder.salesOrderValue) || 0,
            company: selectedSalesOrder.company || "",
            adjustment: parseFloat(selectedSalesOrder.adjustment) || 0,
            adjustedSalesValue: selectedSalesOrder.adjustedSalesValue || 0,
            adjustedSalesValueUsd:
                selectedSalesOrder.adjustedSalesValueUsd || 0,
            country: selectedSalesOrder.country || "",
            category: selectedSalesOrder.category || "",
            subCategory: selectedSalesOrder.subCategory || "",
        });
    }, [selectedSalesOrder, usdToInr]);

    async function onSubmit(values) {
        try {
            const currency = values.currency;
            const adjustedValue = parseFloat(values.adjustedSalesValue) || 0;
            const company = values.company;

            let usdValue, inrValue;
            if (currency === "INR") {
                inrValue = adjustedValue;
                usdValue = adjustedValue / (usdToInr || 1);
            } else {
                usdValue = adjustedValue;
                if (company === "CONSYST Middle East FZ-LLC") {
                    inrValue = adjustedValue * (settings?.usdToaed || 1);
                } else {
                    inrValue = adjustedValue * (usdToInr || 1);
                }
            }

            const dataToSave = {
                ...values,
                salesOrderName: selectedSalesOrderName,
                adjustedSalesValueLocal: inrValue.toFixed(2) || 0,
            };

            await axios.post(
                `${import.meta.env.VITE_CS365_URI}/api/billing/save-billing-plan`,
                dataToSave
            );
            fetchData();
            dispatch(setIsSaved(true));
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
        }
    }

    const handleSheetClose = (value) => {
        if (!value) {
            form.reset();
            dispatch(setSelectedBillingPlanName(""));
            dispatch(clearSelectedBillingPlan());
            dispatch(setIsSaved(false));
            setTabValue("billing-details");
        }
        dispatch(setIsOpen(value));
    };

    return (
        <Sheet open={isOpen} onOpenChange={handleSheetClose}>
            <SheetTrigger asChild>
                <Button className="bg-[var(--csred)] hover:bg-[var(--csred)]/90">
                    <Plus className="mr-2 h-4 w-4" /> Add Billing Plan
                </Button>
            </SheetTrigger>
            <SheetContent className="min-w-[800px] overflow-auto">
                <SheetHeader>
                    <SheetTitle className="text-2xl font-bold">Billing Plan</SheetTitle>
                    <ChooseBillingPlan />
                    <Tabs value={tabValue} onValueChange={setTabValue}>
                        <TabsList>
                            <TabsTrigger value="billing-details">
                                <SquareChartGantt className="mr-2 h-4 w-4" /> Sales Order Details
                            </TabsTrigger>
                            <TabsTrigger value="billing-plan">
                                <SquareChartGantt className="mr-2 h-4 w-4" /> Billing plan
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="billing-details">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="flex justify-between">
                                        <h1>Sales Order Info</h1>
                                        <Button
                                            className="bg-[var(--csblue)] hover:bg-[var(--csblue)]/90 px-8"
                                            type="submit"
                                        >
                                            Save
                                        </Button>
                                    </div>
                                    <div className="mt-4 grid w-full grid-cols-[1fr_2fr_1fr] gap-6">
                                        {/* All form fields — same as OrderBookingSheet */}

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
                                                                        !field.value &&
                                                                        "text-[var(--muted-foreground)]"
                                                                    )}
                                                                >
                                                                    {field.value &&
                                                                        !isNaN(new Date(field.value)) ? (
                                                                        format(new Date(field.value), "PPP")
                                                                    ) : (
                                                                        <span className="text-[var(--muted-foreground)]">
                                                                            Pick a date
                                                                        </span>
                                                                    )}
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
                                                <FormItem className="pointer-events-none">
                                                    <FormLabel>Adjustment</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            inputMode="decimal"
                                                            value={field.value}
                                                            onChange={(e) => {
                                                                const val = e.target.value;
                                                                if (
                                                                    val === "" ||
                                                                    val === "-" ||
                                                                    /^-?\d*(\.\d*)?$/.test(val)
                                                                ) {
                                                                    field.onChange(val);
                                                                    const num = parseFloat(val) || 0;
                                                                    const salesOrderValue =
                                                                        parseFloat(
                                                                            form.getValues("salesOrderValue")
                                                                        ) || 0;
                                                                    const currency = form.getValues("currency");

                                                                    const adjustedValue = salesOrderValue + num;
                                                                    form.setValue(
                                                                        "adjustedSalesValue",
                                                                        adjustedValue
                                                                    );

                                                                    let usdValue;
                                                                    if (currency === "INR") {
                                                                        usdValue =
                                                                            adjustedValue / (usdToInr || 1);
                                                                    } else {
                                                                        usdValue = adjustedValue;
                                                                    }
                                                                    form.setValue(
                                                                        "adjustedSalesValueUsd",
                                                                        usdValue
                                                                    );
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

                                        {/* Adjusted Sales Value (USD) */}
                                        <FormField
                                            control={form.control}
                                            name="adjustedSalesValueUsd"
                                            render={({ field }) => (
                                                <FormItem className="pointer-events-none">
                                                    <FormLabel>Adjusted Sales Value (USD)</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            value={
                                                                !isNaN(field.value)
                                                                    ? field.value.toLocaleString(undefined, {
                                                                        minimumFractionDigits: 2,
                                                                        maximumFractionDigits: 2,
                                                                    })
                                                                    : 0
                                                            }
                                                            readOnly
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Country */}
                                        <FormField
                                            control={form.control}
                                            name="country"
                                            render={({ field }) => (
                                                <FormItem className="pointer-events-none">
                                                    <FormLabel>Country</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div></div>
                                    </div>
                                </form>
                            </Form>
                        </TabsContent>
                        <TabsContent value="billing-plan">
                            <BillingPlanDetails billingPlanName={billingPlanName} />
                        </TabsContent>
                    </Tabs>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};

export default BillingPlanSheet;
