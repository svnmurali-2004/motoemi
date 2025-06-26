import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const data = await req.json();
    // HTML string matching the look of components/Receipt.jsx
    const html = `
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Vehicle Delivery Receipt</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>
            body { background: #f6f8fa; }
            @page { size: A4; margin: 0; }
            html, body { width: 210mm; height: 297mm; margin: 0; padding: 0; }
            .max-w-4xl {
              margin-top: 0 !important;
              margin-bottom: 0 !important;
              width: 185mm !important;
              min-height: 0 !important;
              max-width: 185mm !important;
              box-sizing: border-box;
              page-break-inside: avoid;
            }
            .p-6 { padding: 18px !important; }
            .mt-8, .my-4, .mb-4, .mt-4, .mt-6 { margin-top: 12px !important; margin-bottom: 12px !important; }
            .text-sm { font-size: 0.98rem !important; }
            .text-lg { font-size: 1.15rem !important; }
            .text-2xl { font-size: 1.45rem !important; }
            .rounded-md { border-radius: 12px !important; }
            .border { border-width: 1.2px !important; }
            .border-gray-300 { border-color: #d1d5db !important; }
            .bg-white { background: #fff !important; }
            .mx-auto { margin-left: auto !important; margin-right: auto !important; }
            .grid { display: grid !important; }
            .grid-cols-1 { grid-template-columns: 1fr !important; }
            .md\:grid-cols-2 { grid-template-columns: 1fr 1fr !important; }
            .gap-4 { gap: 16px !important; }
            .font-bold { font-weight: 700 !important; }
            .font-semibold { font-weight: 600 !important; }
            .italic { font-style: italic !important; }
            .list-disc { list-style-type: disc !important; }
            .list-inside { list-style-position: inside !important; }
            .text-center { text-align: center !important; }
            .text-right { text-align: right !important; }
            .border-dashed { border-style: dashed !important; }
            .border { border-width: 1px !important; }
            .border-gray-300 { border-color: #d1d5db !important; }
            .overflow-hidden { overflow: hidden !important; }
            /* Prevent page breaks inside main container */
            .max-w-4xl, body, html { page-break-inside: avoid !important; }
          </style>
        </head>
        <body>
          <div class="max-w-4xl mx-auto p-6 bg-white text-zinc-900 rounded-md border border-gray-300 overflow-hidden" style="font-family: 'Segoe UI', Arial, sans-serif;">
            <div class="text-center mb-4">
              <h1 class="text-2xl font-bold">🚗 JAI BHAVANI MOTORS & SPARE PARTS</h1>
              <p class="text-sm mt-1">Delivery Note Cum Intermediater Receipt</p>
              <p class="text-sm">
                Receipt No: <strong>${data.receiptNumber}</strong> | Date: <strong>${data.date}</strong> | Time: <strong>${data.time}</strong>
              </p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <p><strong>Registered Owner:</strong> ${data.registeredOwner}</p>
                <p><strong>S/o / D/o:</strong> ${data.ownerParentName}</p>
                <p><strong>Address:</strong> ${data.ownerAddress}</p>
              </div>
            </div>
            <hr class="my-4 border-dashed" />
            <h2 class="text-lg font-semibold mb-2">Vehicle Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Registration Number:</strong> ${data.registrationNumber}</p>
                <p><strong>Model:</strong> ${data.model}</p>
                <p><strong>Vehicle Class:</strong> ${data.classToVehicle}</p>
                <p><strong>Manufacturer:</strong> ${data.makersName}</p>
              </div>
              <div>
                <p><strong>Chassis Number:</strong> ${data.chassisNumber}</p>
                <p><strong>Engine Number:</strong> ${data.engineNumber}</p>
                <p><strong>Manufacturing Date:</strong> ${data.monthYearOfManufacture}</p>
                <p><strong>Color:</strong> ${data.colorOfVehicle}</p>
              </div>
            </div>
            <hr class="my-4 border-dashed" />
            <h2 class="text-lg font-semibold mb-2">Seller Details</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Name:</strong> ${data.sellerName}</p>
                <p><strong>S/o:</strong> ${data.sellerParentName}</p>
                <p><strong>Address:</strong> ${data.sellerAddress}</p>
              </div>
              <div>
                <p><strong>ID Proof:</strong> ${data.sellerIDProof}</p>
                <p><strong>Phone:</strong> ${data.sellerPhone}</p>
              </div>
            </div>
            <hr class="my-4 border-dashed" />
            <h2 class="text-lg font-semibold mb-2">Purchaser Details</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Name:</strong> ${data.purchaserName}</p>
                <p><strong>S/o:</strong> ${data.purchaserParentName}</p>
                <p><strong>Address:</strong> ${data.purchaserAddress}</p>
              </div>
              <div>
                <p><strong>ID Proof:</strong> ${data.purchaserIDProof}</p>
                <p><strong>Phone:</strong> ${data.purchaserPhone}</p>
              </div>
            </div>
            <div class="mt-8 text-sm italic">
              <p>Note:</p>
              <ul class="list-disc list-inside">
                <li>Please transfer the vehicle within a week.</li>
                <li>Vehicle once sold is not returnable.</li>
                <li>Condition of vehicle as is where is.</li>
                <li>We are not responsible for traffic violations.</li>
              </ul>
            </div>
            <div class="mt-6 text-right text-sm">
              <p><strong>For JAI BHAVANI MOTORS & SPARE PARTS</strong></p>
              <p class="mt-4">_</p>
              <p>Authorized Signature</p>
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
    console.log(err)
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
