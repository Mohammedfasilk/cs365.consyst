import {
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../UI/Table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../UI/Dropdown-menu";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsSaved, setIsOpen, setSelectedSalesOrder, setSelectedSalesOrderName } from "../../Redux/Slices/orderBookingSlice";
import ScaleLoading from "../UI/ScaleLoader";

export default function DataTable({ columns, data, loading }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const dispatch = useDispatch();
  const selectedSalesOrder = useSelector((state) => state.selectedSalesOrder.salesOrder);
  const selectedSalesOrderName = useSelector((state) => state.selectedSalesOrder.salesOrderName);



  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
    pagination: {
      pageSize: 25,
    },
  },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter order..."
          value={table.getColumn("salesOrderName")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("salesOrderName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm outline p-2 rounded"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {typeof column.columnDef.header === "string"
                    ? column.columnDef.header
                    : column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : typeof header.column.columnDef.header === "function"
                        ? flexRender(header.column.columnDef.header, header.getContext())
                        : header.column.columnDef.header}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      onClick={() => {
                        if (cell.column.id !== "actions") {
                          const salesOrderName = row.getValue("salesOrderName");
                          const fullRowData = row.original;

                          if (salesOrderName) {
                            dispatch(setSelectedSalesOrder({ order: row.original, source: "table" }));
                            dispatch(setSelectedSalesOrderName(salesOrderName)); 
                            dispatch(setIsOpen(true));
                            dispatch(setIsSaved(true));
                          }
                        }
                      }}
                    >
                      {cell.column.columnDef.cell
                        ? cell.column.columnDef.cell(cell.getContext())
                        : cell.getValue()}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {loading ? <ScaleLoading size={30}/> :'No results.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
