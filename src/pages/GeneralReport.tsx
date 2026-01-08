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
import { useBackupData } from "@/context/BackupDataContext";

const GeneralReport = () => {
  const { backupData } = useBackupData();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-center flex-grow">Relatório Geral</h1>
        <div className="w-24"></div>
      </div>

      <Card className="bg-dashboard-secondary-blue text-white">
        <CardHeader>
          <CardTitle>Visão Geral do Backup</CardTitle>
        </CardHeader>
        <CardContent>
          {backupData ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="text-right">Total de Itens</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Clientes</TableCell>
                  <TableCell className="text-right">{backupData.clients.length}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Operadores</TableCell>
                  <TableCell className="text-right">{backupData.operators.length}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Máquinas</TableCell>
                  <TableCell className="text-right">{backupData.machines.length}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Leituras</TableCell>
                  <TableCell className="text-right">{backupData.readings.length}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Regiões</TableCell>
                  <TableCell className="text-right">{backupData.regions.length}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Pagamentos</TableCell>
                  <TableCell className="text-right">{backupData.payments.length}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-300">Nenhum dado de backup disponível. Importe um backup para ver o relatório geral.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralReport;