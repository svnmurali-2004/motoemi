"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AuroraText } from "@/components/magicui/aurora-text";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { cn } from "@/lib/utils";
import Lottie from "lottie-react";
import heroAnimation from "@/assets/emihero.json"; // Adjust path as needed
import { motion } from "framer-motion";

export default function Hero() {
  const router = useRouter();
  const [isLottieLoaded, setIsLottieLoaded] = useState(false);

  const handleDashboardClick = () => {
      router.replace("/signin");
  };

  return (
    <motion.section
      className="relative min-h-screen w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-16 overflow-hidden bg-transparent px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Fullscreen Interactive Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <InteractiveGridPattern
          className={cn("w-full h-full")}
          width={40}
          height={40}
          squares={[80, 80]}
          squaresClassName="hover:fill-blue-500"
        />
      </div>

      {/* Text Content */}
      <motion.div
        className="relative z-20 w-full lg:flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-6 lg:space-y-8 max-w-2xl lg:max-w-none mx-auto lg:mx-0"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <BoxReveal>
          <AuroraText
            as="h1"
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 sm:mb-4 drop-shadow-lg leading-tight text-gray-900"
          >
            CN Profitability Predictor
          </AuroraText>
        </BoxReveal>

        <BoxReveal>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-900 font-semibold max-w-lg lg:max-w-none">
            Predict whether your consignment is profitable or not with advanced
            analytics.
          </p>
        </BoxReveal>

        <BoxReveal>
          <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-800 font-medium max-w-md lg:max-w-none leading-relaxed">
            Leverage data-driven insights to make smarter logistics decisions,
            minimize losses, and maximize your returns. Our tool helps you
            evaluate consignments before you commit.
          </p>
        </BoxReveal>

        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
          <InteractiveHoverButton
            onClick={handleDashboardClick}
            className="px-6 sm:px-8 py-2.5 sm:py-3 font-semibold text-sm sm:text-base w-full sm:w-auto"
          >
            Go to Dashboard
          </InteractiveHoverButton>
          <span className="text-xs sm:text-sm text-gray-700 text-center lg:text-left max-w-xs">
            You must be logged in to access the dashboard.
          </span>
        </div>
      </motion.div>

      {/* Lottie Animation */}
      <motion.div
        className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl flex justify-center items-center mb-6 sm:mb-8 lg:mb-0"
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
            height: "auto",
            maxWidth: "100%",
            aspectRatio: "612 / 330",
          }}
        />
      </motion.div>
    </motion.section>
  );
}
