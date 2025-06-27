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
import { useState } from "react";

const ROW_HEIGHT = 25;
const HEADING_ROW_HEIGHT = 40;

const getPurchaseOrderData = (project) => {
  return {
    po_value: project.po_value || 0,
    additional_po_value: project.additional_po_value || 0,
  };
};

const getBillingData = (project) => {
  return {
    invoice_supply: project?.invoice_supply || 0,
    invoice_service: project?.invoice_service || 0,
    additional_invoice: project?.additional_invoice || 0,
  };
};

const getDirectExpenses = (project) => {
  return {
    cogs: project?.cogs || 0,
    packing_and_forwarding: project?.packing_and_forwarding || 0,
    travel_expenses: project?.travel_expenses || 0,
    travel_allowances: project?.travel_allowances || 0,
    commissioning: project?.commissioning || 0,
    programming_outsourced: project?.programming_outsourced || 0,
    installation_subcontract: project?.installation_subcontract || 0,
    extended_warranty_cost: project?.extended_warranty_cost || 0,
    miscellaneous_direct_expense: project?.miscellaneous_direct_expense || 0,
  };
};



const getColumns = () => [
  { columnId: "titles-column", width: 300 },
  { columnId: "budget", width: 180 },
];

const headerRow1 = {
  rowId: "header1",
  height: HEADING_ROW_HEIGHT,
  cells: [
    headerCell("Accounting Head", "justify-center rounded-tl",1,false,true),
    headerCell("Budget", "justify-center",1,false,true),
  ],
};
const headerRow2 = {
  rowId: "header2",
  height: HEADING_ROW_HEIGHT,
  cells: [
    headerCell("", "justify-center",1),
    headerCell("", "justify-center",1),
  ],
};

const getTotalPoValue = (project) => {
  return project.total_po_value || 0
}

const getBillingTotal = (project) =>{
  return project.billing_total || 0
}
  

const getTotalDirectExpenses = (project) =>{
  return project.total_direct_expenses || 0
}

const getGrossProfitAmount = (project) => {
  return project.gross_profit_amount || 0
}

const getGrossProfitPercent = (project) => {
  return project.gross_profit_percent || 0
}

const getInvestorProfitSharePercent = (project) => project?.investor_profit_share_percent || 0;

const getMiscellaneousIndirectExpense = (project) => project?.miscellaneous_indirect_expense || 0;

const getInvestorProfitShareAmount = (project) => project?.investor_profit_share_amount || 0

const getTotalIndirectExpenses = (project) => project?.total_indirect_expenses || 0

const getTotalExpenses = (project) =>  project.total_expenses || 0 

const getNetProfitLoss = (project) => project?.net_profit_loss || 0

const getNetProfitLossPercent = (project) => project?.net_profit_loss_percent || 0

const getRows = (
  project,
  purchaseOrderData,
   billingData,
  directExpensesData,) => {
  const createSectionHeader = (title, color) => ({
    rowId: title.toLowerCase().replace(/\s+/g, "-"),
    height: HEADING_ROW_HEIGHT,
    cells: [
      nonEditable(
        bottomLine(textCell(title, "align-items-end text-lg text-center font-bold", { color }))
      ),
      nonEditable(bottomLine(emptyTextCell)),
    ],
  });

  const createDataRow = (
    label,
    currentValue,
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
    ],
  });

  const purchaseOrderRows = [
    createSectionHeader("Purchase Order", "#336699"),
    createDataRow("PO Value", purchaseOrderData.po_value,false),
    createDataRow("Additional PO Value", purchaseOrderData.additional_po_value),
    createDataRow("PO Value (Total)", getTotalPoValue(project) ,false, true, "#336699"),
  ];

  const billingRows = [
    createSectionHeader("Billing", "#1e3a8a"),
    createDataRow("Invoice (Supply)", billingData.invoice_supply),
    createDataRow("Invoice (Service)", billingData.invoice_service),
    createDataRow("Additional Invoice", billingData.additional_invoice),
    createDataRow("Billing (Total)",getBillingTotal(project),false, true, "#1e3a8a"),
  ];

  const directExpensesRows = [
    createSectionHeader("Direct Expenses", "#ea580c"),
    createDataRow("CoGS", directExpensesData.cogs),
    createDataRow("Packing & Forwarding", directExpensesData.packing_and_forwarding),
    createDataRow("Travel Expenses", directExpensesData.travel_expenses),
    createDataRow("Travel Allowances", directExpensesData.travel_allowances),
    createDataRow("Commissioning", directExpensesData.commissioning),
    createDataRow("Programming (Outsourced)", directExpensesData.programming_outsourced),
    createDataRow("Installation (Sub-Contract)", directExpensesData.installation_subcontract),
    createDataRow("Extended Warranty (Cost)", directExpensesData.extended_warranty_cost),
    createDataRow("Miscellaneous (Direct Expense)", directExpensesData.miscellaneous_direct_expense),
    createDataRow("Direct Expenses (Total)",getTotalDirectExpenses(project), false, true, "#ea580c",false,true),
  ];
   const grossProfitRows = [
    createSectionHeader("Gross Profit", "#15803d"),
    createDataRow("Gross Profit (Amount)",getGrossProfitAmount(project),false,false),
    createDataRow("Gross Profit (Percent)",getGrossProfitPercent(project),false,false,true,true),
  ]
  const indirectExpensesRows = [
    createSectionHeader("Indirect Expenses", "#ea580c"),
    createDataRow("Investor Profit Share (Percent)",getInvestorProfitSharePercent(project),false,false,true,true),
    createDataRow("Investor Profit Share (Amount)", getInvestorProfitShareAmount(project),),
    createDataRow("Miscellaneos (Indirect Expense)", getMiscellaneousIndirectExpense(project)),
    createDataRow("Indirect Expenses (Total)",getTotalIndirectExpenses(project), false, true,"#ea580c",false),
    createDataRow("Total Expenses",getTotalExpenses(project), false, true,"#ea580c",false),
  ];


  const netProfitRows = [
    createDataRow("Net Profit/Loss",getNetProfitLoss(project), false, true, "#336699"),
    createDataRow("Net Profit/Loss (Percent)",getNetProfitLossPercent(project), false, true, "#336699",true),
  ];  

  return [headerRow1,headerRow2, ...purchaseOrderRows, ...billingRows, ...directExpensesRows, ...grossProfitRows ,...indirectExpensesRows,...netProfitRows];  
};

function CostControlBudgetTable({ project }) {


  const purchaseOrderData = getPurchaseOrderData(project)

  const billingData = getBillingData(project)

  const directExpensesData = getDirectExpenses(project)


  const rows = getRows(
  project,
  purchaseOrderData,
  billingData,
  directExpensesData,
);
  const columns = getColumns();

  return <ReactGrid rows={rows} columns={columns} />;
}

export default CostControlBudgetTable;
  