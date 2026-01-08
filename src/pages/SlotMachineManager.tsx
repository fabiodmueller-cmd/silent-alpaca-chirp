"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useSlotMachines } from "@/context/SlotMachineContext"; // Import the context hook

interface SlotMachine {
  id: string;
  model: string;
  location: string;
  status: "operational" | "maintenance" | "offline";
  lastMaintenance: string;
  dailyRevenue: number;
}

const SlotMachineManager = () => {
  const { slotMachines } = useSlotMachines(); // Use the slot machines from context

  const getStatusBadgeVariant = (status: SlotMachine["status"]) => {
    switch (status) {
      case "operational":
        return "default";
      case "maintenance":
        return "secondary";
      case "offline":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-center flex-grow">Gerenciador de Máquinas Caça-Níqueis</h1>
        <div className="w-24"></div> {/* Placeholder for alignment */}
      </div>

      <Card className="bg-dashboard-secondary-blue text-white">
        <CardHeader>
          <CardTitle>Máquinas Caça-Níqueis</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Última Manutenção</TableHead>
                <TableHead>Receita Diária</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {slotMachines.map((machine) => (
                <TableRow key={machine.id}>
                  <TableCell className="font-medium">{machine.id}</TableCell>
                  <TableCell>{machine.model}</TableCell>
                  <TableCell>{machine.location}</TableCell>
                  <TableCell>{machine.lastMaintenance}</TableCell>
                  <TableCell>${machine.dailyRevenue.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={getStatusBadgeVariant(machine.status)}>
                      {machine.status === "operational" && "Operacional"}
                      {machine.status === "maintenance" && "Em Manutenção"}
                      {machine.status === "offline" && "Offline"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SlotMachineManager;