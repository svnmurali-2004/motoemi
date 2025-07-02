"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { FlipText } from "@/components/magicui/flip-text";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <motion.section
      className="min-h-[50vh] flex flex-col lg:flex-row items-center justify-center bg-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 gap-8 lg:gap-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      {/* Left: Lottie Animation */}
      <motion.div
        className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl flex justify-center items-center order-1 lg:order-1"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <DotLottieReact
          src="https://lottie.host/d18cf9f5-5416-4e10-ace6-27a31e2bd0e9/ocGSbqRw31.lottie"
          loop
          autoplay
          style={{
            width: "100%",
            height: "auto",
            maxWidth: 400,
            minHeight: 280,
            aspectRatio: "1/1",
          }}
        />
      </motion.div>

      {/* Right: Text Content */}
      <motion.div
        className="w-full lg:flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-6 order-2 lg:order-2 max-w-2xl"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <BoxReveal>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-indigo-700 mb-2">
            About Us
          </h2>
        </BoxReveal>

        <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-indigo-600 leading-tight">
          Financing Made Simple & Reliable
        </p>

        <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed max-w-xl">
          At{" "}
          <span className="font-semibold text-indigo-600">
            Surya Vanshi Auto Finance
          </span>
          , we offer transparent vehicle financing solutions with detailed EMI
          tracking and receipt management.
        </p>

        <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed max-w-xl">
          Based in <strong>Tukaram Gate, Secunderabad</strong>, we simplify your
          financial journey with trust and professionalism.
        </p>
      </motion.div>
    </motion.section>
  );
}
