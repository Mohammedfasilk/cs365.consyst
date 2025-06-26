import {
  bottomLine,
  emptyTextCell,
  headerCell,
  nonEditable,
  numberCell,
  percentCell,
  textCell
} from "../../lib/Cells";
import { ReactGrid } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { useEffect, useState } from "react";

const ROW_HEIGHT = 25;
const HEADING_ROW_HEIGHT = 40;

const getMonthlyEntry = (project, selectedMonth) => {
  if (!Array.isArray(project?.monthly_cost_control)) return null;
  return project.monthly_cost_control.find(entry => entry.month === selectedMonth) || null;
};

const getCostData = (project, selectedMonth, type = "current") => {
  const monthlyEntry = getMonthlyEntry(project, selectedMonth);
  if (!monthlyEntry || !monthlyEntry[type]) return {};
  return monthlyEntry[type];
};

const getPurchaseOrderData = (project, selectedMonth, type = "current") => {
  const data = getCostData(project, selectedMonth, type);
  return {
    po_value: project?.budget?.po_value || 0, // still using overall budget
    additional_po_value: data?.additional_po_value || 0,
  };
};

const getBillingData = (project, selectedMonth, type = "current") => {
  const data = getCostData(project, selectedMonth, type);
  return {
    invoice_supply: data?.invoice_supply || 0,
    invoice_service: data?.invoice_service || 0,
    additional_invoice: data?.additional_invoice || 0,
  };
};

const getDirectExpenses = (project, selectedMonth, type = "current") => {
  const data = getCostData(project, selectedMonth, type);
  return {
    cogs: data?.cogs || 0,
    packing_and_forwarding: data?.packing_and_forwarding || 0,
    travel_expenses: data?.travel_expenses || 0,
    travel_allowances: data?.travel_allowances || 0,
    commissioning: data?.commissioning || 0,
    programming_outsourced: data?.programming_outsourced || 0,
    installation_subcontract: data?.installation_subcontract || 0,
    extended_warranty_cost: data?.extended_warranty_cost || 0,
    miscellaneous_direct_expense: data?.miscellaneous_direct_expense || 0,
  };
};



const getColumns = () => [
  { columnId: "titles-column", width: 300 },
  { columnId: "Current", width: 150 },
  { columnId: "projected", width: 150 },
];

const headerRow = {
  rowId: "header",
  height: HEADING_ROW_HEIGHT,
  cells: [
    headerCell("Accounting Head", "justify-center rounded-tl"),
    headerCell("Current", "justify-center"),
    headerCell("Projected", "justify-center rounded-tr"),
  ],
};

const getTotalPoValue = (purchaseOrderData) =>
  purchaseOrderData.po_value + purchaseOrderData.additional_po_value;

const getBillingTotal = (billingData) =>
  billingData.invoice_supply + billingData.invoice_service + billingData.additional_invoice;

const getTotalDirectExpenses = (directExpensesData) =>
  Object.values(directExpensesData).reduce((total, expense) => total + expense, 0);

const getGrossProfitAmount = (billingData, directExpensesData) => {
  return getBillingTotal(billingData) - getTotalDirectExpenses(directExpensesData);
}

const getGrossProfitPercent = (billingData, directExpensesData) => {
  return (getBillingTotal(billingData) - getTotalDirectExpenses(directExpensesData)) / getBillingTotal(billingData);
}

const getInvestorProfitSharePercent = (project) => project?.budget?.investor_profit_share_percent || 0;

const getMiscellaneousIndirectExpense = (project) => project?.budget?.miscellaneous_indirect_expense || 0;

const getInvestorProfitShareAmount = (billingData, directExpensesData, investorProfitSharePercent) => {
  return investorProfitSharePercent * getGrossProfitAmount(billingData, directExpensesData);
};

const getTotalIndirectExpenses = (billingData, directExpensesData, investorProfitSharePercent, miscellaneousIndirectExpense) => {
  return getInvestorProfitShareAmount(billingData, directExpensesData, investorProfitSharePercent) + miscellaneousIndirectExpense;
};

const getTotalExpenses = (billingData, directExpensesData, investorProfitSharePercent, miscellaneousIndirectExpense) => {
  return getTotalDirectExpenses(directExpensesData) + getTotalIndirectExpenses(billingData, directExpensesData, investorProfitSharePercent, miscellaneousIndirectExpense);
};

const getNetProfitLoss = (billingData, directExpensesData) =>
  getBillingTotal(billingData) - getTotalDirectExpenses(directExpensesData);

