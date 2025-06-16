"use client";

import React, { useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const Loading = () => {
  useEffect(() => {
    let interval;

    const startProgressLoop = () => {
      NProgress.start();
      interval = setInterval(() => {
        NProgress.done(); // Finish the current progress
        NProgress.start(); // Immediately restart
      }, 1500); // Adjust speed here
    };

    startProgressLoop();

    return () => {
      clearInterval(interval);
      NProgress.done(); // Cleanup
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <DotLottieReact
        src="https://lottie.host/6394247c-6179-47d3-b2e6-0f0df9a4565b/SMdP5B1K0d.lottie"
        loop
        autoplay
        style={{ width: "300px", height: "300px" }}
      />
    </div>
  );
};

export default Loading;
