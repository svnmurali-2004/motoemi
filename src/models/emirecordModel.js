import mongoose from "mongoose";

const receiptSchema = new mongoose.Schema({
  receiptId: {
    type: String,
    required: true,
    unique: true,
  },
  paidAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  paidDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  paymentMode: {
    type: String,
    required: true,
    enum: ["cash", "cheque", "online", "upi", "card", "bank_transfer"],
  },
  url: {
    type: String,
    default: null,
  },
  generatedAt: {
    type: Date,
    default: Date.now,
  },
});

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
  receipts: [receiptSchema],
});

export default mongoose.models.emirecords ||
  mongoose.model("emirecords", emiRecordSchema);
