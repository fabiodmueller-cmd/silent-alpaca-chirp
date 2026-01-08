"use client";

import React, { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { useSlotMachines } from "@/context/SlotMachineContext";
import { showSuccess, showError } from "@/utils/toast";

const ImportBackup = () => {
  const { setSlotMachines } = useSlotMachines();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const parsedData = JSON.parse(content);

          let machinesToImport: any[] | null = null;
          let errorMessage = "";

          if (Array.isArray(parsedData)) {
            // Case 1: The JSON is directly an array of slot machines
            machinesToImport = parsedData;
          } else if (typeof parsedData === 'object' && parsedData !== null) {
            if (Array.isArray(parsedData.slotMachines)) {
              // Case 2: The JSON is an object with a 'slotMachines' property that is an array
              machinesToImport = parsedData.slotMachines;
            } else if (parsedData.data && Array.isArray(parsedData.data.machines)) { // NEW: Check for 'data.machines' property
              // Case 3: The JSON is an object with a 'data' property, and inside 'data', a 'machines' property that is an array
              machinesToImport = parsedData.data.machines;
            } else if (Array.isArray(parsedData.machines)) { // Existing check for 'machines' property at root
              // Case 4: The JSON is an object with a 'machines' property at the root that is an array
              machinesToImport = parsedData.machines;
            } else {
              errorMessage = "O objeto JSON é válido, mas não contém uma propriedade 'slotMachines', 'machines' ou 'data.machines' que seja um array.";
            }
          } else {
            errorMessage = "O arquivo JSON não é um array direto nem um objeto válido.";
          }

          if (machinesToImport) {
            // Validate the structure of each machine object
            const invalidItem = machinesToImport.find((item: any) => !(
              typeof item.id === 'string' &&
              typeof item.model === 'string' &&
              typeof item.location === 'string' &&
              (item.status === 'operational' || item.status === 'maintenance' || item.status === 'offline') &&
              typeof item.lastMaintenance === 'string' &&
              typeof item.dailyRevenue === 'number'
            ));

            if (invalidItem) {
              errorMessage = `Um ou mais itens no array de máquinas não seguem o formato esperado. Item problemático: ${JSON.stringify(invalidItem)}.`;
              // Detailed error messages for debugging
              if (typeof invalidItem.id !== 'string') errorMessage += " 'id' não é string.";
              if (typeof invalidItem.model !== 'string') errorMessage += " 'model' não é string.";
              if (typeof invalidItem.location !== 'string') errorMessage += " 'location' não é string.";
              if (!['operational', 'maintenance', 'offline'].includes(invalidItem.status)) errorMessage += " 'status' inválido.";
              if (typeof invalidItem.lastMaintenance !== 'string') errorMessage += " 'lastMaintenance' não é string.";
              if (typeof invalidItem.dailyRevenue !== 'number') errorMessage += " 'dailyRevenue' não é number.";
            }
          }

          if (errorMessage) {
            console.error("Dados importados não correspondem ao formato esperado:", parsedData);
            showError(`Formato de arquivo JSON inválido: ${errorMessage}`);
          } else if (machinesToImport) {
            // Map the imported machine data to match the SlotMachine interface if necessary
            const formattedMachines = machinesToImport.map((machine: any) => ({
              id: machine.id || machine.serial_number, // Use 'id' or 'serial_number'
              model: machine.label || machine.model, // Use 'label' or 'model'
              location: machine.location || "N/A", // Use 'location' or default
              status: "operational", // Default status as it's not in the backup
              lastMaintenance: machine.updated_date ? new Date(machine.updated_date).toISOString().split('T')[0] : "N/A", // Use 'updated_date' or default
              dailyRevenue: 0 // Default revenue as it's not in the backup
            }));
            setSlotMachines(formattedMachines);
            showSuccess("Backup importado com sucesso!");
          }
        } catch (error) {
          console.error("Erro ao analisar JSON:", error);
          showError("Erro ao ler o arquivo JSON. Verifique se é um JSON válido.");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-center flex-grow">Importar Backup de Máquinas</h1>
        <div className="w-24"></div> {/* Placeholder for alignment */}
      </div>

      <Card className="bg-dashboard-secondary-blue text-white">
        <CardHeader>
          <CardTitle>Carregar Arquivo JSON</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-300">
            Selecione um arquivo JSON contendo os dados das suas máquinas caça-níqueis para importar.
          </p>
          <div className="flex items-center space-x-2">
            <Input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden" // Hide the default file input
            />
            <Button onClick={handleUploadClick} className="bg-dashboard-accent-orange hover:bg-orange-600 text-white">
              <Upload className="mr-2 h-4 w-4" /> Selecionar Arquivo
            </Button>
            {fileInputRef.current?.files?.[0] && (
              <span className="text-sm text-gray-300">
                {fileInputRef.current.files[0].name}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportBackup;