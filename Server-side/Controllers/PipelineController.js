const axios = require("axios");

//Top Oppertunities
exports.TopOpportunity = async (req, res) => {
  try {

    const today = new Date().toISOString().slice(0, 10);
    const response = await axios.get(
      `${process.env.ERPNEXT_BASE_URL}/api/resource/Opportunity?fields=["title","sales_stage","opportunity_amount","customer_name","country","currency"]&filters=[["sales_stage","in",["Prospecting","Qualification","Proposal/Price Quote","Negotiation/Review"]],["close_date",">=","${today}"]]&limit=5000`,
      {
        headers: {
          Authorization: `token ${process.env.ERPNEXT_API_KEY}:${process.env.ERPNEXT_API_SECRET}`
        }
      }
    );

    // Access the actual opportunity list from response.data.data
    const opportunities = response.data.data;

    res.status(200).json(opportunities);
  } catch (error) {
    console.error("Error fetching opportunities:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve sales pipeline data.",
      error: error.message,
    });
  }
};
exports.FocusOpportunity = async (req, res) => {
  try {

    const today = new Date().toISOString().slice(0, 10);
    const response = await axios.get(
      `${process.env.ERPNEXT_BASE_URL}/api/resource/Opportunity?fields=["title","sales_stage","opportunity_amount","customer_name","country","currency"]&filters=[["sales_stage","in",["Prospecting","Qualification","Proposal/Price Quote","Negotiation/Review"]],["close_date",">=","${today}"],["custom_key_opportunity","=","1"]]&limit=5000`,
      {
        headers: {
          Authorization: `token ${process.env.ERPNEXT_API_KEY}:${process.env.ERPNEXT_API_SECRET}`
        }
      }
    );

    // Access the actual opportunity list from response.data.data
    const opportunities = response.data.data;

    res.status(200).json(opportunities);
  } catch (error) {
    console.error("Error fetching focus opportunities:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve focus opportunity data.",
      error: error.message,
    });
  }
};

//Current opportunity pipeline (sum)
exports.salesPipelineSum = async (req, res) => {
  try {

    const today = new Date().toISOString().slice(0, 10);
    const response = await axios.get(
      `${process.env.ERPNEXT_BASE_URL}/api/resource/Opportunity?fields=["sales_stage","opportunity_converted"]&filters=[["sales_stage","in",["Prospecting","Qualification","Proposal/Price Quote","Negotiation/Review"]],["close_date",">=","${today}"]]&limit=5000`,
      {
        headers: {
          Authorization: `token ${process.env.ERPNEXT_API_KEY}:${process.env.ERPNEXT_API_SECRET}`
        }
      }
    );

    // Access the actual opportunity list from response.data.data
    const opportunities = response.data.data;

    const totals = opportunities.reduce((acc, opp) => {
      const stage = opp.sales_stage;
      if (!acc[stage]) 
      acc[stage] = 0;
      acc[stage] += opp.opportunity_converted || 0; // Defensive: default to 0 if missing
      return acc;
    }, {});

    const totalSum =[{
    "id": "Prospecting",
    "value": totals?.Prospecting || 0,
    "label": "Prospecting"
  },
  {
    "id": "Qualification",
    "value": totals?.Qualification || 0,
    "label": "Qualification"
  },
  {
    "id": "Proposal/Price Quote",
    "value": totals?.["Proposal/Price Quote"] || 0,
    "label": "Proposal/Price Quote"
  },
  {
    "id": "Negotiation/Review",
    "value": totals?.["Negotiation/Review"] || 0,
    "label": "Negotiation/Review"
  }]


    res.status(200).json(totalSum);
  } catch (error) {
    console.error("Error fetching opportunities:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve sales pipeline data.",
      error: error.message,
    });
  }
};

//Current opportunity pipeline (Count)

exports.salesPipelineCount = async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const response = await axios.get(
      `${process.env.ERPNEXT_BASE_URL}/api/resource/Opportunity?fields=["sales_stage","opportunity_amount"]&filters=[["sales_stage","in",["Prospecting","Qualification","Proposal/Price Quote","Negotiation/Review"]],["close_date",">=","${today}"]]&limit=5000`,
      {
        headers: {  
          Authorization: `token ${process.env.ERPNEXT_API_KEY}:${process.env.ERPNEXT_API_SECRET}`
        }
      }
    );

    // Access the actual opportunity list from response.data.data
    const opportunities = response.data.data;

    const countByStage = opportunities.reduce((acc, opp) => {
      const stage = opp.sales_stage
      if (!acc[stage]) acc[stage] = 0;
      acc[stage] += 1;
      return acc;
    }, {});

    const totalCount = [
  {
    "id": "Prospecting",
    "value": countByStage?.Prospecting || 0,
    "label": "Prospecting"
  },
  {
    "id": "Qualification",
    "value": countByStage?.Qualification || 0,
    "label": "Qualification"
  },
  {
    "id": "Proposal/Price Quote",
    "value": countByStage?.["Proposal/Price Quote"] || 0,
    "label": "Proposal/Price Quote"
  },
  {
    "id": "Negotiation/Review",
    "value": countByStage?.["Negotiation/Review"] || 0,
    "label": "Negotiation/Review"
  }
]


    res.status(200).json(totalCount)

  } catch (error) {
    console.error("Error fetching opportunities:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve sales pipeline data.",
      error: error.message,
    });
  }
};
