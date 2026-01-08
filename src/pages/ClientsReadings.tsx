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
import { useBackupData, Client } from "@/context/BackupDataContext";

const ClientsReadings = () => {
  const { backupData } = useBackupData();
  const clients = backupData?.clients || [];

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-center flex-grow">Clientes e Leituras</h1>
        <div className="w-24"></div>
      </div>

      <Card className="bg-dashboard-secondary-blue text-white">
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          {clients.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Comissão (%)</TableHead>
                  <TableHead>ID da Região</TableHead>
                  <TableHead>Criado Em</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client: Client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.contact || "N/A"}</TableCell>
                    <TableCell>{client.commission_percentage}%</TableCell>
                    <TableCell>{client.region_id || "N/A"}</TableCell>
                    <TableCell>{new Date(client.created_date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-300">Nenhum dado de cliente disponível. Importe um backup.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientsReadings;