import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import SlotMachineManager from "./pages/SlotMachineManager";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import ImportBackup from "./pages/ImportBackup";
import { SlotMachineProvider } from "./context/SlotMachineContext";
import { BackupDataProvider } from "./context/BackupDataContext"; // Import the new BackupDataProvider

// Import new pages
import ClientsReadings from "./pages/ClientsReadings";
import MachinesPerClient from "./pages/MachinesPerClient";
import Readings from "./pages/Readings";
import ReadingsSummary from "./pages/ReadingsSummary";
import MachineBalance from "./pages/MachineBalance";
import AdvancedReports from "./pages/AdvancedReports";
import GeneralReport from "./pages/GeneralReport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <BackupDataProvider> {/* Wrap with BackupDataProvider */}
          <SlotMachineProvider>
            <Routes>
              <Route path="/" element={<Layout><Dashboard /></Layout>} />
              <Route path="/slot-machine-manager" element={<Layout><SlotMachineManager /></Layout>} />
              <Route path="/import-backup" element={<Layout><ImportBackup /></Layout>} />
              {/* New routes for displaying backup data */}
              <Route path="/clients-readings" element={<Layout><ClientsReadings /></Layout>} />
              <Route path="/machines-per-client" element={<Layout><MachinesPerClient /></Layout>} />
              <Route path="/readings" element={<Layout><Readings /></Layout>} />
              <Route path="/readings-summary" element={<Layout><ReadingsSummary /></Layout>} />
              <Route path="/machine-balance" element={<Layout><MachineBalance /></Layout>} />
              <Route path="/advanced-reports" element={<Layout><AdvancedReports /></Layout>} />
              <Route path="/general-report" element={<Layout><GeneralReport /></Layout>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SlotMachineProvider>
        </BackupDataProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;