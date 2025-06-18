"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { FlipText } from "@/components/magicui/flip-text";

export default function AboutUs() {
  return (
    <section className="min-h-[60vh] flex flex-col md:flex-row items-center justify-center bg-white px-4 py-16 md:py-24 gap-10 md:gap-20">
      {/* Left: Lottie Animation */}
      <div className="w-full md:w-[440px] lg:w-[520px] flex justify-center items-center">
        <DotLottieReact
          src="https://lottie.host/d18cf9f5-5416-4e10-ace6-27a31e2bd0e9/ocGSbqRw31.lottie"
          loop
          autoplay
          style={{ width: "100%", height: 350, maxWidth: 420, minHeight: 350 }}
        />
      </div>

      {/* Right: Text Content */}
      <div className="w-full md:flex-1 flex flex-col items-start text-left space-y-6 md:pl-8 lg:pl-16">
        {/* Heading with BoxReveal */}
        <BoxReveal>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 mb-2">
            About Us
          </h2>
        </BoxReveal>

        {/* Flip Animation Line */}

        <FlipText className="text-xl sm:text-2xl font-semibold text-indigo-600 -tracking-widest leading-[5rem]">
          Empowering Smarter Logistics Decisions
        </FlipText>

        {/* Main Description */}
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          We help businesses and individuals make better logistics decisions
          using real-time data and predictive insights.
        </p>

        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          Our{" "}
          <span className="font-semibold text-indigo-600">
            CN Profitability Predictor
          </span>{" "}
          uses advanced analytics to forecast profitability — before a
          consignment even moves.
        </p>

        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          With a strong focus on accuracy and simplicity, we blend logistics
          expertise with cutting-edge technology.
        </p>

        <p className="text-base sm:text-lg text-indigo-700 font-semibold leading-relaxed">
          Join us as we revolutionize logistics with intelligent predictions and
          smarter systems!
        </p>
      </div>
    </section>
  );
}
