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

const ReadingsSummary = () => {
  const { backupData } = useBackupData();
  const readings = backupData?.readings || [];

  // Calculate summary metrics
  const totalFaturamentoBruto = readings.reduce((sum, r) => sum + (r.faturamento_bruto || 0), 0);
  const totalClientCommission = readings.reduce((sum, r) => sum + (r.client_commission || 0), 0);
  const totalOperatorCommission = readings.reduce((sum, r) => sum + (r.operator_commission || 0), 0);
  const totalCompanyProfit = readings.reduce((sum, r) => sum + (r.company_profit || 0), 0);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-center flex-grow">Resumo de Leituras</h1>
        <div className="w-24"></div>
      </div>

      <Card className="bg-dashboard-secondary-blue text-white">
        <CardHeader>
          <CardTitle>Resumo Geral das Leituras</CardTitle>
        </CardHeader>
        <CardContent>
          {readings.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Métrica</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Total de Faturamento Bruto</TableCell>
                  <TableCell className="text-right">R$ {totalFaturamentoBruto.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Total de Comissão do Cliente</TableCell>
                  <TableCell className="text-right">R$ {totalClientCommission.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Total de Comissão do Operador</TableCell>
                  <TableCell className="text-right">R$ {totalOperatorCommission.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Total de Lucro da Empresa</TableCell>
                  <TableCell className="text-right">R$ {totalCompanyProfit.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Número Total de Leituras</TableCell>
                  <TableCell className="text-right">{readings.length}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-300">Nenhum dado de leitura disponível para resumir. Importe um backup.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReadingsSummary;