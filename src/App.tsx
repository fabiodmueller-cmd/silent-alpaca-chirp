import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import SlotMachineManager from "./pages/SlotMachineManager";
import Dashboard from "./pages/Dashboard"; // Import the new Dashboard page
import Layout from "./components/Layout"; // Import the new Layout component

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} /> {/* Dashboard as the main page */}
          <Route path="/slot-machine-manager" element={<Layout><SlotMachineManager /></Layout>} /> {/* SlotMachineManager within the layout */}
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;