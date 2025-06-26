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

const getMonthlyEntry = (project) => {  
  return project || null;
};

const getCostData = (project,type = "current") => {
  const monthlyEntry = getMonthlyEntry(project);  
  if(!monthlyEntry) return null
  return monthlyEntry[type];
};

const getPurchaseOrderData = (project, type = "current") => {
  const data = getCostData(project, type);
  return {
    po_value: data?.po_value || 0, // still using overall budget
    additional_po_value: data?.additional_po_value || 0,
  };
};

const getBillingData = (project, type = "current") => {
  const data = getCostData(project,type);
  return {
    invoice_supply: data?.invoice_supply || 0,
    invoice_service: data?.invoice_service || 0,
    additional_invoice: data?.additional_invoice || 0,
  };
};

const getDirectExpenses = (project, type = "current") => {
  const data = getCostData(project, type);
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
const getIndirectExpenses = (project, type = "current") => {
  const data = getCostData(project, type);
  return {
    investor_profit_share_percent: data?.investor_profit_share_percent || 0,
    investor_profit_share_amount: data?.investor_profit_share_amount || 0,
    miscellaneous_indirect_expense: data?.miscellaneous_indirect_expense || 0,
    total_indirect_expenses: data?.total_indirect_expenses || 0,
    total_expenses: data?.total_expenses || 0,

  };
};
const getNetProfits = (project, type = "current") => {
  const data = getCostData(project, type);
  return {
    net_profit_loss_percent: data?.net_profit_loss_percent || 0,
    net_profit_loss: data?.net_profit_loss || 0,  
  };
};

const getColumns = (showProjected) => {
  const columns = [{ columnId: "current", width: 150 }];
  if (showProjected) {
    columns.push({ columnId: "projected", width: 150 });
  }
  return columns;
};

const getHeaderRowsAndMergedCells = (title, showProjected) => {
  const headerRow1 = {
    rowId: "header1",
    height: HEADING_ROW_HEIGHT,
    cells: [
      headerCell(title, "justify-center font-semibold", showProjected ? 2 : 1),
    ],
  };

  const headerRow2 = {
    rowId: "header2",
    height: HEADING_ROW_HEIGHT,
    cells: [
      headerCell("Current", "justify-center"),
      ...(showProjected ? [headerCell("Projected", "justify-center")] : []),
    ],
  };

  const mergedCells = [
    {
      columnId: "current",
      rowId: "header1",
      colspan: showProjected ? 2 : 1,
    },
  ];

  return {
    headerRows: [headerRow1, headerRow2],
    mergedCells,
  };
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










const getRows = (
  headerRows,
  purchaseOrderData,
   billingData,
    directExpensesData,
    indirectExpensesData,
    NetProfitLoss,
    projectedPurchaseOrderData,
  projectedBillingData,
  projectedDirectExpensesData,
projectedIndirentExpensesData,
projectedNetProfitLoss,
showProjected) => {
  const createSectionHeader = (title, color) => {
  const cells = [
    nonEditable(
      bottomLine(textCell(title, "align-items-end text-lg text-center font-bold", { color }))
    ),
  ];
  if (showProjected) {
    cells.push(nonEditable(textCell('',"bg-blue-500/8")));
  }

  return {
    rowId: title.toLowerCase().replace(/\s+/g, "-"),
    height: HEADING_ROW_HEIGHT,
    cells,
  };
};


 const createDataRow = (
  label,
  currentValue,
  projectedValue,
  isEditable = true,
  isBold = false,
  color,
  isPercent = false,
  isLastRow = false,
  keySuffix = '',
  showProjected = true
) => {
  const baseClass = "disabled" + (isBold ? " font-bold" : "") + (isLastRow ? " rounded-br" : "");
  const currentCell = isEditable
    ? numberCell(currentValue)
    : nonEditable(isPercent ? percentCell(currentValue, baseClass, color ? { color } : {}) : numberCell(currentValue, baseClass, color ? { color } : {}));

  const projectedCell = showProjected
    ? (isEditable
        ? numberCell(projectedValue,"bg-blue-500/8")
        : nonEditable(isPercent ? percentCell(projectedValue,`bg-blue-500/8 ${baseClass}`, color ? { color } : {}) : numberCell(projectedValue,`bg-blue-500/8 ${baseClass}`, color ? { color } : {})))
    : null;

  return {
    rowId: `${label.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, "-")}-${keySuffix}`,
    height: ROW_HEIGHT,
    cells: projectedCell ? [currentCell, projectedCell] : [currentCell],
  };
};

  const purchaseOrderRows = [
  createSectionHeader("", ""),
  createDataRow("PO Value", purchaseOrderData.po_value, projectedPurchaseOrderData.po_value, false, false, "", false, false, "po-value", showProjected),
  createDataRow("Additional PO Value", purchaseOrderData.additional_po_value, projectedPurchaseOrderData.additional_po_value, true, false, "", false, false, "add-po", showProjected),
  createDataRow("PO Value (Total)", getTotalPoValue(purchaseOrderData), getTotalPoValue(projectedPurchaseOrderData), false, true, "#336699", false, false, "po-total", showProjected),
];


  const billingRows = [
  createSectionHeader(""),
  createDataRow("Invoice (Supply)", billingData.invoice_supply, projectedBillingData.invoice_supply, true, false, undefined, false, false, "", showProjected),
  createDataRow("Invoice (Service)", billingData.invoice_service, projectedBillingData.invoice_service, true, false, undefined, false, false, "", showProjected),
  createDataRow("Additional Invoice", billingData.additional_invoice, projectedBillingData.additional_invoice, true, false, undefined, false, false, "", showProjected),
  createDataRow("Billing (Total)", getBillingTotal(billingData), getBillingTotal(projectedBillingData), false, true, "#1e3a8a", false, false, "", showProjected),
];

  const directExpensesRows = [
  createSectionHeader(""),
  createDataRow("COGS", directExpensesData.cogs, projectedDirectExpensesData.cogs, true, false, undefined, false, false, "", showProjected),
  createDataRow("Packing & Forwarding", directExpensesData.packing_and_forwarding, projectedDirectExpensesData.packing_and_forwarding, true, false, undefined, false, false, "", showProjected),
  createDataRow("Travel Expenses", directExpensesData.travel_expenses, projectedDirectExpensesData.travel_expenses, true, false, undefined, false, false, "", showProjected),
  createDataRow("Travel Allowances", directExpensesData.travel_allowances, projectedDirectExpensesData.travel_allowances, true, false, undefined, false, false, "", showProjected),
  createDataRow("Commissioning", directExpensesData.commissioning, projectedDirectExpensesData.commissioning, true, false, undefined, false, false, "", showProjected),
  createDataRow("Programming (Outsourced)", directExpensesData.programming_outsourced, projectedDirectExpensesData.programming_outsourced, true, false, undefined, false, false, "", showProjected),
  createDataRow("Installation (Sub-Contract)", directExpensesData.installation_subcontract, projectedDirectExpensesData.installation_subcontract, true, false, undefined, false, false, "", showProjected),
  createDataRow("Extended Warranty (Cost)", directExpensesData.extended_warranty_cost, projectedDirectExpensesData.extended_warranty_cost, true, false, undefined, false, false, "", showProjected),
  createDataRow("Miscellaneous (Direct Expense)", directExpensesData.miscellaneous_direct_expense, projectedDirectExpensesData.miscellaneous_direct_expense, true, false, undefined, false, false, "", showProjected),
  createDataRow("Direct Expenses (Total)", getTotalDirectExpenses(directExpensesData), getTotalDirectExpenses(projectedDirectExpensesData), false, true, "#ea580c", false, true, "", showProjected),
];


  const grossProfitRows = [
  createSectionHeader(""),
  createDataRow("Gross Profit (Amount)", getGrossProfitAmount(billingData, directExpensesData), getGrossProfitAmount(projectedBillingData, projectedDirectExpensesData), false, false, undefined, false, false, "", showProjected),
  createDataRow("Gross Profit (Percent)", getGrossProfitPercent(billingData, directExpensesData) || 0, getGrossProfitPercent(projectedBillingData, projectedDirectExpensesData) || 0, false, false, undefined, true, true, "", showProjected),
];
  const indirectExpensesRows = [
  createSectionHeader("", "#ea580c"),
  createDataRow("Investor Profit Share (Percent)", indirectExpensesData.investor_profit_share_percent, projectedIndirentExpensesData.investor_profit_share_percent, false, false, undefined, true, true, "", showProjected),
  createDataRow("Investor Profit Share (Amount)", indirectExpensesData.investor_profit_share_amount, projectedIndirentExpensesData.investor_profit_share_amount, true, false, undefined, false, false, "", showProjected),
  createDataRow("Miscellaneous (Indirect Expense)", indirectExpensesData.miscellaneous_indirect_expense, projectedIndirentExpensesData.miscellaneous_indirect_expense, true, false, undefined, false, false, "", showProjected),
  createDataRow("Indirect Expenses (Total)", indirectExpensesData.total_indirect_expenses, projectedIndirentExpensesData.total_indirect_expenses, false, true, "#ea580c", false, false, "", showProjected),
  createDataRow("Total Expenses", indirectExpensesData.total_expenses, projectedIndirentExpensesData.total_expenses, false, true, "#ea580c", false, false, "", showProjected),
];


 const netProfitRows = [
  createDataRow("Net Profit/Loss", NetProfitLoss.net_profit_loss, projectedNetProfitLoss.net_profit_loss, false, true, "#336699", false, false, "", showProjected),
  createDataRow("Net Profit/Loss (Percent)", NetProfitLoss.net_profit_loss_percent, projectedNetProfitLoss.net_profit_loss_percent, false, true, "#336699", true, false, "", showProjected),
];


  return [...headerRows, ...purchaseOrderRows, ...billingRows, ...directExpensesRows, ...grossProfitRows,...indirectExpensesRows,...netProfitRows];    //...netProfitRows
};

function MonthwiseTable({ project, title ,showProjected }) {
  // Current data
  const purchaseOrderData =getPurchaseOrderData(project)
  const billingData = getBillingData(project);
  const directExpensesData = getDirectExpenses(project);
  const indirectExpensesData = getIndirectExpenses(project);
  const NetProfitLoss = getNetProfits(project);

  // Projected data
  const projectedPurchaseOrderData = 
    getPurchaseOrderData(project, "projected")

  const projectedBillingData =
    getBillingData(project, "projected")

  const projectedDirectExpensesData = 
    getDirectExpenses(project, "projected")
  const projectedIndirentExpensesData = getIndirectExpenses(
    project,
    "projected"
  );
  const projectedNetProfitLoss = getNetProfits(project, "projected");

  // Header rows with merged cells
  const { headerRows, mergedCells } = getHeaderRowsAndMergedCells(title,showProjected);

  const dataRows = getRows(
    headerRows,
    purchaseOrderData,
    billingData,
    directExpensesData,
    indirectExpensesData,
    NetProfitLoss,
    projectedPurchaseOrderData,
    projectedBillingData,
    projectedDirectExpensesData,
    projectedIndirentExpensesData,
    projectedNetProfitLoss,
    showProjected,
  );

  const rows = [ ...dataRows];
  const columns = getColumns(showProjected);
  console.log(columns);
  

  return (
    <ReactGrid
      rows={rows}
      columns={columns}
      mergedCells={mergedCells}
    />
  );
}

export default MonthwiseTable;
  