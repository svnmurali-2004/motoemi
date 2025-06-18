import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    customerNo: { type: Number, required: true, unique: true },
    name: String,
    phone: String,
    guarantorName: String,
    guarantorPhone: String,
    vehicleNo: String,
    vehicleClass: String,
    vehicleModel: String,
    chassisNo: String,
    engineNo: String,
    costPaid: Number,
    due: Number,
    emi: Number,
    garageDate: Date,
    dueDate: Date,
    lastPaidDate: Date,
    customerAddress: String,
    customerArea: String,
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
