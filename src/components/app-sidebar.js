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

import { usePathname } from "next/navigation";

const menuData = [
  {
    label: "Main",
    collapsible: false,
    items: [
      { title: "Home", url: "/", icon: Home },
      { title: "Prediction", url: "/prediction", icon: Inbox },
      { title: "Important Dates", url: "/calendar", icon: Calendar },
      { title: "Search", url: "/search", icon: Search },
    ],
  },
  {
    label: "Settings",
    collapsible: false,
    items: [{ title: "Preferences", url: "/settings", icon: Settings }],
  },
  {
    label: "Statistics",
    collapsible: true,
    items: [
      { title: "Analytics", url: "/analytics", icon: Calendar },
      { title: "Reports", url: "/reports", icon: FileText },
      { title: "Insights", url: "/insights", icon: Search },
    ],
  },
  {
    label: "Help & Legal",
    collapsible: true,
    items: [
      { title: "Documentation", url: "/docs", icon: FileText },
      { title: "Support", url: "/help", icon: HelpCircle },
      { title: "Privacy", url: "/privacy", icon: ShieldCheck },
    ],
  },
];

export default function AppSidebar({
  appName = "My App",
  username = "User",
  onSignOut,
}) {
  const pathname = usePathname();

  return (
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
                          <a
                            href={item.url}
                            className="flex items-center gap-2"
                          >
                            {item.icon && <item.icon size={16} />}
                            <span>{item.title}</span>
                          </a>
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
                          <a
                            href={item.url}
                            className="flex items-center gap-2"
                          >
                            {item.icon && <item.icon size={16} />}
                            <span>{item.title}</span>
                          </a>
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
                  <a href="/account">Account</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="/billing">Billing</a>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onSignOut} className="text-red-500">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
