import { Checkbox } from "../../components/UI/Checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/UI/Dropdown-menu";
import { Button } from "../../components/UI/Button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/UI/Alert_Dialog";
import { CircleCheckIcon } from "lucide-react";
import axios from "axios";

// Actions cell component
const Actions = ({ row, onDelete }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  //   const { toast } = useToast()

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
              This action cannot be undone. This will permanently delete this
              notice from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-[var(--csred)] hover:bg-[var(--csred)]/90"
              onClick={async () => {
                const id = row.original._id;
                const fullName = row.getValue("full_name");

                try {
                  await axios.post(
                    `${import.meta.env.VITE_CS365_URI}/api/notices/delete`,
                    {id:id}
                  );
                  onDelete();
                  // toast({
                  //   title: "Signature Removed",
                  //   description: "The signature has been successfully removed.",
                  //   icon: <CircleCheckIcon className="mr-4" color="green" />,
                  // });
                } catch (error) {
                  console.error("Error deleting signature:", error);
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

// Column definitions
export const NoticeColumns = (fetchdata) => [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
 {
  accessorKey: "title",
  header: "Title",
  cell: ({ row }) => (
    <div className="max-w-[300px] truncate whitespace-nowrap overflow-hidden text-ellipsis">
      {row.getValue("title")}
    </div>
  ),
},
{
  accessorKey: "description",
  header: "Description",
  cell: ({ row }) => (
    <div className="max-w-[300px] truncate whitespace-nowrap overflow-hidden text-ellipsis">
      {row.getValue("description")}
    </div>
  ),
},
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => <Actions row={row} onDelete={fetchdata} />,
  },
];
