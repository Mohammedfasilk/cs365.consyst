import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Label } from "../UI/Label";
import { Switch } from "../UI/Switch";
import { Card } from "../UI/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings } from "../../Redux/Slices/settingsSlice";

const options = {
  chart: {
    type: "radialBar",
    offsetY: -20,
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      track: {
        background: "#e7e7e7",
        strokeWidth: "97%",
        margin: 5,
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          offsetY: -2,
          fontSize: "28px",
        },
      },
    },
  },
  grid: {
    padding: {
      top: -10,
    },
  },
  fill: {
    type: "solid",
    colors: ["#3fa0f9"],
  },
  labels: ["Average Results"],
};

const OrderBookingFYTD = ({ company, value: initialValue, isGroup }) => {

  const dispatch = useDispatch()
  const { settings } = useSelector((state) => state.settings)

  useEffect(() => {
    if (!settings || Object.keys(settings).length == 0) {
      dispatch(fetchSettings())
    }
  }, [dispatch, settings])


  const [value, setValue] = useState(initialValue);
  const [series, setSeries] = useState([0]);
  const [isUsd, setIsUsd] = useState(false);

  const getPercent = (companyName) => {
    let percent = 0;

    switch (companyName) {
      case "CONSYST Digital Industries Pvt. Ltd":
        percent = (initialValue / settings?.cdiplTarget || 0) * 100;
        break;
      case "CONSYST Technologies (India) Pvt. Ltd.":
        percent = (initialValue / settings?.ctiplTarget || 0) * 100;
        break;
      case "CONSYST Middle East FZ-LLC":
        percent = (initialValue / settings?.cmefTarget || 0) * 100;
        break;
      case "Consyst Group":
        percent = (initialValue / settings?.groupTarget || 0) * 100;
        break;
      default:
        percent = 0;
    }

    setSeries([Number(percent.toFixed(2))]);
  };

  useEffect(() => {
    getPercent(company);
  }, [company, initialValue]);

  useEffect(() => {
    if (company === "CONSYST Middle East FZ-LLC") {
      const converted = initialValue / settings?.usdToaed || 0;
      setValue(converted);
      setIsUsd(true);
    }
  }, []);

  const formatValue = (val) => {
    const currency = isUsd
      ? "USD"
      : company === "CONSYST Middle East FZ-LLC"
        ? "AED"
        : "INR";

    return val >= 1e6
      ? `${currency} ${(val / 1e6).toFixed(3)}M`
      : `${currency} ${(val / 1e3).toFixed(3)}K`;
  };

  const handleUSDConvertion = (checked) => {
    setIsUsd(checked);

    if (checked) {
      const rate =
        company === "CONSYST Middle East FZ-LLC"
          ? settings?.usdToaed || 1
          : settings?.usdToinr || 1;
      setValue(initialValue / rate);
    } else {
      setValue(initialValue);
    }
  };

  return !isGroup ? (
    <Card className="flex-1 p-4 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div>

          <p className="mb-2 font-medium">Order Booking - This FY</p>
          <p className="mb-6 text-sm">{company}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            onCheckedChange={handleUSDConvertion}
            id="is-usd"
            defaultChecked={company === "CONSYST Middle East FZ-LLC"}
          />
          <Label htmlFor="is-usd">USD</Label>
        </div>
      </div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="radialBar" />
      </div>
      <p className="text-center font-medium text-2xl mt-4 text-csblue">
        {formatValue(value)}
      </p>
    </Card>
  ) : (
    <Card className="flex-1 p-4 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div>
          <p className="mb-2 font-medium">Consolidated Order Booking - This FY</p>
          <p className="mb-6 text-sm">{company}</p>
        </div>
      </div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="radialBar" />
      </div>
      <p className="text-center font-medium text-2xl mt-4 text-csblue">
        {`USD ${initialValue >= 1e6
            ? (initialValue / 1e6).toFixed(3) + "M"
            : (initialValue / 1e3).toFixed(3) + "K"
          }`}
      </p>
    </Card>
  );
};

export default OrderBookingFYTD;
