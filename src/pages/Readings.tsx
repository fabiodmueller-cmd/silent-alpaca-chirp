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
import { useBackupData, Reading } from "@/context/BackupDataContext";

const Readings = () => {
  const { backupData } = useBackupData();
  const readings = backupData?.readings || [];

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-center flex-grow">Leituras</h1>
        <div className="w-24"></div>
      </div>

      <Card className="bg-dashboard-secondary-blue text-white">
        <CardHeader>
          <CardTitle>Lista de Leituras</CardTitle>
        </CardHeader>
        <CardContent>
          {readings.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Máquina ID</TableHead>
                    <TableHead>Data da Leitura</TableHead>
                    <TableHead>Entrada Anterior</TableHead>
                    <TableHead>Saída Anterior</TableHead>
                    <TableHead>Entrada Atual</TableHead>
                    <TableHead>Saída Atual</TableHead>
                    <TableHead>Faturamento Bruto</TableHead>
                    <TableHead>Comissão Cliente</TableHead>
                    <TableHead>Lucro Empresa</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {readings.map((reading: Reading) => (
                    <TableRow key={reading.id}>
                      <TableCell className="font-medium">{reading.machine_id}</TableCell>
                      <TableCell>{new Date(reading.reading_date).toLocaleDateString()}</TableCell>
                      <TableCell>{reading.entrada_anterior?.toFixed(2) || "N/A"}</TableCell>
                      <TableCell>{reading.saida_anterior?.toFixed(2) || "N/A"}</TableCell>
                      <TableCell>{reading.entrada_atual?.toFixed(2) || "N/A"}</TableCell>
                      <TableCell>{reading.saida_atual?.toFixed(2) || "N/A"}</TableCell>
                      <TableCell>R$ {reading.faturamento_bruto?.toFixed(2) || "0.00"}</TableCell>
                      <TableCell>R$ {reading.client_commission?.toFixed(2) || "0.00"}</TableCell>
                      <TableCell>R$ {reading.company_profit?.toFixed(2) || "0.00"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-gray-300">Nenhum dado de leitura disponível. Importe um backup.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Readings;