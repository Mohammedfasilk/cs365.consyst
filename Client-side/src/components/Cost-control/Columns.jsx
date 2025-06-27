import { Checkbox } from "../UI/Checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../UI/Dropdown-menu"
import { Button } from "../UI/Button"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Badge } from "../UI/Badge"
import { useState } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../UI/Alert_Dialog"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import {
  setSaved
} from "../../Redux/Slices/costControlsheet";
import { useToast } from "../../Hooks/use-toast"
import { CircleCheckIcon } from "lucide-react"

const Actions = ({ row , onDelete}) => {
  const {toast} = useToast();
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const {choosenProject} = useSelector((state) => state.costControlSheet);
  const {saved} = useSelector((state) => state.costControlSheet);
  const month = row.getValue("month");

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* <DropdownMenuItem>Release</DropdownMenuItem>
          <DropdownMenuItem>Approve</DropdownMenuItem>
          <DropdownMenuItem>Close Project</DropdownMenuItem> */}
          <DropdownMenuItem onClick={() => setAlertOpen(true)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete <b>{month} budget</b> and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-[var(--csred)] hover:bg-[var(--csred)]/90"
                onClick={async () => {               
                try {
                  await axios.post(
                    `${import.meta.env.VITE_CS365_URI}/api/cost-control/monthly-budget/delete`,
                    {month:month,project_name:row.getValue('project_name')}
                  );
                  onDelete();
                  dispatch(setSaved(!saved));

                  toast({
                    title: `${month} Budget Removed`,
                    description: "The Budget has been successfully removed.",
                    icon: <CircleCheckIcon className="mr-4" color="green" />,
                  });
                } catch (error) {
                  console.error("Error deleting Budget:", error);
                  // Optional: show error toast
                }
              }}
              
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export const columns = (fetchData)=> [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "project_name",
    header: "Project",
  },
  {
    accessorKey: "month",
    header: "Month",
  },
  {
    accessorKey: "project_description",
    header: "Project Description",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant="secondary"
        className={`bg-gray-200 ${row.getValue("status") === "submitted" ? "bg-blue-200" : ""}`}
      >
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    accessorKey: "stage",
    header: "Stage",
    cell: ({ row }) => (
      <Badge
        variant="default"
        className={`bg-gray-500 ${row.getValue("stage") === "approved" ? "bg-green-600" : ""}`}
      >
        {row.getValue("stage")}
      </Badge>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => <Actions row={row} onDelete={fetchData}/>
  },
]
