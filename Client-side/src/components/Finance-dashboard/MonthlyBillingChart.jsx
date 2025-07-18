import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";
import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler
);

export default function MonthlyBillingChart() {
  const [chartData, setChartData] = useState({
    months: [],
    values: [],
    targets: [],
  });
  const [loading, setLoading] = useState(true);
  const { settings } = useSelector((state) => state.settings);
  const targetValue = settings?.billingTarget || 0;
  const fyStartDate = settings?.currentFyStartDate; // fallback default

  useEffect(() => {
    const fetchBillingData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_CS365_URI}/api/finance/monthly-billing`,
          {
            financialYear: fyStartDate,
          }
        );

        const summary = response.data;

        const months = summary.map((item) => item.month);
        const values = summary.map((item) => item.billingPlansTotalUSD);
        const quarterlyTarget = targetValue / 4;
        const targets = months.map((_, index) => {
          if (index < 3) return quarterlyTarget * 1; 
          if (index < 6) return quarterlyTarget * 2; 
          if (index < 9) return quarterlyTarget * 3; 
          return quarterlyTarget * 4; 
        });
        setChartData({ months, values, targets });
      } catch (error) {
        console.error("Error fetching Billing data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBillingData();
  }, [targetValue, fyStartDate]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={100}
      >
        <CircularProgress />
      </Box>
    );
  }

  const data = {
    labels: chartData.months,
    datasets: [
      {
        label: "Billing",
        data: chartData.values,
        borderColor: "#3f51b5",
        backgroundColor: "rgba(63, 81, 181, 0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        cubicInterpolationMode: "monotone",
      },
      {
        label: "Target",
        data: chartData.targets,
        borderColor: "#ff5722",
        borderDash: [5, 5],
        pointRadius: 0,
        tension: 0,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "#ffffff",
        titleColor: "#000000",
        bodyColor: "#000000",
        borderColor: "#dbdbdb",
        borderWidth: 1,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: "bold",
          family: "Arial",
        },
        bodyFont: {
          size: 13,
          family: "Arial",
        },
        padding: 12,
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.parsed.y || 0;
            return `${label}: ${value.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
        },
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };

  return (
    <Box height={400}>
      <Line data={data} options={options} />
    </Box>
  );
}
