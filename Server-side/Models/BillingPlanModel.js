// models/BillingPlan.js
import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
  date: { type: String, required: true },
  description: { type: String},
  amount: { type: Number, required: true , default:0 },
  status: { type: String, enum: ["draft", "approved"], default: "draft" },
});

const financeSchema = new mongoose.Schema({
  salesOrderName: { type: String, required: true },
  currency: { type: String, enum: ["INR", "USD"], required: true },
  salesOrderValue: { type: Number, required: true },
  company: { type: String},
  customerName: { type: String},
  salesOrderDate: { type: String},
  country: { type: String},
  adjustment: { type: Number},
  adjustedSalesValueUsd: { type: Number,default:0},
  adjustedSalesValue: { type: Number,default:0},
  billing_plans: [entrySchema],
});
mongoose.model("Finance", financeSchema);
