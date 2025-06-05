import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ThreeDPrintingPage from "./pages/3DPrinting";
import MouldPage from "./pages/Mould";
import EngineeringPage from "./pages/Engineering";
import CustomFabricationPage from "./pages/CustomFabrication";
import DigitalFabricationPage from "./pages/DigitalFabrication";
import ThreeDScanningPage from "./pages/ThreeDScanning";
import BlogIndex from "./pages/blog/Index";
import BlogPost from "./pages/blog/BlogPost";
import SplashScreen from "./components/SplashScreen";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

// Component to handle body class based on route
const RouteHandler = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  useEffect(() => {
    // Check if we're on the home page
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
  const [showSplash, setShowSplash] = useState(false);

  const handleSplashFinished = () => {
    setShowSplash(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showSplash && <SplashScreen onFinished={handleSplashFinished} />}
        <div className={showSplash ? "opacity-0" : "opacity-100 transition-opacity duration-500"}>
          <BrowserRouter>
            <ScrollToTop />
            <RouteHandler>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/3d-printing" element={<ThreeDPrintingPage />} />
                <Route path="/mould" element={<MouldPage />} />
                <Route path="/engineering" element={<EngineeringPage />} />
                <Route path="/custom-fabrication" element={<CustomFabricationPage />} />
                <Route path="/digital-fabrication" element={<DigitalFabricationPage />} />
                <Route path="/3d-scanning" element={<ThreeDScanningPage />} />
                <Route path="/blog" element={<BlogIndex />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </RouteHandler>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
