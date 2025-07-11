const OrderBooking = require('../Models/OrderBookingModel');
const axios = require("axios");

// Fetch sales order list (with search)
exports.fetchSalesOrderList = async (req, res) => {
    try {
        const searchQuery = req.body.search || "";
        const filters = JSON.stringify([
            ["name", "like", `%${searchQuery}%`],
        ]);
        const response = await axios.get(
            `${process.env.ERPNEXT_BASE_URL}/api/resource/Sales Order?fields=["name", "title"]&filters=${encodeURIComponent(filters)}&limit=20`,
            {
                headers: {
                    Authorization: `token ${process.env.ERPNEXT_API_KEY}:${process.env.ERPNEXT_API_SECRET}`,
                },
            }
        );
        const salesOrders = response.data.data;
        res.status(200).json(salesOrders);
    } catch (error) {
        console.error("Error fetching Sales Order List:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve Sales Orders.",
            error: error.message,
        });
    }
};

// Fetch sales order details by name
exports.fetchSalesOrderByName = async (req, res) => {
    try {
        const { name } = req.body;
        const filters = encodeURIComponent(`[ ["name", "=", "${name}"] ]`);
        const response = await axios.get(
            `${process.env.ERPNEXT_BASE_URL}/api/resource/Sales Order/${name}?filters=${filters}`,
            {
                headers: {
                    Authorization: `token ${process.env.ERPNEXT_API_KEY}:${process.env.ERPNEXT_API_SECRET}`,
                },
            }
        );
        const salesOrder = response.data.data || null;
        res.status(200).json(salesOrder);
    } catch (error) {
        console.error("Error fetching Sales Order by name:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve Sales Order.",
            error: error.message,
        });
    }
};

// Create or update an order booking
exports.saveOrder = async (req, res) => {
    try {
        const data = req.body;
        const filter = {
            salesOrderName: data.salesOrderName,
            category: data.category,
            subCategory: data.subCategory
        };
        const options = { new: true, upsert: true };
        const result = await OrderBooking.findOneAndUpdate(filter, data, options);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save Order Booking' });
    }
};

// Get all order bookings
exports.getOrders = async (req, res) => {
    try {
        const orders = await OrderBooking.find({});
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get Order Bookings' });
    }
};

// get all order summary
exports.getOrderSummary = async (req, res) => {
    try {
        const orders = await OrderBooking.find({});

        const grouped = {};
        let totals = {};

        for (const order of orders) {
            const category = order.category === "Product/Platform" ? "Product/Service" : order.category;
            const subCategory = order.subCategory;
            const value = order.adjustedSalesValueUsd || 0; // Changed from adjustedSalesValue to usdValue

            if (!grouped[category]) {
                grouped[category] = {};
                totals[category] = 0;
            }

            grouped[category][subCategory] = (grouped[category][subCategory] || 0) + value;
            totals[category] += value;
        }

        const result = Object.entries(grouped).map(([category, subs]) => {
            const categoryTotal = totals[category];
            const subData = Object.entries(subs).map(([subCategory, total]) => ({
                subCategory,
                total,
                percentage: +((total / categoryTotal) * 100).toFixed(2),
            }));
            return {
                category,
                total: categoryTotal,
                subCategories: subData,
            };
        });

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Failed to summarize order bookings' });
    }
};

// get order summary by company
exports.getOrderSummaryByCompany = async (req, res) => {
    try {
        const orders = await OrderBooking.find({});
        
        const companyData = {
            "CONSYST Digital Industries Pvt. Ltd": {
                usdTotal: 0,
                localTotal: 0
            },
            "CONSYST Technologies (India) Pvt. Ltd.": {
                usdTotal: 0,
                localTotal: 0
            },
            "CONSYST Middle East FZ-LLC": {
                usdTotal: 0,
                localTotal: 0
            },
            "Consyst Group": {
                usdTotal: 0,
                localTotal: 0
            }
        };

        for (const order of orders) {
            const company = order.company;
            const usdValue = order.adjustedSalesValueUsd || 0;
            const localValue = order.adjustedSalesValueLocal || 0;
            
            if (companyData.hasOwnProperty(company)) {
                companyData[company].usdTotal += usdValue;
                companyData[company].localTotal += localValue;
            }
        }

        // Calculate Consyst Group totals
        companyData["Consyst Group"].usdTotal = 
            companyData["CONSYST Digital Industries Pvt. Ltd"].usdTotal +
            companyData["CONSYST Technologies (India) Pvt. Ltd."].usdTotal +
            companyData["CONSYST Middle East FZ-LLC"].usdTotal;
            
        companyData["Consyst Group"].localTotal = 
            companyData["CONSYST Digital Industries Pvt. Ltd"].localTotal +
            companyData["CONSYST Technologies (India) Pvt. Ltd."].localTotal +
            companyData["CONSYST Middle East FZ-LLC"].localTotal;

        const result = [
            {
                company: "CONSYST Digital Industries Pvt. Ltd",
                adjustedUsdTotal: companyData["CONSYST Digital Industries Pvt. Ltd"].usdTotal,
                adjustedLocalTotal: companyData["CONSYST Digital Industries Pvt. Ltd"].localTotal
            },
            {
                company: "CONSYST Technologies (India) Pvt. Ltd.",
                adjustedUsdTotal: companyData["CONSYST Technologies (India) Pvt. Ltd."].usdTotal,
                adjustedLocalTotal: companyData["CONSYST Technologies (India) Pvt. Ltd."].localTotal
            },
            {
                company: "CONSYST Middle East FZ-LLC",
                adjustedUsdTotal: companyData["CONSYST Middle East FZ-LLC"].usdTotal,
                adjustedLocalTotal: companyData["CONSYST Middle East FZ-LLC"].localTotal
            },
            {
                company: "Consyst Group",
                adjustedUsdTotal: companyData["Consyst Group"].usdTotal,
                adjustedLocalTotal: companyData["Consyst Group"].localTotal
            }
        ];

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Failed to summarize order bookings by company' });
    }
};

// Delete an order booking
exports.deleteOrder = async (req, res) => {
    try {
        const { salesOrderName, category, subCategory } = req.body;
        const deleted = await OrderBooking.findOneAndDelete({salesOrderName,category,subCategory});
        res.status(200).json(deleted);

    } catch (err) {
        res.status(500).json({ error: 'Failed to delete Order Booking' });
    }
};
