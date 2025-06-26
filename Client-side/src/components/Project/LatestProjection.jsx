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
  { columnId: "latest-projection", width: 150 },
];

const headerRow1 = {
  rowId: "header1",
  height: HEADING_ROW_HEIGHT,
  cells: [
    headerCell("Latest Projection", "justify-center",1,false,true),
  ],
};
const headerRow2 = {
  rowId: "header2",
  height: HEADING_ROW_HEIGHT,
  cells: [
    headerCell("", "justify-center",1,false,true),
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
    rowId: label,
    height: ROW_HEIGHT,
    cells: [
      isEditable
        ? numberCell(currentValue, isLastRow ? " rounded-br" : "")
        : nonEditable(isPercent ? percentCell(currentValue, "disabled" + (isBold ? " font-bold" : "") + (isLastRow ? " rounded-br" : ""), color ? { color } : {})
        :numberCell(currentValue, "disabled" + (isBold ? " font-bold" : "") + (isLastRow ? " rounded-br" : ""), color ? { color } : {})),
    ],
  });

  const purchaseOrderRows = [
    createSectionHeader("","#336699"),
    createDataRow("po_value",purchaseOrderData.po_value,false),
    createDataRow("additional_po_value",purchaseOrderData.additional_po_value),
    createDataRow("po_total",getTotalPoValue(project) ,false, true, "#336699"),
  ];

  const billingRows = [
    createSectionHeader("","#1e3a8a"),
    createDataRow("invoice_supply",billingData.invoice_supply),
    createDataRow("invoice_service",billingData.invoice_service),
    createDataRow("additional_invoice",billingData.additional_invoice),
    createDataRow("billing_total",getBillingTotal(project),false, true, "#1e3a8a"),
  ];

  const directExpensesRows = [
    createSectionHeader("", "#ea580c"),
    createDataRow("cogs",directExpensesData.cogs),
    createDataRow("packing_and_forwarding",directExpensesData.packing_and_forwarding),
    createDataRow("travel_expenses",directExpensesData.travel_expenses),
    createDataRow("travel_allowances",directExpensesData.travel_allowances),
    createDataRow("commissioning",directExpensesData.commissioning),
    createDataRow("programming_outsourced",directExpensesData.programming_outsourced),
    createDataRow("installation_subcontract",directExpensesData.installation_subcontract),
    createDataRow("extended_warranty_cost",directExpensesData.extended_warranty_cost),
    createDataRow("miscellaneous_direct_expense",directExpensesData.miscellaneous_direct_expense),
    createDataRow("total_direct_expenses",getTotalDirectExpenses(project), false, true, "#ea580c",false,true),
  ];

   const grossProfitRows = [
    createSectionHeader("", "#15803d"),
    createDataRow("gross_amout",getGrossProfitAmount(project),false,false),
    createDataRow("gross_percent",getGrossProfitPercent(project),false,false,true,true),
  ]

  const indirectExpensesRows = [
    createSectionHeader(""),
    createDataRow("invester_percent",getInvestorProfitSharePercent(project),false,false,true,true),
    createDataRow("invester_amount",getInvestorProfitShareAmount(project),),
    createDataRow("miscell_exp",getMiscellaneousIndirectExpense(project)),
    createDataRow("total_indirect_exp",getTotalIndirectExpenses(project), false, true,"#ea580c",false),
    createDataRow("total_exp",getTotalExpenses(project), false, true,"#ea580c",false),
  ];


  const netProfitRows = [
    createDataRow("net_profit_loss",getNetProfitLoss(project), false, true, "#336699"),
    createDataRow("net_profit_loss_percent",getNetProfitLossPercent(project), false, true, "#336699",true),
  ];  

  return [headerRow1,headerRow2, ...purchaseOrderRows, ...billingRows, ...directExpensesRows, ...grossProfitRows ,...indirectExpensesRows,...netProfitRows];  
};

function LatestProjectionTable({ project }) {


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

export default LatestProjectionTable;
  