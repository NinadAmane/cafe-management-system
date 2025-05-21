
import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Coffee, User, Users, ShoppingCart, Menu } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar>
      <SidebarHeader className="p-4 flex items-center space-x-2">
        <Coffee className="h-6 w-6" />
        <span className="font-bold text-lg">Café Manager</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className={isActive("/") ? "bg-sidebar-accent" : ""}
                  onClick={() => navigate("/")}
                >
                  <Coffee />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className={isActive("/employees") ? "bg-sidebar-accent" : ""}
                  onClick={() => navigate("/employees")}
                >
                  <Users />
                  <span>Employees</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className={isActive("/customers") ? "bg-sidebar-accent" : ""}
                  onClick={() => navigate("/customers")}
                >
                  <User />
                  <span>Customers</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className={isActive("/menu") ? "bg-sidebar-accent" : ""}
                  onClick={() => navigate("/menu")}
                >
                  <Menu />
                  <span>Menu</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className={isActive("/orders") ? "bg-sidebar-accent" : ""}
                  onClick={() => navigate("/orders")}
                >
                  <ShoppingCart />
                  <span>Orders</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
