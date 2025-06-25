"use client";

import React, { forwardRef } from "react";

const Receipt = forwardRef(({ data }, ref) => {
  return (
    <div
      ref={ref}
      className="max-w-4xl mx-auto p-4 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-md border border-gray-300 dark:border-zinc-700 overflow-y-auto max-h-[50vh]"
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
