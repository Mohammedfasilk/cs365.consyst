const express = require('express');
const { getBillingByCompany, getBillingByCountry, getMonthlyBillingSummary, getMonthlyBilledSummary, getQuarterlyBilledSummary, getToBeBilledSummary } = require('../Controllers/FinanceController');
const router = express.Router();

router.get('/summary-by-company', getBillingByCompany);
router.get('/summary-by-country', getBillingByCountry);
router.post('/monthly-billing', getMonthlyBillingSummary);
router.post('/monthly-billed-summary', getMonthlyBilledSummary);
router.post('/quarterly-billed-summary', getQuarterlyBilledSummary);
router.post('/to-be-billed', getToBeBilledSummary);
// router.post('/delete', deleteOrder);

module.exports = router;
