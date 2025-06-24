import React, { useState } from "react";
import { bottomLine, emptyTextCell, headerCell, nonEditable, numberCell, percentCell, textCell } from "../../lib/Cells";
import { ReactGrid } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";

const ROW_HEIGHT = 25;
const HEADING_ROW_HEIGHT = 40;

const getPurchaseOrderData = () => {
  return {
    po_value: 123,
    additional_po_value: 123
  }
}

const getBillingData = () => {
  return {
    invoice_supply: 50000,
    invoice_service: 25000,
    additional_invoice: 0
  }
}

const getDirectExpenses = () => {
  return {
    cogs: 25000,
    packing_and_forwarding: 1000,
    travel_expenses: 2000,
    travel_allowances: 2000,
    commissioning: 2500,
    programming_outsourced: 2000,
    installation_subcontract: 2000,
    extended_warranty_cost: 1000,
    miscellaneous_direct_expense: 500,
  };
};

const getInvestoreProfitSharePercent = () => 0.20

const getMiscellaneousIndirectExpense = () => 1000

const getColumns = () => [
  {
    columnId: "titlesColumn",
    width: 300
  },
  {
    columnId: "estimated-value",
    width: 150
  },
  {
    columnId: "latest-projection",
    width: 150
  },
  {
    columnId: "cumulative",
    width: 150
  },
];

const headerRow = {
  rowId: "header",
  height: HEADING_ROW_HEIGHT,
  cells: [
    headerCell("Accounting Head", "justify-content-center rounded-tl"),
    headerCell("Budget (Pre-Kickoff)", "justify-content-center",),
    headerCell("Latest Projection", "justify-content-center"),
    headerCell("Cumulative (Actual)", "justify-content-center rounded-tr"),
  ]
};

const getTotalPoValue = (purchaseOrderData) => {
  return purchaseOrderData.po_value + purchaseOrderData.additional_po_value
}

const getBillingTotal = (billingData) => {
  return billingData.invoice_supply + billingData.invoice_service + billingData.additional_invoice
}

const getTotalDirectExpenses = (directExpensesData) => {
  return Object.values(directExpensesData).reduce((total, expense) => total + expense, 0);
}

const getGrossProfitAmount = (billingData, directExpensesData) => {
  return getBillingTotal(billingData) - getTotalDirectExpenses(directExpensesData);
}

const getGrossProfitPercent = (billingData, directExpensesData) => {
  return (getBillingTotal(billingData) - getTotalDirectExpenses(directExpensesData)) / getBillingTotal(billingData);
}

const getInvestorProfitShareAmount = (billingData, directExpensesData, investorProfitSharePercent) => {
  return investorProfitSharePercent * getGrossProfitAmount(billingData, directExpensesData);
};

const getTotalIndirectExpenses = (billingData, directExpensesData, investorProfitSharePercent, miscellaneousIndirectExpense) => {
  return getInvestorProfitShareAmount(billingData, directExpensesData, investorProfitSharePercent) + miscellaneousIndirectExpense;
};

const getTotalExpenses = (billingData, directExpensesData, investorProfitSharePercent, miscellaneousIndirectExpense) => {
  return getTotalDirectExpenses(directExpensesData) + getTotalIndirectExpenses(billingData, directExpensesData, investorProfitSharePercent, miscellaneousIndirectExpense);
};

const getNetProfitLoss = (billingData, directExpensesData, investorProfitSharePercent, miscellaneousIndirectExpense) => {
  return getBillingTotal(billingData) - getTotalExpenses(billingData, directExpensesData, investorProfitSharePercent, miscellaneousIndirectExpense);
};

const getNetProfitLossPercent = (billingData, directExpensesData, investorProfitSharePercent, miscellaneousIndirectExpense) => {
  return getNetProfitLoss(billingData, directExpensesData, investorProfitSharePercent, miscellaneousIndirectExpense) / getBillingTotal(billingData)
};

