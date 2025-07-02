import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/dbConfig/dbConfig";
import EMIRecord from "@/models/emirecordModel";
import { jsPDF } from "jspdf";

// Connect to database
connectDB();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const receiptId = searchParams.get("receiptId");

    if (!receiptId) {
      return NextResponse.json(
        { ok: false, message: "Receipt ID is required" },
        { status: 400 }
      );
    }

    // Find EMI record containing the receipt
    const emiRecord = await EMIRecord.findOne({
      "receipts.receiptId": receiptId,
    }).populate("customerId");

    if (!emiRecord) {
      return NextResponse.json(
        { ok: false, message: "Receipt not found" },
        { status: 404 }
      );
    }

    // Find the specific receipt
    const receipt = emiRecord.receipts.find((r) => r.receiptId === receiptId);

    if (!receipt) {
      return NextResponse.json(
        { ok: false, message: "Receipt not found" },
        { status: 404 }
      );
    }

    // Generate PDF using jsPDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Set up fonts and colors
    pdf.setFont("helvetica");

    // Company Header with background
    pdf.setFillColor(0, 102, 204);
    pdf.rect(0, 0, 210, 40, "F");

    // Company Name
    pdf.setFontSize(24);
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.text("JAI BHAVANI AUTO FINANCE", 105, 20, { align: "center" });

    // Company Tagline
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text("Trusted Vehicle Finance Solutions", 105, 30, { align: "center" });

    // Payment Receipt Title
    pdf.setFontSize(18);
    pdf.setTextColor(0, 102, 204);
    pdf.setFont("helvetica", "bold");
    pdf.text("PAYMENT RECEIPT", 105, 55, { align: "center" });

    // Receipt number with styling
    pdf.setFontSize(11);
    pdf.setTextColor(100, 100, 100);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Receipt No: ${receipt.receiptId}`, 105, 65, { align: "center" });

    // Add decorative line
    pdf.setDrawColor(0, 102, 204);
    pdf.setLineWidth(1);
    pdf.line(20, 72, 190, 72);

    // EMI Details Section with styling
    pdf.setFontSize(14);
    pdf.setTextColor(0, 102, 204);
    pdf.setFont("helvetica", "bold");
    pdf.text("EMI DETAILS", 20, 85);

    // Add section underline
    pdf.setDrawColor(0, 102, 204);
    pdf.setLineWidth(0.5);
    pdf.line(20, 88, 80, 88);

    pdf.setFontSize(10);
    pdf.setTextColor(60, 60, 60);

    const emiDetails = [
      [`EMI Number:`, `#${emiRecord.emiNumber}`],
      [`Customer Name:`, emiRecord.customerId?.customerName || "N/A"],
      [
        `Customer Mobile:`,
        emiRecord.customerId?.mobileNo || emiRecord.mobileNo || "N/A",
      ],
      [`Customer Address:`, emiRecord.customerId?.customerAddress || "N/A"],
      [`Vehicle Number:`, emiRecord.customerId?.vehicleNo || "N/A"],
      [`HSN Number:`, emiRecord.customerId?.hsnNo || "N/A"],
      [`Due Date:`, new Date(emiRecord.dueDate).toLocaleDateString("en-IN")],
      [`Total Due Amount:`, `Rs. ${emiRecord.dueAmount || 0}`],
    ];

    let yPos = 95;
    emiDetails.forEach(([label, value]) => {
      pdf.setFont("helvetica", "bold");
      pdf.text(label, 20, yPos);
      pdf.setFont("helvetica", "normal");
      pdf.text(value, 85, yPos);
      yPos += 7;
    });

    // Payment Details Section with styling
    yPos += 10;
    pdf.setFontSize(14);
    pdf.setTextColor(0, 102, 204);
    pdf.setFont("helvetica", "bold");
    pdf.text("PAYMENT DETAILS", 20, yPos);

    // Add section underline
    pdf.setDrawColor(0, 102, 204);
    pdf.setLineWidth(0.5);
    pdf.line(20, yPos + 3, 105, yPos + 3);

    yPos += 12;
    pdf.setFontSize(10);
    pdf.setTextColor(60, 60, 60);

    const paymentDetails = [
      [`Payment Amount:`, `Rs. ${receipt.paidAmount || 0}`],
      [`Payment Mode:`, (receipt.paymentMode || "cash").toUpperCase()],
      [`Payment Date:`, new Date(receipt.paidDate).toLocaleDateString("en-IN")],
      [`Receipt Date:`, new Date().toLocaleDateString("en-IN")],
    ];

    paymentDetails.forEach(([label, value]) => {
      pdf.setFont("helvetica", "bold");
      pdf.text(label, 20, yPos);
      pdf.setFont("helvetica", "normal");
      pdf.text(value, 85, yPos);
      yPos += 7;
    });

    // Payment Summary Box with enhanced styling
    yPos += 15;
    pdf.setDrawColor(0, 102, 204);
    pdf.setLineWidth(1.5);
    pdf.setFillColor(240, 248, 255);
    pdf.roundedRect(20, yPos, 170, 35, 3, 3, "FD");

    pdf.setFontSize(12);
    pdf.setTextColor(0, 102, 204);
    pdf.setFont("helvetica", "bold");
    pdf.text("PAYMENT SUMMARY", 105, yPos + 10, { align: "center" });

    pdf.setFontSize(11);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont("helvetica", "bold");
    pdf.text(`Amount Paid: Rs. ${receipt.paidAmount || 0}`, 30, yPos + 22);

    const remainingAmount =
      (emiRecord.dueAmount || 0) - (emiRecord.totalPaidAmount || 0);
    pdf.text(`Remaining Balance: Rs. ${remainingAmount}`, 30, yPos + 30);

    // Footer with enhanced styling
    yPos += 50;
    pdf.setDrawColor(0, 102, 204);
    pdf.setLineWidth(0.5);
    pdf.line(20, yPos, 190, yPos);

    yPos += 8;
    pdf.setFontSize(9);
    pdf.setTextColor(80, 80, 80);
    pdf.setFont("helvetica", "italic");
    pdf.text(
      "This is a computer generated receipt and does not require signature.",
      105,
      yPos,
      {
        align: "center",
      }
    );

    yPos += 6;
    pdf.setFont("helvetica", "normal");
    pdf.text(`Generated on: ${new Date().toLocaleString("en-IN")}`, 105, yPos, {
      align: "center",
    });

    // Company footer
    yPos += 10;
    pdf.setFontSize(8);
    pdf.setTextColor(0, 102, 204);
    pdf.setFont("helvetica", "bold");
    pdf.text("JAI BHAVANI AUTO FINANCE", 105, yPos, { align: "center" });
    pdf.setTextColor(100, 100, 100);
    pdf.setFont("helvetica", "normal");
    pdf.text("Thank you for your business!", 105, yPos + 5, {
      align: "center",
    });

    // Generate PDF buffer
    const pdfBuffer = Buffer.from(pdf.output("arraybuffer"));

    // Return PDF as downloadable file
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="receipt-${receiptId}.pdf"`,
        "Content-Length": pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Receipt download error:", error);
    return NextResponse.json(
      { ok: false, message: "Failed to generate receipt PDF" },
      { status: 500 }
    );
  }
}
