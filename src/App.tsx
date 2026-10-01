import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import LeadsPage from "./pages/LeadsPage.tsx";
import ServicePage from "./pages/ServicePage.tsx";
import SeoNiche from "./pages/SeoNiche.tsx";
import PricingPage from "./pages/PricingPage.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsOfService from "./pages/TermsOfService.tsx";
import CookiePolicy from "./pages/CookiePolicy.tsx";
import NotFound from "./pages/NotFound.tsx";
import NicheLanding from "./pages/NicheLanding.tsx";

const PORTAL_LOGIN = "https://app.localrocket.se/login";
const PortalRedirect = () => {
  useEffect(() => {
    window.location.replace(PORTAL_LOGIN);
  }, []);
  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/leadsgenerering" element={<LeadsPage />} />
            <Route path="/leadsgenerering/:slug" element={<NicheLanding />} />
            <Route path="/byratjanster/:slug" element={<ServicePage />} />
            <Route path="/seo/:slug" element={<SeoNiche />} />
            <Route path="/sa-fungerar-det" element={<Navigate to="/leadsgenerering" replace />} />
            <Route path="/priser" element={<PricingPage />} />
            <Route path="/integritetspolicy" element={<PrivacyPolicy />} />
            <Route path="/villkor" element={<TermsOfService />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/login" element={<PortalRedirect />} />
            <Route path="/signup" element={<PortalRedirect />} />
            <Route path="/reset-password" element={<PortalRedirect />} />
            <Route path="/dashboard" element={<PortalRedirect />} />
            <Route path="/admin" element={<PortalRedirect />} />
            <Route path="/onboarding" element={<PortalRedirect />} />
            <Route path="/onboarding/klar" element={<PortalRedirect />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
