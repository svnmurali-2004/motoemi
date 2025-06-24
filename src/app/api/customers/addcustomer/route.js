import db from "@/dbConfig/dbConfig";
import Customer from "@/models/customerModel";
import EmiRecord from "@/models/emirecordModel";
import dayjs from "dayjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  await db();
  const body = await req.json();
  const {
    customerName,
    mobileNo,
    suretyName,
    suretyMobileNo,
    vehicleNo,
    hsnNo,
    suretyAddress,
    customerAddress,
    emiMonths,
    totalAmount,
    interestRate, // annual %
    garageDate,
  } = body;

  try {
    if (
      !customerName ||
      !mobileNo ||
      !suretyName ||
      !suretyMobileNo ||
      !vehicleNo ||
      !emiMonths ||
      !totalAmount ||
      !interestRate ||
      !garageDate
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // EMI Calculation (reducing-balance method)
    const P = totalAmount;
    const r = interestRate / 100 / 12; // monthly interest rate
    const n = emiMonths;

    const emiAmount = parseFloat(
      ((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)).toFixed(2)
    );

    // Create Customer (without emiRecords for now)
    const customer = await Customer.create({
      customerName,
      mobileNo,
      suretyName,
      suretyMobileNo,
      vehicleNo,
      hsnNo,
      suretyAddress,
      customerAddress,
      emiMonths,
      emiAmount,
      totalAmount,
      emiRecords: [],
    });

    // Generate EMI records
    const emiRecords = [];
    for (let i = 0; i < n; i++) {
      emiRecords.push({
        customerId: customer._id,
        emiNumber: i + 1,
        dueDate: dayjs(garageDate)
          .add(i + 1, "month")
          .toDate(),
        dueAmount: emiAmount,
      });
    }

    const createdEmis = await EmiRecord.insertMany(emiRecords);

    // Save EMI record references to customer
    customer.emiRecords = createdEmis.map((e) => e._id);
    await customer.save();

    return NextResponse.json({
      ok: true,
      message: "Customer and EMI records created successfully",
      customer,
    });
  } catch (error) {
    console.error("Error in creating customer with EMI:", error);
    return NextResponse.json({
      ok: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
}
