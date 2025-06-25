"use client";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider, useSession } from "next-auth/react";
import { ThemeProvider } from "next-themes";
// Fonts (optional styling)
const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });
import { Toaster } from "react-hot-toast";
// Metadata (App Router handles this in layout.js differently)

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-background text-foreground">
      <body
        className={
          geist.className +
          " bg-background text-foreground transition-colors duration-300"
        }
      >
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#fff",
              color: "#18181b",
            },
            className:
              "rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 dark:bg-[#18181b] dark:text-white bg-white text-black",
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SessionProvider>{children}</SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
