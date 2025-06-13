import { ResponsiveFunnel } from "@nivo/funnel";

export function CurrentOpportunityPipeline({ funnelData, funnelType }) {
  if (!funnelData || funnelData.length === 0) {
    return <div className="text-center text-sm text-gray-500">No data available.</div>;
  }

  return (

    <ResponsiveFunnel
      data={funnelData}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      valueFormat={
        funnelType === "sum"
          ? ">-.4s"
          : (value) => Math.round(value).toString()
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