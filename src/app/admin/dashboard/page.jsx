"use client"
import { useLoading } from "@/context/LoadingContext";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const Page = () => {
  const { loading } = useLoading();
  useEffect(() => {
    // Example: toast.success("Welcome to the admin dashboard!");
  }, []);
  return (
    <div>
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
          <span className="text-white text-xl">Loading...</span>
        </div>
      )}
      <div className="h-screen w-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            <span className=" font-bold">CN Profitability</span>
            <span className="text-gray-600 dark:text-gray-400"> Predictor</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Page;
