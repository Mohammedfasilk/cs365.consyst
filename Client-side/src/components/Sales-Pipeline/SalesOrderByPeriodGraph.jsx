import { useEffect, useState } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import { Card } from "../UI/Card";
import { Switch } from "../UI/Switch";
import { Label } from "../UI/Label";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings } from "../../Redux/Slices/settingsSlice";

export function SalesOrderByPeriodGraph(props) {
  const [values, setValues] = useState(props.values);
  const [dates, setDates] = useState(props.dates);
  const { settings } = useSelector((state) => state.settings)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!settings || Object.keys(settings).length == 0) {
      dispatch(fetchSettings())
    }
  }, [dispatch, settings])



  const series = [
    {
      name: "Order Value",
      type: "column",
      data: values,
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
        columnWidth: "50%",
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
    labels: dates,
    markers: {
      size: 0,
    },
    xaxis: {
      type: "datetime",
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

  const handleSwitch = async (isSwitchedOn) => {
    if (isSwitchedOn) {
      const fyDate = settings?.currentFyStartDate;
      const usd = settings?.usdToinr;
      const aed = settings?.usdToaed;
      const response = await axios.post(
        `${import.meta.env.VITE_CS365_URI}/api/sales-analysis/order-booking`,
        { fyDate, usd, aed }
      );
      const data = response.data;

      setValues(data.valueList);
      setDates(data.dateList);
    } else {
      const fyDate = settings?.currentFyStartDate;
      const usd = settings?.usdToinr;
      const aed = settings?.usdToaed;
      const response = await axios.post(`${import.meta.env.VITE_CS365_URI}/api/sales-analysis/order-booking-monthly`, {
        fyDate,
        usd,
        aed,
      });
      const data = response.data;

      setValues(data.valueList);
      setDates(data.dateList);
    }
  };
  useEffect(()=>{
    handleSwitch();
  },[])

  return (
    <Card className="w-full">
      <div className="flex items-center m-4 mb-6 gap-4">
        <div>
          <p className="font-medium">Order Booking - This FY</p>
        </div>
        <div className="flex items-center space-x-2">
          <Switch onCheckedChange={handleSwitch} id="is-quarterly" />
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
