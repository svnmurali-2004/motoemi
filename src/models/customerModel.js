import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true }, // NAME
    mobileNo: { type: String, required: true }, // Mobile No.
    suretyName: { type: String, required: true }, // Surety Name
    suretyMobileNo: { type: String, required: true }, // Surety Mobile No.
    vehicleNo: { type: String, required: true }, // Vehicle No.
    hsnNo: { type: String ,required:true}, // HSN No
    suretyAddress: { type: String }, // Surety Address
    customerAddress: { type: String }, // Customer Address
    emiMonths: { type: Number, required: true }, // EMI Months
    emiAmount: { type: Number, required: true }, // EMI Amount
    totalAmount: { type: Number, required: true }, // Total Amount
    emiRecords: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "emirecords",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Customer ||
  mongoose.model("Customer", customerSchema);
