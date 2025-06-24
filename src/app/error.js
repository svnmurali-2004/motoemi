"use client";
import React from "react";
import Lottie from "lottie-react";
import errAnimation from "../assets/error.json";
import Link from "next/link";

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white text-center px-6">
      <div className="max-w-md w-full">
        <div className="z-50" style={{ width: 300, height: 300, margin: "0 auto" }}>
          <Lottie
            animationData={errAnimation}
            loop
            style={{ width: "300px", height: "300px", display: "block" }}
          />
        </div>
        <h1 className="text-3xl font-bold mt-6">Error Occurred</h1>
        <p className="mt-2 text-gray-300">
          An error occurred while fetching the page 
        </p>
        <Link
          href="/"
          className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-md text-white font-semibold"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
 
          

