import mongoose from "mongoose";

const emiRecordSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  emiNumber: Number,
  dueDate: Date,
  dueAmount: Number,
  paidDate: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    enum: ["due", "paid"],
    default: "due",
  },
  totalPaidAmount: { type: Number, default: 0 },
  receipts: 
    {
      receiptId: String,
      paidAmount: Number,
      paidDate: Date,
      paymentMode: String,
      url: String,
      generatedAt: Date,
    }
});

export default mongoose.models.emirecords ||mongoose.model("emirecords", emiRecordSchema);
