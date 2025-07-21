const BillingPlan = require("../Models/BillingPlanModel");

exports.getBillingByCompany = async (req, res) => {
  try {
    const companies = [
      "CONSYST Middle East FZ-LLC",
      "CONSYST Technologies (India) Pvt. Ltd.",
      "CONSYST Digital Industries Pvt. Ltd",
    ];

    const orders = await BillingPlan.find({
      company: { $in: companies },
    });

    const companyData = {};

    // Initialize totals
    [...companies, "Consyst Group"].forEach((company) => {
      companyData[company] = {
        billingPlansTotal: 0,
        billingPlansTotalUSD: 0,
      };
    });

    // Aggregate per-company totals
    for (const order of orders) {
      const company = (order.company || "").trim();
      if (!companyData[company]) continue;

      if (Array.isArray(order.billing_plans)) {
        const approvedPlans = order.billing_plans.filter(
          (plan) => plan.status === "approved"
        );

        let total = 0;
        let totalUSD = 0;

        for (const plan of approvedPlans) {
          total += plan.amount || 0;
          totalUSD += plan.converted_amount || 0;
        }

        companyData[company].billingPlansTotal += total;
        companyData[company].billingPlansTotalUSD += totalUSD;
      }
    }

    // Aggregate "Consyst Group"
   for (const company of companies) {
  const isSwappedCompany =
    company === "CONSYST Middle East FZ-LLC" ||
    company === "CONSYST Digital Industries Pvt. Ltd";

  companyData["Consyst Group"].billingPlansTotal += isSwappedCompany
    ? companyData[company].billingPlansTotalUSD // USD used as "amount"
    : companyData[company].billingPlansTotal;

  companyData["Consyst Group"].billingPlansTotalUSD += isSwappedCompany
    ? companyData[company].billingPlansTotal // Local used as "converted"
    : companyData[company].billingPlansTotalUSD;
}

    // Prepare final output with swapped values for Middle East
    const result = [...companies, "Consyst Group"].map((company) => {
      let billingPlansTotal = companyData[company].billingPlansTotal;
      let billingPlansTotalUSD = companyData[company].billingPlansTotalUSD;

      if (
  company === "CONSYST Middle East FZ-LLC" ||
  company === "CONSYST Digital Industries Pvt. Ltd"
) {
  // Swap USD and local values for these companies
  [billingPlansTotal, billingPlansTotalUSD] = [
    billingPlansTotalUSD,
    billingPlansTotal,
  ];
}

      return {
        company,
        billingPlansTotal,
        billingPlansTotalUSD,
      };
    });

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

    for (const bill of bills) {
      const country = bill.country || "Unknown";

      // Swap logic for specific companies
      const isSwappedCompany =
        bill.company?.toLowerCase().includes("middle east") ||
        bill.company === "CONSYST Digital Industries Pvt. Ltd";

      if (!countryData[country]) {
        countryData[country] = {
          billingPlansTotal: 0,
        };
      }

      if (Array.isArray(bill.billing_plans)) {
        const approvedPlans = bill.billing_plans.filter(
          (plan) => plan.status === "approved"
        );

        const total = approvedPlans.reduce((sum, plan) => {
          const value = isSwappedCompany ? plan.amount : plan.converted_amount;
          return sum + (value || 0);
        }, 0);

        countryData[country].billingPlansTotal += total;
      }
    }

    const result = Object.entries(countryData).map(([country, data]) => ({
      country,
      total: +data.billingPlansTotal.toFixed(2),
    }));

    res.json(result);
  } catch (err) {
    console.error("Error in getBillingByCountry:", err);
    res
      .status(500)
      .json({ error: "Failed to summarize billing plans by country" });
  }
};


exports.getMonthlyBillingSummary = async (req, res) => {
  try {
    // 1. Read financial year from body or fallback to current FY
    const { financialYear } = req.body;

    let fyStart;
    if (financialYear) {
      fyStart = new Date(financialYear);
      if (isNaN(fyStart)) {
        return res
          .status(400)
          .json({ error: "Invalid financialYear date format" });
      }
    } else {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth(); // 0 = Jan
      const fyStartYear = currentMonth >= 3 ? currentYear : currentYear - 1;
      fyStart = new Date(fyStartYear, 3, 1); // April 1
    }

    const fyStartYear = fyStart.getFullYear();
    const fyEnd = new Date(fyStartYear + 1, 2, 31, 23, 59, 59); // March 31 next year

    const orders = await BillingPlan.find();

    // Month labels
    const monthNames = [
      "Apr", "May", "Jun", "Jul", "Aug", "Sep",
      "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"
    ];

    // 2. Initialize monthly totals
    const monthlyUSD = {};
    const monthKeys = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date(fyStart.getFullYear(), 3 + i, 1); // April is month 3
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      monthKeys.push(key);
      monthlyUSD[key] = 0;
    }

    // 3. Process all orders
    for (const order of orders) {
      const company = (order.company || "").trim();
      if (!Array.isArray(order.billing_plans)) continue;

      for (const plan of order.billing_plans) {
        const planDate = new Date(plan.date);
        if (
          plan.status === "approved" &&
          !isNaN(planDate) &&
          planDate >= fyStart &&
          planDate <= fyEnd
        ) {
          const key = `${planDate.getFullYear()}-${String(
            planDate.getMonth() + 1
          ).padStart(2, "0")}`;

          // Use raw amount for these two companies
          const useRawAmount =
            company === "CONSYST Middle East FZ-LLC" ||
            company === "CONSYST Digital Industries Pvt. Ltd";

          const amountUSD = useRawAmount
            ? plan.amount || 0
            : plan.converted_amount || 0;

          if (monthlyUSD[key] !== undefined) {
            monthlyUSD[key] += amountUSD;
          }
        }
      }
    }

    // 4. Build cumulative result with month names
    const result = [];
    let cumulativeTotal = 0;

    for (let i = 0; i < 12; i++) {
      const key = monthKeys[i];
      const date = new Date(fyStart.getFullYear(), 3 + i, 1);
      const label = `${monthNames[i]} ${String(date.getFullYear()).slice(-2)}`;
      cumulativeTotal += monthlyUSD[key];

      result.push({
        month: label,
        billingPlansTotalUSD: +cumulativeTotal.toFixed(2),
      });
    }

    res.json(result);
  } catch (err) {
    console.error("Error in getMonthlyBillingSummary:", err);
    res
      .status(500)
      .json({ error: "Failed to summarize monthly billing plans in USD" });
  }
};


