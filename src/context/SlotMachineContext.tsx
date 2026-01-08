"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import initialSlotsData from "@/data/slots.json";

interface SlotMachine {
  id: string;
  model: string;
  location: string;
  status: "operational" | "maintenance" | "offline";
  lastMaintenance: string;
  dailyRevenue: number;
}

interface SlotMachineContextType {
  slotMachines: SlotMachine[];
  setSlotMachines: (machines: SlotMachine[]) => void;
}

const SlotMachineContext = createContext<SlotMachineContextType | undefined>(
  undefined
);

export const SlotMachineProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [slotMachines, setSlotMachines] =
    useState<SlotMachine[]>(initialSlotsData);

  return (
    <SlotMachineContext.Provider value={{ slotMachines, setSlotMachines }}>
      {children}
    </SlotMachineContext.Provider>
  );
};

export const useSlotMachines = () => {
  const context = useContext(SlotMachineContext);
  if (context === undefined) {
    throw new Error(
      "useSlotMachines must be used within a SlotMachineProvider"
    );
  }
  return context;
};