"use client";
import { usePathname } from "next/navigation";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import {Home,Music} from "lucide-react";
export default function SidebarMenuItems() {
    const path= usePathname();

    // Menu items.
    let items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
      active: false,
    },
    {
      title: "create",
      url: "/create",
      icon: Music,
      active: true,
    },
    
  ];
  items = items.map((item)=>({
    ...item,
    active: path === item.url,
  }));

  return (
  <>
  {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={item.active}>
            <a href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
  </>);
}