
// Sample shape of opportunity (for reference, not used directly in JSX)
/// const opportunity = {
///   title: "",
///   customer_name: "",
///   country: "",
///   currency: "",
///   sales_stage: "",
///   opportunity_amount: 0,
/// };

import { Checkbox } from "../UI/Checkbox";

export const opportunityDataColumns = [
  
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "customer_name",
    header: "Customer",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "sales_stage",
    header: "Stage",
  },
  {
    accessorKey: "opportunity_amount",
    header: () => <div className="text-right w-full">Value</div>,
    cell: ({ row }) => {
      const value = row.getValue("opportunity_amount");
      return typeof value === "number" ? (
        <div className="text-right">
          {value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      ) : null;
    },
  },
];