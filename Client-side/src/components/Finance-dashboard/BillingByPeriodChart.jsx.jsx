import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import { Card } from "../UI/Card";
import { Switch } from "../UI/Switch";
import { Label } from "../UI/Label";

export default function BillingByPeriodChart({ monthlydData = [], quarterlyData = [] }) {
  const [isChecked, setIsChecked] = useState(false);
  const [data, setData] = useState(monthlydData); // Set default to monthly
  console.log(quarterlyData);
  
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
      <div className="flex items-center p-2 ml-5 space-x-2">
        <span className="font-bold">Billing - This FY</span>
        <Switch
          onCheckedChange={(val) => setIsChecked(val)}
          checked={isChecked}
          className="ml-5"
        />
        <Label>Quarterly</Label>
      </div>
      <ApexCharts options={options} series={series} type="bar" height={350} />
    </Card>
  );
}
