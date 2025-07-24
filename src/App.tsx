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
import DigitalFabricationPage from "./pages/DigitalFabrication";
import ThreeDScanningPage from "./pages/ThreeDScanning";
import CoursesPage from "./pages/Courses";
import BlogIndex from "./pages/blog/Index";
import BlogPost from "./pages/blog/BlogPost";
import SplashScreen from "./components/SplashScreen";
import ScrollToTop from "./components/ScrollToTop";
import SplashScreenReset from "./components/SplashScreenReset";

const queryClient = new QueryClient();

// Function to preload critical images
const preloadResources = async () => {
  // List of critical images to preload
  const criticalImages = [
    '/fablab/cfyi.svg',
    // Add other important images here
  ];

  // Preload images
  const imagePromises = criticalImages.map(src => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = src;
    });
  });

  try {
    // Wait for all images to load
    await Promise.all(imagePromises);
    return true;
  } catch (error) {
    console.error('Error preloading resources:', error);
    return true; // Continue anyway
  }
};

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
  const [showSplash, setShowSplash] = useState(true);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    
    if (hasVisited) {
      // If not first visit, don't show splash screen
      setShowSplash(false);
      setAppReady(true);
    } else {
      // If first visit, set flag for future visits
      localStorage.setItem('hasVisitedBefore', 'true');
      // Show splash screen
      setShowSplash(true);
      
      // Start preloading resources in the background
      preloadResources().then(() => {
        // Mark the app as ready once resources are loaded
        setAppReady(true);
      });
    }
  }, []);

  const handleSplashFinished = () => {
    setShowSplash(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showSplash && <SplashScreen onFinished={handleSplashFinished} />}
        <div className={`${!appReady ? 'invisible' : ''} ${showSplash ? "opacity-0" : "opacity-100 transition-opacity duration-500"}`}>
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
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </RouteHandler>
            <SplashScreenReset />
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
