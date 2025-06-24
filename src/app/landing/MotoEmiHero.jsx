"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AuroraText } from "@/components/magicui/aurora-text";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { cn } from "@/lib/utils.js";
import Lottie from "lottie-react";
import heroAnimation from "@/assets/hero.json"; // Keep your current Lottie or update if needed
import { motion } from "framer-motion";
export default function MotoEmiHero() {
  const router = useRouter();
  const [isLottieLoaded, setIsLottieLoaded] = useState(false);

  const handleDashboardClick = () => {
    const isLoggedIn = false; // Replace with real authentication logic
    if (isLoggedIn) {
      router.push("/admin/dashboard");
    } else {
      router.push("/login");
    }
  };

  return (
    <motion.section
      className="relative min-h-screen w-full flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-16 overflow-hidden bg-transparent"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <InteractiveGridPattern
          className={cn("w-full h-full")}
          width={40}
          height={40}
          squares={[80, 80]}
          squaresClassName="hover:fill-blue-500"
        />
      </div>

      {/* Text Section */}
      <motion.div
        className="relative z-20 w-full md:flex-1 flex flex-col items-start text-left space-y-5 md:space-y-7 lg:space-y-8 md:pr-8 lg:pr-16 px-4 md:px-12 lg:px-24"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <BoxReveal>
          <AuroraText
            as="h1"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 md:mb-4 drop-shadow-lg leading-tight text-gray-900"
          >
            Surya Vanshi Auto Finance
          </AuroraText>
        </BoxReveal>

        <BoxReveal>
          <p className="text-base sm:text-lg md:text-xl text-gray-900 font-semibold">
            Hassle-free EMI Tracking for Your Vehicles
          </p>
        </BoxReveal>

        <BoxReveal>
          <p className="text-sm sm:text-base md:text-lg text-gray-800 font-medium">
            Easily manage all your vehicle EMI payments, penalties, and receipts
            from one place. Stay updated with due dates and outstanding
            balances. Built for smart financing and simple record keeping.
          </p>
        </BoxReveal>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
          <InteractiveHoverButton
            onClick={handleDashboardClick}
            className="px-8 py-3 font-semibold"
          >
            View EMI Dashboard
          </InteractiveHoverButton>
          <span className="text-xs text-gray-700 mt-1 sm:mt-0">
            Login required to access your finance records.
          </span>
        </div>
      </motion.div>

      {/* Lottie Section */}
      <motion.div
        className="relative z-10 w-full md:w-[612px] flex justify-center items-center mb-8 md:mb-0"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <Lottie
          animationData={heroAnimation}
          loop
          onDOMLoaded={() => setIsLottieLoaded(true)}
          style={{
            display: isLottieLoaded ? "block" : "none",
            width: "100%",
            maxWidth: 612,
            height: "auto",
            maxHeight: 330,
            aspectRatio: "612 / 330",
          }}
        />
      </motion.div>
    </motion.section>
  );
}
