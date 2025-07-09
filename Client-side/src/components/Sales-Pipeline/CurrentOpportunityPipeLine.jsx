import { ResponsiveFunnel } from "@nivo/funnel";
import { useSelector } from "react-redux";

export function CurrentOpportunityPipeline({ funnelData, funnelType, isUsd }) {
  const { settings } = useSelector((state) => state.settings);

  // Global USD conversion
  const convertToUSD = (value) => {
    const rate = settings?.usdToinr || 1;
    return value / rate;
  };
  // Format number with K/M/B and currency
  const formatNumber = (val, currency) => {
    const abs = Math.abs(val);
    if (abs >= 1e9) return `${currency} ${(val / 1e9).toFixed(2)}B`;
    if (abs >= 1e6) return `${currency} ${(val / 1e6).toFixed(2)}M`;
    if (abs >= 1e3) return `${currency} ${(val / 1e3).toFixed(2)}K`;
    return `${currency} ${val.toFixed(2)}`;
  };

  if (!funnelData || funnelData.length === 0) {
    return <div className="text-center text-sm text-gray-500">No data available.</div>;
  }

  const convertedData = funnelData.map((item) => ({
    ...item,
    value: isUsd ? convertToUSD(item.value) : item.value,
  }));

  return (
    <ResponsiveFunnel
      data={convertedData}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      valueFormat={(val) =>
        funnelType === "sum"
          ? formatNumber(val, isUsd ? "" : "")
          : Math.round(val).toString()
      }
      colors={{ scheme: "tableau10" }}
      borderWidth={10}
      labelColor={{
        from: "color",
        modifiers: [["darker", 3]],
      }}
      beforeSeparatorLength={50}
      beforeSeparatorOffset={0}
      afterSeparatorLength={50}
      afterSeparatorOffset={0}
      currentPartSizeExtension={10}
      currentBorderWidth={20}
      motionConfig="wobbly"
      enableBeforeSeparators={false}
      enableAfterSeparators={false}
    />
  );
}