const getNetProfitLossPercent = (billingData, directExpensesData) => {
  const totalBilling = getBillingTotal(billingData);
  if (totalBilling === 0) return 0;
  return ((getNetProfitLoss(billingData, directExpensesData) / totalBilling)).toFixed(2);
};

const getRows = (purchaseOrderData,
   billingData,
    directExpensesData,
    projectedPurchaseOrderData,
  projectedBillingData,
  projectedDirectExpensesData) => {
  const createSectionHeader = (title, color) => ({
    rowId: title.toLowerCase().replace(/\s+/g, "-"),
    height: HEADING_ROW_HEIGHT,
    cells: [
      nonEditable(
        bottomLine(textCell(title, "align-items-end text-lg text-center font-bold", { color }))
      ),
      nonEditable(bottomLine(emptyTextCell)),
      nonEditable(bottomLine(emptyTextCell)),
    ],
  });

  const createDataRow = (
    label,
    currentValue,
  projectedValue,
    isEditable = true,
    isBold = false,
    color,
    isPercent = false,
    isLastRow = false,
  ) => ({
    rowId: label.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, "-") ,
    height: ROW_HEIGHT,
    cells: [
      nonEditable(
        textCell(
          label,
          "padding-left-lg" + (isBold ? " font-bold" : "") + (isLastRow ? " rounded-bl" : ""),
          color ? { color } : {}
        )
      ),
      isEditable
        ? numberCell(currentValue, isLastRow ? " rounded-br" : "")
        : nonEditable(isPercent ? percentCell(currentValue, "disabled" + (isBold ? " font-bold" : "") + (isLastRow ? " rounded-br" : ""), color ? { color } : {})
        :numberCell(currentValue, "disabled" + (isBold ? " font-bold" : "") + (isLastRow ? " rounded-br" : ""), color ? { color } : {})),
      isEditable
        ? numberCell(projectedValue, isLastRow ? " rounded-br" : "")
        : nonEditable(isPercent ? percentCell(projectedValue, "disabled" + (isBold ? " font-bold" : "") + (isLastRow ? " rounded-br" : ""), color ? { color } : {})
        :numberCell(projectedValue, "disabled" + (isBold ? " font-bold" : "") + (isLastRow ? " rounded-br" : ""), color ? { color } : {})),
    ],
  });

  const purchaseOrderRows = [
    createSectionHeader("Purchase Order", "#336699"),
    createDataRow("PO Value", purchaseOrderData.po_value,projectedPurchaseOrderData.po_value,false),
    createDataRow("Additional PO Value", purchaseOrderData.additional_po_value,projectedPurchaseOrderData.additional_po_value),
    createDataRow("PO Value (Total)", getTotalPoValue(purchaseOrderData),getTotalPoValue(projectedPurchaseOrderData),false, true, "#336699"),
  ];

  const billingRows = [
    createSectionHeader("Billing", "#1e3a8a"),
    createDataRow("Invoice (Supply)", billingData.invoice_supply,projectedBillingData.invoice_supply),
    createDataRow("Invoice (Service)", billingData.invoice_service,projectedBillingData.invoice_service),
    createDataRow("Additional Invoice", billingData.additional_invoice,projectedBillingData.additional_invoice),
    createDataRow("Billing (Total)", getBillingTotal(billingData),getBillingTotal(projectedBillingData),false, true, "#1e3a8a"),
  ];

  const directExpensesRows = [
    createSectionHeader("Direct Expenses", "#ea580c"),
    createDataRow("CoGS", directExpensesData.cogs,projectedDirectExpensesData.cogs),
    createDataRow("Packing & Forwarding", directExpensesData.packing_and_forwarding,projectedDirectExpensesData.packing_and_forwarding),
    createDataRow("Travel Expenses", directExpensesData.travel_expenses,projectedDirectExpensesData.travel_expenses),
    createDataRow("Travel Allowances", directExpensesData.travel_allowances,projectedDirectExpensesData.travel_allowances),
    createDataRow("Commissioning", directExpensesData.commissioning,projectedDirectExpensesData.commissioning),
    createDataRow("Programming (Outsourced)", directExpensesData.programming_outsourced,projectedDirectExpensesData.programming_outsourced),
    createDataRow("Installation (Sub-Contract)", directExpensesData.installation_subcontract, projectedDirectExpensesData.installation_subcontract),
    createDataRow("Extended Warranty (Cost)", directExpensesData.extended_warranty_cost, projectedDirectExpensesData.extended_warranty_cost),
    createDataRow("Miscellaneous (Direct Expense)", directExpensesData.miscellaneous_direct_expense , projectedDirectExpensesData.miscellaneous_direct_expense),
    createDataRow("Direct Expenses (Total)", getTotalDirectExpenses(directExpensesData),getTotalDirectExpenses(projectedDirectExpensesData), false, true, "#ea580c",false,true),
  ];

  const grossProfitRows = [
    createSectionHeader("Gross Profit", "#15803d"),
    createDataRow("Gross Profit (Amount)",getGrossProfitAmount(billingData,directExpensesData),getGrossProfitAmount(projectedBillingData,projectedDirectExpensesData),false,false),
    createDataRow("Gross Profit (Percent)",getGrossProfitPercent(billingData,directExpensesData) || 0,getGrossProfitPercent(projectedBillingData,projectedDirectExpensesData) || 0,false,false,true,true),

  ]

  // const netProfitRows = [
  //   createDataRow("Net Profit/Loss", getNetProfitLoss(billingData, directExpensesData),getNetProfitLoss(projectedBillingData,projectedDirectExpensesData), false, true, "#336699"),
  //   createDataRow("Net Profit/Loss (Percent)",getNetProfitLossPercent(billingData, directExpensesData),getNetProfitLossPercent(projectedBillingData,projectedDirectExpensesData), false, true, "#336699"),
  // ];  

  return [headerRow, ...purchaseOrderRows, ...billingRows, ...directExpensesRows, ...grossProfitRows];    //...netProfitRows
};

