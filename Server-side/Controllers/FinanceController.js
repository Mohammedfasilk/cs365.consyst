const BillingPlan = require("../Models/BillingPlanModel");

exports.getBillingByCompany = async (req, res) => {
  try {
    const orders = await BillingPlan.find();

    const companies = [
      "CONSYST Digital Industries Pvt. Ltd",
      "CONSYST Technologies (India) Pvt. Ltd.",
      "CONSYST Middle East FZ-LLC",
    ];

    const companyData = {};

    // Initialize totals
    [...companies, "Consyst Group"].forEach((company) => {
      companyData[company] = {
        billingPlansTotal: 0,
        billingPlansTotalUSD: 0,
      };
    });

    // Loop through orders
    for (const order of orders) {
      const company = order.company;
      if (!companyData[company]) continue;

      if (Array.isArray(order.billing_plans)) {
        const approvedPlans = order.billing_plans.filter(
          (plan) => plan.status === "approved"
        );

        const total = approvedPlans.reduce(
          (sum, plan) => sum + (plan.amount || 0),
          0
        );
        const totalUSD = approvedPlans.reduce(
          (sum, plan) => sum + (plan.amount_in_usd || 0),
          0
        );

        companyData[company].billingPlansTotal += total;
        companyData[company].billingPlansTotalUSD += totalUSD;
      }
    }

    // Aggregate Consyst Group totals
    companyData["Consyst Group"].billingPlansTotal = companies.reduce(
      (sum, c) => sum + companyData[c].billingPlansTotal,
      0
    );
    companyData["Consyst Group"].billingPlansTotalUSD = companies.reduce(
      (sum, c) => sum + companyData[c].billingPlansTotalUSD,
      0
    );

    // Prepare final output
    const result = [...companies, "Consyst Group"].map((company) => ({
      company,
      billingPlansTotal: companyData[company].billingPlansTotal,
      billingPlansTotalUSD: companyData[company].billingPlansTotalUSD,
    }));

    res.json(result);
  } catch (err) {
    console.error("Error in getBillingByCompany:", err);
    res
      .status(500)
      .json({ error: "Failed to summarize billing plans by company" });
  }
};




exports.getBillingByCountry = async (req, res) => {
  try {
    const bills = await BillingPlan.find();

    const countryData = {};

    // Loop through each bill
    for (const bill of bills) {
      const country = bill.country || "Unknown";

      if (!countryData[country]) {
        countryData[country] = {
          billingPlansTotal: 0
        };
      }

      // Sum only approved billing plans
      if (Array.isArray(bill.billing_plans)) {
        const approvedPlans = bill.billing_plans.filter(plan => plan.status === 'approved');
        const total = approvedPlans.reduce((sum, plan) => sum + (plan.amount || 0), 0);
        countryData[country].billingPlansTotal += total;
      }
    }

    // Format the result
    const result = Object.entries(countryData).map(([country, data]) => ({
      country,
      total: data.billingPlansTotal
    }));

    res.json(result);
  } catch (err) {
    console.error("Error in getBillingByCountry:", err);
    res.status(500).json({ error: 'Failed to summarize billing plans by country' });
  }
};
