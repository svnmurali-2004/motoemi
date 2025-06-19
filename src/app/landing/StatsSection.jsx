"use client";
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { PackageCheck, ShieldCheck, BarChart4, Timer } from "lucide-react";
import { motion } from "framer-motion";

export default function StatsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.4 });

  const stats = [
    {
      label: "Consignments Analyzed",
      value: 12500,
      suffix: "+",
      icon: <PackageCheck className="w-6 h-6 text-indigo-600" />,
    },
    {
      label: "Prediction Accuracy",
      value: 92.6,
      suffix: "%",
      icon: <BarChart4 className="w-6 h-6 text-indigo-600" />,
    },
    {
      label: "Profit Forecasted",
      value: 1.2,
      suffix: "Cr",
      icon: <Timer className="w-6 h-6 text-indigo-600" />,
    },
    {
      label: "Accounts Secured",
      value: 5000,
      suffix: "+",
      icon: <ShieldCheck className="w-6 h-6 text-indigo-600" />,
    },
  ];

  return (
    <motion.section
      ref={ref}
      className="bg-white py-20 px-4 md:px-12 lg:px-24"
      id="insights"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-indigo-700 mb-10">
          Platform Insights
        </h2>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 shadow-sm flex flex-col items-center justify-center"
            >
              <div className="mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-indigo-700">
                {inView ? (
                  <CountUp
                    end={stat.value}
                    duration={2}
                    decimals={stat.suffix === "%" ? 1 : 0}
                  />
                ) : (
                  0
                )}
                {stat.suffix}
              </div>
              <p className="text-sm font-medium text-gray-600 mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
