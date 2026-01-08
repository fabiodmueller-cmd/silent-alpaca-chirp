"use client";

import React from "react";
import DashboardHeader from "@/components/DashboardHeader";
import MetricCard from "@/components/MetricCard";
import { Button } from "@/components/ui/button";
import { Play, ArrowUp, ArrowDown, Users, Gamepad2, Percent, BarChart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MadeWithDyad } from "@/components/made-with-dyad";


const Dashboard = () => {
  return (
    <div className="flex-1 flex flex-col bg-dashboard-primary-blue text-white min-h-screen">
      <DashboardHeader />

      <main className="flex-1 p-6">
        {/* Iniciar Leituras Section */}
        <div className="mb-8">
          <Button className="w-full h-24 bg-dashboard-accent-orange text-white text-xl font-bold flex items-center justify-center gap-4 hover:bg-orange-600 border-none">
            <Play className="h-8 w-8" />
            <div>
              INICIAR LEITURAS
              <p className="text-sm font-normal">Clique aqui para fazer leituras</p>
            </div>
          </Button>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
          <MetricCard
            title="Entrada Bruta"
            value="R$ 1.392,00"
            icon={ArrowDown}
            variant="default"
          />
          <MetricCard
            title="Saída Bruta"
            value="R$ 839,70"
            icon={ArrowUp}
            variant="default"
          />
          <MetricCard
            title="Lucro Bruto (39.7%)"
            value="R$ 552,30"
            icon={BarChart}
            variant="default"
          />
          <MetricCard
            title="Com. Cliente"
            value="R$ 276,15"
            icon={Percent}
            variant="orange"
          />
          <MetricCard
            title="Com. Operador"
            value="R$ 0,00"
            icon={Percent}
            variant="default"
          />
          <MetricCard
            title="Clientes"
            value="21"
            icon={Users}
            variant="default"
          />
          <MetricCard
            title="Máquinas"
            value="68"
            icon={Gamepad2}
            variant="default"
          />
          <MetricCard
            title="Lucro Empresa (39.7%)"
            value="R$ 276,15"
            icon={BarChart}
            variant="green"
          />
        </div>

        {/* Status de Leituras Section */}
        <Card className="bg-dashboard-secondary-blue text-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Status de Leituras</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-gray-300">Hoje</span>
              <Select defaultValue="today">
                <SelectTrigger className="w-[100px] bg-dashboard-primary-blue text-white border-dashboard-primary-blue">
                  <SelectValue placeholder="Hoje" />
                </SelectTrigger>
                <SelectContent className="bg-dashboard-primary-blue text-white border-dashboard-primary-blue">
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="yesterday">Ontem</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-300">Filtrar por:</span>
                <Select defaultValue="client">
                  <SelectTrigger className="w-full bg-dashboard-primary-blue text-white border-dashboard-primary-blue">
                    <SelectValue placeholder="Por Cliente (padrão)" />
                  </SelectTrigger>
                  <SelectContent className="bg-dashboard-primary-blue text-white border-dashboard-primary-blue">
                    <SelectItem value="client">Por Cliente (padrão)</SelectItem>
                    <SelectItem value="operator">Por Operador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-300">Cliente:</span>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full bg-dashboard-primary-blue text-white border-dashboard-primary-blue">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent className="bg-dashboard-primary-blue text-white border-dashboard-primary-blue">
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="client1">Cliente 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-300">Operador:</span>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full bg-dashboard-primary-blue text-white border-dashboard-primary-blue">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent className="bg-dashboard-primary-blue text-white border-dashboard-primary-blue">
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="operator1">Operador 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Placeholder for actual readings status table/content */}
            <div className="mt-4 text-gray-400">
              {/* Conteúdo da tabela de status de leituras aqui */}
              Nenhum status de leitura para exibir.
            </div>
          </CardContent>
        </Card>
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Dashboard;