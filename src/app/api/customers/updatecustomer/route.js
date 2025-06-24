import db from "@/dbConfig/dbConfig";
import Customer from "@/models/customerModel";
import { NextResponse } from "next/server";

export async function PUT(req) {
  await db();
  const body = await req.json();
  const {
    _id,
    customerName,
    mobileNo,
    suretyName,
    suretyMobileNo,
    vehicleNo,
    suretyAddress,
    customerAddress,
    emiMonths,
    emiAmount,
    totalAmount,
    emiRecords,
  } = body;

  if (!_id) {
    return NextResponse.json(
      { error: "Customer ID is required" },
      { status: 400 }
    );
  }

  try {
    const updateFields = {};
    if (customerName !== undefined) updateFields.customerName = customerName;
    if (mobileNo !== undefined) updateFields.mobileNo = mobileNo;
    if (suretyName !== undefined) updateFields.suretyName = suretyName;
    if (suretyMobileNo !== undefined)
      updateFields.suretyMobileNo = suretyMobileNo;
    if (vehicleNo !== undefined) updateFields.vehicleNo = vehicleNo;
    if (suretyAddress !== undefined) updateFields.suretyAddress = suretyAddress;
    if (customerAddress !== undefined)
      updateFields.customerAddress = customerAddress;
    if (emiMonths !== undefined) updateFields.emiMonths = emiMonths;
    if (emiAmount !== undefined) updateFields.emiAmount = emiAmount;
    if (totalAmount !== undefined) updateFields.totalAmount = totalAmount;
    if (emiRecords !== undefined) updateFields.emiRecords = emiRecords;

    const updatedCustomer = await Customer.findByIdAndUpdate(
      _id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedCustomer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Customer updated successfully",
      customer: updatedCustomer,
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
}
