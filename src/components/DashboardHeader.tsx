"use client";

import React from "react";
import { ChevronDown, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between p-6 bg-dashboard-primary-blue text-white border-b border-dashboard-secondary-blue">
      <div>
        <h1 className="text-3xl font-bold">PAINEL</h1>
        <p className="text-sm text-gray-400">Visão geral - Hoje</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-300">Período dos Cards:</span>
          <Select defaultValue="today">
            <SelectTrigger className="w-[120px] bg-dashboard-secondary-blue text-white border-dashboard-secondary-blue">
              <SelectValue placeholder="Hoje" />
            </SelectTrigger>
            <SelectContent className="bg-dashboard-secondary-blue text-white border-dashboard-secondary-blue">
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="yesterday">Ontem</SelectItem>
              <SelectItem value="last7days">Últimos 7 Dias</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-300">Cliente:</span>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] bg-dashboard-secondary-blue text-white border-dashboard-secondary-blue">
              <SelectValue placeholder="Todos os Clientes" />
            </SelectTrigger>
            <SelectContent className="bg-dashboard-secondary-blue text-white border-dashboard-secondary-blue">
              <SelectItem value="all">Todos os Clientes</SelectItem>
              <SelectItem value="client1">Cliente 1</SelectItem>
              <SelectItem value="client2">Cliente 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="bg-dashboard-accent-orange text-white hover:bg-orange-600 border-none">
          <Settings className="mr-2 h-4 w-4" /> Widgets
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;