const { startOfMonth, endOfMonth, addMonths, format } = require("date-fns");

exports.getMonthlyBilledSummary = async (req, res) => {
  try {
    const { financialYear } = req.body;

    if (!financialYear) {
      return res.status(400).json({ error: "financialYear is required" });
    }

    const fyStart = new Date(financialYear);
    const monthlyData = [];

    const billing = await BillingPlan.find({
      "billing_plans.0": { $exists: true },
    });

    for (let i = 0; i < 12; i++) {
      const monthStart = startOfMonth(addMonths(fyStart, i));
      const monthEnd = endOfMonth(monthStart);

      let billed = 0;
      let nonBilled = 0;

      for (const so of billing) {
        const company = (so.company || "").trim();
        const useRawAmount =
          company === "CONSYST Middle East FZ-LLC" ||
          company === "CONSYST Digital Industries Pvt. Ltd";

        for (const plan of so.billing_plans || []) {
          const planDate = new Date(plan.date);

          if (
            planDate >= monthStart &&
            planDate <= monthEnd &&
            plan.status === "approved"
          ) {
            const value = useRawAmount ? plan.amount : plan.converted_amount;

            if (plan.invoiced) {
              billed += value || 0;
            } else {
              nonBilled += value || 0;
            }
          }
        }
      }

      monthlyData.push({
        month: format(monthStart, "MMM yy"), // e.g., "Jul 25"
        billed: +billed.toFixed(2),
        nonBilled: +nonBilled.toFixed(2),
      });
    }

    return res.json(monthlyData);
  } catch (error) {
    console.error("Error in monthly billing summary:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const { startOfQuarter, endOfQuarter, addQuarters } = require("date-fns");

exports.getQuarterlyBilledSummary = async (req, res) => {
  try {
    const { financialYear } = req.body;

    if (!financialYear) {
      return res.status(400).json({ error: "financialYear is required" });
    }

    const fyStart = new Date(financialYear);
    const quarterlyData = [];

    // Fetch all billing plans with at least one billing plan entry
    const billing = await BillingPlan.find({
      "billing_plans.0": { $exists: true },
    });

    // Iterate over 4 quarters
    for (let i = 0; i < 4; i++) {
      const quarterStart = startOfQuarter(addQuarters(fyStart, i));
      const quarterEnd = endOfQuarter(quarterStart);

      let billed = 0;
      let nonBilled = 0;

      for (const so of billing) {
        const company = (so.company || "").trim();
        const useRawAmount =
          company === "CONSYST Middle East FZ-LLC" ||
          company === "CONSYST Digital Industries Pvt. Ltd";

        for (const plan of so.billing_plans || []) {
          const planDate = new Date(plan.date);

          if (
            planDate >= quarterStart &&
            planDate <= quarterEnd &&
            plan.status === "approved"
          ) {
            const value = useRawAmount ? plan.amount : plan.converted_amount;

            if (plan.invoiced) {
              billed += value || 0;
            } else {
              nonBilled += value || 0;
            }
          }
        }
      }

      quarterlyData.push({
        quarter: `Q${i + 1} ${format(quarterStart, "yy")}`, // e.g., Q1 25
        billed: +billed.toFixed(2),
        nonBilled: +nonBilled.toFixed(2),
      });
    }

    return res.json(quarterlyData);
  } catch (error) {
    console.error("Error in quarterly billing summary:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};




const { startOfYear, endOfYear, addYears, isAfter, isBefore } = require("date-fns");


exports.getToBeBilledSummary = async (req, res) => {
  try {
    const { financialYear } = req.body;

    if (!financialYear) {
      return res.status(400).json({ error: "financialYear is required" });
    }

    const fyStart = startOfYear(new Date(financialYear));
    const fyEnd = endOfYear(fyStart);

    let totalCurrentFY = 0;
    let totalFuture = 0;

    const billing = await BillingPlan.find({
      "billing_plans.0": { $exists: true }
    });

    for (const so of billing) {
      const company = (so.company || "").trim();
      const useRawAmount =
        company === "CONSYST Middle East FZ-LLC" ||
        company === "CONSYST Digital Industries Pvt. Ltd";

      for (const plan of so.billing_plans || []) {
        const planDate = new Date(plan.date);
        const value = useRawAmount ? plan.amount : plan.converted_amount;

        if (plan.status === "approved") {
          if (isAfter(planDate, fyEnd)) {
            totalFuture += value || 0;
          } else if (planDate >= fyStart && planDate <= fyEnd) {
            totalCurrentFY += value || 0;
          }
        }
      }
    }

    return res.json({
      financialYear: `${fyStart.getFullYear()}-${fyEnd.getFullYear()}`,
      totalBilledThisFY: +totalCurrentFY.toFixed(2),
      totalBilledFuture: +totalFuture.toFixed(2),
    });
  } catch (error) {
    console.error("Error in getToBeBilledSummary:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
