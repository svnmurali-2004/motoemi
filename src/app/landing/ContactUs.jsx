import React from "react";

export default function ContactUs() {
  return (
    <footer className="w-full flex justify-center items-center py-12 px-4 bg-gradient-to-r from-indigo-50 via-white to-indigo-100 mt-12">
      <div className="relative max-w-lg w-full rounded-2xl shadow-2xl bg-white border border-indigo-100 p-8 flex flex-col items-center animate-fade-in">
        {/* Icon */}
        <div className="mb-3">
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="#6366f1" opacity="0.1" />
            <path
              d="M6 8l6 4 6-4"
              stroke="#6366f1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="4"
              y="6"
              width="16"
              height="12"
              rx="2"
              stroke="#6366f1"
              strokeWidth="2"
            />
          </svg>
        </div>
        {/* App Name */}
        <div className="text-2xl font-extrabold text-indigo-700 mb-1 tracking-tight">
          CN Profitability Predictor
        </div>
        <div className="text-base font-semibold text-indigo-700 mb-4">
          Contact Us
        </div>
        <div className="space-y-2 text-sm text-gray-700 text-center w-full">
          <div>
            <span className="font-semibold">Name:</span> CN Profitability Team
          </div>
          <div>
            <span className="font-semibold">Email:</span>{" "}
            <a
              href="mailto:support@cnprofit.com"
              className="text-indigo-600 underline hover:text-indigo-800 transition"
            >
              support@cnprofit.com
            </a>
          </div>
          <div>
            <span className="font-semibold">Phone:</span>{" "}
            <a
              href="tel:+919876543210"
              className="text-indigo-600 underline hover:text-indigo-800 transition"
            >
              +91 98765 43210
            </a>
          </div>
          <div>
            <span className="font-semibold">Address:</span> 123, Main Street,
            Bengaluru, India
          </div>
        </div>
      </div>
      {/* Fade-in animation */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeInUp 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </footer>
  );
}
