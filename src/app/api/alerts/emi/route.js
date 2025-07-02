import { NextResponse } from "next/server";
import db from "@/dbConfig/dbConfig.js";
import emirecords from "@/models/emirecordModel.js";
import Customer from "@/models/customerModel.js";

export async function GET(request) {
  await db();
  try {
    const today = new Date();
    const twoDaysFromNow = new Date();
    twoDaysFromNow.setDate(today.getDate() + 2);

    // Format dates to compare (YYYY-MM-DD)
    const alertDate = twoDaysFromNow.toISOString().split("T")[0];

    // Find EMI records due in 2 days that are not paid
    const upcomingEMIs = await emirecords
      .find({
        status: "due",
        dueDate: {
          $gte: new Date(alertDate),
          $lt: new Date(new Date(alertDate).getTime() + 24 * 60 * 60 * 1000), // End of that day
        },
      })
      .populate("customerId");

    if (upcomingEMIs.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No EMIs due in 2 days",
        count: 0,
      });
    }

    // Twilio configuration
    const accountSid = process.env.TWILIO_ACCOUNT_SID; 
    const authToken = process.env.TWILIO_AUTH_TOKEN; 
    const client = require("twilio")(accountSid, authToken);

    const sentMessages = [];
    const failedMessages = [];

    // Send SMS to each customer
    for (const emiRecord of upcomingEMIs) {
      const customer = emiRecord.customerId;

      if (!customer) {
        failedMessages.push({
          emiNumber: emiRecord.emiNumber,
          error: "Customer not found",
        });
        continue;
      }

      const dueDate = new Date(emiRecord.dueDate).toLocaleDateString("en-IN");
      const messageBody = `EMI REMINDER: Dear ${customer.customerName}, your EMI of Rs.${emiRecord.dueAmount} for vehicle ${customer.vehicleNo} is due on ${dueDate}. Please pay on time. -JAI BHAVANI MOTORS`;

      try {
        // Send to customer
        const customerMessage = await client.messages.create({
          body: messageBody,
          messagingServiceSid: "MG642b65cc620530b1f23cafdc45f2f28a",
          to: `+91${customer.mobileNo}`,
        });

        sentMessages.push({
          to: customer.mobileNo,
          customer: customer.customerName,
          vehicle: customer.vehicleNo,
          emiAmount: emiRecord.dueAmount,
          dueDate: dueDate,
          messageSid: customerMessage.sid,
        });
      } catch (error) {
        console.error(
          `Failed to send SMS for customer ${customer.customerName}:`,
          error
        );
        failedMessages.push({
          customer: customer.customerName,
          mobileNo: customer.mobileNo,
          emiNumber: emiRecord.emiNumber,
          error: error.message,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `EMI reminders processed successfully`,
      summary: {
        totalEMIsDue: upcomingEMIs.length,
        messagesSent: sentMessages.length,
        messagesFailed: failedMessages.length,
      },
      sentMessages,
      failedMessages,
    });
  } catch (error) {
    console.error("Error in EMI alert system:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
