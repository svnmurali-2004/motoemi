// /app/admin/layout.tsx or layout.js

import { cookies } from "next/headers";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import React from "react"; // ✅ required for JSX (especially in `.js`)

export default function Layout({ children }) {
  const cookieStore = cookies(); // ✅ no await
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={"true"}>
      <AppSidebar />
      <main className="min-h-screen w-full bg-gray-50 flex flex-col overflow-x-hidden">
        <SidebarTrigger />
        <div className="flex-1 flex flex-col">{children}</div>
      </main>
    </SidebarProvider>
  );
}
