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
import slotsData from "@/data/slots.json";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Slot {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  capacity: number;
  booked: number;
}

const SlotManager = () => {
  const slots: Slot[] = slotsData;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-center flex-grow">Gerenciador de Slots</h1>
        <div className="w-24"></div> {/* Placeholder for alignment */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Slots Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Início</TableHead>
                <TableHead>Fim</TableHead>
                <TableHead>Capacidade</TableHead>
                <TableHead>Reservados</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {slots.map((slot) => {
                const available = slot.capacity - slot.booked;
                const isFull = available <= 0;
                return (
                  <TableRow key={slot.id}>
                    <TableCell className="font-medium">{slot.name}</TableCell>
                    <TableCell>{slot.startTime}</TableCell>
                    <TableCell>{slot.endTime}</TableCell>
                    <TableCell>{slot.capacity}</TableCell>
                    <TableCell>{slot.booked}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={isFull ? "destructive" : "default"}>
                        {isFull ? "Lotado" : `${available} Vagas`}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SlotManager;