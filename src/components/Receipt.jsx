"use client";

import React, { forwardRef } from "react";

const sampleData = {
  receiptNumber: "12345",
  date: "2025-06-26",
  time: "14:30",
  registeredOwner: "John Doe",
  ownerParentName: "Richard Doe",
  ownerAddress: "123 Main St, Cityville",
  registrationNumber: "MH12AB1234",
  model: "Honda Activa",
  classToVehicle: "Scooter",
  makersName: "Honda",
  chassisNumber: "CHS1234567890",
  engineNumber: "ENG9876543210",
  monthYearOfManufacture: "05/2022",
  colorOfVehicle: "Red",
  sellerName: "Jane Smith",
  sellerParentName: "Robert Smith",
  sellerAddress: "456 Market Rd, Townsville",
  sellerIDProof: "Aadhar 1234-5678-9012",
  sellerPhone: "9876543210",
  purchaserName: "Alice Brown",
  purchaserParentName: "George Brown",
  purchaserAddress: "789 Lakeview, Villagetown",
  purchaserIDProof: "PAN ABCDE1234F",
  purchaserPhone: "9123456789",
};

// If using TypeScript, you can uncomment the type
// type ReceiptProps = { data: ReceiptFormData };

const Receipt = forwardRef(({ data }, ref) => {
  return (
    <div
      ref={ref}
      className="max-w-4xl mx-auto p-6 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-md border border-gray-300 dark:border-zinc-700"
    >
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">
          🚗 JAI BHAVANI MOTORS & SPARE PARTS
        </h1>
        <p className="text-sm mt-1">Delivery Note Cum Intermediater Receipt</p>
        <p className="text-sm">
          Receipt No: <strong>{data.receiptNumber}</strong> | Date:{" "}
          <strong>{data.date}</strong> | Time: <strong>{data.time}</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <p>
            <strong>Registered Owner:</strong> {data.registeredOwner}
          </p>
          <p>
            <strong>S/o / D/o:</strong> {data.ownerParentName}
          </p>
          <p>
            <strong>Address:</strong> {data.ownerAddress}
          </p>
        </div>
      </div>

      <hr className="my-4 border-dashed" />

      <h2 className="text-lg font-semibold mb-2">Vehicle Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <p>
            <strong>Registration Number:</strong> {data.registrationNumber}
          </p>
          <p>
            <strong>Model:</strong> {data.model}
          </p>
          <p>
            <strong>Vehicle Class:</strong> {data.classToVehicle}
          </p>
          <p>
            <strong>Manufacturer:</strong> {data.makersName}
          </p>
        </div>
        <div>
          <p>
            <strong>Chassis Number:</strong> {data.chassisNumber}
          </p>
          <p>
            <strong>Engine Number:</strong> {data.engineNumber}
          </p>
          <p>
            <strong>Manufacturing Date:</strong> {data.monthYearOfManufacture}
          </p>
          <p>
            <strong>Color:</strong> {data.colorOfVehicle}
          </p>
        </div>
      </div>

      <hr className="my-4 border-dashed" />

      <h2 className="text-lg font-semibold mb-2">Seller Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <p>
            <strong>Name:</strong> {data.sellerName}
          </p>
          <p>
            <strong>S/o:</strong> {data.sellerParentName}
          </p>
          <p>
            <strong>Address:</strong> {data.sellerAddress}
          </p>
        </div>
        <div>
          <p>
            <strong>ID Proof:</strong> {data.sellerIDProof}
          </p>
          <p>
            <strong>Phone:</strong> {data.sellerPhone}
          </p>
        </div>
      </div>

      <hr className="my-4 border-dashed" />

      <h2 className="text-lg font-semibold mb-2">Purchaser Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <p>
            <strong>Name:</strong> {data.purchaserName}
          </p>
          <p>
            <strong>S/o:</strong> {data.purchaserParentName}
          </p>
          <p>
            <strong>Address:</strong> {data.purchaserAddress}
          </p>
        </div>
        <div>
          <p>
            <strong>ID Proof:</strong> {data.purchaserIDProof}
          </p>
          <p>
            <strong>Phone:</strong> {data.purchaserPhone}
          </p>
        </div>
      </div>

      <div className="mt-8 text-sm italic">
        <p>Note:</p>
        <ul className="list-disc list-inside">
          <li>Please transfer the vehicle within a week.</li>
          <li>Vehicle once sold is not returnable.</li>
          <li>Condition of vehicle as is where is.</li>
          <li>We are not responsible for traffic violations.</li>
        </ul>
      </div>

      <div className="mt-6 text-right text-sm">
        <p>
          <strong>For JAI BHAVANI MOTORS & SPARE PARTS</strong>
        </p>
        <p className="mt-4">_</p>
        <p>Authorized Signature</p>
      </div>
    </div>
  );
});

Receipt.displayName = "Receipt";

export default Receipt;
