import { useState } from "react";
import { Button } from "../UI/Button";
import { CircleCheckIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../UI/Dropdown-menu";
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
import { useToast } from "../../Hooks/use-toast";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useSessionRole } from "../../Hooks/useSessionRole";

// Billing Actions Component
const Actions = ({ row, onDelete, planId }) => {
  const { toast } = useToast();
  const sessionUser = useSessionUser();
  const planName = row.getValue("billingPlanName");
  const clientName = row.getValue("clientName");
  const status = row.getValue("status");

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    action: null,
  });
  const [alertOpen, setAlertOpen] = useState(false);

  const handleStatusUpdate = async (newStatus) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_CS365_URI}/api/billing-plan/status`,
        {
          salesId: row.getValue('salesOrderName'),
          planId: planId,
          status: newStatus,
        }
      );

      // await axios.post(`${import.meta.env.VITE_CS365_URI}/api/activity`, {
      //   field: "billing_plan",
      //   data: {
      //     username: sessionUser,
      //     date: new Date().toLocaleString("en-IN", {
      //       timeZone: "Asia/Kolkata",
      //     }),
      //     activity: `Billing Plan "${planName}" status updated to ${newStatus}`,
      //     type: `Status ${newStatus}`,
      //   },
      // });

      onDelete();
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_CS365_URI}/api/billing-plan/delete`,
        {
          salesId: row.getValue("salesOrderName"),
          planId: planId,
        }
      );

      // await axios.post(`${import.meta.env.VITE_CS365_URI}/api/activity`, {
      //   field: "billing_plan",
      //   data: {
      //     username: sessionUser,
      //     date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      //     activity: `The billing plan "${planName}" has been deleted`,
      //     type: "Delete",
      //   },
      // });

      onDelete();

      toast({
        title: "Plan Deleted",
        description: "The billing plan has been removed.",
        icon: <CircleCheckIcon className="mr-4" color="green" />,
      });
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <>
      <DropdownMenu>
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
                setConfirmDialog({ open: true, action: "approved" })
              }
            >
              Approve
            </DropdownMenuItem>
          )}
          {status === "approved" && (
            <DropdownMenuItem
              onClick={() => setConfirmDialog({ open: true, action: "draft" })}
            >
              Release
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => setAlertOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Confirm Dialog */}
      <AlertDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will update the status of <b>{planName}</b> to{" "}
              <b>{confirmDialog.action}</b>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleStatusUpdate(confirmDialog.action);
                setConfirmDialog({ open: false, action: null });
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
            <AlertDialogTitle>Delete this Billing Plan?</AlertDialogTitle>
            <AlertDialogDescription>
              This action is irreversible. The billing plan <b>{planName}</b>{" "}
              will be deleted permanently.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-[var(--csred)] hover:bg-[var(--csred)]/90"
              onClick={handleDelete}
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
      accessorKey: "salesOrderName",
      header: "Sales Order",
    },
    {
      header: "Date",
      accessorKey: "date",
      cell: ({ row }) =>
        new Date(row.getValue("date")).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "status",
      header: "Status",
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
  ];

  if (role?.includes("admin")) {
    baseColumns.push({
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => (
        <Actions
          row={row}
          planId={row.original._id} // ✅ safely access _id without needing a column
          onDelete={fetchData}
        />
      ),
    });
  }

  return baseColumns;
};
