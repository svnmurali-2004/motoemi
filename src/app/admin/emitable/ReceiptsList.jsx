"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Receipt, Eye, Calendar, CreditCard } from "lucide-react";
import toast from "react-hot-toast";

const ReceiptsList = ({ emiRecord }) => {
  const [open, setOpen] = useState(false);
  const [downloading, setDownloading] = useState({});

  const handleDownloadReceipt = async (receiptId) => {
    setDownloading((prev) => ({ ...prev, [receiptId]: true }));

    try {
      const response = await fetch(
        `/api/emirecords/receipts/download?receiptId=${receiptId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download receipt");
      }

      // Get the blob data
      const blob = await response.blob();

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `receipt-${receiptId}.pdf`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      toast.success("Receipt downloaded successfully!", {
        duration: 3000,
        position: "top-right",
      });
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download receipt. Please try again.", {
        duration: 4000,
        position: "top-right",
      });
    } finally {
      setDownloading((prev) => ({ ...prev, [receiptId]: false }));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getPaymentModeColor = (mode) => {
    const colors = {
      cash: "bg-green-100 text-green-800",
      cheque: "bg-blue-100 text-blue-800",
      online: "bg-purple-100 text-purple-800",
      upi: "bg-orange-100 text-orange-800",
      card: "bg-pink-100 text-pink-800",
      bank_transfer: "bg-indigo-100 text-indigo-800",
    };
    return colors[mode] || "bg-gray-100 text-gray-800";
  };

  const receipts = emiRecord.receipts || [];
  const hasReceipts = receipts.length > 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-300"
        >
          <Eye className="h-4 w-4 mr-1" />
          Receipts ({receipts.length})
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Payment Receipts - EMI #{emiRecord.emiNumber}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {/* EMI Summary Card */}
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600">
                EMI Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Vehicle:</span>
                <div className="font-semibold">{emiRecord.vehicleNo}</div>
              </div>
              <div>
                <span className="text-gray-500">Due Amount:</span>
                <div className="font-semibold">
                  {formatCurrency(emiRecord.dueAmount)}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Total Paid:</span>
                <div className="font-semibold text-green-600">
                  {formatCurrency(emiRecord.totalPaidAmount || 0)}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Remaining:</span>
                <div className="font-semibold text-red-600">
                  {formatCurrency(
                    (emiRecord.dueAmount || 0) -
                      (emiRecord.totalPaidAmount || 0)
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Receipts List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payment Receipts</h3>

            {!hasReceipts ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                  <Receipt className="h-12 w-12 text-gray-400 mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    No Receipts Found
                  </h4>
                  <p className="text-gray-500">
                    No payment receipts have been recorded for this EMI yet.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {receipts.map((receipt, index) => (
                  <Card
                    key={receipt.receiptId || index}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="flex items-center gap-2">
                              <Receipt className="h-4 w-4 text-blue-600" />
                              <span className="font-semibold text-gray-900">
                                {receipt.receiptId}
                              </span>
                            </div>
                            <Badge
                              className={getPaymentModeColor(
                                receipt.paymentMode
                              )}
                            >
                              {receipt.paymentMode?.toUpperCase() || "CASH"}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-500">Amount:</span>
                              <span className="font-semibold text-green-600">
                                {formatCurrency(receipt.paidAmount)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-500">Date:</span>
                              <span className="font-medium">
                                {formatDate(receipt.paidDate)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="ml-4">
                          <Button
                            onClick={() =>
                              handleDownloadReceipt(receipt.receiptId)
                            }
                            disabled={downloading[receipt.receiptId]}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            {downloading[receipt.receiptId] ? (
                              <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Downloading...
                              </div>
                            ) : (
                              <>
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Summary Footer */}
          {hasReceipts && (
            <Card className="mt-6 bg-gray-50">
              <CardContent className="p-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium">Total Receipts:</span>
                  <span className="font-semibold">{receipts.length}</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="font-medium">Total Amount Paid:</span>
                  <span className="font-semibold text-green-600">
                    {formatCurrency(
                      receipts.reduce(
                        (sum, receipt) => sum + (receipt.paidAmount || 0),
                        0
                      )
                    )}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptsList;
