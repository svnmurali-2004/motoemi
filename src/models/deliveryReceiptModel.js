import mongoose from "mongoose";

const deliveryReceiptSchema = new mongoose.Schema(
  {
    receiptNumber: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    registeredOwner: { type: String, required: true },
    ownerParentName: { type: String, required: true },
    ownerAddress: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    model: { type: String, required: true },
    classToVehicle: { type: String, required: true },
    chassisNumber: { type: String, required: true },
    engineNumber: { type: String, required: true },
    makersName: { type: String, required: true },
    monthYearOfManufacture: { type: String, required: true },
    colorOfVehicle: { type: String, required: true },
    sellerName: { type: String, required: true },
    sellerParentName: { type: String, required: true },
    sellerAddress: { type: String, required: true },
    sellerIDProof: { type: String, required: true },
    sellerPhone: { type: String, required: true },
    purchaserName: { type: String, required: true },
    purchaserParentName: { type: String, required: true },
    purchaserAddress: { type: String, required: true },
    purchaserIDProof: { type: String, required: true },
    purchaserPhone: { type: String, required: true },
    branch: { type: String, required: true },
  },
  { timestamps: true }
);

const DeliveryReceipts =
  mongoose.models.DeliveryReceipts ||
  mongoose.model("DeliveryReceipts", deliveryReceiptSchema);

export default DeliveryReceipts;
