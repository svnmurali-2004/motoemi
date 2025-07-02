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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CreditCard, DollarSign, Receipt } from "lucide-react";
import toast from "react-hot-toast";

const PaymentDialog = ({ emiRecord, onPaymentUpdate }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    paidAmount: "",
    paymentMode: "cash",
    paidDate: new Date().toISOString().split("T")[0],
    receiptId: `REC${Date.now()}`,
  });

  const paymentModes = [
    { value: "cash", label: "Cash" },
    { value: "cheque", label: "Cheque" },
    { value: "online", label: "Online Transfer" },
    { value: "upi", label: "UPI" },
    { value: "card", label: "Card" },
    { value: "bank_transfer", label: "Bank Transfer" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle amount input validation
    if (name === "paidAmount") {
      // Allow only numbers and decimal point
      const numericValue = value.replace(/[^0-9.]/g, "");

      // Ensure only one decimal point
      const parts = numericValue.split(".");
      if (parts.length > 2) {
        return; // Don't update if more than one decimal point
      }

      // Limit decimal places to 2
      if (parts[1] && parts[1].length > 2) {
        return; // Don't update if more than 2 decimal places
      }

      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate amount
    const paidAmount = parseFloat(formData.paidAmount);
    if (isNaN(paidAmount) || paidAmount <= 0) {
      toast.error("Please enter a valid amount", {
        duration: 4000,
        position: "top-right",
      });
      setLoading(false);
      return;
    }

    if (paidAmount > remainingAmount) {
      toast.error(
        `Amount cannot exceed remaining balance of ₹${remainingAmount}`,
        {
          duration: 4000,
          position: "top-right",
        }
      );
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/emirecords/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emiRecordId: emiRecord._id,
          receipt: {
            receiptId: formData.receiptId,
            paidAmount: paidAmount,
            paidDate: new Date(formData.paidDate),
            paymentMode: formData.paymentMode,
          },
        }),
      });

      const result = await response.json();

      if (result.ok) {
        toast.success("Payment recorded successfully!", {
          duration: 4000,
          position: "top-right",
        });
        setOpen(false);
        if (onPaymentUpdate) {
          onPaymentUpdate(result.updatedEmiRecord);
        }
        // Reset form
        setFormData({
          paidAmount: "",
          paymentMode: "cash",
          paidDate: new Date().toISOString().split("T")[0],
          receiptId: `REC${Date.now()}`,
        });
      } else {
        toast.error(result.message || "Failed to record payment", {
          duration: 4000,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to record payment. Please try again.", {
        duration: 4000,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  const remainingAmount =
    (emiRecord.dueAmount || 0) - (emiRecord.totalPaidAmount || 0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-green-50 hover:bg-green-100 text-green-700 border-green-300"
        >
          <DollarSign className="h-4 w-4 mr-1" />
          Pay EMI
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg  max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Record EMI Payment
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {/* EMI Info Card */}
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600">
                EMI Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>EMI Number:</span>
                <span className="font-semibold">#{emiRecord.emiNumber}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Due Amount:</span>
                <span className="font-semibold">₹{emiRecord.dueAmount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Paid Amount:</span>
                <span className="font-semibold text-green-600">
                  ₹{emiRecord.totalPaidAmount || 0}
                </span>
              </div>
              <div className="flex justify-between text-sm border-t pt-2">
                <span>Remaining:</span>
                <span className="font-semibold text-red-600">
                  ₹{remainingAmount}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Due Date:</span>
                <span className="font-semibold">
                  {new Date(emiRecord.dueDate).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Receipt ID */}
            <div className="space-y-2">
              <Label htmlFor="receiptId">Receipt ID</Label>
              <Input
                id="receiptId"
                name="receiptId"
                value={formData.receiptId}
                onChange={handleInputChange}
                placeholder="Enter receipt ID"
                required
              />
            </div>

            {/* Payment Amount */}
            <div className="space-y-2">
              <Label htmlFor="paidAmount">Payment Amount (₹)</Label>
              <Input
                id="paidAmount"
                name="paidAmount"
                type="text"
                value={formData.paidAmount}
                onChange={handleInputChange}
                placeholder="Enter amount"
                required
              />
              <p className="text-xs text-gray-500">
                Maximum: ₹{remainingAmount}
              </p>
            </div>

            {/* Payment Mode */}
            <div className="space-y-2">
              <Label htmlFor="paymentMode">Payment Mode</Label>
              <select
                id="paymentMode"
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {paymentModes.map((mode) => (
                  <option key={mode.value} value={mode.value}>
                    {mode.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Payment Date */}
            <div className="space-y-2">
              <Label htmlFor="paidDate">Payment Date</Label>
              <Input
                id="paidDate"
                name="paidDate"
                type="date"
                value={formData.paidDate}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 sticky bottom-0 bg-white border-t -mx-6 px-6 py-4 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="flex-1"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-1" />
                    Record Payment
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
