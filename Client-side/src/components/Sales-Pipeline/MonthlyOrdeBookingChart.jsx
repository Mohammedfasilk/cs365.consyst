import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Legend,
    Tooltip,
    Filler
} from 'chart.js';
import { Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Legend,
    Tooltip,
    Filler
);

// Get 12-month names starting from a given date (fiscal year start)
const getFiscalYearMonths = (startDate) => {
    const months = [];
    const baseDate = new Date(startDate);
    for (let i = 0; i < 12; i++) {
        const date = new Date(baseDate.getFullYear(), baseDate.getMonth() + i, 1);
        months.push(date.toLocaleString('default', { month: 'short' }));
    }
    return months;
};

export default function MonthlyOrderBookingChart() {
    const [chartData, setChartData] = useState({
        months: [],
        values: [],
        targets: []
    });
    const [loading, setLoading] = useState(true);
    const { settings } = useSelector((state) => state.settings);
    const targetValue = settings?.groupTarget || 0;
    const fyStartDate = settings?.currentFyStartDate ; // fallback default
    console.log("FY Start Date:", fyStartDate);
    

useEffect(() => {
    const fetchOrderData = async () => {
        try {
            setLoading(true);
            const fyStart = new Date(fyStartDate);
            const fyMonths = Array.from({ length: 12 }, (_, i) => {
                const date = new Date(fyStart.getFullYear(), fyStart.getMonth() + i, 1);
                return {
                    label: date.toLocaleString('default', { month: 'short' }),
                    key: `${date.getFullYear()}-${date.getMonth()}`, // Unique key like 2024-3
                    date,
                };
            });

            const monthlyTotals = fyMonths.reduce((acc, m) => {
                acc[m.key] = 0;
                return acc;
            }, {});

            const response = await axios.get(`${import.meta.env.VITE_CS365_URI}/api/orders`);
            const orders = response.data;

            orders.forEach(order => {
                if (order.salesOrderDate) {
                    const orderDate = new Date(order.salesOrderDate);
                    const key = `${orderDate.getFullYear()}-${orderDate.getMonth()}`;

                    if (monthlyTotals.hasOwnProperty(key)) {
                        monthlyTotals[key] += order.adjustedSalesValueUsd || 0;
                    }
                }
            });

            const valuesRaw = fyMonths.map(m => monthlyTotals[m.key]);
            const values = valuesRaw.reduce((acc, curr, i) => {
                acc.push((acc[i - 1] || 0) + curr);
                return acc;
            }, []);

            const monthlyTarget = targetValue / 12;
            const targets = fyMonths.map((_, index) => monthlyTarget * (index + 1));
            const months = fyMonths.map(m => m.label);

            setChartData({ months, values, targets });
        } catch (error) {
            console.error('Error fetching order data:', error);
        } finally {
            setLoading(false);
        }
    };

    fetchOrderData();
}, [targetValue, fyStartDate]);


    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height={100}>
                <CircularProgress />
            </Box>
        );
    }

    const data = {
        labels: chartData.months,
        datasets: [
            {
                label: 'Monthly Orders',
                data: chartData.values,
                borderColor: '#3f51b5',
                backgroundColor: 'rgba(63, 81, 181, 0.2)',
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6,
                cubicInterpolationMode: 'monotone'
            },
            {
                label: 'Target',
                data: chartData.targets,
                borderColor: '#ff5722',
                borderDash: [5, 5],
                pointRadius: 0,
                tension: 0,
                fill: false
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                backgroundColor: '#ffffff',
                titleColor: '#000000',
                bodyColor: '#000000',
                borderColor: '#dbdbdb',
                borderWidth: 1,
                cornerRadius: 8,
                titleFont: {
                    size: 14,
                    weight: 'bold',
                    family: 'Arial'
                },
                bodyFont: {
                    size: 13,
                    family: 'Arial'
                },
                padding: 12,
                displayColors: true,
                usePointStyle: true,
                callbacks: {
                    label: function (context) {
                        const label = context.dataset.label || '';
                        const value = context.parsed.y || 0;
                        return `${label}: ${value.toLocaleString()}`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true
                },
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true
                },
                grid: {
                    display: false
                }
            }
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    };

    return (
        <Box height={400}>
            <Line data={data} options={options} />
        </Box>
    );
}
