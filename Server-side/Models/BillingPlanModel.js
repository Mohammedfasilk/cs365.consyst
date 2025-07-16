const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  date: { type: String, required: true },
  description: { type: String },
  amount: { type: Number, required: true, default: 0 },
  status: { type: String, enum: ["draft", "approved"], default: "draft" },
});

const billingPlanSchema = new mongoose.Schema({
  salesOrderName: { type: String, required: true },
  currency: { type: String },
  salesOrderValue: { type: Number },
  company: { type: String },
  customerName: { type: String },
  salesOrderDate: { type: String },
  country: { type: String },
  adjustment: { type: Number },
  adjustedSalesValueUsd: { type: Number, default: 0 },
  adjustedSalesValue: { type: Number, default: 0 },
  billing_plans: [entrySchema],
});

module.exports = mongoose.model("BillingPlan", billingPlanSchema);
