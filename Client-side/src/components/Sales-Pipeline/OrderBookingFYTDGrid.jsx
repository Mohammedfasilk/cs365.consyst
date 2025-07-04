import React from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

export function OrderBookingFYTDGrid({ orderBookingData }) {

    const { settings } = useSelector((state) => state.settings);

    const cmef = {
        label: "Integrated Solution",
        value: orderBookingData.find(d => d.company === "CONSYST Middle East FZ-LLC")?.value || 0,
        target: settings?.cmefTarget || 0,
        categories: [
            "Automation Solution",
            "Turnkey C & I Solution",
            "OT Security Solutions",
            "Digitalization Solution"
        ]
    };
    const ctipl = {
        label: "Specialized Services",
        value: orderBookingData.find(d => d.company === "CONSYST Technologies (India) Pvt. Ltd.")?.value || 0,
        target: settings?.ctiplTarget || 0,
        categories: [
            "Automation Tech Services",
            "OT Security Services",
            "Digitalization Services"
        ]
    };
    const cdipl = {
        label: "Product/Service",
        value: orderBookingData.find(d => d.company === "CONSYST Digital Industries Pvt. Ltd")?.value || 0,
        target: settings?.cdiplTarget || 0,
        categories: [
            "iiotNext Platform",
            "iiotNext Micredge"
        ]
    };
    // Group value (integrated solution) split into three cards (one per company)
    const usdRates = {
        "CONSYST Digital Industries Pvt. Ltd": settings?.usdToinr || 0,
        "CONSYST Technologies (India) Pvt. Ltd.": settings?.usdToinr || 0,
        "CONSYST Middle East FZ-LLC": settings?.usdToaed || 0,
    };
    const groupCards = [
        {
            label: "Integrated Solution",
            value: (() => {
                const item = orderBookingData.find(d => d.company === "CONSYST Middle East FZ-LLC");
                const rate = usdRates["CONSYST Middle East FZ-LLC"];
                return item && rate ? item.value / rate : 0;
            })(),
            target: settings?.cmefTarget || 0,
        },
        {
            label: "Specialized Services",
            value: (() => {
                const item = orderBookingData.find(d => d.company === "CONSYST Technologies (India) Pvt. Ltd.");
                const rate = usdRates["CONSYST Technologies (India) Pvt. Ltd."];
                return item && rate ? item.value / rate : 0;
            })(),
            target: settings?.ctiplTarget || 0,
        },
        {
            label: "Product/Service",
            value: (() => {
                const item = orderBookingData.find(d => d.company === "CONSYST Digital Industries Pvt. Ltd");
                const rate = usdRates["CONSYST Digital Industries Pvt. Ltd"];
                return item && rate ? item.value / rate : 0;
            })(),
            target: settings?.cdiplTarget || 0,
        },
    ];

    // Assign a unique color for each donut
    const donutColors = {
        CMEF: "#3fa0f9",
        CTIPL: "#34c759",
        CDIPL: "#ff9500",
    };

    const chartOptions = (label) => ({
        chart: {
            type: "radialBar",
            sparkline: { enabled: true },
            height: '100%',
            width: '100%',
        },
        plotOptions: {
            radialBar: {
                startAngle: 0,
                endAngle: 360,
                track: {
                    background: "#e7e7e7",
                    strokeWidth: "97%",
                    margin: 5,
                },
                dataLabels: {
                    name: { show: false },
                    value: { offsetY: -2, fontSize: "22px" },
                },
            },
        },
        fill: { type: "solid", colors: [donutColors[label] || "#3fa0f9"] },
        labels: [label],
        grid: { padding: { top: -10 } },
    });

    return (
        <div className="w-full mt-8">
            <div className="flex flex-col md:flex-row gap-2 mb-8">
                <div className="flex flex-col gap-2 h-full justify-between md:w-1/4 w-full">
                    {groupCards.map((item) => (
                        <div key={item.label} className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center">
                            <span className="mb-2 text-sm font-semibold text-gray-700">{item.label}</span>
                            <span className="font-medium text-2xl text-[var(--csblue)]">
                                {item.value >= 1e6 ? (item.value / 1e6).toFixed(2) + 'M' : (item.value / 1e3).toFixed(2) + 'K'}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col md:flex-row gap-2 flex-1">
                    {[cmef, ctipl, cdipl].map((item) => {
                        // Dummy data for subcategory progress (random values for demo)
                        const subcategoryValues = item.categories.map(() => Math.floor(Math.random() * 100) + 1);
                        const subcategoryColors = ["#3fa0f9", "#34c759", "#ff9500", "#a259f7", "#f54291", "#f5a623", "#2dce98", "#ff6384"];
                        return (
                            <div key={item.label} className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center h-full flex-1">
                                <span className="mb-2 text-sm font-semibold text-gray-700">{item.label}</span>
                                <div className="w-full h-full flex items-center justify-center">
                                    <ReactApexChart
                                        options={{
                                            chart: {
                                                type: "donut",
                                                height: '100%',
                                                width: '100%',
                                            },
                                            labels: item.categories,
                                            colors: subcategoryColors.slice(0, item.categories.length),
                                            legend: {
                                                show: false
                                            },
                                            dataLabels: {
                                                enabled: false
                                            },
                                            tooltip: {
                                                y: {
                                                    formatter: function (val) {
                                                        return val + '%';
                                                    }
                                                }
                                            },
                                        }}
                                        series={subcategoryValues}
                                        type="donut"
                                        height={"100%"}
                                        width={"100%"}
                                    />
                                </div>
                                <div className="mt-2 text-xs text-gray-500">
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}