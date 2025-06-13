import { useState } from "react";
import { ReactGrid } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { bottomLine, emptyTextCell, headerCell, nonEditable, numberCell, percentCell, textCell } from "../lib/Cells";
import { Button } from "./UI/Button";
// import { useToast } from "@/hooks/use-toast";
import { CircleCheckIcon, CircleXIcon } from "lucide-react";
import axios from 'axios'
import { useSelector } from "react-redux";

const ROW_HEIGHT = 25;
const HEADING_ROW_HEIGHT = 40;

const getPurchaseOrderData = (project) => ({
  po_value: project?.budget?.po_value || 0,
  additional_po_value: project?.budget?.additional_po_value || 0
});

const getBillingData = (project) => ({
  invoice_supply: project?.budget?.invoice_supply || 0,
  invoice_service: project?.budget?.invoice_service || 0,
  additional_invoice: project?.budget?.additional_invoice || 0
});

const getDirectExpenses = (project) => ({
  cogs: project?.budget?.cogs || 0,
  packing_and_forwarding: project?.budget?.packing_and_forwarding || 0,
  travel_expenses: project?.budget?.travel_expenses || 0,
  travel_allowances: project?.budget?.travel_allowances || 0,
  commissioning: project?.budget?.commissioning || 0,
  programming_outsourced: project?.budget?.programming_outsourced || 0,
  installation_subcontract: project?.budget?.installation_subcontract || 0,
  extended_warranty_cost: project?.budget?.extended_warranty_cost || 0,
  miscellaneous_direct_expense: project?.budget?.miscellaneous_direct_expense || 0,
});

const getInvestorProfitSharePercent = (project) => project?.budget?.investor_profit_share_percent || 0;
const getMiscellaneousIndirectExpense = (project) => project?.budget?.miscellaneous_indirect_expense || 0;

