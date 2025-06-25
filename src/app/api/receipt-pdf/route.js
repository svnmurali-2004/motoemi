import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const data = await req.json();
    // Beautiful, modern receipt HTML with 2-column grid for details
    const html = `
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Vehicle Delivery Receipt</title>
          <style>
            @page { size: A4; margin: 0; }
            html, body {
              width: 210mm;
              height: 297mm;
              margin: 0;
              padding: 0;
              background: #f6f8fa;
            }
            body {
              font-family: 'Segoe UI', Arial, sans-serif;
              color: #222;
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            .receipt-container {
              background: #fff;
              width: 185mm;
              min-height: 260mm;
              margin: 12mm auto;
              border-radius: 18px;
              box-shadow: 0 8px 32px rgba(60,60,100,0.12);
              padding: 32px 28px 28px 28px;
              border: 1.5px solid #e3e7ee;
              box-sizing: border-box;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }
            .brand {
              display: flex;
              align-items: center;
              gap: 12px;
              margin-bottom: 12px;
            }
            .brand-logo {
              font-size: 2.2rem;
              border-radius: 8px;
              background: linear-gradient(90deg,#4f8cff,#a084ee 80%);
              color: #fff;
              width: 48px;
              height: 48px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              box-shadow: 0 2px 8px #a084ee22;
            }
            .brand-title {
              font-size: 1.5rem;
              font-weight: 700;
              color: #4f46e5;
              letter-spacing: 1px;
            }
            .subtitle {
              font-size: 1.1rem;
              color: #6b7280;
              margin-bottom: 18px;
              font-weight: 500;
            }
            .receipt-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 18px;
              border-bottom: 1.5px dashed #e3e7ee;
              padding-bottom: 10px;
            }
            .receipt-title {
              font-size: 1.3rem;
              font-weight: 600;
              color: #222;
            }
            .receipt-info {
              font-size: 1rem;
              color: #444;
              text-align: right;
            }
            .section {
              margin: 22px 0 0 0;
              padding-bottom: 12px;
              border-bottom: 1px solid #f0f1f5;
            }
            .section:last-child {
              border-bottom: none;
            }
            .section-title {
              font-size: 1.08rem;
              font-weight: 600;
              color: #4f46e5;
              margin-bottom: 8px;
              letter-spacing: 0.5px;
            }
            .grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 8px 32px;
              margin-bottom: 4px;
            }
            .row {
              display: flex;
              align-items: baseline;
              font-size: 1rem;
              margin-bottom: 2px;
            }
            .label {
              min-width: 90px;
              color: #6b7280;
              font-weight: 500;
              margin-right: 6px;
            }
            .value {
              color: #222;
              font-weight: 500;
              word-break: break-word;
            }
            .footer {
              margin-top: 32px;
              text-align: right;
              color: #6b7280;
              font-size: 0.98rem;
            }
            .note {
              margin-top: 18px;
              background: #f1f5ff;
              color: #4f46e5;
              border-radius: 8px;
              padding: 12px 18px;
              font-size: 0.98rem;
              font-style: italic;
            }
            ul {
              margin: 0 0 0 18px;
              padding: 0;
            }
            @media print {
              html, body {
                width: 210mm;
                height: 297mm;
                background: #fff !important;
              }
              .receipt-container {
                box-shadow: none;
                border: none;
                margin: 0;
                width: 185mm;
                min-height: 260mm;
                padding: 24px 18px 18px 18px;
              }
            }
          </style>
        </head>
        <body>
          <div class="receipt-container">
            <div class="brand">
              <div class="brand-logo">🚗</div>
              <div class="brand-title">JAI BHAVANI MOTORS & SPARE PARTS</div>
            </div>
            <div class="subtitle">Delivery Note Cum Intermediater Receipt</div>
            <div class="receipt-header">
              <div class="receipt-title">🧾 Vehicle Delivery Note</div>
              <div class="receipt-info">
                <div>Receipt #: <b>${data.receiptNumber}</b></div>
                <div>Date: <b>${data.date}</b></div>
                <div>Time: <b>${data.time}</b></div>
              </div>
            </div>
            <div class="section">
              <div class="section-title">Owner Details</div>
              <div class="grid">
                <div class="row"><span class="label">Name:</span> <span class="value">${data.registeredOwner}</span></div>
                <div class="row"><span class="label">Parent:</span> <span class="value">${data.ownerParentName}</span></div>
                <div class="row"><span class="label">Address:</span> <span class="value">${data.ownerAddress}</span></div>
              </div>
            </div>
            <div class="section">
              <div class="section-title">Vehicle Information</div>
              <div class="grid">
                <div class="row"><span class="label">Reg. No.:</span> <span class="value">${data.registrationNumber}</span></div>
                <div class="row"><span class="label">Model:</span> <span class="value">${data.model}</span></div>
                <div class="row"><span class="label">Class:</span> <span class="value">${data.classToVehicle}</span></div>
                <div class="row"><span class="label">Chassis No.:</span> <span class="value">${data.chassisNumber}</span></div>
                <div class="row"><span class="label">Engine No.:</span> <span class="value">${data.engineNumber}</span></div>
                <div class="row"><span class="label">Maker:</span> <span class="value">${data.makersName}</span></div>
                <div class="row"><span class="label">Mfg. Date:</span> <span class="value">${data.monthYearOfManufacture}</span></div>
                <div class="row"><span class="label">Color:</span> <span class="value">${data.colorOfVehicle}</span></div>
              </div>
            </div>
            <div class="section">
              <div class="section-title">Seller Details</div>
              <div class="grid">
                <div class="row"><span class="label">Name:</span> <span class="value">${data.sellerName}</span></div>
                <div class="row"><span class="label">Parent:</span> <span class="value">${data.sellerParentName}</span></div>
                <div class="row"><span class="label">Address:</span> <span class="value">${data.sellerAddress}</span></div>
                <div class="row"><span class="label">ID Proof:</span> <span class="value">${data.sellerIDProof}</span></div>
                <div class="row"><span class="label">Phone:</span> <span class="value">${data.sellerPhone}</span></div>
              </div>
            </div>
            <div class="section">
              <div class="section-title">Purchaser Details</div>
              <div class="grid">
                <div class="row"><span class="label">Name:</span> <span class="value">${data.purchaserName}</span></div>
                <div class="row"><span class="label">Parent:</span> <span class="value">${data.purchaserParentName}</span></div>
                <div class="row"><span class="label">Address:</span> <span class="value">${data.purchaserAddress}</span></div>
                <div class="row"><span class="label">ID Proof:</span> <span class="value">${data.purchaserIDProof}</span></div>
                <div class="row"><span class="label">Phone:</span> <span class="value">${data.purchaserPhone}</span></div>
              </div>
            </div>
            <div class="section">
              <div class="section-title">Branch</div>
              <div class="grid">
                <div class="row"><span class="label">Branch:</span> <span class="value">${data.branch}</span></div>
              </div>
            </div>
            <div class="note">
              <ul>
                <li>Please transfer the vehicle within a week.</li>
                <li>Vehicle once sold is not returnable.</li>
                <li>Condition of vehicle as is where is.</li>
                <li>We are not responsible for traffic violations.</li>
              </ul>
            </div>
            <div class="footer">
              For <b>JAI BHAVANI MOTORS & SPARE PARTS</b><br />
              <span style="display:inline-block;margin-top:18px;">__________________________</span><br />
              Authorized Signature
            </div>
          </div>
        </body>
      </html>
    `;
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=delivery_note.pdf`,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
