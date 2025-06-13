import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "./Button";
import { cn } from "../../lib/utils";
import { MonthPicker } from "./MonthPicker";

export function MonthPickerComponent() {
  const [date, setDate] = useState(null);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-[var(--muted-foreground)]"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "MMM yyyy") : <span>Pick a month</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <MonthPicker
          onMonthSelect={(newDate) => setDate(newDate)}
          selectedMonth={date}
          variant={{ chevrons: "ghost" }}
        />
      </PopoverContent>
    </Popover>
  );
}