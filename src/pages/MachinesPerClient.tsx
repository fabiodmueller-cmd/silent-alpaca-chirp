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
import { useBackupData, Machine, Client } from "@/context/BackupDataContext";

const MachinesPerClient = () => {
  const { backupData } = useBackupData();
  const machines = backupData?.machines || [];
  const clients = backupData?.clients || [];

  // Group machines by client
  const machinesByClient: { [key: string]: Machine[] } = {};
  machines.forEach((machine) => {
    if (!machinesByClient[machine.client_id]) {
      machinesByClient[machine.client_id] = [];
    }
    machinesByClient[machine.client_id].push(machine);
  });

  const getClientName = (clientId: string) => {
    const client = clients.find((c: Client) => c.id === clientId);
    return client ? client.name : "Cliente Desconhecido";
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-center flex-grow">Máquinas por Cliente</h1>
        <div className="w-24"></div>
      </div>

      <Card className="bg-dashboard-secondary-blue text-white">
        <CardHeader>
          <CardTitle>Máquinas Agrupadas por Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(machinesByClient).length > 0 ? (
            <div className="space-y-6">
              {Object.entries(machinesByClient).map(([clientId, clientMachines]) => (
                <div key={clientId} className="border border-gray-700 rounded-lg p-4">
                  <h3 className="text-xl font-semibold mb-3 text-dashboard-accent-orange">
                    Cliente: {getClientName(clientId)}
                  </h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>NS</TableHead>
                        <TableHead>Modelo</TableHead>
                        <TableHead>Localização</TableHead>
                        <TableHead>Operador</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clientMachines.map((machine) => (
                        <TableRow key={machine.id}>
                          <TableCell className="font-medium">{machine.serial_number}</TableCell>
                          <TableCell>{machine.label}</TableCell>
                          <TableCell>{machine.location || "N/A"}</TableCell>
                          <TableCell>{machine.operator_id || "N/A"}</TableCell> {/* Could map to operator name */}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-300">Nenhum dado de máquina por cliente disponível. Importe um backup.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MachinesPerClient;