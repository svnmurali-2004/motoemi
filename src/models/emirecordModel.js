import mongoose from "mongoose"
const emiRecordSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  emiNumber: Number,
  dueDate: Date,
  dueAmount: Number,
  status: {
    type: String,
    enum: ["due", "partial", "paid", "late"],
    default: "due",
  },
  totalPaidAmount: { type: Number, default: 0 },
  receipts: [
    {
      receiptId: String,
      paidAmount: Number,
      paidDate: Date,
      paymentMode: String,
      url: String,
      generatedAt: Date,
    },
  ],
});

const emiRecord = mongoose.models.emirecord || mongoose.model("emirecords", emiRecordSchema);
export default emiRecord;
