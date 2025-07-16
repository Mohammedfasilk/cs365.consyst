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
import { setSelectedBillingPlan, setSelectedBillingPlanName } from "../../Redux/Slices/BillingPlanSlice";
import { cn } from "../../lib/utils";

export function ChooseBillingPlan() {
  const dispatch = useDispatch();
  const selectedBillingPlan = useSelector((state) => state.billingPlanSheet.billingPlan);
  const billingPlanName = useSelector((state) => state.billingPlanSheet.billingPlanName);

  const [billingPlanList, setBillingPlanList] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBillingPlans = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_CS365_URI}/api/orders`
        );
        const plans = res.data.map((item, index) => ({
          id: index, // You can use item._id if available
          name: item.salesOrderName,
        }));
        setBillingPlanList(plans);
      } catch (err) {
        console.error("Error fetching billing plans:", err);
      }
    };

    fetchBillingPlans();
  }, []);

  const filteredPlans = billingPlanList.filter((plan) =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Popover open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <PopoverTrigger asChild>
        <div className="text-left text-2xl text-gray-400 cursor-pointer border-b-2 border-transparent hover:border-gray-200">
          { billingPlanName || "Choose Sales Order"}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[760px] p-0 max-h-[400px] overflow-y-auto">
        <Command>
          <CommandInput
            placeholder="Search with billing plan name"
            onValueChange={(value) => setSearchTerm(value)}
          />
          <CommandList>
            <CommandEmpty>No billing plan found.</CommandEmpty>
            <CommandGroup>
              {filteredPlans.map((plan) => (
                <CommandItem
                  key={plan.id}
                  value={plan.name}
                  onSelect={() => {
                    // dispatch(setSelectedBillingPlan(plan));
                    dispatch(setSelectedBillingPlanName(plan.name));                                        
                    setDropdownOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedBillingPlan?.name === plan.name
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {plan.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
