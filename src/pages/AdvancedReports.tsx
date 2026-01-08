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
import { useBackupData, Payment } from "@/context/BackupDataContext";

const AdvancedReports = () => {
  const { backupData } = useBackupData();
  const payments = backupData?.payments || [];

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-center flex-grow">Relatórios Avançados (Pagamentos)</h1>
        <div className="w-24"></div>
      </div>

      <Card className="bg-dashboard-secondary-blue text-white">
        <CardHeader>
          <CardTitle>Lista de Pagamentos</CardTitle>
        </CardHeader>
        <CardContent>
          {payments.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo Beneficiário</TableHead>
                    <TableHead>Nome Beneficiário</TableHead>
                    <TableHead>Data Pagamento</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Nota</TableHead>
                    <TableHead>Manual</TableHead>
                    <TableHead>Pago</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment: Payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.beneficiary_type}</TableCell>
                      <TableCell>{payment.beneficiary_name}</TableCell>
                      <TableCell>{new Date(payment.payment_date).toLocaleDateString()}</TableCell>
                      <TableCell>R$ {payment.amount.toFixed(2)}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>{payment.note}</TableCell>
                      <TableCell>{payment.is_manual ? "Sim" : "Não"}</TableCell>
                      <TableCell>{payment.paid ? "Sim" : "Não"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-gray-300">Nenhum dado de pagamento disponível. Importe um backup.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedReports;