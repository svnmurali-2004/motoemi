"use client";
import React from "react";
import { Lock, BrainCog, BarChart3, TrendingUp } from "lucide-react";

export default function FeaturesInfo() {
  const features = [
    {
      title: "Secure Authentication",
      icon: <Lock className="w-8 h-8 text-indigo-600" />,
      desc: "Robust user login system with role-based access and single sign-on support.",
    },
    {
      title: "Profit Prediction",
      icon: <TrendingUp className="w-8 h-8 text-indigo-600" />,
      desc: "Accurately forecast profitability before committing to a consignment.",
      highlight: true,
    },
    {
      title: "Smart Analysis",
      icon: <BarChart3 className="w-8 h-8 text-indigo-600" />,
      desc: "Gain valuable insights into logistics, operations, and cost breakdowns.",
    },
    {
      title: "AI-Powered Prediction",
      icon: <BrainCog className="w-8 h-8 text-indigo-600" />,
      desc: "Leverage machine learning for dynamic data-driven logistics forecasting.",
    },
  ];

  return (
    <section className="bg-white py-20 px-4 md:px-12 lg:px-24" id="features">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-indigo-700 mb-4">
          Key Features
        </h2>
        <p className="text-gray-600 text-lg mb-10">
          Everything you need to optimize your logistics workflow.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border shadow-sm flex flex-col items-start gap-4 transition-all hover:shadow-lg ${
                feature.highlight
                  ? "border-indigo-500 bg-indigo-50 scale-[1.02]"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="bg-indigo-100 p-3 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-indigo-800">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
