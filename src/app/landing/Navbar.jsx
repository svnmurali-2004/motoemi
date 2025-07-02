import React from "react";
import { motion } from "framer-motion";

function scrollToSection(e, id) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Navbar() {
  return (
    <motion.nav
      className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur border-b border-indigo-100 shadow-sm"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16 ">
        {/* Logo and Name */}
        <div className="flex items-center gap-2">
          <span className="inline-block w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow">
            SF
          </span>
          <span className="font-extrabold text-indigo-700 text-lg tracking-tight">
            Surya Vanshi Auto Finance
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 items-center">
          <a
            href="#about"
            onClick={(e) => scrollToSection(e, "about")}
            className="text-gray-700 hover:text-indigo-600 font-medium transition"
          >
            About
          </a>
          <a
            href="#services"
            onClick={(e) => scrollToSection(e, "services")}
            className="text-gray-700 hover:text-indigo-600 font-medium transition"
          >
            Services
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "contact")}
            className="text-gray-700 hover:text-indigo-600 font-medium transition"
          >
            Contact
          </a>
          <a
            href="/login"
            className="ml-4 px-4 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </a>
        </div>

        {/* Mobile Hamburger (Optional) */}
        <div className="md:hidden">{/* Add mobile menu logic if needed */}</div>
      </div>
    </motion.nav>
  );
}
