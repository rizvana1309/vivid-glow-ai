import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import SkinAnalysis from "./pages/SkinAnalysis";
import HairAnalysis from "./pages/HairAnalysis";
import StylingAdvisor from "./pages/StylingAdvisor";
import OrnamentMatcher from "./pages/OrnamentMatcher";
import DressMatcher from "./pages/DressMatcher";
import ProductStore from "./pages/ProductStore";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/skin-analysis" element={<SkinAnalysis />} />
          <Route path="/hair-analysis" element={<HairAnalysis />} />
          <Route path="/styling-advisor" element={<StylingAdvisor />} />
          <Route path="/ornament-matcher" element={<OrnamentMatcher />} />
          <Route path="/dress-matcher" element={<DressMatcher />} />
          <Route path="/store/:section" element={<ProductStore />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
