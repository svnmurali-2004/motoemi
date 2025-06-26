"use client";

import {
  Home,
  Inbox,
  Calendar,
  Search,
  Settings,
  HelpCircle,
  FileText,
  ShieldCheck,
  ChevronUp,
  ChevronDown,
  User2,
} from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useLoading } from "@/context/LoadingContext";

const menuData = [
  {
    label: "Main",
    collapsible: false,
    items: [
      { title: "Emirecords", url: "/admin/emitable", icon: FileText },
      { title: "Receipts", url: "/admin/receipts", icon: Search },
    ],
  },
];

export default function AppSidebar({
  appName = "My App",
  username = "User",
  onSignOut,
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { show, hide, loading } = useLoading();
  // Use NextAuth signOut if no onSignOut is provided
  const handleSignOut =
    onSignOut ||
    (async () => {
      show();
      await signOut({ callbackUrl: "/signin" });
      hide();
    });

  // Navigation handler
  const handleNav = async (url) => {
    if (url && url !== pathname) {
      show();
      router.push(url);
      // Optionally, you can add a small delay to show loading
      setTimeout(() => hide(), 500);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
          <span className="text-white text-xl">Loading...</span>
        </div>
      )}
      <Sidebar collapsible="icon">
        {/* Proper Sidebar Header using SidebarMenu */}
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="text-lg font-bold">
                {appName}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        {/* Sidebar Body Content */}
        <SidebarContent>
          {menuData.map((group, index) => (
            <SidebarGroup key={index}>
              {group.collapsible ? (
                <Collapsible>
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="group/collapsible flex items-center justify-between cursor-pointer w-full px-3 py-1.5 text-sm font-medium">
                      {group.label}
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {group.items.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton
                            asChild
                            active={pathname === item.url}
                          >
                            <button
                              type="button"
                              onClick={() => handleNav(item.url)}
                              className="flex items-center gap-2 w-full text-left"
                            >
                              {item.icon && <item.icon size={16} />}
                              <span>{item.title}</span>
                            </button>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <>
                  <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {group.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            asChild
                            active={pathname === item.url}
                          >
                            <button
                              type="button"
                              onClick={() => handleNav(item.url)}
                              className="flex items-center gap-2 w-full text-left"
                            >
                              {item.icon && <item.icon size={16} />}
                              <span>{item.title}</span>
                            </button>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </>
              )}
            </SidebarGroup>
          ))}
        </SidebarContent>

        {/* Footer with dropdown menu */}
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="flex items-center gap-2">
                    <User2 /> {username}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <button
                      type="button"
                      onClick={() => handleNav("/account")}
                      className="w-full text-left"
                    >
                      Account
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button
                      type="button"
                      onClick={() => handleNav("/billing")}
                      className="w-full text-left"
                    >
                      Billing
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="text-red-500"
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
