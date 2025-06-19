import React from "react";
import { Marquee } from "@/components/magicui/marquee";
import { motion } from "framer-motion";

export default function MarqueeSection() {
  return (
    <motion.section
      className="w-full bg-white py-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
    >
      <Marquee pauseOnHover repeat={10} className="gap-0">
        <span className="mx-4 min-w-[220px] max-w-xs bg-white border border-indigo-200 rounded-xl shadow px-6 py-4 flex flex-col items-center justify-center">
          <span className="text-indigo-700 font-bold text-lg mb-1 text-center">
            Tech Mahindra
          </span>
          <span className="text-gray-500 text-sm text-center">
            Global IT & Consulting
          </span>
        </span>
        <span className="mx-4 min-w-[220px] max-w-xs bg-white border border-indigo-200 rounded-xl shadow px-6 py-4 flex flex-col items-center justify-center">
          <span className="text-indigo-700 font-bold text-lg mb-1 text-center">
            Cybersecurity
          </span>
          <span className="text-gray-500 text-sm text-center">
            Advanced secured authentication
          </span>
        </span>
        <span className="mx-4 min-w-[220px] max-w-xs bg-white border border-indigo-200 rounded-xl shadow px-6 py-4 flex flex-col items-center justify-center">
          <span className="text-indigo-700 font-bold text-lg mb-1 text-center">
            AI & Analytics
          </span>
          <span className="text-gray-500 text-sm text-center">
            Data-driven insights and automation
          </span>
        </span>
        <span className="mx-4 min-w-[220px] max-w-xs bg-white border border-indigo-200 rounded-xl shadow px-6 py-4 flex flex-col items-center justify-center">
          <span className="text-indigo-700 font-bold text-lg mb-1 text-center">
            Experience Design
          </span>
          <span className="text-gray-500 text-sm text-center">
            User-centric digital experiences
          </span>
        </span>
        <span className="mx-4 min-w-[220px] max-w-xs bg-white border border-indigo-200 rounded-xl shadow px-6 py-4 flex flex-col items-center justify-center">
          <span className="text-indigo-700 font-bold text-lg mb-1 text-center">
            CN Profitability Predictor
          </span>
          <span className="text-gray-500 text-sm text-center">
            Consignment Profitability Analysis
          </span>
        </span>
      </Marquee>
    </motion.section>
  );
}
