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
import { useToast } from "../../Hooks/use-toast";
import { CircleCheckIcon } from "lucide-react";

const Actions = ({ row, onDelete }) => {
  const { toast } = useToast();
  const [alertOpen, setAlertOpen] = useState(false);
  const sessionUser = useSessionUser();
  const projectName = row.getValue("salesOrderName");
  const salesOrderName = row.getValue("salesOrderName");
  const category = row.getValue("category");
  const subCategory = row.getValue("subCategory")

  const [confirmDialog, setConfirmDialog] = useState({ open: false, action: null });
  const status = row.getValue("Status");

  const handleStatusUpdate = async (newStatus) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_CS365_URI}/api/orders/save-order`,
        { salesOrderName, category, subCategory, Status: newStatus }
      );
      onDelete();
      const actData = {
        field: "order_booking",
        data: {
          username: sessionUser,
          date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
          activity: `Order "${salesOrderName}" status updated to ${newStatus}`,
          type: `Status ${newStatus}`,
        },
      };
      await axios.post(
        `${import.meta.env.VITE_CS365_URI}/api/activity`,
        actData
      );
    } catch (error) {
      console.error("Error updating order status:", error);
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
            <DropdownMenuItem onClick={() => setConfirmDialog({ open: true, action: "approve" })}>
              Approve
            </DropdownMenuItem>
          )}
          {status === "approved" && (
            <DropdownMenuItem onClick={() => setConfirmDialog({ open: true, action: "release" })}>
              Release
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => setAlertOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Approve/Release Confirm Dialog */}
      <AlertDialog open={confirmDialog.open} onOpenChange={open => setConfirmDialog({ ...confirmDialog, open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDialog.action === "approve" && (
                <>This will approve the order <b>{projectName}</b>.</>
              )}
              {confirmDialog.action === "release" && (
                <>This will move the order <b>{projectName}</b> back to draft.</>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (confirmDialog.action === "approve") {
                  await handleStatusUpdate("approved");
                } else if (confirmDialog.action === "release") {
                  await handleStatusUpdate("draft");
                }
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
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this order and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-[var(--csred)] hover:bg-[var(--csred)]/90"
              onClick={async () => {
                const salesOrderName = row.getValue("salesOrderName");
                try {
                  await axios.post(
                    `${import.meta.env.VITE_CS365_URI}/api/orders/delete`, {
                    salesOrderName,
                    category,
                    subCategory,
                  });
                  onDelete();
                  const actData = {
                    field: "order_booking",
                    data: {
                      username: sessionUser,
                      date: new Date().toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                      }),
                      activity: `The order "${projectName}" has been deleted`,
                      type: "Delete",
                    },
                  };
                  await axios.post(
                    `${import.meta.env.VITE_CS365_URI}/api/activity`,
                    actData
                  );
                  toast({
                    title: "Order Removed",
                    description: "The order has been successfully removed.",
                    icon: <CircleCheckIcon className="mr-4" color="green" />,
                  });
                } catch (error) {
                  console.error("Error deleting order:", error);
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

export const columns = (fetchData) => [
 
  {
    accessorKey: "salesOrderName",
    header: "Sales Order Title",
  },
  {
    accessorKey: "customerName",
    header: "Customer",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => row.getValue("category"),
  },
  {
    accessorKey: "subCategory",
    header: "Sub Category",
    cell: ({ row }) => row.getValue("subCategory"),
  },
  {
    accessorKey: "Status",
    header: "Doc Status",
    cell: ({ row }) => (
      <Badge
        variant="secondary"
        className={`bg-gray-200 ${row.getValue("Status") === "approved" ? "bg-blue-200" : ""
          }`}
      >
        {row.getValue("Status")}
      </Badge>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => <Actions row={row} onDelete={fetchData} />,
  },
];