function MonthlyBudgetTable({ project, getData, selectedMonth }) {

  const [investorProfitSharePercent, setInvestorProfitSharePercent] = useState(getInvestorProfitSharePercent(project));
  const [miscellaneousIndirectExpense, setMiscellaneousIndirectExpense] = useState(getMiscellaneousIndirectExpense(project));

  //current

  const [purchaseOrderData, setPurchaseOrderData] = useState(() =>
    getPurchaseOrderData(project, selectedMonth)
  );
  const [billingData, setBillingData] = useState(() =>
    getBillingData(project, selectedMonth)
  );
  const [directExpensesData, setDirectExpensesData] = useState(() =>
    getDirectExpenses(project, selectedMonth)
  );

//projected
  const [projectedPurchaseOrderData, setProjectedPurchaseOrderData] = useState(() =>
  getPurchaseOrderData(project, selectedMonth,"projected")
);
const [projectedBillingData, setProjectedBillingData] = useState(() =>
  getBillingData(project, selectedMonth,"projected")
);
const [projectedDirectExpensesData, setProjectedDirectExpensesData] = useState(() =>
  getDirectExpenses(project, selectedMonth,"projected")
);

  // Re-fetch when project or month changes
  useEffect(() => {

    setPurchaseOrderData(getPurchaseOrderData(project, selectedMonth));
    setBillingData(getBillingData(project, selectedMonth));
    setDirectExpensesData(getDirectExpenses(project, selectedMonth));

    setInvestorProfitSharePercent(getInvestorProfitSharePercent(project))
    setMiscellaneousIndirectExpense(getMiscellaneousIndirectExpense(project))
    //projected
  setProjectedPurchaseOrderData(getPurchaseOrderData(project, selectedMonth, "projected"));
  setProjectedBillingData(getBillingData(project, selectedMonth , "projected"));
  setProjectedDirectExpensesData(getDirectExpenses(project, selectedMonth ,"projected"))
  }, [project, selectedMonth]);
  
  const rows = getRows(
  purchaseOrderData,
  billingData,
  directExpensesData,
  projectedPurchaseOrderData,
  projectedBillingData,
  projectedDirectExpensesData
);
  const columns = getColumns();

  const handleChanges = (changes) => {
  changes.forEach((change) => {
    if (change.type === "number") {
      const rowId = change.rowId;
      const value = change.newCell.value;

      const updateMap = {
        "po-value": "po_value",
        "additional-po-value": "additional_po_value",
        "invoice-supply": "invoice_supply",
        "invoice-service": "invoice_service",
        "additional-invoice": "additional_invoice",
        cogs: "cogs",
        "packing-forwarding": "packing_and_forwarding",
        "travel-expenses": "travel_expenses",
        "travel-allowances": "travel_allowances",
        commissioning: "commissioning",
        "programming-outsourced": "programming_outsourced",
        "installation-subcontract": "installation_subcontract",
        "extended-warranty-cost": "extended_warranty_cost",
        "miscellaneous-direct-expense": "miscellaneous_direct_expense",
      };

      const field = updateMap[rowId];
      if (!field) return;

      if (change.columnId === "Current") {
        if (field in purchaseOrderData) {
          setPurchaseOrderData((prev) => ({ ...prev, [field]: value }));
        } else if (field in billingData) {
          setBillingData((prev) => ({ ...prev, [field]: value }));
        } else {
          setDirectExpensesData((prev) => ({ ...prev, [field]: value }));
        }
      } else if (change.columnId === "projected") {
        if (field in projectedPurchaseOrderData) {
          setProjectedPurchaseOrderData((prev) => ({ ...prev, [field]: value }));
        } else if (field in projectedBillingData) {
          setProjectedBillingData((prev) => ({ ...prev, [field]: value }));
        } else {
          setProjectedDirectExpensesData((prev) => ({ ...prev, [field]: value }));
        }
      }
    }
  });
};

useEffect(() => {
  const data = {
    month: selectedMonth,
    current: {
      ...purchaseOrderData,
      total_po_value: getTotalPoValue(purchaseOrderData),
      ...billingData,
      billing_total: getBillingTotal(billingData),
      ...directExpensesData,
      total_direct_expenses: getTotalDirectExpenses(directExpensesData),
      gross_profit_amount:getGrossProfitAmount(billingData,directExpensesData),
      gross_profit_percent:getGrossProfitPercent(billingData,directExpensesData),
      investor_profit_share_amount:getInvestorProfitShareAmount(billingData,directExpensesData,getInvestorProfitSharePercent(project)),
      investor_profit_share_percent: getInvestorProfitSharePercent(project),
      miscellaneous_indirect_expense: getMiscellaneousIndirectExpense(project),
      total_indirect_expenses:getTotalIndirectExpenses(billingData,directExpensesData,getInvestorProfitSharePercent(project),getMiscellaneousIndirectExpense(project)),
      total_expenses: getTotalExpenses(billingData,directExpensesData,getInvestorProfitSharePercent(project),getMiscellaneousIndirectExpense(project)),
      net_profit_loss: getNetProfitLoss(billingData, directExpensesData,getInvestorProfitSharePercent(project),getMiscellaneousIndirectExpense(project)),
      net_profit_loss_percent: getNetProfitLossPercent(billingData, directExpensesData,getInvestorProfitSharePercent(project),getMiscellaneousIndirectExpense(project)) || 0,
    },
    projected: {
      ...projectedPurchaseOrderData,
      total_po_value: getTotalPoValue(projectedPurchaseOrderData),
      ...projectedBillingData,
      billing_total: getBillingTotal(projectedBillingData),
      ...projectedDirectExpensesData,
      total_direct_expenses: getTotalDirectExpenses(projectedDirectExpensesData),
      gross_profit_amount:getGrossProfitAmount(projectedBillingData,projectedDirectExpensesData),
      gross_profit_percent:getGrossProfitPercent(projectedBillingData,projectedDirectExpensesData),
      investor_profit_share_amount:getInvestorProfitShareAmount(projectedBillingData,projectedDirectExpensesData,getInvestorProfitSharePercent(project)),
      investor_profit_share_percent: getInvestorProfitSharePercent(project),
      miscellaneous_indirect_expense: getMiscellaneousIndirectExpense(project),
      total_indirect_expenses:getTotalIndirectExpenses(projectedBillingData,projectedDirectExpensesData,getInvestorProfitSharePercent(project),getMiscellaneousIndirectExpense(project)),
      total_expenses: getTotalExpenses(projectedBillingData,projectedDirectExpensesData,getInvestorProfitSharePercent(project),getMiscellaneousIndirectExpense(project)),
      net_profit_loss: getNetProfitLoss(projectedBillingData, projectedDirectExpensesData,getInvestorProfitSharePercent(project), getMiscellaneousIndirectExpense(project)),
      net_profit_loss_percent: getNetProfitLossPercent(projectedBillingData, projectedDirectExpensesData,getInvestorProfitSharePercent(project),getMiscellaneousIndirectExpense(project)) || 0,
    },
  };

  getData(data);

  
}, [
  selectedMonth,
  purchaseOrderData,
  billingData,
  directExpensesData,
  projectedPurchaseOrderData,
  projectedBillingData,
  projectedDirectExpensesData,
]);

  return <ReactGrid rows={rows} columns={columns} onCellsChanged={handleChanges} />;
}

export default MonthlyBudgetTable;
  