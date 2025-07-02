import db from "@/dbConfig/dbConfig";
import EmiRecord from "@/models/emirecordModel";
import { NextResponse } from "next/server";
export async function GET(req) {
  await db();
  const { searchParams } = new URL(req.url);
  const customerId = searchParams.get("customerId");
  try {
    const match = customerId ? { customerId } : {};
    const records = await EmiRecord.aggregate([
      { $match: match },
      {
        $lookup: {
          from: "customers",
          localField: "customerId",
          foreignField: "_id",
          as: "customer",
        },
      },
      { $unwind: "$customer" },
      {
        $project: {
          _id: 1,
          customerId: 1,
          emiNumber: 1,
          dueDate: 1,
          dueAmount: 1,
          "name": "$customer.name",
          "mobileNo": "$customer.mobileNo",
          "vehicleNo": "$customer.vehicleNo",
          "hsnNo": "$customer.hsnNo",
          "suretyName": "$customer.suretyName",
          "suretyMobileNo": "$customer.suretyMobileNo",
          "suretyAddress": "$customer.suretyAddress",
          "customerAddress": "$customer.customerAddress",
          "garageDate": "$customer.garageDate",
          "emiMonths": "$customer.emiMonths",
          "totalPaidAmount": 1,
          "receipts": 1,
          "status": 1,
          "status": 1,

        },
      },
    ]);
    return NextResponse.json({ ok: true, emiRecords:records });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error.message },
      { status: 500 }
    );
  }
}