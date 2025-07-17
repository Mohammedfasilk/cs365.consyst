const express = require("express");
const router = express.Router();
const billingPlanController = require("../Controllers/billingPlanController");

router.post("/create", billingPlanController.createOrUpdateBillingPlan);
router.post("/sales-order", billingPlanController.fetchOrderBillingPlan);
router.get("/list", billingPlanController.getBillingPlans);
router.put("/update/:id", billingPlanController.updateBillingPlan);
router.post("/delete", billingPlanController.deleteBillingPlan);
router.post("/status", billingPlanController.updateBillingPlanStatus);

module.exports = router;
