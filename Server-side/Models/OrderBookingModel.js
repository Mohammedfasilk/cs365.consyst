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
  Stage: { type: String, default: 'open' },
});

module.exports = mongoose.model('OrderBooking', orderBookingSchema);
