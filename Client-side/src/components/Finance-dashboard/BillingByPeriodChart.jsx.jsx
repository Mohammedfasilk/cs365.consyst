import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import { Card } from "../UI/Card";
import { Switch } from "../UI/Switch";
import { Label } from "../UI/Label";
import { Popover, PopoverContent, PopoverTrigger } from "../UI/Popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "../UI/Button";
import { Calendar } from "../UI/Calender";
import { cn } from "../../lib/utils";
import { format } from "date-fns";

export default function BillingByPeriodChart({
  monthlydData = [],
  quarterlyData = [],
  date,
  setDate,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [data, setData] = useState(monthlydData); // Set default to monthly

  // Update data when toggle changes
  useEffect(() => {
    setData(isChecked ? quarterlyData : monthlydData);
  }, [isChecked, monthlydData, quarterlyData]);

  const periods = data.map((item) => item.month || item.quarter);
  const invoiced = data.map((item) => item.billed);
  const pending = data.map((item) => item.nonBilled);

  const series = [
    {
      name: "Invoiced",
      data: invoiced,
    },
    {
      name: "Pending",
      data: pending,
    },
  ];

  const options = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadius: 4,
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: periods,
      title: { text: isChecked ? "Quarter" : "Month" },
    },
    yaxis: {
      title: { text: "Amount (USD)" },
      labels: {
        formatter: (val) => `$${val.toLocaleString()}`,
      },
    },
    legend: {
      position: "bottom",
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (val) => `$${val.toLocaleString()}`,
        title: {
          formatter: (seriesName) => `${seriesName}:`,
        },
      },
    },
    fill: { opacity: 1 },
    colors: ["#3f51b5", "#ff9800"],
  };

  return (
    <Card className="w-full p-5 bg-white">
      <div className="flex items-center justify-between p-2 ml-5 space-x-2">
        <div className="flex items-center space-x-2">
          <span className="">Billing By FY</span>
          <Switch
            onCheckedChange={(val) => setIsChecked(val)}
            checked={isChecked}
            className="ml-5"
          />
          <Label>Quarterly</Label>
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                {date ? format(date, "PPP") : "Pick a date"}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(val) => {
                  if (val) {
                    const normalizedDate = new Date(
                      Date.UTC(val.getFullYear(), val.getMonth(), val.getDate())
                    );
                    setDate(normalizedDate);
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <ApexCharts options={options} series={series} type="bar" height={350} />
    </Card>
  );
}
