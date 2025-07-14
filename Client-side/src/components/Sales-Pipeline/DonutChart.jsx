import React from "react";
import ReactApexChart from "react-apexcharts";

export default function DonutChart({ countrySummaryData = [] }) {
  const countryLabels = countrySummaryData.map((c) => c.country);
  const countryValues = countrySummaryData.map((c) => c.total);

  const countryColors = [
    "#3fa0f9", "#34c759", "#ff9500", "#a259f7",
    "#f54291", "#f5a623", "#2dce98", "#ff6384",
    "#00bcd4", "#673ab7", "#e91e63", "#9c27b0",
  ];

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center h-full w-full">
        <span className="mb-2 text-sm font-semibold text-gray-700">
          Order Booking by Country (Total)
        </span>
        <div className="w-full h-full flex items-center justify-center">
          {countryValues.length === 0 || countryValues.every((val) => val === 0) ? (
            <ReactApexChart
              options={{
                chart: { type: "donut" },
                labels: ["No Data"],
                colors: ["#e0e0e0"],
                legend: { show: false },
                dataLabels: { enabled: false },
                tooltip: { enabled: false },
              }}
              series={[100]}
              type="donut"
              height="300"
              width="100%"
            />
          ) : (
            <ReactApexChart
              options={{
                chart: { type: "donut" },
                labels: countryLabels,
                colors: countryColors.slice(0, countryLabels.length),
                legend: {
                  position: "bottom",
                  fontSize: "12px",
                  labels: { colors: "#333" },
                },
                dataLabels: {
                  enabled: true,
                  formatter: (val) => `${val.toFixed(1)}%`,
                },
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
              }}
              series={countryValues}
              type="donut"
              height="300"
              width="100%"
            />
          )}
        </div>
      </div>
    </div>
  );
}
