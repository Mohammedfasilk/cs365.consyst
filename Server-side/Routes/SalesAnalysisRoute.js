const express = require('express')
const  router = express.Router();
const { SalesOrderBooking, quarterlySalesorderBooking, monthlySalesOrderBooking } = require('../Controllers/SalesOrderController');

router.post('/',SalesOrderBooking)
router.post('/order-booking',quarterlySalesorderBooking)
router.post('/order-booking-monthly',monthlySalesOrderBooking)


module.exports = router;