const getTotalPoValue = (purchaseOrderData) => {
  return purchaseOrderData.po_value + purchaseOrderData.additional_po_value;
};
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
  miscellaneousIndirectExpense
) => [
  headerRow,
  {
    rowId: "purchase-order",
    height: HEADING_ROW_HEIGHT,
    cells: [
      nonEditable(bottomLine(textCell("Purchase Order", "align-items-end text-lg text-center font-bold", { color: "#336699" }))),
      nonEditable(bottomLine(emptyTextCell))
    ]
  },
  {
    rowId: "po-value",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("PO Value", "padding-left-lg")),
      numberCell(purchaseOrderData.po_value)
    ]
  },
  {
    rowId: "additional-po-value",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Additional PO Value", "padding-left-lg")),
      numberCell(purchaseOrderData.additional_po_value)
    ]
  },
  {
    rowId: "total-po-value",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("PO Value (Total)", "padding-left-lg font-bold")),
      nonEditable(numberCell(getTotalPoValue(purchaseOrderData), "disabled font-bold", { color: "#336699" }))
    ]
  },
  {
    rowId: "billing",
    height: HEADING_ROW_HEIGHT,
    cells: [
      nonEditable(bottomLine(textCell("Billing", "align-items-end text-lg text-center font-bold", { color: "#1e40af" }))),
      nonEditable(bottomLine(emptyTextCell))
    ]
  },
  {
    rowId: "invoice-supply",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Invoice (Supply)", "padding-left-lg")),
      numberCell(billingData.invoice_supply)
    ]
  },
  {
    rowId: "invoice-service",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Invoice (Service)", "padding-left-lg")),
      numberCell(billingData.invoice_service)
    ]
  },
  {
    rowId: "additional-invoice",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Additional Invoice", "padding-left-lg")),
      numberCell(billingData.additional_invoice)
    ]
  },
  {
    rowId: "billing-total",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Billing (Total)", "padding-left-lg font-bold")),
      nonEditable(numberCell(getBillingTotal(billingData), "disabled font-bold", { color: "#1e40af" }))
    ]
  },
  {
    rowId: "direct-expenses",
    height: HEADING_ROW_HEIGHT,
    cells: [
      nonEditable(bottomLine(textCell("Direct Expenses", "align-items-end text-lg text-center font-bold", { color: "#ea580c" }))),
      nonEditable(bottomLine(emptyTextCell))
    ]
  },
  {
    rowId: "cogs",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("CoGS", "padding-left-lg")),
      numberCell(directExpensesData.cogs)
    ]
  },
  {
    rowId: "packing-and-forwarding",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Packing & Forwarding", "padding-left-lg")),
      numberCell(directExpensesData.packing_and_forwarding)
    ]
  },
  {
    rowId: "travel-expenses",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Travel Expenses", "padding-left-lg")),
      numberCell(directExpensesData.travel_expenses)
    ]
  },
  {
    rowId: "travel-allowances",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Travel Allowances", "padding-left-lg")),
      numberCell(directExpensesData.travel_allowances)
    ]
  },
  {
    rowId: "commissioning",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Commissioning", "padding-left-lg")),
      numberCell(directExpensesData.commissioning)
    ]
  },
  {
    rowId: "programming-outsourced",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Programming (Outsourced)", "padding-left-lg")),
      numberCell(directExpensesData.programming_outsourced)
    ]
  },
  {
    rowId: "installation-subcontract",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Installation (Sub-Contract)", "padding-left-lg")),
      numberCell(directExpensesData.installation_subcontract)
    ]
  },
  {
    rowId: "extended-warranty-cost",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Extended Warranty (Cost)", "padding-left-lg")),
      numberCell(directExpensesData.extended_warranty_cost)
    ]
  },
  {
    rowId: "miscellaneous-direct-expense",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Miscellaneous (Direct Expense)", "padding-left-lg")),
      numberCell(directExpensesData.miscellaneous_direct_expense)
    ]
  },
  {
    rowId: "total-direct-expenses",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Direct Expenses (Total)", "padding-left-lg font-bold")),
      nonEditable(numberCell(getTotalDirectExpenses(directExpensesData), "disabled font-bold", { color: "#ea580c" }))
    ]
  },
  {
    rowId: "gross-profit",
    height: HEADING_ROW_HEIGHT,
    cells: [
      nonEditable(bottomLine(textCell("Gross Profit", "align-items-end text-lg text-center font-bold", { color: "#15803d" }))),
      nonEditable(bottomLine(emptyTextCell))
    ]
  },
  {
    rowId: "gross-profit-amount",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Gross Profit (Amount)", "padding-left-lg")),
      nonEditable(numberCell(getGrossProfitAmount(billingData, directExpensesData), "font-bold disabled"))
    ]
  },
  {
    rowId: "gross-profit-percent",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Gross Profit (Percent)", "padding-left-lg")),
      nonEditable(percentCell(getGrossProfitPercent(billingData, directExpensesData), "disabled font-bold"))
    ]
  },
  {
    rowId: "indirect-expenses",
    height: HEADING_ROW_HEIGHT,
    cells: [
      nonEditable(bottomLine(textCell("Indirect Expenses", "align-items-end text-lg text-center font-bold", { color: "#e13e13" }))),
      nonEditable(bottomLine(emptyTextCell))
    ]
  },
  {
    rowId: "investor-profit-share-percent",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Investor Profit Share (Percent)", "padding-left-lg")),
      percentCell(investorProfitSharePercent)
    ]
  },
  {
    rowId: "investor-profit-share-amount",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Investor Profit Share (Amount)", "padding-left-lg")),
      nonEditable(numberCell(getInvestorProfitShareAmount(billingData, directExpensesData, investorProfitSharePercent), "disabled"))
    ]
  },
  {
    rowId: "miscellaneous-indirect-expense",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Miscellaneous (Indirect Expense)", "padding-left-lg")),
      numberCell(miscellaneousIndirectExpense)
    ]
  },
  {
    rowId: "total-indirect-expenses",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Indirect Expenses (Total)", "padding-left-lg font-bold")),
      nonEditable(numberCell(getTotalIndirectExpenses(billingData, directExpensesData, investorProfitSharePercent, miscellaneousIndirectExpense), "disabled font-bold", { color: "#e13e13" }))
    ]
  },
  {
    rowId: "total-expenses",
    height: HEADING_ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Total Expenses", "align-items-end text-lg text-center font-bold", { color: "#e13e13" })),
      nonEditable(numberCell(getTotalExpenses(billingData, directExpensesData, investorProfitSharePercent, miscellaneousIndirectExpense), "disabled text-lg font-bold", { color: "#e13e13" }))
    ]
  },
  {
    rowId: "net-profit-loss",
    height: HEADING_ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Net Profit/Loss", "align-items-end text-lg text-center font-bold", { color: "#336699" })),
      nonEditable(numberCell(getNetProfitLoss(billingData, directExpensesData, investorProfitSharePercent, miscellaneousIndirectExpense), "disabled text-lg font-bold", { color: "#336699" }))
    ]
  },
  {
    rowId: "net-profit-loss-percent",
    height: HEADING_ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Net Profit/Loss (Percent)", "align-items-end text-lg text-center font-bold", { color: "#336699" })),
      nonEditable(percentCell(getNetProfitLossPercent(billingData, directExpensesData, investorProfitSharePercent, miscellaneousIndirectExpense), "disabled text-lg font-bold", { color: "#336699" }))
    ]
  }
];


const getColumns = () => [
  { columnId: "titlesColumn", width: 300 },
  { columnId: "estimated-value", width: 150 }
];


const headerRow = {
  rowId: "header",
  height: HEADING_ROW_HEIGHT,
  cells: [
    headerCell("Accounting Head", "justify-content-center rounded-tl"),
    headerCell("Estimated Value", "justify-content-center rounded-tr")
  ]
};

// (All calculations like getBillingTotal, getTotalExpenses etc. remain unchanged... you can paste them in directly from your original)

