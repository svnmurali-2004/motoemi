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
import { useSession } from "next-auth/react";
import Receipt from "@/components/Receipt";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";

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
import CreateReceiptDialog from "../../(receiptcomp)/CreateReceipt";

const btnStyle = {
  margin: "10px",
  padding: "10px 20px",
  fontSize: "16px",
  background: "#3498db",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

function DownloadReceiptButton({ receipt }) {
  const handleDownload = async () => {
    const res = await fetch("/api/receipt-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(receipt),
    });
    if (!res.ok) {
      alert("Failed to generate PDF");
      return;
    }
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "delivery_note.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };
  return (
    <button
      onClick={handleDownload}
      style={{
        margin: "4px",
        padding: "6px 14px",
        fontSize: "15px",
        background: "#3498db",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      ⬇ Download PDF
    </button>
  );
}

export const columns = [
  {
    accessorKey: "receiptNumber",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Receipt # <ArrowUpDown />
      </Button>
    ),
    filterFn: "includesString",
  },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "time", header: "Time" },
  { accessorKey: "registeredOwner", header: "Owner" },
  { accessorKey: "ownerParentName", header: "Owner Parent" },
  { accessorKey: "ownerAddress", header: "Owner Address" },
  { accessorKey: "registrationNumber", header: "Reg. No." },
  { accessorKey: "model", header: "Model" },
  { accessorKey: "classToVehicle", header: "Class" },
  { accessorKey: "chassisNumber", header: "Chassis No." },
  { accessorKey: "engineNumber", header: "Engine No." },
  { accessorKey: "makersName", header: "Maker" },
  { accessorKey: "monthYearOfManufacture", header: "Mfg. Date" },
  { accessorKey: "colorOfVehicle", header: "Color" },
  { accessorKey: "sellerName", header: "Seller" },
  { accessorKey: "sellerParentName", header: "Seller Parent" },
  { accessorKey: "sellerAddress", header: "Seller Address" },
  { accessorKey: "sellerIDProof", header: "Seller ID" },
  { accessorKey: "sellerPhone", header: "Seller Phone" },
  { accessorKey: "purchaserName", header: "Purchaser" },
  { accessorKey: "purchaserParentName", header: "Purchaser Parent" },
  { accessorKey: "purchaserAddress", header: "Purchaser Address" },
  { accessorKey: "purchaserIDProof", header: "Purchaser ID" },
  { accessorKey: "purchaserPhone", header: "Purchaser Phone" },
  { accessorKey: "branch", header: "Branch" },
  {
    id: "download",
    header: "Download",
    cell: ({ row }) => <DownloadReceiptButton receipt={row.original} />,
    enableSorting: false,
    enableHiding: false,
  },
];

const branchOptions = [
  "All Branches",
  "Main Branch",
  "Branch A",
  "Branch B",
  "Branch C",
];

export default function ReceiptsTable() {
  const { data: session } = useSession();
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [receiptFilter, setReceiptFilter] = React.useState("");
  const [branchFilter, setBranchFilter] = React.useState("All Branches");
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchReceipts() {
      setLoading(true);
      try {
        const res = await fetch("/api/deliveryreceipts", {
          headers: { "Content-Type": "application/json" },
        });
        const json = await res.json();
        if (json.ok) setData(json.receipts);
        else setData([]);
      } catch (e) {
        setData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchReceipts();
  }, []);

  React.useEffect(() => {
    const filters = [];
    if (receiptFilter)
      filters.push({ id: "receiptNumber", value: receiptFilter });
    if (branchFilter && branchFilter !== "All Branches")
      filters.push({ id: "branch", value: branchFilter });
    setColumnFilters(filters);
  }, [receiptFilter, branchFilter]);

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
        <Input
          placeholder="Filter Receipt Number"
          value={receiptFilter}
          onChange={(e) => setReceiptFilter(e.target.value)}
          className="max-w-xs bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-zinc-700 placeholder:text-gray-500 dark:placeholder:text-gray-400"
        />
        <select
          value={branchFilter}
          onChange={(e) => setBranchFilter(e.target.value)}
          className="rounded-lg bg-white/90 dark:bg-zinc-800/80 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 text-gray-900 dark:text-gray-100 px-3 py-2 min-w-[150px]"
        >
          {branchOptions.map((b) => (
            <option
              key={b}
              value={b}
              className="bg-white/90 dark:bg-zinc-800/80 text-gray-800 dark:text-gray-100 hover:bg-blue-100 dark:hover:bg-purple-900 transition-colors"
            >
              {b}
            </option>
          ))}
        </select>
        <CreateReceiptDialog
          onCreate={(newReceipt) => {
            setData((prev) => [newReceipt, ...prev]);
          }}
        />
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
      {/* Table: horizontally scrollable, filter does NOT scroll */}
      <div className="rounded-md border overflow-x-auto w-full bg-white dark:bg-zinc-900 dark:border-zinc-800 max-h-[70vh]">
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
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
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
