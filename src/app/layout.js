"use client";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
// Fonts (optional styling)
const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

// Metadata (App Router handles this in layout.js differently)


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SessionProvider>{children}</SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
