import {
  bottomLine,
  emptyTextCell,
  headerCell,
  nonEditable,
  numberCell,
  textCell
} from "../../lib/Cells";
import { ReactGrid } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { useEffect, useState } from "react";

const ROW_HEIGHT = 25;
const HEADING_ROW_HEIGHT = 40;

const getMonthlyData = (project, selectedMonth) => {
  if (!Array.isArray(project?.monthly_cost_control)) return {};
  return project.monthly_cost_control.find(entry => entry.month === selectedMonth) || {};
};

const getPurchaseOrderData = (project, selectedMonth) => {
  const monthlyData = getMonthlyData(project, selectedMonth);
  return {
    po_value: project?.budget?.po_value || 0,
    additional_po_value: monthlyData?.additional_po_value || 0,
  };
};

const getBillingData = (project, selectedMonth) => {
  const monthlyData = getMonthlyData(project, selectedMonth);
  return {
    invoice_supply: monthlyData?.invoice_supply || 0,
    invoice_service: monthlyData?.invoice_service || 0,
    additional_invoice: monthlyData?.additional_invoice || 0,
  };
};

const getDirectExpenses = (project, selectedMonth) => {
  const monthlyData = getMonthlyData(project, selectedMonth);
  return {
    cogs: monthlyData?.cogs || 0,
    packing_and_forwarding: monthlyData?.packing_and_forwarding || 0,
    travel_expenses: monthlyData?.travel_expenses || 0,
    travel_allowances: monthlyData?.travel_allowances || 0,
    commissioning: monthlyData?.commissioning || 0,
    programming_outsourced: monthlyData?.programming_outsourced || 0,
    installation_subcontract: monthlyData?.installation_subcontract || 0,
    extended_warranty_cost: monthlyData?.extended_warranty_cost || 0,
    miscellaneous_direct_expense: monthlyData?.miscellaneous_direct_expense || 0,
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

const getNetProfitLoss = (billingData, directExpensesData) =>
  getBillingTotal(billingData) - getTotalDirectExpenses(directExpensesData);

const getNetProfitLossPercent = (billingData, directExpensesData) => {
  const totalBilling = getBillingTotal(billingData);
  if (totalBilling === 0) return 0;
  return Number(((getNetProfitLoss(billingData, directExpensesData) / totalBilling) * 100).toFixed(2));
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
        ? numberCell(value, isLastRow ? " rounded-br" : "")
        : nonEditable(numberCell(value, "disabled" + (isBold ? " font-bold" : "") + (isLastRow ? " rounded-br" : ""), color ? { color } : {})),
      isEditable
        ? numberCell(value, isLastRow ? " rounded-br" : "")
        : nonEditable(numberCell(value, "disabled" + (isBold ? " font-bold" : "") + (isLastRow ? " rounded-br" : ""), color ? { color } : {})),
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
    createDataRow("Direct Expenses (Total)", getTotalDirectExpenses(directExpensesData), false, true, "#ea580c", true),
  ];

  const netProfitRows = [
    createDataRow("Net Profit/Loss", getNetProfitLoss(billingData, directExpensesData), false, true, "#336699"),
    createDataRow("Net Profit/Loss (Percent)",getNetProfitLossPercent(billingData, directExpensesData), false, true, "#336699"),
  ];  

  return [headerRow, ...purchaseOrderRows, ...billingRows, ...directExpensesRows, ...netProfitRows];
};

function MonthlyBudgetTable({ project, getData, selectedMonth }) {
  const [purchaseOrderData, setPurchaseOrderData] = useState(() =>
    getPurchaseOrderData(project, selectedMonth)
  );
  const [billingData, setBillingData] = useState(() =>
    getBillingData(project, selectedMonth)
  );
  const [directExpensesData, setDirectExpensesData] = useState(() =>
    getDirectExpenses(project, selectedMonth)
  );

  // Re-fetch when project or month changes
  useEffect(() => {
    setPurchaseOrderData(getPurchaseOrderData(project, selectedMonth));
    setBillingData(getBillingData(project, selectedMonth));
    setDirectExpensesData(getDirectExpenses(project, selectedMonth));
  }, [project, selectedMonth]);
  
  const rows = getRows(purchaseOrderData, billingData, directExpensesData);
  const columns = getColumns();

  const handleChanges = (changes) => {
    const updateFunctions = {
      "po-value": (value) => setPurchaseOrderData((prev) => ({ ...prev, po_value: value })),
      "additional-po-value": (value) => setPurchaseOrderData((prev) => ({ ...prev, additional_po_value: value })),
      "invoice-supply": (value) => setBillingData((prev) => ({ ...prev, invoice_supply: value })),
      "invoice-service": (value) => setBillingData((prev) => ({ ...prev, invoice_service: value })),
      "additional-invoice": (value) => setBillingData((prev) => ({ ...prev, additional_invoice: value })),
      cogs: (value) => setDirectExpensesData((prev) => ({ ...prev, cogs: value })),
      "packing-forwarding": (value) => setDirectExpensesData((prev) => ({ ...prev, packing_and_forwarding: value })),
      "travel-expenses": (value) => setDirectExpensesData((prev) => ({ ...prev, travel_expenses: value })),
      "travel-allowances": (value) => setDirectExpensesData((prev) => ({ ...prev, travel_allowances: value })),
      commissioning: (value) => setDirectExpensesData((prev) => ({ ...prev, commissioning: value })),
      "programming-outsourced": (value) => setDirectExpensesData((prev) => ({ ...prev, programming_outsourced: value })),
      "installation-subcontract": (value) => setDirectExpensesData((prev) => ({ ...prev, installation_subcontract: value })),
      "extended-warranty-cost": (value) => setDirectExpensesData((prev) => ({ ...prev, extended_warranty_cost: value })),
      "miscellaneous-direct-expense": (value) => setDirectExpensesData((prev) => ({ ...prev, miscellaneous_direct_expense: value })),
    };

    changes.forEach((change) => {
      if (
        change.type === "number" &&
        change.columnId === "Current" &&
        updateFunctions[change.rowId]
      ) {
        updateFunctions[change.rowId](change.newCell.value);
      }
    });
  };

  const data = {
    month: selectedMonth,
    ...purchaseOrderData,
    total_po_value: getTotalPoValue(purchaseOrderData),
    ...billingData,
    billing_total: getBillingTotal(billingData),
    ...directExpensesData,
    total_direct_expenses: getTotalDirectExpenses(directExpensesData),
    net_profit_loss: getNetProfitLoss(billingData, directExpensesData),
    net_profit_loss_percent: getNetProfitLossPercent(billingData, directExpensesData) || 0
  };

  useEffect(() => {
    getData(data);
  }, [data]);

  return <ReactGrid rows={rows} columns={columns} onCellsChanged={handleChanges} />;
}

export default MonthlyBudgetTable;
