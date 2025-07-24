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
import {setSaved} from "../../Redux/Slices/costControlsheet";
import { useToast } from "../../Hooks/use-toast"
import { CircleCheckIcon } from "lucide-react"
import { useSessionUser } from "../../Hooks/useSessionUser"
import { useSessionRole } from "../../Hooks/useSessionRole"

const Actions = ({ row , onDelete}) => {
  const {toast} = useToast();
  const dispatch = useDispatch();
  const sessionUser = useSessionUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const {choosenProject} = useSelector((state) => state.costControlSheet);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    field: null,
    value: null,
  });
  const {saved} = useSelector((state) => state.costControlSheet);

  const month = row.getValue("month");
  const projectName = row.getValue("project_name");
  const status = row.getValue("status");
  const stage = row.getValue("stage");

  const handleFieldUpdate = async (field, value) => {
    try {
      await axios.post(`${import.meta.env.VITE_CS365_URI}/api/cost-control/monthly-data`, {
        project_name: projectName,
        monthlyData: {
          month,
          [field]: value,
        }
      });
      onDelete(); // refresh table

       const actData = {
                    field: "cost_control",
                    data: {
                      username: sessionUser,
                      date: new Date().toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                      }),
                      activity: `The project ${projectName} "${month}" ${field} is updated to ${value}`,
                      type:`${field} updation`
                    },
                  };
                  const act = await axios.post(
                    `${import.meta.env.VITE_CS365_URI}/api/activity`,
                    actData
                  );
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };

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
          {status === "draft" && (
            <DropdownMenuItem
              onClick={() =>
                setConfirmDialog({
                  open: true,
                  field: "status",
                  value: "approved",
                  label: "Approve Budget",
                })
              }
            >
              Approve
            </DropdownMenuItem>
          )}
          {status === "approved" && (
            <DropdownMenuItem
              onClick={() =>
                setConfirmDialog({
                  open: true,
                  field: "status",
                  value: "draft",
                  label: "Release Budget",
                })
              }
            >
              Release
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => setAlertOpen(true)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Confirm Dialog for Approve/Close/Open */}
      <AlertDialog open={confirmDialog.open} onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will update <b>{month}</b> budget to <b>{confirmDialog.value}</b>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleFieldUpdate(confirmDialog.field, confirmDialog.value, confirmDialog.label);
                setConfirmDialog({ ...confirmDialog, open: false });
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Dialog */}
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete <b>{month} budget</b>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-[var(--csred)] hover:bg-[var(--csred)]/90"
              onClick={async () => {
                try {
                  await axios.post(`${import.meta.env.VITE_CS365_URI}/api/cost-control/monthly-budget/delete`, {
                    month,
                    project_name: projectName,
                  });
                  onDelete();
                  dispatch(setSaved(!saved));

                   const actData = {
                    field: "cost_control",
                    data: {
                      username: sessionUser,
                      date: new Date().toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                      }),
                      activity: `The project "${projectName}" ${month} cost is deleted`,
                      type:'Delete'
                    },
                  };
                  const act = await axios.post(
                    `${import.meta.env.VITE_CS365_URI}/api/activity`,
                    actData
                  );
                  toast({
                    title: `${month} Budget Removed`,
                    description: "The Budget has been successfully removed.",
                    icon: <CircleCheckIcon className="mr-4" color="green" />,
                  });
                } catch (error) {
                  console.error("Error deleting Budget:", error);
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

export const EventColumn = (fetchData)=> {
  const role = useSessionRole(); 
    const baseColumns = [
  
  {
    accessorKey: "",
    header: "Title",
  },
  {
    accessorKey: "month",
    header: "Date",
  },
  {
    accessorKey: "",
    header: "Category",
  },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => (
//       <Badge
//         variant="secondary"
//         className={`bg-gray-200 ${row.getValue("status") === "approved" ? "bg-blue-200" : ""}`}
//       >
//         {row.getValue("status")}
//       </Badge>
//     ),
//   },
//   {
//     accessorKey: "stage",
//     header: "Stage",
//     cell: ({ row }) => (
//       <Badge
//         variant="default"
//         className={`bg-gray-500 ${row.getValue("stage") === "open" ? "bg-green-600 text-white" : "bg-red-400 text-white"}`}
//       >
//         {row.getValue("stage")}
//       </Badge>
//     ),
//   },
]
  if (role?.includes("admin")) {
    baseColumns.push({
      id: "actions",
      enableHiding: false,
      header: "Actions",
      cell: ({ row }) => <Actions row={row} onDelete={fetchData} />,
    });
  }

  return baseColumns;
}
