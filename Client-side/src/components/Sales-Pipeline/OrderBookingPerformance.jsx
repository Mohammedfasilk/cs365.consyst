import React from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

export default function OrderBookingFYTDGrid({ orderBookingData, orderSummaryData }) {

    const { settings } = useSelector((state) => state.settings);

    const getCategoryValue = (label) => {
        const match = orderSummaryData.find((d) => d.category === label);
        return match?.total || 0;
    };

    const IS = {
        label: "Integrated Solution",
        value: getCategoryValue("Integrated Solution"),
        categories: [
            "Automation Solution",
            "Turnkey C & I Solution",
            "OT Security Solutions",
            "Digitalization Solution"
        ]
    };

    const SS = {
        label: "Specialized Services",
        value: getCategoryValue("Specialized Services"),
        categories: [
            "Automation Tech Services",
            "OT Security Services",
            "Digitalization Services"
        ]
    };

    const PP = {
        label: "Product/Service",
        value: getCategoryValue("Product/Service"),
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
            value: getCategoryValue("Integrated Solution"),
        },
        {
            label: "Specialized Services",
            value: getCategoryValue("Specialized Services"),
        },
        {
            label: "Product/Service",
            value: getCategoryValue("Product/Service"),
        },
    ];

    const donutColors = {
        PP: "#3fa0f9",
        IS: "#34c759",
        SS: "#ff9500",
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
        <div className="w-full mt-6">
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
                    {[IS, SS, PP].map((item) => {
                        const subcategoryValues = (() => {
                            const category = orderSummaryData.find((cat) => cat.category === item.label);
                            if (!category) return item.categories.map(() => 0);

                            return item.categories.map((sub) => {
                                const subItem = category.subCategories.find((s) => s.subCategory === sub);
                                return subItem?.percentage || 0;
                            });
                        })();
                        const subcategoryColors = ["#3fa0f9", "#34c759", "#ff9500", "#a259f7", "#f54291", "#f5a623", "#2dce98", "#ff6384"];
                        return (
                            <div key={item.label} className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center h-full flex-1">
                                <span className="mb-2 text-sm font-semibold text-gray-700">{item.label}</span>
                                <div className="w-full h-full flex items-center justify-center">
                                    {
                                        subcategoryValues.every((val) => val === 0) ? (
                                            <ReactApexChart
                                                options={{
                                                    chart: {
                                                        type: "donut",
                                                        height: '100%',
                                                        width: '100%',
                                                    },
                                                    labels: ["No Data"],
                                                    colors: ["#e0e0e0"],
                                                    legend: { show: false },
                                                    dataLabels: { enabled: false },
                                                    tooltip: { enabled: false },
                                                }}
                                                series={[100]}
                                                type="donut"
                                                height={"100%"}
                                                width={"100%"}
                                            />
                                        ) : (
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
                                        )
                                    }
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