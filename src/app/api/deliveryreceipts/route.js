import db from "@/dbConfig/dbConfig";
import DeliveryReceipts from "@/models/deliveryReceiptModel";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET(req) {
  await db();
  try {
    // Use getServerSession with req and authOptions
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return new Response(
        JSON.stringify({ success: false, error: "Unauthorized" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
      let receipts;
      console.log("Session User:", session);
    if (session.user.role === "employee") {
      if (!session.user.branch) {
        return new Response(
          JSON.stringify({
            ok: false,
            message: "Branch not set for employee",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
        receipts = await DeliveryReceipts.find({ branch: session.user.branch });
    } else {
      receipts = await DeliveryReceipts.find({});
    }
    return new Response(JSON.stringify({ ok: true, receipts }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ ok: false, message: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
