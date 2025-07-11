import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

const margin = { right: 24 };

const SERIES_CONFIG = [
    { key: 'monthly_orders', label: 'Monthly Orders', color: '#3f51b5' },
    { key: 'target', label: 'Target', color: '#ff5722', isDashed: true },
];

// Helper function to generate all months in a year
const getAllMonths = () => {
    return Array.from({ length: 12 }, (_, i) => 
        new Date(0, i).toLocaleString('default', { month: 'short' })
    );
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

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_CS365_URI}/api/orders`);
                const orders = response.data;
                
                // Initialize with all months
                const allMonths = getAllMonths();
                const monthlyTotals = allMonths.reduce((acc, month) => {
                    acc[month] = 0;
                    return acc;
                }, {});
                
                // Populate with actual order data
                orders.forEach(order => {
                    if (order.salesOrderDate) {
                        const month = new Date(order.salesOrderDate).toLocaleString('default', { month: 'short' });
                        monthlyTotals[month] = (monthlyTotals[month] || 0) + (order.adjustedSalesValueUsd || 0);
                    }
                });

                // Convert to arrays for chart
                const months = Object.keys(monthlyTotals);
                const values = Object.values(monthlyTotals);
                
                setChartData({
                    months,
                    values,
                    targets: Array(months.length).fill(targetValue)
                });
            } catch (error) {
                console.error('Error fetching order data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderData();
    }, [targetValue]);

    const series = SERIES_CONFIG.map((s) => ({
        curve: 'linear',
        data: s.key === 'monthly_orders' ? chartData.values : chartData.targets,
        label: s.label,
        id: s.key,
        color: s.color,
        showMark: s.key === 'monthly_orders',
        ...(s.isDashed && { dashStyle: '5 5' })
    }));

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height={300}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <LineChart
                height={400}
                series={series}
                xAxis={[{ 
                    scaleType: 'point', 
                    data: chartData.months,
                    label: 'Month'
                }]}
                yAxis={[{ 
                    width: 59,
                }]}
                margin={{ ...margin, top: 50, bottom: 70 }}
                slotProps={{
                    legend: {
                        direction: 'row',
                        position: { vertical: 'bottom', horizontal: 'middle' },
                        padding: 0,
                        labelStyle: {
                            fontSize: '0.8rem',
                        },
                    },
                }}
            />
        </Box>
    );
}