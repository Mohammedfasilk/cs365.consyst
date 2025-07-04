const axios = require("axios");

const companies = [
  "CONSYST Middle East FZ-LLC",
  "CONSYST Technologies (India) Pvt. Ltd.",
  "CONSYST Digital Industries Pvt. Ltd",
];

exports.SalesOrderBooking = async (req, res) => {
  const {fyDate} = req.body
  
  const currentFyStartDate = fyDate
  const results = [];

  for (const company of companies) {
    const url = `${process.env.ERPNEXT_BASE_URL}/api/resource/Sales Order`;

    const params = {
      fields: JSON.stringify(["SUM(base_rounded_total)"]),
      filters: JSON.stringify([
        ["company", "=", company],
        ["po_date", ">=", currentFyStartDate],
        ["docstatus", "=", 1],
      ]),
    };

    try {
      const response = await axios.get(url, {
        params,
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${process.env.ERPNEXT_API_KEY}:${process.env.ERPNEXT_API_SECRET}`,
        },
      });

      const value = response.data?.data?.[0]?.["SUM(base_rounded_total)"] ?? 0;
      results.push({ company, value });
    } catch (error) {
      console.error(`Error for ${company}:`, error.message);
      results.push({ company, value: null, error: error.message });
    }
  }

  res.json(results);
};

//Monthy salesorder Booking

exports.monthlySalesOrderBooking = async (req, res) => {
 
  const { fyDate, usd, aed } = req.body;

  const convertINRToUSD = async (amount) => amount / usd; // Stub: Replace with actual exchange rate API if needed
  const convertAEDToUSD = async (amount) => amount / aed;

  try {
    const currentFyStartDate = new Date(fyDate); // Correct type
    const today = new Date();

    const dateList = [];
    const valueList = [];

    let currentDate = new Date(
      currentFyStartDate.getFullYear(),
      currentFyStartDate.getMonth(),
      1
    );

    while (currentDate <= today) {
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Format month as MM
      const day = "01"; // Always the 1st day of the month
      dateList.push(`${year}-${month}-${day}`);

      // Move to the next month
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    for (let i = 0; i < dateList.length - 1; i++) {
      const pair = dateList.slice(i, i + 2);

      let totalUSD = 0;

      for (const company of companies) {
        const url = new URL(
          `${process.env.ERPNEXT_BASE_URL}/api/resource/Sales%20Order`
        );
        url.searchParams.append(
          "fields",
          JSON.stringify(["SUM(base_rounded_total)"])
        );
        url.searchParams.append(
          "filters",
          JSON.stringify([
            ["company", "=", company],
            ["po_date", ">=", pair[0]],
            ["po_date", "<", pair[1]],
            ["docstatus", "=", 1],
          ])
        );

        const res = await fetch(url.toString(), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${process.env.ERPNEXT_API_KEY}:${process.env.ERPNEXT_API_SECRET}`,
          },
        });

        const { data } = await res.json();

        const base_rounded_total = data[0]["SUM(base_rounded_total)"];

        switch (company) {
          case "CONSYST Digital Industries Pvt. Ltd":
            totalUSD += await convertINRToUSD(base_rounded_total);
            break;
          case "CONSYST Middle East FZ-LLC":
            totalUSD += await convertAEDToUSD(base_rounded_total);
            break;
          case "CONSYST Technologies (India) Pvt. Ltd.":
            totalUSD += await convertINRToUSD(base_rounded_total);
            break;
        }
      }

      valueList.push(Number(totalUSD.toFixed(2)));
    }

    dateList.pop();
    res.status(200).json({ dateList, valueList });
  } catch (error) {
    console.error("Error fetching sales:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//quarterly salesorder booking

exports.quarterlySalesorderBooking = async (req, res) => {
  const { fyDate, usd, aed } = req.body;

  const convertINRToUSD = async (amount) => amount / usd; // Stub: Replace with actual exchange rate API if needed
  const convertAEDToUSD = async (amount) => amount / aed;

  try {
    const fyStart = new Date(fyDate);
    const today = new Date();

    const dateList = [];
    const valueList = [];

    // Step 1: Build quarterly date ranges
    let current = new Date(fyStart.getFullYear(), 0, 1); // Jan = 0

    while (current <= today) {
      const year = current.getFullYear();
      const quarterStartMonth = Math.floor(current.getMonth() / 3) * 3;
      const monthStr = (quarterStartMonth + 1).toString().padStart(2, "0");
      dateList.push(`${year}-${monthStr}-01`);
      current.setMonth(current.getMonth() + 3);
    }

    // Step 2: Iterate through each quarter range
    for (let i = 0; i < dateList.length - 1; i++) {
      const startDate = dateList[i];
      const endDate = dateList[i + 1];
      let totalUSD = 0;
      for (const company of companies) {
        const url = new URL(
          `${process.env.ERPNEXT_BASE_URL}/api/resource/Sales%20Order`
        );
        url.searchParams.append(
          "fields",
          JSON.stringify(["SUM(base_rounded_total)"])
        );
        url.searchParams.append(
          "filters",
          JSON.stringify([
            ["company", "=", company],
            ["po_date", ">=", startDate],
            ["po_date", "<", endDate],
            ["docstatus", "=", 1],
          ])
        );

        const response = await fetch(url.toString(), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${process.env.ERPNEXT_API_KEY}:${process.env.ERPNEXT_API_SECRET}`,
          },
        });
        const { data } = await response.json();
        const rawTotal = parseFloat(
          data?.[0]?.["SUM(base_rounded_total)"] || "0"
        );

        if (!isNaN(rawTotal)) {
          if (company === "CONSYST Middle East FZ-LLC") {
            totalUSD += await convertAEDToUSD(rawTotal);
          } else {
            totalUSD += await convertINRToUSD(rawTotal);
          }
        }
      }

      valueList.push(Number(totalUSD.toFixed(2)));
    }

    dateList.pop(); // Remove last unused boundary

    res.status(200).json({ dateList, valueList });
  } catch (error) {
    console.error("Error fetching sales:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
