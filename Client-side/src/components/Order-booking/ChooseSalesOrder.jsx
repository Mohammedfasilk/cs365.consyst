import { useEffect, useState } from "react";
import axios from "axios";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../UI/Command";
import { Popover, PopoverContent, PopoverTrigger } from "../UI/Popover";
import { Check } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { setSelectedSalesOrder, setSelectedSalesOrderName } from "../../Redux/Slices/orderBookingSlice";
import { cn } from "../../lib/utils";


export function ChooseSalesOrder({ sales_order_name }) {
    const dispatch = useDispatch();
    const selectedSalesOrderName = useSelector((state) => state.selectedSalesOrder.salesOrderName);
    const selectedSalesOrder = useSelector((state) => state.selectedSalesOrder.salesOrder);
    const [salesOrderList, setSalesOrderList] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [search, setSearch] = useState({ search: "" });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post(
                    `${import.meta.env.VITE_CS365_URI}/api/orders/list`,
                    search
                );
                const data = await res.data;
                setSalesOrderList(data);
            } catch (error) {
                console.error("Error fetching Sales Order List:", error);
            }
        };
        fetchData();
    }, [search]);

    return (
        <Popover open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <PopoverTrigger asChild>
                <div className="text-left text-2xl text-gray-400 cursor-pointer border-b-2 border-transparent hover:border-gray-200">
                    {selectedSalesOrderName || "Choose Sales Order"}
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[760px] p-0 max-h-[400px] overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain' }}>
                <Command>
                    <CommandInput
                        placeholder="Search with sales order name"
                        onValueChange={(value) => {
                            setSearch({ search: value });
                        }}
                    />
                    <CommandList>
                        <CommandEmpty>No sales order found.</CommandEmpty>
                        <CommandGroup>
                            {salesOrderList.map((order) => (
                                <CommandItem
                                    key={order._id}
                                    value={order.name}
                                    onSelect={() => {
                                        dispatch(setSelectedSalesOrder({ order, source: "dropdown" }));
                                        dispatch(setSelectedSalesOrderName(order.name));
                                        setDropdownOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedSalesOrder?.name === order.name
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {order.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
