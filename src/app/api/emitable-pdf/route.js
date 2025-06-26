import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req) {
  try {
    const { records } = await req.json();

    // Define columns to show in PDF (adjust as needed)
    const columns = [
      { key: "emiNumber", label: "EMI #" },
      { key: "dueDate", label: "Due Date" },
      { key: "dueAmount", label: "Due Amount" },
      { key: "status", label: "Status" },
      { key: "mobileNo", label: "Mobile No" },
      { key: "vehicleNo", label: "Vehicle No" },
      { key: "hsnNo", label: "HSN No" },
      { key: "suretyName", label: "Surety Name" },
      { key: "suretyMobileNo", label: "Surety Mobile" },
      { key: "suretyAddress", label: "Surety Address" },
      { key: "customerAddress", label: "Customer Address" },
      { key: "emiMonths", label: "EMI Months" },
    ];

    // Build HTML table
    const html = `
      <html>
        <head>
          <meta charset="utf-8" />
          <title>EMI Table PDF</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 24px; }
            table { border-collapse: collapse; width: 100%; font-size: 12px; }
            th, td { border: 1px solid #888; padding: 6px 8px; text-align: center; }
            th { background: #f0f0f0; }
            tr:nth-child(even) { background: #fafafa; }
            .nowrap { white-space: nowrap; }
          </style>
        </head>
        <body>
          <h2>EMI Records Table</h2>
          <table>
            <thead>
              <tr>
                ${columns.map((col) => `<th>${col.label}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${records
                .map(
                  (row) => `
                <tr>
                  ${columns
                    .map((col) => {
                      let val = row[col.key];
                      if (col.key === "dueDate" && val) {
                        val = new Date(val).toLocaleDateString();
                      }
                      if (col.key === "dueAmount" && val) {
                        val = new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(val);
                      }
                      return `<td class="${
                        col.key === "dueDate" || col.key === "dueAmount"
                          ? "nowrap"
                          : ""
                      }">${val ?? ""}</td>`;
                    })
                    .join("")}
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

    // Launch Puppeteer and generate PDF
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({
      format: "A4",
      landscape: true,
      printBackground: true,
      margin: { top: 24, bottom: 24, left: 24, right: 24 },
    });
    await browser.close();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=emi-table.pdf",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error.message },
      { status: 500 }
    );
  }
}
