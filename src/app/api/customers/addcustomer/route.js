import db from "@/dbConfig/dbConfig";
import Customer from "@/models/customerModel";
import EmiRecord from "@/models/emirecordModel";
import dayjs from "dayjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  await db();
  const body = await req.json();
  const {
    customerNo,
    name,
    phone,
    guarantorName,
    guarantorPhone,
    vehicleNo,
    vehicleClass,
    vehicleModel,
    chassisNo,
    engineNo,
    costPaid,
    emi, // number of months
    interestRate, // annual %
    garageDate,
    customerAddress,
    customerArea,
  } = body;
  
  try {
    // Create Customer (initially without emiRecords)
    if (
      !customerNo ||
      !name ||
      !phone ||
      !vehicleNo ||
      !costPaid ||
      !emi ||
      !interestRate ||
      !garageDate
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }
    const customer = await Customer.create({
      customerNo,
      name,
      phone,
      guarantorName,
      guarantorPhone,
      vehicleNo,
      vehicleClass,
      vehicleModel,
      chassisNo,
      engineNo,
      costPaid,
      due: costPaid, // total amount initially due
      emi,
      garageDate,
      dueDate: dayjs(garageDate).add(1, "month").toDate(),
      customerAddress,
      customerArea,
    });

    // EMI Calculation (Simple reducing-balance interest method)
    const P = costPaid;
    const r = interestRate / 100 / 12; // monthly interest rate
    const n = emi;

    const emiAmount = parseFloat(
      ((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)).toFixed(2)
    );

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
      message: "Customer and EMI records created successfully",
      customer,
    });
  } catch (error) {
    console.error("Error in creating customer with EMI:", error);
    return NextResponse.json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}
