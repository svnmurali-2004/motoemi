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
import CreateCustomerDialog from "./createCustomer";
import PaymentDialog from "./Payment";
import ReceiptsList from "./ReceiptsList";

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
    accessorKey: "totalPaidAmount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total Paid <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) =>
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(row.getValue("totalPaidAmount") || 0),
    filterFn: "equals",
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
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const emiRecord = row.original;

      return (
        <div className="flex gap-2">
          <PaymentDialog
            emiRecord={emiRecord}
            onPaymentUpdate={(updatedRecord) => {
              window.location.reload();
            }}
          />
          <ReceiptsList emiRecord={emiRecord} />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
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
  const [vehicleNoFilter, setVehicleNoFilter] = React.useState("");
  const [customerNameFilter, setCustomerNameFilter] = React.useState("");
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refresh, setRefresh] = React.useState(false);

  // PDF download handler using jsPDF and jsPDF-AutoTable
  const handleDownloadPDF = async () => {
    try {
      const jsPDFModule = await import("jspdf");
      const autoTable = (await import("jspdf-autotable")).default;
      const jsPDF = jsPDFModule.jsPDF || jsPDFModule.default;
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      // Get visible columns (not hidden)
      const visibleColumns = columns.filter((col) => {
        // If using columnVisibility state, check here
        return !columnVisibility || columnVisibility[col.accessorKey] !== false;
      });

      // Table headers
      const head = [
        visibleColumns.map((col) => {
          if (typeof col.header === "function") {
            // Render header as string if it's a function
            // Fallback to accessorKey if not possible
            try {
              // Try to render header (may not work outside React)
              return typeof col.accessorKey === "string" ? col.accessorKey : "";
            } catch {
              return typeof col.accessorKey === "string" ? col.accessorKey : "";
            }
          }
          return col.header || col.accessorKey;
        }),
      ];

      // Get all filtered rows (across all pages)
      const filteredRows = table.getFilteredRowModel().rows;
      const body = filteredRows.map((row) =>
        visibleColumns.map((col) => {
          let value = row.original[col.accessorKey];
          // Format value if needed (e.g., for currency/date columns)
          // if (col.accessorKey === "dueAmount") {
          //   return value !== undefined && value !== null ? value : "";
          // }
          if (col.accessorKey === "dueDate") {
            return new Date(value).toLocaleDateString();
          }
          if (col.accessorKey === "status") {
            return value
              ? String(value).charAt(0).toUpperCase() + String(value).slice(1)
              : "";
          }
          return value !== undefined && value !== null ? value : "";
        })
      );

      autoTable(pdf, {
        head,
        body,
        styles: { fontSize: 10, minCellHeight: 8, overflow: "linebreak" },
        headStyles: { fillColor: [22, 160, 133] },
        margin: { top: 20, left: 10, right: 10 },
        tableWidth: "wrap", // Let autoTable wrap and paginate as needed
        pageBreak: "auto",
        didDrawPage: (data) => {
          // Optionally, add page numbers or headers here
        },
      });
      pdf.save("emi-table.pdf");
    } catch (err) {
      alert("Failed to generate PDF. See console for details.");
      console.error("jsPDF/autoTable error:", err);
    }
  };

  React.useEffect(() => {
    async function fetchCustomers() {
      setLoading(true);
      try {
        const res = await fetch("/api/emirecords", {
          headers: { "Content-Type": "application/json" },
        });
        const json = await res.json();
        if (json.ok) {
          setData(json.emiRecords);
          console.log(json.emiRecords);
        } else {
          setData([]);
        }
      } catch (e) {
        setData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCustomers();
  }, [refresh]);

  React.useEffect(() => {
    const filters = [];
    if (hsnFilter) filters.push({ id: "hsnNo", value: hsnFilter });
    if (statusFilter && statusFilter !== "all")
      filters.push({ id: "status", value: statusFilter });
    if (nameFilter) filters.push({ id: "suretyName", value: nameFilter });
    if (vehicleNoFilter)
      filters.push({ id: "vehicleNo", value: vehicleNoFilter });
    if (customerNameFilter)
      filters.push({ id: "name", value: customerNameFilter });
    setColumnFilters(filters);
  }, [
    hsnFilter,
    statusFilter,
    nameFilter,
    vehicleNoFilter,
    customerNameFilter,
  ]);

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
    <div className="w-full max-w-full dark:bg-zinc-900 dark:text-gray-100">
      <div className="flex items-center justify-between sticky top-0 z-10 bg-white dark:bg-zinc-900 border-b dark:border-zinc-800 py-4 gap-2 flex-wrap">
        <CreateCustomerDialog
          onCreate={(newCustomer) => {
            setRefresh((prev) => !prev);
            console.log("New customer created:", newCustomer);
          }}
        />
        {/* Filters: sticky and always visible, OUTSIDE scrollable table */}
        <div className="flex items-center gap-2 flex-wrap">
          <Input
            placeholder="Filter EMI Number"
            value={columnFilters.find((f) => f.id === "emiNumber")?.value || ""}
            onChange={(e) => {
              const value = e.target.value;
              setColumnFilters((prev) => {
                const other = prev.filter((f) => f.id !== "emiNumber");
                return value ? [...other, { id: "emiNumber", value }] : other;
              });
            }}
            className="max-w-xs bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-zinc-700 placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
          <Input
            placeholder="Filter HSN Number"
            value={hsnFilter}
            onChange={(e) => setHsnFilter(e.target.value)}
            className="max-w-xs bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-zinc-700 placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
          <Input
            placeholder="Filter Surety Name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="max-w-xs bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-zinc-700 placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
          <Input
            placeholder="Filter Vehicle Number"
            value={vehicleNoFilter}
            onChange={(e) => setVehicleNoFilter(e.target.value)}
            className="max-w-xs bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-zinc-700 placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
          <Input
            placeholder="Filter Customer Name"
            value={customerNameFilter}
            onChange={(e) => setCustomerNameFilter(e.target.value)}
            className="max-w-xs bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-zinc-700 placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-2 py-2 text-sm bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-zinc-700"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="due">Due</option>
          </select>
          {/* Print Table button removed as requested */}
          <Button
            onClick={handleDownloadPDF}
            className="bg-green-600 text-white hover:bg-green-700 transition-colors shadow px-4 py-2 rounded"
          >
            ⬇️ Download PDF
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-zinc-700"
              >
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-zinc-700"
            >
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-zinc-700"
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
      </div>
      {/* Table: horizontally scrollable, filters do NOT scroll */}
      <div className="rounded-md border overflow-x-auto w-full bg-white dark:bg-zinc-900 dark:border-zinc-800 max-h-[70vh]">
        <div id="emi-table-print-area">
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
