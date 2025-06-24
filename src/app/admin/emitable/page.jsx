"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data = [
  {
    _id: "685aafca52fe5dc904c1a1e9",
    customerId: "685aafc952fe5dc904c1a1e7",
    emiNumber: 1,
    dueDate: "2025-06-30T18:30:00.000Z",
    dueAmount: 5330.93,
    status: "due",
    mobileNo: "9876543210",
    vehicleNo: "TS09AB1234",
    hsnNo: "HSN56789",
    suretyName: "Anil Verma",
    suretyMobileNo: "9123456780",
    suretyAddress: "14/2, Gandhi Street, Hyderabad, Telangana",
    customerAddress: "Plot 32, Laxmi Nagar, Hyderabad, Telangana",
    emiMonths: 12,
  },
];

export const columns = [
  {
    accessorKey: "emiNumber",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        EMI # <ArrowUpDown />
      </Button>
    ),
    filterFn: "equals",
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Due Date <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => new Date(row.getValue("dueDate")).toLocaleDateString(),
    filterFn: "includesString",
  },
  {
    accessorKey: "dueAmount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Due Amount <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) =>
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(row.getValue("dueAmount")),
    filterFn: "equals",
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("status")}</span>
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "mobileNo",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Mobile No <ArrowUpDown />
      </Button>
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "vehicleNo",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Vehicle No <ArrowUpDown />
      </Button>
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "hsnNo",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        HSN No <ArrowUpDown />
      </Button>
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "suretyName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Surety Name <ArrowUpDown />
      </Button>
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "suretyMobileNo",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Surety Mobile <ArrowUpDown />
      </Button>
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "suretyAddress",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Surety Address <ArrowUpDown />
      </Button>
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "customerAddress",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Customer Address <ArrowUpDown />
      </Button>
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "emiMonths",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        EMI Months <ArrowUpDown />
      </Button>
    ),
    filterFn: "equals",
  },
];

export default function DataTableDemo() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [hsnFilter, setHsnFilter] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [nameFilter, setNameFilter] = React.useState("");

  React.useEffect(() => {
    const filters = [];
    if (hsnFilter) filters.push({ id: "hsnNo", value: hsnFilter });
    if (statusFilter && statusFilter !== "all")
      filters.push({ id: "status", value: statusFilter });
    if (nameFilter) filters.push({ id: "suretyName", value: nameFilter });
    setColumnFilters(filters);
  }, [hsnFilter, statusFilter, nameFilter]);

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
  });

  return (
    <div className="w-full max-w-full">
      {/* Filters: sticky and always visible, OUTSIDE scrollable table */}
      <div className="sticky top-0 z-10 bg-white border-b flex items-center py-4 gap-2 flex-wrap">
        <Input
          placeholder="Filter HSN Number"
          value={hsnFilter}
          onChange={(e) => setHsnFilter(e.target.value)}
          className="max-w-xs"
        />
        <Input
          placeholder="Filter Surety Name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="max-w-xs"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded px-2 py-2 text-sm"
        >
          <option value="all">All Status</option>
          <option value="paid">Paid</option>
          <option value="due">Due</option>
        </select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Table: horizontally scrollable, filters do NOT scroll */}
      <div className="rounded-md border overflow-x-auto w-full bg-white dark:bg-zinc-900 dark:border-zinc-800">
        <Table className="min-w-[1200px] w-full text-gray-900 dark:text-gray-100 dark:bg-zinc-900">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-center bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
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
