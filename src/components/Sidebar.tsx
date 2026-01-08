"use client";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Gamepad2,
  ClipboardList,
  FileText,
  DollarSign,
  BarChart,
  LogOut,
  User,
  Settings,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isActive }) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:bg-dashboard-secondary-blue",
      isActive && "bg-dashboard-secondary-blue text-white",
    )}
  >
    <Icon className="h-5 w-5" />
    {label}
  </Link>
);

const SidebarContent = () => {
  const location = useLocation();

  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "PAINEL" },
    { to: "/clients-readings", icon: Users, label: "CLIENTES E LEITURAS" },
    { to: "/slot-machine-manager", icon: Gamepad2, label: "MÁQUINAS" },
    { to: "/machines-per-client", icon: ClipboardList, label: "MÁQUINAS P/ CLIENT..." },
    { to: "/readings", icon: FileText, label: "LEITURAS" },
    { to: "/readings-summary", icon: BarChart, label: "RESUMO LEITURAS" },
    { to: "/machine-balance", icon: DollarSign, label: "SOBRA MÁQUINAS" },
    { to: "/advanced-reports", icon: Settings, label: "REL. AVANÇADOS" },
    { to: "/general-report", icon: FileText, label: "REL. GERAL" },
  ];

  return (
    <div className="flex h-full max-h-screen flex-col gap-2 bg-dashboard-primary-blue text-white">
      <div className="flex h-14 items-center border-b border-dashboard-secondary-blue px-4 lg:h-[60px] lg:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="text-xl font-bold">SLOTMANAGER</span>
          <span className="text-xs text-gray-400">PRO v2.0</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          <div className="p-4">
            <div className="flex items-center gap-2 rounded-lg bg-dashboard-secondary-blue px-3 py-2">
              <User className="h-5 w-5" />
              <span>FABIO D. MUELLER</span>
            </div>
          </div>
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.to}
            />
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4 border-t border-dashboard-secondary-blue">
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
          <LogOut className="mr-2 h-4 w-4" /> Sair
        </Button>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 text-white bg-dashboard-primary-blue hover:bg-dashboard-secondary-blue">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="hidden border-r border-dashboard-secondary-blue bg-dashboard-primary-blue lg:block w-64">
      <SidebarContent />
    </div>
  );
};

export default Sidebar;