const getRows = (
  purchaseOrderData,
  billingData,
  directExpensesData,
  investorProfitSharePercent,
  miscellaneousIndirectExpense,
) => [
    headerRow,
    {
      rowId: "purchase-order",
      height: HEADING_ROW_HEIGHT,
      cells: [
        nonEditable(bottomLine(textCell("Purchase Order", "align-items-end text-lg text-center font-bold", { color: "#336699", }))),
        nonEditable(bottomLine(emptyTextCell)),
        nonEditable(bottomLine(emptyTextCell)),
        nonEditable(bottomLine(emptyTextCell)),
      ]
    },
    {
      rowId: "po-value",
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell("PO Value", "padding-left-lg",)),
        numberCell(purchaseOrderData.po_value),
        numberCell(purchaseOrderData.po_value),
        numberCell(purchaseOrderData.po_value),
      ]
    },
    {
      rowId: "additional-po-value",
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell("Additional PO Value", "padding-left-lg",)),
        numberCell(purchaseOrderData.additional_po_value),
        numberCell(purchaseOrderData.additional_po_value),
        numberCell(purchaseOrderData.additional_po_value),
      ]
    },
    {
      rowId: "total-po-value",
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell("PO Value (Total)", "padding-left-lg font-bold",)),
        nonEditable(numberCell(getTotalPoValue(purchaseOrderData), "disabled font-bold", { color: "#336699" })),
        nonEditable(numberCell(getTotalPoValue(purchaseOrderData), "disabled font-bold", { color: "#336699" })),
        nonEditable(numberCell(getTotalPoValue(purchaseOrderData), "disabled font-bold", { color: "#336699" })),
      ]
    },

    {
      rowId: "billing",
      height: HEADING_ROW_HEIGHT,
      cells: [
        nonEditable(
          bottomLine(
            textCell("Billing", "align-items-end text-lg text-center font-bold", { color: "#1eROW_HEIGHTaf" })
          )
        ),
        nonEditable(bottomLine(emptyTextCell)),
        nonEditable(bottomLine(emptyTextCell)),
        nonEditable(bottomLine(emptyTextCell)),
      ]
    },
    {
      rowId: "invoice-supply",
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell("Invoice (Supply)", "padding-left-lg",)),
        numberCell(billingData.invoice_supply),
        numberCell(billingData.invoice_supply),
        numberCell(billingData.invoice_supply),
      ]
    },
    {
      rowId: "invoice-service",
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell("Invoice (Service)", "padding-left-lg",)),
        numberCell(billingData.invoice_service),
        numberCell(billingData.invoice_service),
        numberCell(billingData.invoice_service),
      ]
    },
    {
      rowId: "additional-invoice",
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell("Additional Invoice", "padding-left-lg",)),
        numberCell(billingData.additional_invoice),
        numberCell(billingData.additional_invoice),
        numberCell(billingData.additional_invoice),
      ]
    },
    {
      rowId: "billing-total",
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell("Billing (Total)", "padding-left-lg font-bold")),
        nonEditable(numberCell(
          getBillingTotal(billingData),
          "disabled font-bold",
          { color: "#1eROW_HEIGHTaf" }
        )),
        nonEditable(numberCell(
          getBillingTotal(billingData),
          "disabled font-bold",
          { color: "#1eROW_HEIGHTaf" }
        )),
        nonEditable(numberCell(
          getBillingTotal(billingData),
          "disabled font-bold",
          { color: "#1eROW_HEIGHTaf" }
        )),
      ]
    },

    {
      rowId: "direct-expenses",
      height: HEADING_ROW_HEIGHT,
      cells: [
        nonEditable(bottomLine(textCell("Direct Expenses", "align-items-end text-lg text-center font-bold", { color: "#ea580c" }))),
        nonEditable(bottomLine(emptyTextCell)),
        nonEditable(bottomLine(emptyTextCell)),
        nonEditable(bottomLine(emptyTextCell)),
      ]
    },
    {
      rowId: "cogs",
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell("CoGS", "padding-left-lg",)),
        numberCell(directExpensesData.cogs),
        numberCell(directExpensesData.cogs),
        numberCell(directExpensesData.cogs),
      ]
    },
    {
      rowId: "packing-and-forwarding",
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell("Packing & Forwarding", "padding-left-lg",)),
        numberCell(directExpensesData.packing_and_forwarding),
        numberCell(directExpensesData.packing_and_forwarding),
        numberCell(directExpensesData.packing_and_forwarding),
      ]
    },
    {
      rowId: "travel-expenses",
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell("Travel Expenses", "padding-left-lg",)),
        numberCell(directExpensesData.travel_expenses),
        numberCell(directExpensesData.travel_expenses),
        numberCell(directExpensesData.travel_expenses),
      ]
    },
    {
      rowId: "travel-allowances",
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell("Travel Allowances", "padding-left-lg",)),
        numberCell(directExpensesData.travel_allowances),
        numberCell(directExpensesData.travel_allowances),
        numberCell(directExpensesData.travel_allowances),
      ]
    },
    {
      rowId: "commissioning",
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell("Commissioning", "padding-left-lg",)),
        numberCell(directExpensesData.commissioning),
        numberCell(directExpensesData.commissioning),
        numberCell(directExpensesData.commissioning),
      ]
    },
    {
      rowId: "programming-outsourced",
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell("Programming (Outsourced)", "padding-left-lg",)),
        numberCell(directExpensesData.programming_outsourced),
        numberCell(directExpensesData.programming_outsourced),
        numberCell(directExpensesData.programming_outsourced),
      ]
    },
    {
      rowId: "installation-subcontract",
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell("Installation (Sub-Contract)", "padding-left-lg",)),
        numberCell(directExpensesData.installation_subcontract),
        numberCell(directExpensesData.installation_subcontract),
        numberCell(directExpensesData.installation_subcontract),
      ]
    },
    {
      rowId: "extended-warranty-cost",
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell("Extended Warranty (Cost)", "padding-left-lg",)),
        numberCell(directExpensesData.extended_warranty_cost),
        numberCell(directExpensesData.extended_warranty_cost),
        numberCell(directExpensesData.extended_warranty_cost),
      ]
    },
    {
      rowId: "miscellaneous-direct-expense",
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell("Miscellaneous (Direct Expense)", "padding-left-lg",)),
        numberCell(directExpensesData.miscellaneous_direct_expense),
        numberCell(directExpensesData.miscellaneous_direct_expense),
        numberCell(directExpensesData.miscellaneous_direct_expense),
      ]
    },
    {
      rowId: "total-direct-expenses",
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell("Direct Expenses (Total)", "padding-left-lg font-bold",)),
        nonEditable(numberCell(
          getTotalDirectExpenses(directExpensesData),
          "disabled font-bold", { color: "#ea580c" }
        )),
        nonEditable(numberCell(
          getTotalDirectExpenses(directExpensesData),
          "disabled font-bold", { color: "#ea580c" }
        )),
        nonEditable(numberCell(
          getTotalDirectExpenses(directExpensesData),
          "disabled font-bold", { color: "#ea580c" }
        )),
      ]
    },

    {
      rowId: "gross-profit",
      height: HEADING_ROW_HEIGHT,
      cells: [
        nonEditable(bottomLine(textCell("Gross Profit", "align-items-end text-lg text-center font-bold", { color: "#15803d" }))),
        nonEditable(bottomLine(emptyTextCell)),
        nonEditable(bottomLine(emptyTextCell)),
        nonEditable(bottomLine(emptyTextCell)),
      ]
    },
    {
      rowId: "gross-profit-amount",
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell("Gross Profit (Amount)", "padding-left-lg",)),
        nonEditable(numberCell(getGrossProfitAmount(billingData, directExpensesData), "font-bold disabled")),
        nonEditable(numberCell(getGrossProfitAmount(billingData, directExpensesData), "font-bold disabled")),
        nonEditable(numberCell(getGrossProfitAmount(billingData, directExpensesData), "font-bold disabled")),
      ]
    },
    {
      rowId: "gross-profit-percent",
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell("Gross Profit (Percent)", "padding-left-lg",)),
        nonEditable(percentCell(
          getGrossProfitPercent(billingData, directExpensesData),
          "disabled font-bold")),
        nonEditable(percentCell(
          getGrossProfitPercent(billingData, directExpensesData),
          "disabled font-bold")),
        nonEditable(percentCell(
          getGrossProfitPercent(billingData, directExpensesData),
          "disabled font-bold")),
      ]
    },

    {
      rowId: "indirect-expenses",
      height: HEADING_ROW_HEIGHT,
      cells: [
        nonEditable(bottomLine(textCell("Indirect Expenses", "align-items-end text-lg text-center font-bold", { color: "#e13e13" }))),
        nonEditable(bottomLine(emptyTextCell)),
        nonEditable(bottomLine(emptyTextCell)),
        nonEditable(bottomLine(emptyTextCell)),
      ]
    },
    {
      rowId: "investor-profit-share-percent",
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell("Investor Profit Share (Percent)", "padding-left-lg",)),
        percentCell(investorProfitSharePercent),
        percentCell(investorProfitSharePercent),
        percentCell(investorProfitSharePercent),
      ]
    },
    {
      rowId: "investor-profit-share-amount",
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell("Investor Profit Share (Amount)", "padding-left-lg",)),
        nonEditable(numberCell(getInvestorProfitShareAmount(billingData, directExpensesData, investorProfitSharePercent), "disabled")),
        nonEditable(numberCell(getInvestorProfitShareAmount(billingData, directExpensesData, investorProfitSharePercent), "disabled")),
        nonEditable(numberCell(getInvestorProfitShareAmount(billingData, directExpensesData, investorProfitSharePercent), "disabled")),
      ]
    },
    {
      rowId: "miscellaneous-indirect-expense",
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell("Miscellaneous (Indirect Expense)", "padding-left-lg",)),
        numberCell(miscellaneousIndirectExpense),
        numberCell(miscellaneousIndirectExpense),
        numberCell(miscellaneousIndirectExpense),
      ]
    },
    {
      rowId: "total-indirect-expenses",
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell("Indirect Expenses (Total)", "padding-left-lg font-bold",)),
        nonEditable(numberCell(getTotalIndirectExpenses(billingData, directExpensesData, investorProfitSharePercent, miscellaneousIndirectExpense), "disabled font-bold", { color: "#e13e13" })),
        nonEditable(numberCell(getTotalIndirectExpenses(billingData, directExpensesData, investorProfitSharePercent, miscellaneousIndirectExpense), "disabled font-bold", { color: "#e13e13" })),
        nonEditable(numberCell(getTotalIndirectExpenses(billingData, directExpensesData, investorProfitSharePercent, miscellaneousIndirectExpense), "disabled font-bold", { color: "#e13e13" })),
      ]
    },

    {
      rowId: "total-expenses",
      height: HEADING_ROW_HEIGHT,
      cells: [
        nonEditable(textCell("Total Expenses", "align-items-end text-lg text-center font-bold", { color: "#e13e13" })),
        nonEditable(numberCell(getTotalExpenses(billingData, directExpensesData, investorProfitSharePercent, miscellaneousIndirectExpense), "disabled text-lg font-bold", { color: "#e13e13" })),
        nonEditable(numberCell(getTotalExpenses(billingData, directExpensesData, investorProfitSharePercent, miscellaneousIndirectExpense), "disabled text-lg font-bold", { color: "#e13e13" })),
        nonEditable(numberCell(getTotalExpenses(billingData, directExpensesData, investorProfitSharePercent, miscellaneousIndirectExpense), "disabled text-lg font-bold", { color: "#e13e13" })),
      ]
    },

    {
      rowId: "net-profit-loss",
      height: HEADING_ROW_HEIGHT,
      cells: [
        nonEditable(textCell("Net Profit/Loss", "align-items-end text-lg text-center font-bold", { color: "#336699" })),
        nonEditable(numberCell(getNetProfitLoss(billingData, directExpensesData, investorProfitSharePercent, miscellaneousIndirectExpense), "disabled text-lg font-bold", { color: "#336699" })),
        nonEditable(numberCell(getNetProfitLoss(billingData, directExpensesData, investorProfitSharePercent, miscellaneousIndirectExpense), "disabled text-lg font-bold", { color: "#336699" })),
        nonEditable(numberCell(getNetProfitLoss(billingData, directExpensesData, investorProfitSharePercent, miscellaneousIndirectExpense), "disabled text-lg font-bold", { color: "#336699" })),
      ]
    },
    {
      rowId: "net-profit-loss-percent",
      height: HEADING_ROW_HEIGHT,
      cells: [
        nonEditable(textCell("Net Profit/Loss (Percent)", "align-items-end text-lg text-center font-bold rounded-bl", { color: "#336699" })),
        nonEditable(percentCell(getNetProfitLossPercent(billingData, directExpensesData, investorProfitSharePercent, miscellaneousIndirectExpense), "disabled text-lg font-bold rounded-br", { color: "#336699" })),
        nonEditable(percentCell(getNetProfitLossPercent(billingData, directExpensesData, investorProfitSharePercent, miscellaneousIndirectExpense), "disabled text-lg font-bold rounded-br", { color: "#336699" })),
        nonEditable(percentCell(getNetProfitLossPercent(billingData, directExpensesData, investorProfitSharePercent, miscellaneousIndirectExpense), "disabled text-lg font-bold rounded-br", { color: "#336699" })),
      ]
    },
  ];

