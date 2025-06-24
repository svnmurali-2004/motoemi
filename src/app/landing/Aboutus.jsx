"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { FlipText } from "@/components/magicui/flip-text";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <motion.section
      className="min-h-[60vh] flex flex-col md:flex-row items-center justify-center bg-white px-4 py-16 md:py-24 gap-10 md:gap-20"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      {/* Left: Lottie Animation */}
      <motion.div
        className="w-full md:w-[440px] lg:w-[520px] flex justify-center items-center"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <DotLottieReact
          src="https://lottie.host/d18cf9f5-5416-4e10-ace6-27a31e2bd0e9/ocGSbqRw31.lottie"
          loop
          autoplay
          style={{ width: "100%", height: 350, maxWidth: 420, minHeight: 350 }}
        />
      </motion.div>

      {/* Right: Text Content */}
      <motion.div
        className="w-full md:flex-1 flex flex-col items-start text-left space-y-6 md:pl-8 lg:pl-16"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <BoxReveal>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 mb-2">
            About Us
          </h2>
        </BoxReveal>

        <FlipText className="text-xl sm:text-2xl font-semibold text-indigo-600 -tracking-widest leading-[5rem] break-words">
          Financing Made Simple & Reliable
        </FlipText>

        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          At{" "}
          <span className="font-semibold text-indigo-600">
            Surya Vanshi Auto Finance
          </span>
          , we offer transparent and reliable vehicle financing solutions
          tailored to your needs.
        </p>

        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          We maintain detailed EMI records, including penalties, outstanding
          balances, and receipt tracking to ensure accuracy and accountability.
        </p>

        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          Serving customers from our office in{" "}
          <strong>Tukaram Gate, North Lallaguda, Secunderabad</strong>, we aim
          to simplify your financial journey with professionalism and trust.
        </p>

        <p className="text-base sm:text-lg text-indigo-700 font-semibold leading-relaxed">
          Contact us today at <strong>93472 34371</strong> — we're here to
          support your auto finance needs every step of the way!
        </p>
      </motion.div>
    </motion.section>
  );
}
