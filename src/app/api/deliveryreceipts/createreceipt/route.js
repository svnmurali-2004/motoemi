import db from "@/dbConfig/dbConfig";
import DeliveryReceipts from "@/models/deliveryReceiptModel";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
const requiredFields = [
  "receiptNumber",
  "date",
  "time",
  "registeredOwner",
  "ownerParentName",
  "ownerAddress",
  "registrationNumber",
  "model",
  "classToVehicle",
  "chassisNumber",
  "engineNumber",
  "makersName",
  "monthYearOfManufacture",
  "colorOfVehicle",
  "sellerName",
  "sellerParentName",
  "sellerAddress",
  "sellerIDProof",
  "sellerPhone",
  "purchaserName",
  "purchaserParentName",
  "purchaserAddress",
  "purchaserIDProof",
    "purchaserPhone",
  "branch",
];

export async function POST(req) {
  await db();
  try {
    const body = await req.json();
    // Check for missing fields
    const session = await getServerSession(authOptions);
    if (session.user.role == "employee" && !session.user.branch) {
      body.branch = session.user.branch;
      }
    const missing = requiredFields.filter((field) => !body[field]);
    if (missing.length > 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Missing fields: ${missing.join(", ")}`,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    // Create a new delivery receipt document
    const receipt = await DeliveryReceipts.create(body);
    return new Response(JSON.stringify({ success: true, receipt }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
