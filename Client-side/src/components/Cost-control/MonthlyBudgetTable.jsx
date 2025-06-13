
import {
  bottomLine,
  emptyTextCell,
  headerCell,
  nonEditable,
  numberCell,
  textCell
} from "../../lib/Cells";
import {  ReactGrid } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { useState } from "react";

const ROW_HEIGHT = 25;
const HEADING_ROW_HEIGHT = 40;

const getPurchaseOrderData = () => {
  return {
    po_value: 333,
    additional_po_value: 333,
  };
};

const getBillingData = () => {
  return {
    invoice_supply: 50000,
    invoice_service: 25000,
    additional_invoice: 0,
  };
};

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

const getColumns = () => [
  {
    columnId: "titles-column",
    width: 300,
  },
  { columnId: "this-month", width: 150 },
  { columnId: "projected", width: 150 },
];

const headerRow = {
  rowId: "header",
  height: HEADING_ROW_HEIGHT,
  cells: [
    headerCell("Accounting Head", "justify-content-center rounded-tl"),
    headerCell("This Month", "justify-content-center"),
    headerCell("Projected", "justify-content-center rounded-tr"),
  ],
};

const getTotalPoValue = (purchaseOrderData) => {
  return purchaseOrderData.po_value + purchaseOrderData.additional_po_value;
};

const getBillingTotal = (billingData) => {
  return billingData.invoice_supply + billingData.invoice_service + billingData.additional_invoice;
};

const getTotalDirectExpenses = (directExpensesData) => {
  return Object.values(directExpensesData).reduce((total, expense) => total + expense, 0);
};

const getRows = (purchaseOrderData, billingData, directExpensesData) => {
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
    value,
    isEditable = true,
    isBold = false,
    color,
    isLastRow = false
  ) => ({
    rowId: label.toLowerCase().replace(/\s+/g, "-"),
    height: ROW_HEIGHT,
    cells: [
      nonEditable(
        textCell(
          label,
          "padding-left-lg" + (isBold ? " font-bold" : "") + (isLastRow ? " rounded-bl" : "")
        )
      ),
      isEditable
        ? numberCell(typeof value === "string" ? parseFloat(value) : value, isLastRow ? " rounded-br" : "")
        : nonEditable(
            numberCell(
              typeof value === "string" ? parseFloat(value) : value,
              "disabled" + (isBold ? " font-bold" : "") + (isLastRow ? " rounded-br" : ""),
              color ? { color } : {}
            )
          ),
      isEditable
        ? numberCell(typeof value === "string" ? parseFloat(value) : value, isLastRow ? " rounded-br" : "")
        : nonEditable(
            numberCell(
              typeof value === "string" ? parseFloat(value) : value,
              "disabled" + (isBold ? " font-bold" : "") + (isLastRow ? " rounded-br" : ""),
              color ? { color } : {}
            )
          ),
    ],
  });

  const purchaseOrderRows = [
    createSectionHeader("Purchase Order", "#336699"),
    createDataRow("PO Value", purchaseOrderData.po_value, false),
    createDataRow("Additional PO Value", purchaseOrderData.additional_po_value),
    createDataRow("PO Value (Total)", getTotalPoValue(purchaseOrderData), false, true, "#336699"),
  ];

  const billingRows = [
    createSectionHeader("Billing", "#1e3a8a"),
    createDataRow("Invoice (Supply)", billingData.invoice_supply),
    createDataRow("Invoice (Service)", billingData.invoice_service),
    createDataRow("Additional Invoice", billingData.additional_invoice),
    createDataRow("Billing (Total)", getBillingTotal(billingData), false, true, "#1e3a8a"),
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
    createDataRow(
      "Direct Expenses (Total)",
      getTotalDirectExpenses(directExpensesData),
      false,
      true,
      "#ea580c",
      true
    ),
  ];

  return [headerRow, ...purchaseOrderRows, ...billingRows, ...directExpensesRows];
};

function MonthlyBudgetTable() {
  const [purchaseOrderData, setPurchaseOrderData] = useState(getPurchaseOrderData());
  const [billingData, setBillingData] = useState(getBillingData());
  const [directExpensesData, setDirectExpensesData] = useState(getDirectExpenses());

  const rows = getRows(purchaseOrderData, billingData, directExpensesData);
  const columns = getColumns();

  const handleChanges = (changes) => {
    const updateFunctions = {
      "po-value": (value) => setPurchaseOrderData((prev) => ({ ...prev, po_value: value })),
      "additional-po-value": (value) =>
        setPurchaseOrderData((prev) => ({ ...prev, additional_po_value: value })),
      "invoice-supply": (value) => setBillingData((prev) => ({ ...prev, invoice_supply: value })),
      "invoice-service": (value) => setBillingData((prev) => ({ ...prev, invoice_service: value })),
      "additional-invoice": (value) =>
        setBillingData((prev) => ({ ...prev, additional_invoice: value })),
      cogs: (value) => setDirectExpensesData((prev) => ({ ...prev, cogs: value })),
      "packing-and-forwarding": (value) =>
        setDirectExpensesData((prev) => ({ ...prev, packing_and_forwarding: value })),
      "travel-expenses": (value) =>
        setDirectExpensesData((prev) => ({ ...prev, travel_expenses: value })),
      "travel-allowances": (value) =>
        setDirectExpensesData((prev) => ({ ...prev, travel_allowances: value })),
      commissioning: (value) => setDirectExpensesData((prev) => ({ ...prev, commissioning: value })),
      "programming-outsourced": (value) =>
        setDirectExpensesData((prev) => ({ ...prev, programming_outsourced: value })),
      "installation-subcontract": (value) =>
        setDirectExpensesData((prev) => ({ ...prev, installation_subcontract: value })),
      "extended-warranty-cost": (value) =>
        setDirectExpensesData((prev) => ({ ...prev, extended_warranty_cost: value })),
      "miscellaneous-direct-expense": (value) =>
        setDirectExpensesData((prev) => ({ ...prev, miscellaneous_direct_expense: value })),
    };

    changes.forEach((change) => {
      if (
        change.type === "number" &&
        change.columnId === "estimated-value" &&
        updateFunctions[change.rowId]
      ) {
        updateFunctions[change.rowId](change.newCell.value);
      }
    });
  };

  return <ReactGrid rows={rows} columns={columns} onCellsChanged={handleChanges} />;
}

export default MonthlyBudgetTable;
