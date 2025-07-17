const express = require('express');
const { getBillingByCompany, getBillingByCountry } = require('../Controllers/FinanceController');
const router = express.Router();

router.get('/summary-by-company', getBillingByCompany);
router.get('/summary-by-country', getBillingByCountry);
// router.post('/delete', deleteOrder);

module.exports = router;
