import { useState } from "react";
import { Checkbox } from "../UI/Checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../UI/Dropdown-menu";
import { Button } from "../UI/Button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Badge } from "../UI/Badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../UI/Alert_Dialog";
import axios from "axios";
import { useSessionUser } from "../../Hooks/useSessionUser";
import { useSessionRole } from "../../Hooks/useSessionRole";
import { useToast } from "../../Hooks/use-toast";
import { CircleCheckIcon } from "lucide-react";
// Actions Cell Component
const Actions = ({ row, onDelete }) => {
  const{toast} = useToast();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    field: null,
    value: null,
  });
  const sessionUser = useSessionUser(); 
  const status = row.getValue("status");
  const stage = row.getValue("stage");
  const projectName = row.getValue("project_name");

  const handleFieldUpdate = async (field, value) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_CS365_URI}/api/projects/update-field`,
        {
          project_name: projectName,
          field,
          value,
        }
      );
      onDelete(); // Refresh the list\

      const actData = {
        field: "project_management",
        data: {
          username: sessionUser,
          date: new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          }),
          activity: `The project "${projectName}" ${field} updated to ${value}`,
          type: `${field} updation`,
        },

      };
      const act = await axios.post(
        `${import.meta.env.VITE_CS365_URI}/api/activity`,
        actData
      );
    } catch (error) {
      console.error("Failed to update status:", error);
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
                })
              }
            >
              Release
            </DropdownMenuItem>
          )}
          {stage === "open" && (
            <DropdownMenuItem
              onClick={() =>
                setConfirmDialog({
                  open: true,
                  field: "stage",
                  value: "closed",
                })
              }
            >
              Close Project
            </DropdownMenuItem>
          )}
          {stage === "closed" && (
            (<DropdownMenuItem
              onClick={() =>
                setConfirmDialog({
                  open: true,
                  field: "stage",
                  value: "open",
                })
              }
            >
              Open Project
            </DropdownMenuItem>)
          )}
          <DropdownMenuItem onClick={() => setAlertOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Confirm Dialog for Approve/Close/Open */}
      <AlertDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will update <b>{projectName}</b> budget to{" "}
              <b>{confirmDialog.value}</b>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleFieldUpdate(
                  confirmDialog.field,
                  confirmDialog.value,
                  confirmDialog.label
                );
                setConfirmDialog({ ...confirmDialog, open: false });
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              project and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-[var(--csred)] hover:bg-[var(--csred)]/90"
              onClick={async () => {
                const projectname = row.getValue("project_name");

                try {
                  await axios.post(
                    `${import.meta.env.VITE_CS365_URI}/api/projects/delete`,
                    { project_name: projectname }
                  );
                  onDelete();

                  const actData = {
                    field: "project_management",
                    data: {
                      username: sessionUser,
                      date: new Date().toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                      }),
                      activity: `The project "${projectName}" has been deleted`,
                      type: "Delete",
                    },
                  };
                  const act = await axios.post(
                    `${import.meta.env.VITE_CS365_URI}/api/activity`,
                    actData
                  );

                  toast({
                    title: "Project Removed",
                    description: "The project has been successfully removed.",
                    icon: <CircleCheckIcon className="mr-4" color="green" />,
                  });
                } catch (error) {
                  console.error("Error deleting project:", error);
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



export const columns = (fetchData) => {
  const role = useSessionRole(); 
  const baseColumns = [
   
    {
      accessorKey: "project_name",
      header: "Project Title",
    },
    {
      accessorKey: "customer_name",
      header: "Customer",
    },
    {
      accessorKey: "status",
      header: "Doc Status",
      cell: ({ row }) => (
        <Badge
          variant="secondary"
          className={`bg-gray-200 ${
            row.getValue("status") === "approved" ? "bg-blue-200" : ""
          }`}
        >
          {row.getValue("status")}
        </Badge>
      ),
    },
    {
      accessorKey: "stage",
      header: "Project Stage",
      cell: ({ row }) => {
        const stage = row.getValue("stage");
        const bgColor =
          stage === "closed"
            ? "bg-red-400 text-white"
            : stage === "open"
            ? "bg-green-600 text-white"
            : "bg-gray-500";
        return (
          <Badge variant="default" className={bgColor}>
            {stage}
          </Badge>
        );
      },
    },
  ];

  if (role?.includes("admin")) {
    baseColumns.push({
      id: "actions",
      enableHiding: false,
      header: "Actions",
      cell: ({ row }) => <Actions row={row} onDelete={fetchData} />,
    });
  }

  return baseColumns;
};