function CostControlReportTable() {
  const [purchaseOrderData, setPurchaseOrderData] = useState(getPurchaseOrderData());
  const [billingData, setBillingData] = useState(getBillingData());
  const [directExpensesData, setDirectExpensesData] = useState(getDirectExpenses());
  const [investorProfitSharePercent, setInvestorProfitSharePercent] = useState(getInvestoreProfitSharePercent())
  const [miscellaneousIndirectExpense, setMiscellaneousIndirectExpense] = useState(getMiscellaneousIndirectExpense())

  const rows = getRows(
    purchaseOrderData,
    billingData,
    directExpensesData,
    investorProfitSharePercent,
    miscellaneousIndirectExpense
  );
  const columns = getColumns();

  const handleChanges = (changes) => {
    changes.forEach((change) => {
      if (change.type === "number") {
        if (change.rowId === "po-value" && change.columnId === "estimated-value") {
          setPurchaseOrderData(prevData => ({ ...prevData, po_value: change.newCell.value }));
        } else if (change.rowId === "additional-po-value" && change.columnId === "estimated-value") {
          setPurchaseOrderData(prevData => ({ ...prevData, additional_po_value: change.newCell.value }));
        } else if (change.rowId === "invoice-supply" && change.columnId === "estimated-value") {
          setBillingData(prevData => ({ ...prevData, invoice_supply: change.newCell.value }));
        } else if (change.rowId === "invoice-service" && change.columnId === "estimated-value") {
          setBillingData(prevData => ({ ...prevData, invoice_service: change.newCell.value }));
        } else if (change.rowId === "additional-invoice" && change.columnId === "estimated-value") {
          setBillingData(prevData => ({ ...prevData, additional_invoice: change.newCell.value }));
        } else if (change.rowId === "cogs" && change.columnId === "estimated-value") {
          setDirectExpensesData(prevData => ({ ...prevData, cogs: change.newCell.value }));
        } else if (change.rowId === "packing-and-forwarding" && change.columnId === "estimated-value") {
          setDirectExpensesData(prevData => ({ ...prevData, packing_and_forwarding: change.newCell.value }));
        } else if (change.rowId === "travel-expenses" && change.columnId === "estimated-value") {
          setDirectExpensesData(prevData => ({ ...prevData, travel_expenses: change.newCell.value }));
        } else if (change.rowId === "travel-allowances" && change.columnId === "estimated-value") {
          setDirectExpensesData(prevData => ({ ...prevData, travel_allowances: change.newCell.value }));
        } else if (change.rowId === "commissioning" && change.columnId === "estimated-value") {
          setDirectExpensesData(prevData => ({ ...prevData, commissioning: change.newCell.value }));
        } else if (change.rowId === "programming-outsourced" && change.columnId === "estimated-value") {
          setDirectExpensesData(prevData => ({ ...prevData, programming_outsourced: change.newCell.value }));
        } else if (change.rowId === "installation-subcontract" && change.columnId === "estimated-value") {
          setDirectExpensesData(prevData => ({ ...prevData, installation_subcontract: change.newCell.value }));
        } else if (change.rowId === "extended-warranty-cost" && change.columnId === "estimated-value") {
          setDirectExpensesData(prevData => ({ ...prevData, extended_warranty_cost: change.newCell.value }));
        } else if (change.rowId === "miscellaneous-direct-expense" && change.columnId === "estimated-value") {
          setDirectExpensesData(prevData => ({ ...prevData, miscellaneous_direct_expense: change.newCell.value }));
        } else if (change.rowId === "investor-profit-share-percent" && change.columnId === "estimated-value") {
          setInvestorProfitSharePercent(change.newCell.value)
        } else if (change.rowId === "miscellaneous-indirect-expense" && change.columnId === "estimated-value") {
          setMiscellaneousIndirectExpense(change.newCell.value)
        }
      }
    })
  };

  return (
    <ReactGrid rows={rows} columns={columns} onCellsChanged={handleChanges} />
  )
}

export default CostControlReportTable;