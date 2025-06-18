import React from "react";

function scrollToSection(e, id) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur border-b border-indigo-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="inline-block w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow">
            CN
          </span>
          <span className="font-extrabold text-indigo-700 text-lg tracking-tight">
            Profitability Predictor
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
            href="#team"
            onClick={(e) => scrollToSection(e, "team")}
            className="text-gray-700 hover:text-indigo-600 font-medium transition"
          >
            Team
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "contact")}
            className="text-gray-700 hover:text-indigo-600 font-medium transition"
          >
            Contact
          </a>
          <a
            href="/admin/dashboard"
            className="ml-4 px-4 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Dashboard
          </a>
        </div>
        {/* Mobile Hamburger */}
        <div className="md:hidden">
          {/* You can add a mobile menu here if needed */}
        </div>
      </div>
    </nav>
  );
}
