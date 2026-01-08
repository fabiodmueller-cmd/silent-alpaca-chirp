import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import SlotMachineManager from "./pages/SlotMachineManager";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import ImportBackup from "./pages/ImportBackup"; // Import the new ImportBackup page
import { SlotMachineProvider } from "./context/SlotMachineContext"; // Import the SlotMachineProvider

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SlotMachineProvider> {/* Wrap the entire app with the provider */}
          <Routes>
            <Route path="/" element={<Layout><Dashboard /></Layout>} />
            <Route path="/slot-machine-manager" element={<Layout><SlotMachineManager /></Layout>} />
            <Route path="/import-backup" element={<Layout><ImportBackup /></Layout>} /> {/* New route for Import Backup */}
            {/* Add other routes here, wrapped in Layout if they need the sidebar */}
            <Route path="/clients-readings" element={<Layout><div>CLIENTES E LEITURAS Page</div></Layout>} />
            <Route path="/machines-per-client" element={<Layout><div>MÁQUINAS P/ CLIENT... Page</div></Layout>} />
            <Route path="/readings" element={<Layout><div>LEITURAS Page</div></Layout>} />
            <Route path="/readings-summary" element={<Layout><div>RESUMO LEITURAS Page</div></Layout>} />
            <Route path="/machine-balance" element={<Layout><div>SOBRA MÁQUINAS Page</div></Layout>} />
            <Route path="/advanced-reports" element={<Layout><div>REL. AVANÇADOS Page</div></Layout>} />
            <Route path="/general-report" element={<Layout><div>REL. GERAL Page</div></Layout>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SlotMachineProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;