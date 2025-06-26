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
    <>
    </>
  );
};

export default Loading;
