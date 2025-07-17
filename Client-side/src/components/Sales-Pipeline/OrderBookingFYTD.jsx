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

const OrderBookingFYTD = ({ company, usdValue, localValue, isGroup , isBill }) => {
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.settings);
  const [displayValue, setDisplayValue] = useState(usdValue);
  const [series, setSeries] = useState([0]);
  const [isUsd, setIsUsd] = useState(false);
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    if (!settings || Object.keys(settings).length === 0) {
      dispatch(fetchSettings());
    }
  }, [dispatch, settings]);

  useEffect(() => {
    // Calculate percentage for radial chart
    const getPercent = () => {
      let percent = 0;
      const targetValue = isGroup ? usdValue : (isUsd ? usdValue : localValue);
      
      switch (company) {
        case "CONSYST Digital Industries Pvt. Ltd":
          percent = (targetValue / settings?.cdiplTarget || 0) * 100;
          break;
        case "CONSYST Technologies (India) Pvt. Ltd.":
          percent = (targetValue / settings?.ctiplTarget || 0) * 100;
          break;
        case "CONSYST Middle East FZ-LLC":
          percent = (targetValue / settings?.cmefTarget || 0) * 100;
          break;
        case "Consyst Group":
          // Always use USD value and group target for Consyst Group
          isBill ? percent = (usdValue / settings?.billingTarget || 0) * 100 : percent = (usdValue / settings?.groupTarget || 0) * 100;
          break;
        default:
          percent = 0;
      }
      setSeries([Number(percent.toFixed(2))]);
    };

    getPercent();

    // Set initial display value and currency
    if (isGroup) {
      // Always show USD for Consyst Group
      setDisplayValue(usdValue);
      setCurrency("USD");
    } else if (isUsd) {
      setDisplayValue(usdValue);
      setCurrency("USD");
    } else {
      setDisplayValue(localValue);
      setCurrency(company === "CONSYST Middle East FZ-LLC" ? "AED" : "INR");
    }
  }, [company, usdValue, localValue, settings, isUsd, isGroup]);

  const handleUSDConvertion = (checked) => {
    setIsUsd(checked);
    if (checked) {
      setDisplayValue(usdValue);
      setCurrency("USD");
    } else {
      setDisplayValue(localValue);
      setCurrency(company === "CONSYST Middle East FZ-LLC" ? "AED" : "INR");
    }
  };

  const formatValue = (val) => {
    return val >= 1e6
      ? `${currency} ${(val / 1e6).toFixed(2)}M`
      : `${currency} ${(val / 1e3).toFixed(2)}K`;
  };

  const hideChartCompanies = [
    "CONSYST Digital Industries Pvt. Ltd",
    "CONSYST Technologies (India) Pvt. Ltd.",
    "CONSYST Middle East FZ-LLC",
  ];

  const isSimpleCard = !isGroup 

  return (
    <Card className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center h-full w-full">
      <div className="flex justify-between items-start w-full">
        <div>
          <p className="mb-1 text-sm font-semibold text-gray-700">
            {isGroup
              ? isBill ?  "Consolidated Billing - This FY":"Consolidated Order Booking - This FY"
              : isBill ? "Billing - This FY" : "Order Booking - This FY"}
          </p>
          <p className="mb-4 text-xs text-gray-500">{company}</p>
        </div>
        {!isGroup && company !== "Consyst Group" && (
          <div className="flex items-center space-x-2">
            <Switch
              onCheckedChange={handleUSDConvertion}
              id="is-usd"
              checked={isUsd}
            />
            <Label htmlFor="is-usd">USD</Label>
          </div>
        )}
      </div>

      {!isSimpleCard && (
        <div className="flex-1 w-full h-full flex items-center justify-center">
          <ReactApexChart
            options={options}
            series={series}
            type="radialBar"
            // height={"100%"}
            // width={"100%"}
          />
        </div>
      )}

      <p className="text-center font-medium text-xl text-[var(--csblue)]">
        {formatValue(displayValue)}
      </p>
    </Card>
  );
};

export default OrderBookingFYTD;