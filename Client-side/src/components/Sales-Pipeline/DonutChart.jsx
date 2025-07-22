import React from "react";
import ReactApexChart from "react-apexcharts";

export default function DonutChart({ countrySummaryData = [] ,isBill }) {
  const countryLabels = countrySummaryData.map((c) => c.country);
  const countryValues = countrySummaryData.map((c) => c.total);

  const countryColors = [
    "#3fa0f9", "#34c759", "#ff9500", "#a259f7",
    "#f54291", "#f5a623", "#2dce98", "#ff6384",
    "#00bcd4", "#673ab7", "#e91e63", "#9c27b0",
  ];

  return (
    <div className="w-full h-full">
      <div className="bg-white rounded-lg shadow p-4 flex flex-col justify-center h-full w-full">
        <span className="mb-2 text-gray-700">
         {isBill ? 'Billing by Country (Total)' : ' Order Booking by Country (Total)'}
        </span>
        <div className="w-full h-[250px] flex items-center justify-center">
          {countryValues.length === 0 || countryValues.every((val) => val === 0) ? (
            <ReactApexChart
              options={{
                chart: { type: "donut" },
                labels: ["No Data"],
                colors: ["#e0e0e0"],
                legend: { show: false },
                dataLabels: { enabled: false },
                tooltip: { enabled: false },
                plotOptions: {
                  donut: {
                    labels: {
                      show: false
                    }
                  }
                }
              }}
              series={[100]}
              type="donut"
              height="100%" 
              width="100%"
            />
          ) : (
            <ReactApexChart
  options={{
    chart: { type: "donut" },
    labels: countryLabels,
    colors: countryColors.slice(0, countryLabels.length),
    legend: { show: false },
    dataLabels: { enabled: false },
    tooltip: {
      y: {
        formatter: (val) =>
          val.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
          }),
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
            },
            value: {
              show: true,
              formatter: function (val) {
                return `${parseFloat(val).toLocaleString()} USD`;
              },
            },
            total: {
              show: true,
              formatter: function (w) {
                const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                const hovered = w.globals.series[w.globals.seriesIndex];
                if (!hovered || total === 0) return "0%";
                const percentage = ((hovered / total) * 100).toFixed(1);
                return `${percentage}%`;
              },
            },
          },
        },
      },
    },
  }}
  series={countryValues}
  type="donut"
  height="100%"
  width="100%"
/>
          )}
        </div>
      </div>
    </div>
  );
}