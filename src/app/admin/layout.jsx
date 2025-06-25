"use client";
import React, { useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";

import { ThemeToggleButtonSidebar } from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user?.role !== "admin") {
      router.replace("/signin");
    }
  }, [session, status, router]);

  if (status === "loading" || !session || session.user?.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg">
        Loading...
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={"true"}>
      <AppSidebar />
      <main className="min-h-screen w-full bg-gray-50 flex flex-col overflow-x-hidden">
        <div className="flex items-center justify-between p-4 bg-white shadow-md dark:bg-black dark:text-accent-foreground">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <div className="flex items-center gap-2">
            <SidebarTrigger className="p-2 bg-white shadow-md dark:bg-black dark:text-accent-foreground" />
            <ThemeToggleButtonSidebar />
          </div>
        </div>
        <div className="flex-1 flex flex-col">{children}</div>
      </main>
    </SidebarProvider>
  );
}
