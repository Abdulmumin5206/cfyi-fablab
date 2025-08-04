import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ThreeDPrintingPage from "./pages/3DPrinting";
import MouldPage from "./pages/Mould";
import DigitalFabricationPage from "./pages/DigitalFabrication";
import ThreeDScanningPage from "./pages/ThreeDScanning";
import CoursesPage from "./pages/Courses";
import BlogIndex from "./pages/blog/Index";
import BlogPost from "./pages/blog/BlogPost";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

// Component to handle body class based on route
const RouteHandler = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  useEffect(() => {
    if (location.pathname === "/") {
      document.body.classList.add("home-page");
    } else {
      document.body.classList.remove("home-page");
    }
    
    return () => {
      document.body.classList.remove("home-page");
    };
  }, [location.pathname]);
  
  return <>{children}</>;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <RouteHandler>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/3d-printing" element={<ThreeDPrintingPage />} />
              <Route path="/mould" element={<MouldPage />} />
              <Route path="/digital-fabrication" element={<DigitalFabricationPage />} />
              <Route path="/3d-scanning" element={<ThreeDScanningPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/blog" element={<BlogIndex />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </RouteHandler>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;