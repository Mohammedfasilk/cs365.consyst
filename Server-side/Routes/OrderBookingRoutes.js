const express = require('express');
const router = express.Router();
const {
  saveOrder,
  getOrders,
  deleteOrder,
  fetchSalesOrderList, fetchSalesOrderByName,
  getOrderSummary
} = require('../Controllers/OrderBookingController');

router.post('/save-order', saveOrder);
router.post('/list', fetchSalesOrderList);
router.post('/order-booking', fetchSalesOrderByName);
router.get('/', getOrders);
router.get('/order-summary', getOrderSummary);
router.post('/delete', deleteOrder);

module.exports = router;
