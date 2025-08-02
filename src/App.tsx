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

// Real resource preloading with progress tracking
const preloadResourcesWithProgress = async (onProgress: (progress: number) => void) => {
  const criticalImages = [
    '/fablab/cfyi.svg',
    '/fablab/1.jpg', // Fixed: removed .webp extension
    '/main/fablabroom.webp',
    '/main/3dprinting1.webp',
    '/main/scrolling2.webp',
    '/main/membership/students.webp',
    '/main/membership/maker.webp',
    '/main/membership/professional.webp'
  ];

  let loadedCount = 0;
  const totalResources = criticalImages.length + 1; // +1 for video

  const updateProgress = () => {
    const progress = (loadedCount / totalResources) * 100;
    onProgress(progress);
  };

  // Preload images with real progress updates
  const imagePromises = criticalImages.map((src) => {
    return new Promise<boolean>((resolve) => {
      const img = new Image();
      
      const timeoutId = setTimeout(() => {
        console.warn(`Image ${src} loading timed out`);
        loadedCount++;
        updateProgress();
        resolve(false);
      }, 5000);
      
      img.onload = () => {
        clearTimeout(timeoutId);
        loadedCount++;
        updateProgress();
        console.log(`✅ Loaded: ${src}`);
        resolve(true);
      };
      
      img.onerror = () => {
        clearTimeout(timeoutId);
        console.error(`❌ Failed: ${src}`);
        loadedCount++;
        updateProgress();
        resolve(false);
      };
      
      img.src = src;
    });
  });

  // Preload video metadata
  const videoPromise = new Promise<boolean>((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    
    const timeoutId = setTimeout(() => {
      console.warn('Video metadata loading timed out');
      loadedCount++;
      updateProgress();
      resolve(false);
    }, 3000);
    
    video.onloadedmetadata = () => {
      clearTimeout(timeoutId);
      loadedCount++;
      updateProgress();
      console.log('✅ Video metadata loaded');
      resolve(true);
    };
    
    video.onerror = () => {
      clearTimeout(timeoutId);
      console.error('❌ Video metadata failed');
      loadedCount++;
      updateProgress();
      resolve(false);
    };
    
    video.src = '/video/FabLab video horizontal.mp4';
  });

  try {
    // Wait for all critical resources
    const results = await Promise.all([...imagePromises, videoPromise]);
    const successCount = results.filter(Boolean).length;
    
    return { 
      success: true, 
      loadedCount: successCount, 
      totalCount: totalResources,
      criticalResourcesReady: successCount >= Math.ceil(totalResources * 0.7)
    };
  } catch (error) {
    console.error('Error during resource preloading:', error);
    return { 
      success: false, 
      loadedCount: 0, 
      totalCount: totalResources,
      criticalResourcesReady: false
    };
  }
};

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
  const [showSplash, setShowSplash] = useState(true);
  const [appReady, setAppReady] = useState(false);
  const [resourcesReady, setResourcesReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    const forceShowSplash = localStorage.getItem('forceShowSplash') === 'true';
    
    if (hasVisited && !forceShowSplash) {
      // Skip splash for returning visitors
      setShowSplash(false);
      setAppReady(true);
      setResourcesReady(true);
      setLoadingProgress(100);
    } else {
      // Show splash and load resources for first-time visitors
      if (!hasVisited) {
        localStorage.setItem('hasVisitedBefore', 'true');
      }
      if (forceShowSplash) {
        localStorage.removeItem('forceShowSplash');
      }
      
      setShowSplash(true);
      startResourceLoading();
    }
  }, []);

  const startResourceLoading = async () => {
    try {
      console.log('🚀 Starting resource preloading...');
      
      const result = await preloadResourcesWithProgress((progress) => {
        console.log(`📊 Loading progress: ${progress.toFixed(1)}%`);
        setLoadingProgress(progress);
      });
      
      console.log(`🎉 Preloading completed: ${result.loadedCount}/${result.totalCount} loaded`);
      
      // Mark resources as ready
      setResourcesReady(true);
      setLoadingProgress(100);
      
      // Mark app as ready
      if (result.criticalResourcesReady) {
        setAppReady(true);
      } else {
        console.warn('⚠️ Some critical resources failed, proceeding anyway');
        setAppReady(true);
      }
    } catch (error) {
      console.error('💥 Resource loading error:', error);
      // Proceed anyway
      setResourcesReady(true);
      setAppReady(true);
      setLoadingProgress(100);
    }
  };

  const handleSplashFinished = () => {
    setShowSplash(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showSplash && (
          <SplashScreen 
            onFinished={handleSplashFinished} 
            loadingProgress={loadingProgress}
            isResourcesReady={resourcesReady && appReady}
          />
        )}
        <div 
          className={`${!appReady ? 'invisible' : ''} ${showSplash ? "opacity-0" : "opacity-100"}`}
          style={{
            transition: 'opacity 400ms ease-out',
            willChange: showSplash ? 'opacity' : 'auto'
          }}
        >
          <BrowserRouter>
            <ScrollToTop />
            <RouteHandler>
              <Routes>
                <Route path="/" element={<Index />} />
                
                {/* 3D Printing Routes - SEO Optimized but simplified */}
                <Route path="/3d-printing" element={<ThreeDPrintingPage />} />
                <Route path="/3d-printing-services" element={<ThreeDPrintingPage />} />
                <Route path="/3d-printing-tashkent" element={<ThreeDPrintingPage />} />
                
                {/* Molding & Production Routes - SEO Optimized */}
                <Route path="/mould" element={<MouldPage />} />
                <Route path="/molding" element={<MouldPage />} />
                <Route path="/injection-molding" element={<MouldPage />} />
                <Route path="/molding-services" element={<MouldPage />} />
                <Route path="/injection-molding-tashkent" element={<MouldPage />} />
                <Route path="/plastic-molding" element={<MouldPage />} />
                <Route path="/production-services" element={<MouldPage />} />
                <Route path="/manufacturing" element={<MouldPage />} />
                
                {/* 3D Scanning Routes - SEO Optimized */}
                <Route path="/3d-scanning" element={<ThreeDScanningPage />} />
                <Route path="/3d-scanning-services" element={<ThreeDScanningPage />} />
                <Route path="/3d-scanning-tashkent" element={<ThreeDScanningPage />} />
                <Route path="/reverse-engineering" element={<ThreeDScanningPage />} />
                <Route path="/quality-control-scanning" element={<ThreeDScanningPage />} />
                <Route path="/digital-archiving" element={<ThreeDScanningPage />} />
                <Route path="/3d-metrology" element={<ThreeDScanningPage />} />
                
                {/* Other Services */}
                <Route path="/digital-fabrication" element={<DigitalFabricationPage />} />
                <Route path="/digital-fabrication/precision-manufacturing" element={<DigitalFabricationPage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/projects" element={<BlogIndex />} />
                <Route path="/projects/:slug" element={<BlogPost />} />
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