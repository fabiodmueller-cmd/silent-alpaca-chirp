"use client";

import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBackupData, Machine } from "@/context/BackupDataContext";

const MachineBalance = () => {
  const { backupData } = useBackupData();
  const machines = backupData?.machines || [];

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-center flex-grow">Sobra de Máquinas</h1>
        <div className="w-24"></div>
      </div>

      <Card className="bg-dashboard-secondary-blue text-white">
        <CardHeader>
          <CardTitle>Balanço das Máquinas</CardTitle>
        </CardHeader>
        <CardContent>
          {machines.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>NS</TableHead>
                    <TableHead>Modelo</TableHead>
                    <TableHead>Entrada Anterior</TableHead>
                    <TableHead>Saída Anterior</TableHead>
                    <TableHead>Entrada Atual</TableHead>
                    <TableHead>Saída Atual</TableHead>
                    <TableHead>Balanço</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {machines.map((machine: Machine) => {
                    const balance = (machine.entrada_atual - machine.saida_atual) * machine.multiplier;
                    return (
                      <TableRow key={machine.id}>
                        <TableCell className="font-medium">{machine.serial_number}</TableCell>
                        <TableCell>{machine.label}</TableCell>
                        <TableCell>{machine.entrada_anterior.toFixed(2)}</TableCell>
                        <TableCell>{machine.saida_anterior.toFixed(2)}</TableCell>
                        <TableCell>{machine.entrada_atual.toFixed(2)}</TableCell>
                        <TableCell>{machine.saida_atual.toFixed(2)}</TableCell>
                        <TableCell>R$ {balance.toFixed(2)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-gray-300">Nenhum dado de balanço de máquina disponível. Importe um backup.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MachineBalance;