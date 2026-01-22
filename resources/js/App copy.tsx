import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { NotificationProvider } from "@/contexts/NotificationContext";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Orders from "@/pages/Orders";
import Products from "@/pages/Products";
import Tables from "@/pages/Tables";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <NotificationProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Protected routes with layout */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/products" element={<Products />} />
              <Route path="/tables" element={<Tables />} />
            </Route>
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
