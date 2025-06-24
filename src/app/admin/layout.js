// /app/admin/layout.tsx or layout.js

import { cookies } from "next/headers";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import React from "react";
import { ThemeToggleButtonSidebar } from "@/components/ui/sidebar";

export default function Layout({ children }) {
  const cookieStore = cookies(); // ✅ no await
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

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
