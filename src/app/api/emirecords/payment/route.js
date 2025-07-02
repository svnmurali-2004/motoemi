import { NextResponse } from "next/server";
import db from "@/dbConfig/dbConfig.js";
import emirecords from "@/models/emirecordModel.js";
import Customer from "@/models/customerModel.js";

export async function POST(request) {
  try {
    await db();

    const { emiRecordId, receipt } = await request.json();

    // Validate required fields
    if (!emiRecordId || !receipt) {
      return NextResponse.json(
        { ok: false, message: "EMI Record ID and receipt data are required" },
        { status: 400 }
      );
    }

    // Find the EMI record
    const emiRecord = await emirecords
      .findById(emiRecordId)
      .populate("customerId");

    if (!emiRecord) {
      return NextResponse.json(
        { ok: false, message: "EMI record not found" },
        { status: 404 }
      );
    }

    // Validate payment amount
    const remainingAmount = emiRecord.dueAmount - emiRecord.totalPaidAmount;
    if (receipt.paidAmount > remainingAmount) {
      return NextResponse.json(
        {
          ok: false,
          message: `Payment amount exceeds remaining balance of ₹${remainingAmount}`,
        },
        { status: 400 }
      );
    }

    // Check if receipt ID already exists
    const existingReceipt = emiRecord.receipts.find(
      (r) => r.receiptId === receipt.receiptId
    );
    if (existingReceipt) {
      return NextResponse.json(
        { ok: false, message: "Receipt ID already exists" },
        { status: 400 }
      );
    }

    // Add the new receipt
    emiRecord.receipts.push({
      receiptId: receipt.receiptId,
      paidAmount: receipt.paidAmount,
      paidDate: receipt.paidDate,
      paymentMode: receipt.paymentMode,
      url: receipt.url,
      generatedAt: new Date(),
    });

    // Update total paid amount
    emiRecord.totalPaidAmount += receipt.paidAmount;

    // Update payment date if this is the first payment
    if (!emiRecord.paidDate) {
      emiRecord.paidDate = receipt.paidDate;
    }

    // Update status if fully paid
    if (emiRecord.totalPaidAmount >= emiRecord.dueAmount) {
      emiRecord.status = "paid";
    }

    // Save the updated record
    const updatedEmiRecord = await emiRecord.save();

    return NextResponse.json({
      ok: true,
      message: "Payment recorded successfully",
      updatedEmiRecord: updatedEmiRecord,
      summary: {
        totalPaid: updatedEmiRecord.totalPaidAmount,
        remainingAmount:
          updatedEmiRecord.dueAmount - updatedEmiRecord.totalPaidAmount,
        status: updatedEmiRecord.status,
        receiptsCount: updatedEmiRecord.receipts.length,
      },
    });
  } catch (error) {
    console.error("Error recording payment:", error);
    return NextResponse.json(
      { ok: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
