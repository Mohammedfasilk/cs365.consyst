import React, { useMemo, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Switch } from "../UI/Switch";

export default function DonutChart({
  countrySummaryData = [],
  isBill,
  isChecked,
  setIsChecked,
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const countryLabels = countrySummaryData.map((c) => c.country);
  const countryValues = countrySummaryData.map((c) => c.total);

  const countryColors = [
    "#3fa0f9",
    "#34c759",
    "#ff9500",
    "#a259f7",
    "#f54291",
    "#f5a623",
    "#2dce98",
    "#ff6384",
    "#00bcd4",
    "#673ab7",
    "#e91e63",
    "#9c27b0",
  ];

  const hasData =
    countryValues.length > 0 && !countryValues.every((val) => val === 0);

  const series = hasData ? countryValues : [100];

  const options = useMemo(
    () => ({
      chart: {
        type: "donut",
        events: {
          dataPointMouseEnter: (event, chartContext, config) => {
            setHoveredIndex(config.dataPointIndex);
          },
          dataPointMouseLeave: () => {
            setHoveredIndex(null);
          },
        },
      },
      labels: hasData ? countryLabels : ["No Data"],
      colors: hasData
        ? countryColors.slice(0, countryLabels.length)
        : ["#e0e0e0"],
      legend: { show: false },
      dataLabels: { enabled: false },
      tooltip: hasData
        ? {
            y: {
              formatter: (val) =>
                val.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                }),
            },
          }
        : { enabled: false },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: false, // Disable built-in center labels
            },
          },
        },
      },
    }),
    [countryLabels, countryValues, hasData]
  );

  const total = useMemo(() => series.reduce((a, b) => a + b, 0), [series]);

  const hoveredPercent =
    hoveredIndex !== null && total > 0
      ? ((series[hoveredIndex] / total) * 100).toFixed(2)
      : "";

  return (
    <div className="w-full h-full">
      <div className="bg-white rounded-lg shadow p-4 flex flex-col justify-center h-full w-full">
        <div className="flex justify-between">
          <span className="mb-2 text-gray-700">
            {isBill
              ? "Billing by Country - This FY"
              : "Order Booking by Country (Total)"}
          </span>
          {isBill && (
            <div className="flex items-center mb-2">
              <Switch checked={isChecked} onCheckedChange={setIsChecked} />
            </div>
          )}
        </div>

        <div className="w-full h-[250px] flex items-center justify-center relative">
          <ReactApexChart
            key={isChecked ? "invoiced" : "all"}
            options={options}
            series={series}
            type="donut"
            height="100%"
            width="100%"
          />

          {hoveredPercent && (
            <div className="absolute text-center font-medium text-gray-700">
              {hoveredPercent}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
