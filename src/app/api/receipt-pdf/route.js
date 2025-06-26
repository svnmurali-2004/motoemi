import { NextResponse } from "next/server";
import jsPDF from "jspdf";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const data = await req.json();

    // Create a new PDF document
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Set margins
    const margin = 12;
    let yPosition = margin + 5;

    // Add background color for header
    doc.setFillColor(240, 248, 255); // Light blue background
    doc.rect(0, 0, pageWidth, 35, "F");

    // Add main border around the document
    doc.setDrawColor(100, 149, 237); // Cornflower blue
    doc.setLineWidth(0.8);
    doc.rect(
      margin - 2,
      margin - 2,
      pageWidth - 2 * margin + 4,
      pageHeight - 2 * margin + 4
    );

    // Header with styled text and decorative elements
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(25, 25, 112); // Midnight blue
    doc.text("CAR DEALERSHIP", pageWidth / 2, yPosition + 5, {
      align: "center",
    });

    doc.setFontSize(16);
    doc.text(
      "JAI BHAVANI MOTORS & SPARE PARTS",
      pageWidth / 2,
      yPosition + 12,
      {
        align: "center",
      }
    );

    // Subtitle with background
    yPosition += 16;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(70, 70, 70);
    doc.text(
      "Delivery Note Cum Intermediater Receipt",
      pageWidth / 2,
      yPosition,
      {
        align: "center",
      }
    );

    // Receipt details with styled background
    yPosition += 8;
    doc.setFillColor(245, 245, 245); // Light gray background
    doc.rect(margin, yPosition - 3, pageWidth - 2 * margin, 12, "F");
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.rect(margin, yPosition - 3, pageWidth - 2 * margin, 12);

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(
      `Receipt No: ${data.receiptNumber} | Date: ${data.date} | Time: ${data.time}`,
      pageWidth / 2,
      yPosition + 3,
      {
        align: "center",
      }
    );
    yPosition += 20;

    // Helper function to create section headers
    const createSectionHeader = (title, y) => {
      doc.setFillColor(70, 130, 180); // Steel blue
      doc.rect(margin, y - 5, pageWidth - 2 * margin, 10, "F");
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255); // White text
      doc.text(title, margin + 3, y + 1);
      return y + 12;
    };

    // Helper function to create content boxes
    const createContentBox = (y, height) => {
      doc.setFillColor(252, 252, 252); // Very light gray
      doc.rect(margin, y, pageWidth - 2 * margin, height, "F");
      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.2);
      doc.rect(margin, y, pageWidth - 2 * margin, height);
    };

    // Registered Owner Section
    yPosition = createSectionHeader("REGISTERED OWNER", yPosition);
    createContentBox(yPosition, 18);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(`Name: ${data.registeredOwner}`, margin + 3, yPosition + 5);
    doc.text(`S/o / D/o: ${data.ownerParentName}`, margin + 3, yPosition + 10);
    doc.text(`Address: ${data.ownerAddress}`, margin + 3, yPosition + 15);
    yPosition += 25;

    // Decorative dashed line
    doc.setDrawColor(100, 149, 237);
    doc.setLineDashPattern([3, 2], 0);
    doc.setLineWidth(0.5);
    doc.line(margin + 10, yPosition, pageWidth - margin - 10, yPosition);
    yPosition += 8;

    // Vehicle Information Section
    yPosition = createSectionHeader("VEHICLE INFORMATION", yPosition);
    createContentBox(yPosition, 25);

    doc.setLineDashPattern([], 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    const leftColumn = margin + 3;
    const rightColumn = pageWidth / 2 + 5;

    // Left column
    doc.setFont("helvetica", "bold");
    doc.text("Registration Number:", leftColumn, yPosition + 5);
    doc.setFont("helvetica", "normal");
    doc.text(data.registrationNumber, leftColumn + 35, yPosition + 5);

    doc.setFont("helvetica", "bold");
    doc.text("Model:", leftColumn, yPosition + 10);
    doc.setFont("helvetica", "normal");
    doc.text(data.model, leftColumn + 15, yPosition + 10);

    doc.setFont("helvetica", "bold");
    doc.text("Vehicle Class:", leftColumn, yPosition + 15);
    doc.setFont("helvetica", "normal");
    doc.text(data.classToVehicle, leftColumn + 25, yPosition + 15);

    doc.setFont("helvetica", "bold");
    doc.text("Manufacturer:", leftColumn, yPosition + 20);
    doc.setFont("helvetica", "normal");
    doc.text(data.makersName, leftColumn + 25, yPosition + 20);

    // Right column
    doc.setFont("helvetica", "bold");
    doc.text("Chassis Number:", rightColumn, yPosition + 5);
    doc.setFont("helvetica", "normal");
    doc.text(data.chassisNumber, rightColumn + 30, yPosition + 5);

    doc.setFont("helvetica", "bold");
    doc.text("Engine Number:", rightColumn, yPosition + 10);
    doc.setFont("helvetica", "normal");
    doc.text(data.engineNumber, rightColumn + 30, yPosition + 10);

    doc.setFont("helvetica", "bold");
    doc.text("Mfg. Date:", rightColumn, yPosition + 15);
    doc.setFont("helvetica", "normal");
    doc.text(data.monthYearOfManufacture, rightColumn + 20, yPosition + 15);

    doc.setFont("helvetica", "bold");
    doc.text("Color:", rightColumn, yPosition + 20);
    doc.setFont("helvetica", "normal");
    doc.text(data.colorOfVehicle, rightColumn + 15, yPosition + 20);

    yPosition += 32;

    // Decorative dashed line
    doc.setDrawColor(100, 149, 237);
    doc.setLineDashPattern([3, 2], 0);
    doc.line(margin + 10, yPosition, pageWidth - margin - 10, yPosition);
    yPosition += 8;

    // Seller Details Section
    yPosition = createSectionHeader("SELLER DETAILS", yPosition);
    createContentBox(yPosition, 20);

    doc.setLineDashPattern([], 0);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    // Left column
    doc.setFont("helvetica", "bold");
    doc.text("Name:", leftColumn, yPosition + 5);
    doc.setFont("helvetica", "normal");
    doc.text(data.sellerName, leftColumn + 15, yPosition + 5);

    doc.setFont("helvetica", "bold");
    doc.text("S/o:", leftColumn, yPosition + 10);
    doc.setFont("helvetica", "normal");
    doc.text(data.sellerParentName, leftColumn + 10, yPosition + 10);

    doc.setFont("helvetica", "bold");
    doc.text("Address:", leftColumn, yPosition + 15);
    doc.setFont("helvetica", "normal");
    doc.text(data.sellerAddress, leftColumn + 20, yPosition + 15);

    // Right column
    doc.setFont("helvetica", "bold");
    doc.text("ID Proof:", rightColumn, yPosition + 5);
    doc.setFont("helvetica", "normal");
    doc.text(data.sellerIDProof, rightColumn + 20, yPosition + 5);

    doc.setFont("helvetica", "bold");
    doc.text("Phone:", rightColumn, yPosition + 10);
    doc.setFont("helvetica", "normal");
    doc.text(data.sellerPhone, rightColumn + 15, yPosition + 10);

    yPosition += 27;

    // Decorative dashed line
    doc.setDrawColor(100, 149, 237);
    doc.setLineDashPattern([3, 2], 0);
    doc.line(margin + 10, yPosition, pageWidth - margin - 10, yPosition);
    yPosition += 8;

    // Purchaser Details Section
    yPosition = createSectionHeader("PURCHASER DETAILS", yPosition);
    createContentBox(yPosition, 20);

    doc.setLineDashPattern([], 0);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    // Left column
    doc.setFont("helvetica", "bold");
    doc.text("Name:", leftColumn, yPosition + 5);
    doc.setFont("helvetica", "normal");
    doc.text(data.purchaserName, leftColumn + 15, yPosition + 5);

    doc.setFont("helvetica", "bold");
    doc.text("S/o:", leftColumn, yPosition + 10);
    doc.setFont("helvetica", "normal");
    doc.text(data.purchaserParentName, leftColumn + 10, yPosition + 10);

    doc.setFont("helvetica", "bold");
    doc.text("Address:", leftColumn, yPosition + 15);
    doc.setFont("helvetica", "normal");
    doc.text(data.purchaserAddress, leftColumn + 20, yPosition + 15);

    // Right column
    doc.setFont("helvetica", "bold");
    doc.text("ID Proof:", rightColumn, yPosition + 5);
    doc.setFont("helvetica", "normal");
    doc.text(data.purchaserIDProof, rightColumn + 20, yPosition + 5);

    doc.setFont("helvetica", "bold");
    doc.text("Phone:", rightColumn, yPosition + 10);
    doc.setFont("helvetica", "normal");
    doc.text(data.purchaserPhone, rightColumn + 15, yPosition + 10);

    yPosition += 32;

    // Notes Section with styled background
    doc.setFillColor(255, 248, 220); // Cornsilk background
    doc.rect(margin, yPosition, pageWidth - 2 * margin, 30, "F");
    doc.setDrawColor(255, 165, 0); // Orange border
    doc.setLineWidth(0.5);
    doc.rect(margin, yPosition, pageWidth - 2 * margin, 30);

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(139, 69, 19); // Saddle brown
    doc.text("► IMPORTANT NOTES:", margin + 3, yPosition + 6);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    const notes = [
      "• Please transfer the vehicle within a week.",
      "• Vehicle once sold is not returnable.",
      "• Condition of vehicle as is where is.",
      "• We are not responsible for traffic violations.",
    ];

    notes.forEach((note, index) => {
      doc.text(note, margin + 6, yPosition + 12 + index * 4);
    });

    yPosition += 40;

    // Signature section with styled box
    doc.setFillColor(248, 248, 255); // Ghost white
    doc.rect(pageWidth - 80, yPosition, 70, 25, "F");
    doc.setDrawColor(70, 130, 180);
    doc.setLineWidth(0.3);
    doc.rect(pageWidth - 80, yPosition, 70, 25);

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(25, 25, 112);
    doc.text("For JAI BHAVANI MOTORS", pageWidth - 75, yPosition + 6);
    doc.text("& SPARE PARTS", pageWidth - 75, yPosition + 11);

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(pageWidth - 75, yPosition + 18, pageWidth - 15, yPosition + 18);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text("Authorized Signature", pageWidth - 75, yPosition + 22);

    // Generate PDF buffer
    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=delivery_receipt_${data.receiptNumber}.pdf`,
      },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
