import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { buttonVariants } from "./Button";

const MONTHS = [
  [
    { number: 0, name: "Jan" },
    { number: 1, name: "Feb" },
    { number: 2, name: "Mar" },
    { number: 3, name: "Apr" },
  ],
  [
    { number: 4, name: "May" },
    { number: 5, name: "Jun" },
    { number: 6, name: "Jul" },
    { number: 7, name: "Aug" },
  ],
  [
    { number: 8, name: "Sep" },
    { number: 9, name: "Oct" },
    { number: 10, name: "Nov" },
    { number: 11, name: "Dec" },
  ],
];

function MonthPicker({
  onMonthSelect,
  selectedMonth,
  minDate,
  maxDate,
  disabledDates,
  callbacks,
  onYearBackward,
  onYearForward,
  variant,
  className,
  ...props
}) {
  return (
    <div className={cn("min-w-[200px] w-[280px] p-3", className)} {...props}>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0">
        <div className="space-y-4 w-full">
          <MonthCal
            onMonthSelect={onMonthSelect}
            callbacks={callbacks}
            selectedMonth={selectedMonth}
            onYearBackward={onYearBackward}
            onYearForward={onYearForward}
            variant={variant}
            minDate={minDate}
            maxDate={maxDate}
            disabledDates={disabledDates}
          />
        </div>
      </div>
    </div>
  );
}

function MonthCal({
  selectedMonth,
  onMonthSelect,
  callbacks,
  variant,
  minDate,
  maxDate,
  disabledDates,
  onYearBackward,
  onYearForward,
}) {
  const today = new Date();
  const [year, setYear] = useState(selectedMonth?.getFullYear() ?? today.getFullYear());
  const [month, setMonth] = useState(selectedMonth?.getMonth() ?? today.getMonth());
  const [menuYear, setMenuYear] = useState(year);

  if (minDate && maxDate && minDate > maxDate) minDate = maxDate;

  const disabledDatesMapped = disabledDates?.map((d) => ({
    year: d.getFullYear(),
    month: d.getMonth(),
  }));

  return (
    <>
      <div className="flex justify-center pt-1 relative items-center">
        <div className="text-sm font-medium">
          {callbacks?.yearLabel ? callbacks.yearLabel(menuYear) : menuYear}
        </div>
        <div className="space-x-1 flex items-center">
          <button
            onClick={() => {
              setMenuYear(menuYear - 1);
              if (onYearBackward) onYearBackward();
            }}
            className={cn(
              buttonVariants({ variant: variant?.chevrons ?? "outline" }),
              "inline-flex items-center justify-center h-7 w-7 p-0 absolute left-1"
            )}
          >
            <ChevronLeft className="opacity-50 h-4 w-4" />
          </button>
          <button
            onClick={() => {
              setMenuYear(menuYear + 1);
              if (onYearForward) onYearForward();
            }}
            className={cn(
              buttonVariants({ variant: variant?.chevrons ?? "outline" }),
              "inline-flex items-center justify-center h-7 w-7 p-0 absolute right-1"
            )}
          >
            <ChevronRight className="opacity-50 h-4 w-4" />
          </button>
        </div>
      </div>

      <table className="w-full border-collapse space-y-1">
        <tbody>
          {MONTHS.map((monthRow, rowIndex) => (
            <tr key={`row-${rowIndex}`} className="flex w-full mt-2">
              {monthRow.map((m) => {
                const isDisabled =
                  (maxDate &&
                    (menuYear > maxDate.getFullYear() ||
                      (menuYear === maxDate.getFullYear() && m.number > maxDate.getMonth()))) ||
                  (minDate &&
                    (menuYear < minDate.getFullYear() ||
                      (menuYear === minDate.getFullYear() && m.number < minDate.getMonth()))) ||
                  (disabledDatesMapped?.some(
                    (d) => d.year === menuYear && d.month === m.number
                  ) ?? false);

                const isSelected = month === m.number && menuYear === year;

                return (
                  <td key={m.number} className="h-10 w-1/4 text-center text-sm p-0 relative">
                    <button
                      onClick={() => {
                        setMonth(m.number);
                        setYear(menuYear);
                        if (onMonthSelect) onMonthSelect(new Date(menuYear, m.number));
                      }}
                      disabled={isDisabled}
                      className={cn(
                        buttonVariants({
                          variant: isSelected
                            ? variant?.calendar?.selected ?? "default"
                            : variant?.calendar?.main ?? "ghost",
                        }),
                        "h-full w-full p-0 font-normal aria-selected:opacity-100"
                      )}
                    >
                      {callbacks?.monthLabel ? callbacks.monthLabel(m) : m.name}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

MonthPicker.displayName = "MonthPicker";

export { MonthPicker };
