const { default: mongoose } = require("mongoose");
const BillingPlan = require("../Models/BillingPlanModel");
const OrderBooking = require("../Models/OrderBookingModel");

// Create a new billing plan
// controllers/billingPlanController.js

exports.createOrUpdateBillingPlan = async (req, res) => {
  try {
    const {
      salesOrderName,
      currency,
      salesOrderValue,
      company,
      customerName,
      salesOrderDate,
      country,
      adjustment,
      adjustedSalesValue,
      adjustedSalesValueUsd,
      billing_plans  
    } = req.body;

    if (!salesOrderName) {
      return res.status(400).json({ error: "salesOrderName is required." });
    }

    console.log("BillingPlan typeof:", typeof BillingPlan);
console.log("BillingPlan content:", BillingPlan);
    const plan = await BillingPlan.findOneAndUpdate(
      { salesOrderName },                      
      {
        $set: {
          currency,
          salesOrderValue,
          company,
          customerName,
          salesOrderDate,
          country,
          adjustment,
          adjustedSalesValue,
          adjustedSalesValueUsd,
          billing_plans
        }
      },
      {
        new: true,   // return the updated (or inserted) doc
        upsert: true,// create if not found
        runValidators: true
      }
    );

    return res.status(200).json(plan);
  } catch (error) {
    console.error("Create/Update Billing Plan Error:", error);
    return res.status(500).json({ error: "Failed to create or update billing plan." });
  }
};


// Get all billing plans
exports.getBillingPlans = async (req, res) => {
  try {
    const plans = await BillingPlan.find();
    res.json(plans);
  } catch (error) {
    console.error("Fetch Billing Plans Error:", error);
    res.status(500).json({ error: "Failed to fetch billing plans." });
  }
};

// Get billing plan by salesOrderName


exports.fetchOrderBillingPlan = async (req, res) => {
  try {
    const { salesOrderName } = req.body;

    if (!salesOrderName) {
      return res.status(400).json({ error: 'salesOrderName is required.' });
    }

    // Step 1: Try finding from BillingPlan
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionExists = collections.some(
      (col) => col.name === 'BillingPlan'
    );

    if (collectionExists) {
      const BillingPlan = require("../Models/BillingPlanModel");
      const billingPlan = await BillingPlan.findOne({ salesOrderName });

      if (billingPlan) {
        return res.status(200).json(billingPlan );
      }
    }

    // Step 2: If not found, try from OrderBooking
    const salesOrder = await OrderBooking.findOne({ salesOrderName });
    if (salesOrder) {
      return res.status(200).json(salesOrder);
    }

    // Step 3: Not found in either
    return res.status(404).json({ error: 'No matching billing plan or order found.' });

  } catch (error) {
    console.error('Error fetching billing plan:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};



// Update billing plan (status or entries)
exports.updateBillingPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPlan = await BillingPlan.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedPlan);
  } catch (error) {
    console.error("Update Billing Plan Error:", error);
    res.status(500).json({ error: "Failed to update billing plan." });
  }
};

// Delete a billing plan
exports.deleteBillingPlan = async (req, res) => {
  try {
    const { id } = req.params;
    await BillingPlan.findByIdAndDelete(id);
    res.json({ message: "Billing plan deleted." });
  } catch (error) {
    console.error("Delete Billing Plan Error:", error);
    res.status(500).json({ error: "Failed to delete billing plan." });
  }
};
