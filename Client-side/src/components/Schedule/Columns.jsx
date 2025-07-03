import { Checkbox } from "../UI/Checkbox";
import { Button } from "../UI/Button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../UI/Dropdown-menu";
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
import { useState } from "react";
import axios from "axios";
import { useSessionUser } from "../../Hooks/useSessionUser";
import { useToast } from "../../Hooks/use-toast";
import { CircleCheckIcon } from "lucide-react";

// Actions Cell Component
const Actions = ({ row, onDelete }) => {
  const { toast } = useToast();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const sessionUser = useSessionUser();
  const milestone = row.getValue("task");
  const projectName = row.getValue("project_name");

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
          <DropdownMenuItem onClick={() => setAlertOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this milestone from the schedule.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-[var(--csred)] hover:bg-[var(--csred)]/90"
              onClick={async () => {
                try {
                  await axios.post(
                    `${import.meta.env.VITE_CS365_URI}/api/timeline/delete`,
                    { task: milestone, project_name: projectName }
                  );
                  onDelete();
                  toast({
                    title: "Milestone Removed",
                    description: "The milestone has been successfully removed.",
                    icon: <CircleCheckIcon className="mr-4" color="green" />,
                  });
                } catch (error) {
                  console.error("Error deleting milestone:", error);
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

// Column Definitions for Schedule Milestones
export const columns = (fetchData) => [
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
    header: "Project Name",
    cell: ({ row }) => row.getValue("project_name") || "-",
  },
  {
    accessorKey: "month",
    header: "Month",
    cell: ({ row }) => {
      const month = row.getValue("month");
      if (!month) return "-";
      // If month is a date string, format as 'MMM yyyy'
      const date = new Date(month);
      if (!isNaN(date)) {
        return date.toLocaleString("default", { month: "short", year: "numeric" });
      }
      return month;
    },
  },
  {
    accessorKey: "project_description",
    header: "Project Description",
    cell: ({ row }) => row.getValue("project_description") || "-",
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => <Actions row={row} onDelete={fetchData} />,
  },
];
