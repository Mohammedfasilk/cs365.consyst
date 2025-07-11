const mongoose = require('mongoose');

const orderBookingSchema = new mongoose.Schema({
  salesOrderName: { type: String, required: true },
  salesOrderDate: { type: Date, required: true },
  customerName: { type: String, required: true },
  currency: { type: String, required: true },
  salesOrderValue: { type: Number, required: true },
  company: { type: String, required: true },
  adjustment: { type: Number, default: 0 },
  adjustedSalesValue: { type: Number, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  Status: { type: String, default: 'draft' },
  usdValue: { type: Number, required: true },
  inrValue: { type: Number, required: true },
  adjustedSalesValueUsd: { type: Number, required: true },
  adjustedSalesValueLocal: { type: Number, required: true },


});

module.exports = mongoose.model('OrderBooking', orderBookingSchema);
