
import { useEffect, useState } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import { Card } from "../UI/Card";
import { Switch } from "../UI/Switch";
import { Label } from "../UI/Label";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings } from "../../Redux/Slices/settingsSlice";

export function SalesOrderByPeriodGraph(props) {
  const { settings } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  // Get FY start date from settings or default to 2024-04-01
  // Always use settings?.currentFyStartDate for consistency
  const fyStartDate = settings?.currentFyStartDate;
  // Generate months for the FY, returning array of {iso, label}
  const generateFYMonthLabels = (fyStartDate) => {
    const months = [];
    const start = new Date(fyStartDate);
    let year = start.getFullYear();
    let month = start.getMonth();
    for (let i = 0; i < 12; i++) {
      const date = new Date(year, month, 1);
      months.push({
        iso: date.toISOString().split("T")[0],
        label: date.toLocaleString("en-US", { month: "short", year: "numeric" })
      });
      month++;
      if (month > 11) {
        month = 0;
        year++;
      }
    }
    return months;
  };
  const [dates, setDates] = useState(() => generateFYMonthLabels(fyStartDate));
  const [values, setValues] = useState(Array(12).fill(0));
  const [isQuarterly, setIsQuarterly] = useState(false);

  // Fetch settings if not loaded, and update months/data when settings change
  // Only fetch settings if not loaded
  // Fetch settings if not loaded, then fetch data when settings or isQuarterly changes
  useEffect(() => {
    if (!settings || Object.keys(settings).length === 0) {
      dispatch(fetchSettings());
    } else if (settings.currentFyStartDate) {
      fetchData(settings.currentFyStartDate);
    }
  }, [dispatch, settings]);


  // Helper to group values into quarters
  const groupToQuarters = (values) => [
    values.slice(0, 3).reduce((a, b) => a + b, 0),
    values.slice(3, 6).reduce((a, b) => a + b, 0),
    values.slice(6, 9).reduce((a, b) => a + b, 0),
    values.slice(9, 12).reduce((a, b) => a + b, 0),
  ];

  // Helper to get quarter labels for the FY
  const getQuarterLabels = (fyStartDate) => {
    const start = new Date(fyStartDate);
    const fyStartYear = start.getFullYear();
    const fyEndYear = start.getMonth() === 0 ? fyStartYear : fyStartYear + 1;
    const fyLabel = `${fyStartYear.toString().slice(-2)}-${fyEndYear.toString().slice(-2)}`;
    return [
      `Q1 ${fyLabel}`,
      `Q2 ${fyLabel}`,
      `Q3 ${fyLabel}`,
      `Q4 ${fyLabel}`,
    ];
  };

  const chartLabels = isQuarterly ? getQuarterLabels(fyStartDate) : dates.map(m => m.label);
  const chartValues = isQuarterly ? groupToQuarters(values) : values;

  const series = [
    {
      name: "Order Value",
      type: "column",
      data: chartValues,
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "line",
      stacked: false,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      width: [0, 2, 5],
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        columnWidth: "50px",
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        });
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100],
      },
    },
    labels: chartLabels,
    markers: {
      size: 0,
    },
    xaxis: {
      categories: chartLabels,
      labels: {
        formatter: function (value) {
          return value;
        },
      },
    },
    yaxis: {
      title: {
        text: "Value (USD)",
      },
      labels: {
        formatter: function (value) {
          return value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
          });
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
            });
          }
          return y;
        },
      },
    },
  };

  // Align API data to months array
  const alignValuesToMonths = (months, apiData) => {
    if (typeof apiData === 'object' && apiData !== null && !Array.isArray(apiData)) {
      return months.map(m => apiData[m.iso] ?? 0);
    }
    // If array, assume order matches months
    return months.map((m, i) => apiData[i] ?? 0);
  };

  // Fetch data from API and align to months
async function fetchData(fyDate) {
  try {
    const endpoint = "/api/orders";
    const response = await axios.get(`${import.meta.env.VITE_CS365_URI}${endpoint}`);
    const data = response.data;

    // Generate FY months
    const monthsArr = generateFYMonthLabels(fyDate);

    // Group and sum adjustedSalesValueUsd by month
    const monthlyMap = {};

    data.forEach((order) => {
      const orderDate = new Date(order.salesOrderDate);
      const monthKey = new Date(orderDate.getFullYear(), orderDate.getMonth(), 1).toISOString().split("T")[0];
      console.log("Month key:", monthKey);

      if (!monthlyMap[monthKey]) {
        monthlyMap[monthKey] = 0;
      }
      monthlyMap[monthKey] += order.adjustedSalesValueUsd || 0;
    });

    // Align values to months array
    const aligned = monthsArr.map((m) => monthlyMap[m.iso] ?? 0);
    console.log("Aligned values:", aligned);
    
    setDates(monthsArr);
    setValues(aligned);
  } catch (error) {
    console.error("Failed to fetch sales order data:", error);
    setValues(Array(12).fill(0));
  }
}

  // Switch handler only sets state
  const handleSwitch = setIsQuarterly;
// (Removed duplicate useEffect)
  return (
    <Card className="w-full bg-white">
      <div className="flex items-center m-4 mb-6 gap-4">
        <div>
          <p className="font-medium">Order Booking - This FY</p>
        </div>
        <div className="flex items-center space-x-2">
          <Switch onCheckedChange={handleSwitch} checked={isQuarterly} id="is-quarterly" />
          <Label htmlFor="is-quarterly">Quarterly</Label>
        </div>
      </div>

      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </div>
    </Card>
  );
}
