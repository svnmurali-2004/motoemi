"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ContactUs() {
  return (
    <motion.footer
      className="w-full px-4 py-16 bg-gradient-to-r from-indigo-50 via-white to-indigo-100"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 bg-white rounded-2xl border border-indigo-200 shadow-lg p-6 md:p-10">
        {/* Left: Info */}
        <div className="flex flex-col items-start gap-4 max-w-md">
          <div className="flex items-center gap-3">
            {/* Mail Icon */}
            <div className="p-3 bg-indigo-100 rounded-full">
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
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
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-indigo-700">
                CN Profitability Predictor
              </h2>
              <p className="text-sm text-indigo-600 font-medium">Contact Us</p>
            </div>
          </div>

          <div className="space-y-1 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Team:</span> CN Profitability Team
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              <a
                href="mailto:support@cnprofit.com"
                className="text-indigo-600 underline hover:text-indigo-800"
              >
                support@cnprofit.com
              </a>
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              <a
                href="tel:+919876543210"
                className="text-indigo-600 underline hover:text-indigo-800"
              >
                +91 98765 43210
              </a>
            </p>
            <p>
              <span className="font-semibold">Address:</span> 123, Main Street,
              Bengaluru, India
            </p>
          </div>
        </div>

        {/* Right: Link */}
        <div className="text-center md:text-right">
          <p className="text-sm text-gray-600 mb-2">
            Want to know more about the team?
          </p>
          <Link
            href="/about"
            className="inline-block text-indigo-600 underline font-medium hover:text-indigo-800 transition"
          >
            Learn more →
          </Link>
        </div>
      </div>
    </motion.footer>
  );
}
