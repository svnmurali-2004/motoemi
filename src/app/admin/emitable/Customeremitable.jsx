"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { MoreHorizontal, ReceiptIcon } from "lucide-react"

export type Receipt = {
  receiptId: string
  paidAmount: number
  paidDate: string
  paymentMode: string
}

export type EMIRawRecord = {
  emiNumber: number
  dueDate: string
  dueAmount: number
  status: string
  totalPaidAmount: number
  receipts: Receipt[]
}

export type CustomerEMIData = {
  id: string
  customerNo: number
  name: string
  phone: string
  guarantorName: string
  guarantorPhone: string
  vehicleNo: string
  vehicleClass: string
  vehicleModel: string
  chassisNo: string
  engineNo: string
  costPaid: number
  due: number
  emi: number
  garageDate: string
  dueDate: string
  lastPaidDate: string
  customerAddress: string
  customerArea: string
  emiRecords: EMIRawRecord[]
}

interface Props {
  data: CustomerEMIData[]
}

export function CustomerEMITable({ data }: Props) {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const columns: ColumnDef<CustomerEMIData>[] = [
    { accessorKey: "customerNo", header: "Cust No" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "guarantorName", header: "Guarantor" },
    { accessorKey: "guarantorPhone", header: "Guarantor Phone" },
    { accessorKey: "vehicleNo", header: "Vehicle No" },
    { accessorKey: "vehicleClass", header: "Class" },
    { accessorKey: "vehicleModel", header: "Model" },
    { accessorKey: "chassisNo", header: "Chassis No" },
    { accessorKey: "engineNo", header: "Engine No" },
    { accessorKey: "costPaid", header: "Cost Paid" },
    { accessorKey: "due", header: "Remaining Due" },
    { accessorKey: "emi", header: "Total EMIs" },
    { accessorKey: "garageDate", header: "Garage Date", cell: ({ row }) => new Date(row.getValue("garageDate")).toLocaleDateString() },
    { accessorKey: "dueDate", header: "Next Due", cell: ({ row }) => new Date(row.getValue("dueDate")).toLocaleDateString() },
    { accessorKey: "lastPaidDate", header: "Last Paid", cell: ({ row }) => new Date(row.getValue("lastPaidDate")).toLocaleDateString() },
    { accessorKey: "customerAddress", header: "Address" },
    { accessorKey: "customerArea", header: "Area" },

    {
      id: "emi-details",
      header: "EMI Records",
      cell: ({ row }) => {
        const recs = row.original.emiRecords
        return (
          <div className="text-sm">
            {recs.map(r => (
              <div key={r.emiNumber}>
                EMI #{r.emiNumber}: {new Date(r.dueDate).toLocaleDateString()} → Due ₹{r.dueAmount}, Paid ₹{r.totalPaidAmount}
              </div>
            ))}
          </div>
        )
      },
    },

    {
      id: "receipts",
      header: "Receipts",
      cell: ({ row }) => {
        const allReceipts = row.original.emiRecords.flatMap(r => r.receipts)
        return allReceipts.length ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <ReceiptIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="max-w-md">
              <h4 className="font-semibold mb-2">Receipts</h4>
              {allReceipts.map(rc => (
                <div key={rc.receiptId} className="flex justify-between border-b py-1">
                  <div>
                    {rc.paymentMode} — ₹{rc.paidAmount} on {new Date(rc.paidDate).toLocaleDateString()}
                  </div>
                  <Button size="icon" variant="link" onClick={() => window.open(rc.url, "_blank")}>
                    Download
                  </Button>
                </div>
              ))}
            </PopoverContent>
          </Popover>
        ) : (
          "—"
        )
      },
    },

    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button variant="ghost" size="icon">
          <MoreHorizontal />
        </Button>
      ),
    },
  ]

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(hg => (
            <TableRow key={hg.id}>
              {hg.headers.map(h => (
                <TableHead key={h.id}>
                  {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell ?? cell.column.columnDef.accessorKey, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 flex justify-between">
        <Button size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
        <Button size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
      </div>
    </div>
  )
}
