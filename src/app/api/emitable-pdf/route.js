// import { NextResponse } from "next/server";
// import * as html_to_pdf from "html-pdf-node";

// export async function POST(req) {
//   try {
//     const { records } = await req.json();

//     const columns = [
//       { key: "emiNumber", label: "EMI #" },
//       { key: "dueDate", label: "Due Date" },
//       { key: "dueAmount", label: "Due Amount" },
//       { key: "status", label: "Status" },
//       { key: "mobileNo", label: "Mobile No" },
//       { key: "vehicleNo", label: "Vehicle No" },
//       { key: "hsnNo", label: "HSN No" },
//       { key: "suretyName", label: "Surety Name" },
//       { key: "suretyMobileNo", label: "Surety Mobile" },
//       { key: "suretyAddress", label: "Surety Address" },
//       { key: "customerAddress", label: "Customer Address" },
//       { key: "emiMonths", label: "EMI Months" },
//     ];

//     const html = `
//       <html>
//         <head>
//           <meta charset="utf-8" />
//           <title>EMI Table PDF</title>
//           <style>
//             body { font-family: Arial, sans-serif; margin: 24px; }
//             table { border-collapse: collapse; width: 100%; font-size: 12px; }
//             th, td { border: 1px solid #888; padding: 6px 8px; text-align: center; }
//             th { background: #f0f0f0; }
//             tr:nth-child(even) { background: #fafafa; }
//             .nowrap { white-space: nowrap; }
//           </style>
//         </head>
//         <body>
//           <h2>EMI Records Table</h2>
//           <table>
//             <thead>
//               <tr>
//                 ${columns.map((col) => `<th>${col.label}</th>`).join("")}
//               </tr>
//             </thead>
//             <tbody>
//               ${records
//                 .map(
//                   (row) => `
//                 <tr>
//                   ${columns
//                     .map((col) => {
//                       let val = row[col.key];
//                       if (col.key === "dueDate" && val) {
//                         val = new Date(val).toLocaleDateString();
//                       }
//                       if (col.key === "dueAmount" && val) {
//                         val = new Intl.NumberFormat("en-IN", {
//                           style: "currency",
//                           currency: "INR",
//                         }).format(val);
//                       }
//                       return `<td class="${
//                         col.key === "dueDate" || col.key === "dueAmount"
//                           ? "nowrap"
//                           : ""
//                       }">${val ?? ""}</td>`;
//                     })
//                     .join("")}
//                 </tr>
//               `
//                 )
//                 .join("")}
//             </tbody>
//           </table>
//         </body>
//       </html>
//     `;

//     // Use html-pdf-node to generate PDF (works in most Node.js serverless, not Edge)
//     const file = { content: html };
//     const pdfBuffer = await html_to_pdf.generatePdf(file, {
//       format: "A4",
//       printBackground: true,
//       landscape: true,
//       margin: { top: 24, bottom: 24, left: 24, right: 24 },
//     });

//     return new NextResponse(pdfBuffer, {
//       status: 200,
//       headers: {
//         "Content-Type": "application/pdf",
//         "Content-Disposition": "attachment; filename=emi-table.pdf",
//       },
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { ok: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }

// // Get local Chrome path (used only in dev)
// function getLocalChromeExecutablePath() {
//   const platform = process.platform;
//   if (platform === "win32")
//     return "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
//   if (platform === "darwin")
//     return "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
//   return "/usr/bin/google-chrome"; // common for Linux
// }
