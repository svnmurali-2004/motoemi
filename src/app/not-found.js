"use client";
import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import gsap from "gsap";
import notFoundAnimation from "../assets/404.json"; // adjust path
import Link from "next/link";
const NotFound = () => {
  const containerRef = useRef(null);
  const [isLottieLoaded, setIsLottieLoaded] = useState(false);

//   useEffect(() => {
//     gsap.fromTo(
//       containerRef.current,
//       { opacity: 0, y: 50 },
//       { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
//     );
//   }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white text-center px-6"
    >
      <div className="max-w-md w-full">
        {!isLottieLoaded && (
          <div className="mb-6 text-gray-400 animate-pulse">
            Loading animation...
          </div>
        )}

        <Lottie
          animationData={notFoundAnimation}
          loop
          onDOMLoaded={() => setIsLottieLoaded(true)}
          style={{ display: isLottieLoaded ? "block" : "none" }}
        />

        <h1 className="text-3xl font-bold mt-6">404 - Page Not Found</h1>
        <p className="mt-2 text-gray-300">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-md text-white font-semibold"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
