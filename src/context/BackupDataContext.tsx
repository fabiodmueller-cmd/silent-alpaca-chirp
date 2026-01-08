"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

// Interfaces for the backup data structure
export interface Client {
  name: string;
  contact: string;
  commission_percentage: number;
  region_id: string | null;
  id: string;
  created_date: string;
  updated_date: string;
  created_by_id: string;
  created_by: string;
  is_sample: boolean;
}

export interface Operator {
  name: string;
  contact: string;
  commission_percentage: number;
  pin: string;
  id: string;
  created_date: string;
  updated_date: string;
  created_by_id: string;
  created_by: string;
  is_sample: boolean;
}

export interface Machine {
  serial_number: string;
  label: string;
  location: string | null;
  client_id: string;
  operator_id: string | null;
  operator_commission_percentage: number;
  multiplier: number;
  entrada_anterior: number;
  saida_anterior: number;
  entrada_atual: number;
  saida_atual: number;
  id: string;
  created_date: string;
  updated_date: string;
  created_by_id: string;
  created_by: string;
  is_sample: boolean;
}

export interface Reading {
  machine_id: string;
  reading_date: string;
  multiplier: number | null;
  entrada_anterior: number | null;
  saida_anterior: number | null;
  entrada_atual: number | null;
  saida_atual: number | null;
  faturamento_bruto: number | null;
  client_commission: number | null;
  operator_commission: number | null;
  company_profit: number | null;
  note: string | null;
  id: string;
  created_date: string;
  updated_date: string;
  created_by_id: string;
  created_by: string;
  is_sample: boolean;
}

export interface Region {
  name: string;
  id: string;
  created_date: string;
  updated_date: string;
  created_by_id: string;
  created_by: string;
  is_sample: boolean;
}

export interface Payment {
  beneficiary_type: string;
  beneficiary_id: string;
  beneficiary_name: string;
  payment_date: string;
  amount: number;
  method: string;
  note: string;
  reading_ids: string | null;
  is_manual: boolean;
  client_id: string | null;
  paid: boolean;
  id: string;
  created_date: string;
  updated_date: string;
  created_by_id: string;
  created_by: string;
  is_sample: boolean;
}

export interface BackupData {
  clients: Client[];
  operators: Operator[];
  machines: Machine[];
  readings: Reading[];
  regions: Region[];
  payments: Payment[];
}

interface BackupDataContextType {
  backupData: BackupData | null;
  setBackupData: (data: BackupData) => void;
}

const BackupDataContext = createContext<BackupDataContextType | undefined>(
  undefined
);

export const BackupDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [backupData, setBackupData] = useState<BackupData | null>(null);

  return (
    <BackupDataContext.Provider value={{ backupData, setBackupData }}>
      {children}
    </BackupDataContext.Provider>
  );
};

export const useBackupData = () => {
  const context = useContext(BackupDataContext);
  if (context === undefined) {
    throw new Error(
      "useBackupData must be used within a BackupDataProvider"
    );
  }
  return context;
};