function CostEstimationTable({ project }) {

  
  const [purchaseOrderData, setPurchaseOrderData] = useState(getPurchaseOrderData(project));
  const [billingData, setBillingData] = useState(getBillingData(project));
  const [directExpensesData, setDirectExpensesData] = useState(getDirectExpenses(project));
  const [investorProfitSharePercent, setInvestorProfitSharePercent] = useState(getInvestorProfitSharePercent(project));
  const [miscellaneousIndirectExpense, setMiscellaneousIndirectExpense] = useState(getMiscellaneousIndirectExpense(project));

  const selectedProjectName = useSelector((state)=>state.selectedProject.selectedProjectName)
//   const { toast } = useToast();

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
        const val = change.newCell.value;

        const update = (setter, key) => setter(prev => ({ ...prev, [key]: val }));

        switch (change.rowId) {
          case "po-value": update(setPurchaseOrderData, "po_value"); break;
          case "additional-po-value": update(setPurchaseOrderData, "additional_po_value"); break;
          case "invoice-supply": update(setBillingData, "invoice_supply"); break;
          case "invoice-service": update(setBillingData, "invoice_service"); break;
          case "additional-invoice": update(setBillingData, "additional_invoice"); break;
          case "cogs": update(setDirectExpensesData, "cogs"); break;
          case "packing-and-forwarding": update(setDirectExpensesData, "packing_and_forwarding"); break;
          case "travel-expenses": update(setDirectExpensesData, "travel_expenses"); break;
          case "travel-allowances": update(setDirectExpensesData, "travel_allowances"); break;
          case "commissioning": update(setDirectExpensesData, "commissioning"); break;
          case "programming-outsourced": update(setDirectExpensesData, "programming_outsourced"); break;
          case "installation-subcontract": update(setDirectExpensesData, "installation_subcontract"); break;
          case "extended-warranty-cost": update(setDirectExpensesData, "extended_warranty_cost"); break;
          case "miscellaneous-direct-expense": update(setDirectExpensesData, "miscellaneous_direct_expense"); break;
          case "investor-profit-share-percent": setInvestorProfitSharePercent(val); break;
          case "miscellaneous-indirect-expense": setMiscellaneousIndirectExpense(val); break;
        }
      }
    });
  };

  const handleSubmit = async () => {
    const data = {
      ...purchaseOrderData,
      total_po_value: getTotalPoValue(purchaseOrderData),
      ...billingData,
      billing_total: getBillingTotal(billingData),
      ...directExpensesData,
      total_direct_expenses: getTotalDirectExpenses(directExpensesData),
      gross_profit_amount: getGrossProfitAmount(billingData, directExpensesData),
      gross_profit_percent: getGrossProfitPercent(billingData, directExpensesData),
      investor_profit_share_percent: investorProfitSharePercent,
      investor_profit_share_amount: getInvestorProfitShareAmount(billingData, directExpensesData, investorProfitSharePercent),
      miscellaneous_indirect_expense: miscellaneousIndirectExpense,
      total_indirect_expenses: getTotalIndirectExpenses(billingData, directExpensesData, investorProfitSharePercent, miscellaneousIndirectExpense),
      total_expenses: getTotalExpenses(billingData, directExpensesData, investorProfitSharePercent, miscellaneousIndirectExpense),
      net_profit_loss: getNetProfitLoss(billingData, directExpensesData, investorProfitSharePercent, miscellaneousIndirectExpense),
      net_profit_loss_percent: getNetProfitLossPercent(billingData, directExpensesData, investorProfitSharePercent, miscellaneousIndirectExpense) || 0
    };
    console.log(data);

    const updateProject = async (data)=>{
      try{

        const res = await axios.post(`${import.meta.env.VITE_CS365_URI}/api/projects/budget`,{project_name:selectedProjectName,budget:data})

        const result = res.data

        if (result?.error) {
      toast({
        title: "Project Not Saved",
        description: "There was an error saving the project.",
        variant: "destructive",
        icon: <CircleXIcon className="mr-4" color="red" />
      });
      return;
    }
    toast({
      title: "Project Saved",
      description: "The project has been successfully saved.",
      icon: <CircleCheckIcon className="mr-4" color="green" />
    });
      }catch(error) {
         console.error("Error Saving Budget:", error);
      }
    }

    
    updateProject(data);
    
  };

  return (
    <>
      <div className="flex justify-between">
        <h1>Estimation Table</h1>
        <Button className="bg-[var(--csblue)] hover:bg-[var(--csblue)]/90 px-8" onClick={handleSubmit}>
          Save
        </Button>
      </div>
      <div className="mt-4 grid w-full grid-cols-[1fr_2fr_1fr] gap-6">
        <div className="budget-sheet col-span-2">
          <ReactGrid rows={rows} columns={columns} onCellsChanged={handleChanges} />
        </div>
      </div>
    </>
  );
}

export default CostEstimationTable;
