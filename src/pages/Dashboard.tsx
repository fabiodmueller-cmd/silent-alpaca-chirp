"use client";

import React, { useState, useEffect } from "react";
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
import { useBackupData, Reading, Machine } from "@/context/BackupDataContext";
import { isToday, isYesterday, subDays, isWithinInterval } from "date-fns";

// Helper function to calculate metrics from readings
const calculateMetrics = (readings: Reading[], machines: Machine[]) => {
  let entradaBruta = 0;
  let saidaBruta = 0;
  let lucroBruto = 0;
  let comissaoCliente = 0;
  let comissaoOperador = 0;
  let lucroEmpresa = 0;

  readings.forEach((reading) => {
    entradaBruta += reading.entrada_atual || 0;
    saidaBruta += reading.saida_atual || 0;
    lucroBruto += reading.faturamento_bruto || 0;
    comissaoCliente += reading.client_commission || 0;
    comissaoOperador += reading.operator_commission || 0;
    lucroEmpresa += reading.company_profit || 0;
  });

  // Calculate unique clients and machines from the filtered readings' machines
  const uniqueMachineIds = new Set(readings.map(r => r.machine_id));
  const uniqueClientIds = new Set(
    machines
      .filter(m => uniqueMachineIds.has(m.id))
      .map(m => m.client_id)
  );

  return {
    entradaBruta,
    saidaBruta,
    lucroBruto,
    comissaoCliente,
    comissaoOperador,
    clientes: uniqueClientIds.size,
    maquinas: uniqueMachineIds.size,
    lucroEmpresa,
  };
};

const Dashboard = () => {
  const { backupData } = useBackupData();
  const allReadings = backupData?.readings || [];
  const allMachines = backupData?.machines || [];

  const [selectedPeriod, setSelectedPeriod] = useState<string>("today");
  const [metrics, setMetrics] = useState({
    entradaBruta: 0,
    saidaBruta: 0,
    lucroBruto: 0,
    comissaoCliente: 0,
    comissaoOperador: 0,
    clientes: 0,
    maquinas: 0,
    lucroEmpresa: 0,
  });

  useEffect(() => {
    const today = new Date();
    let filteredReadings: Reading[] = [];

    if (allReadings.length > 0) {
      switch (selectedPeriod) {
        case "today":
          filteredReadings = allReadings.filter((r) =>
            isToday(new Date(r.reading_date))
          );
          break;
        case "yesterday":
          filteredReadings = allReadings.filter((r) =>
            isYesterday(new Date(r.reading_date))
          );
          break;
        case "last7days":
          const sevenDaysAgo = subDays(today, 7);
          filteredReadings = allReadings.filter((r) =>
            isWithinInterval(new Date(r.reading_date), {
              start: sevenDaysAgo,
              end: today,
            })
          );
          break;
        default:
          filteredReadings = allReadings; // Fallback to all data if no period is selected
          break;
      }
    }
    setMetrics(calculateMetrics(filteredReadings, allMachines));
  }, [selectedPeriod, allReadings, allMachines]);

  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value);
  };

  // Calculate percentage for Lucro Bruto and Lucro Empresa
  const lucroBrutoPercentage = metrics.entradaBruta > 0
    ? ((metrics.lucroBruto / metrics.entradaBruta) * 100).toFixed(1)
    : "0.0";
  const lucroEmpresaPercentage = metrics.entradaBruta > 0
    ? ((metrics.lucroEmpresa / metrics.entradaBruta) * 100).toFixed(1)
    : "0.0";

  return (
    <div className="flex-1 flex flex-col bg-dashboard-primary-blue text-white min-h-screen">
      <DashboardHeader
        currentPeriod={selectedPeriod}
        onPeriodChange={handlePeriodChange}
      />

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
            value={`R$ ${metrics.entradaBruta.toFixed(2)}`}
            icon={ArrowDown}
            variant="default"
          />
          <MetricCard
            title="Saída Bruta"
            value={`R$ ${metrics.saidaBruta.toFixed(2)}`}
            icon={ArrowUp}
            variant="default"
          />
          <MetricCard
            title={`Lucro Bruto (${lucroBrutoPercentage}%)`}
            value={`R$ ${metrics.lucroBruto.toFixed(2)}`}
            icon={BarChart}
            variant="default"
          />
          <MetricCard
            title="Com. Cliente"
            value={`R$ ${metrics.comissaoCliente.toFixed(2)}`}
            icon={Percent}
            variant="orange"
          />
          <MetricCard
            title="Com. Operador"
            value={`R$ ${metrics.comissaoOperador.toFixed(2)}`}
            icon={Percent}
            variant="default"
          />
          <MetricCard
            title="Clientes"
            value={metrics.clientes.toString()}
            icon={Users}
            variant="default"
          />
          <MetricCard
            title="Máquinas"
            value={metrics.maquinas.toString()}
            icon={Gamepad2}
            variant="default"
          />
          <MetricCard
            title={`Lucro Empresa (${lucroEmpresaPercentage}%)`}
            value={`R$ ${metrics.lucroEmpresa.toFixed(2)}`}
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