import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "@/styles/Slider.module.css";

const ThreeDPrintingPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marketsRef = useRef<HTMLDivElement>(null);
  const [currentPrinterIndex, setCurrentPrinterIndex] = useState(0);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update document title
    document.title = "3D Printing Services | FabLab";
    
    console.log("3D Printing page mounted");
  }, []);

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error("Video failed to load", e);
    console.log("Video source path:", videoRef.current?.querySelector('source')?.getAttribute('src'));
  };

  const handleVideoLoad = () => {
    console.log("Video loaded successfully");
  };

  const scrollMarketLeft = () => {
    if (marketsRef.current) {
      marketsRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollMarketRight = () => {
    if (marketsRef.current) {
      marketsRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section with video on right side */}
        <section className="relative bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col lg:flex-row items-center">
            {/* Left side content */}
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0 pr-0 lg:pr-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Tackle any problem <span className="text-gray-400">with our industry-leading materials, or use Open Material Mode.</span>
              </h1>
              
              <div className="flex flex-wrap gap-2 mb-8">
                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
                  <span>General Purpose</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
                  <span>Tough</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
                  <span>Rigid</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
                  <span>Flame Retardant</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
                  <span>Silicone</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
                  <span>Elastic</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
                  <span>Biocompatible</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
                  <span>Polyurethane</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
                  <span>Ceramic</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
                  <span>Open Material Mode</span>
                </button>
              </div>
              
              <button className="bg-[#f05a28] hover:bg-[#e04a18] px-6 py-3 rounded-md font-medium">
                REQUEST A SAMPLE PART
              </button>
            </div>
            
            {/* Right side video */}
            <div className="w-full lg:w-1/2 relative">
              <div className="relative rounded-md overflow-hidden border-2 border-[#f05a28]">
                <video
                  ref={videoRef}
                  className="w-full aspect-video object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  onError={handleVideoError}
                  onLoadedData={handleVideoLoad}
                >
                  <source 
                    src="/video/clearcast_loop_240903_720p_1mbps_h264.mp4" 
                    type="video/mp4" 
                  />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute bottom-0 left-0 right-0 bg-[#f05a28] text-white p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold">RIGID</span> Ultra stiff, high strength, glass-filled
                    </div>
                    <button className="flex items-center gap-1 font-medium">
                      LEARN MORE
                      <span>›</span>
                    </button>
                  </div>
                </div>
                <button className="absolute top-4 right-4 bg-[#f05a28] rounded-full p-1 w-8 h-8 flex items-center justify-center">
                  <span className="sr-only">Pause</span>
                  ⏸
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Industry selection section */}
        <section className="border-t border-b border-gray-200 bg-white py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
              <a href="#" className="bg-gray-900 text-white p-4 flex flex-col items-center justify-center rounded-md hover:bg-gray-800 transition-colors">
                <div className="w-16 h-16 mb-2 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50,15 C30,15 15,30 15,50 C15,70 65,85 85,65 C95,55 85,15 50,15 Z"></path>
                  </svg>
                </div>
                <span className="text-sm font-medium">Dental</span>
              </a>
              
              <a href="#" className="bg-gray-900 text-white p-4 flex flex-col items-center justify-center rounded-md hover:bg-gray-800 transition-colors">
                <div className="w-16 h-16 mb-2 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" viewBox="0 0 100 100" fill="currentColor">
                    <circle cx="50" cy="50" r="30"></circle>
                    <circle cx="50" cy="50" r="15" fill="transparent" stroke="currentColor" strokeWidth="8"></circle>
                    <path d="M50,20 L50,30 M50,70 L50,80 M20,50 L30,50 M70,50 L80,50 M30,30 L37,37 M63,63 L70,70 M30,70 L37,63 M63,37 L70,30" stroke="currentColor" strokeWidth="4"></path>
                  </svg>
                </div>
                <span className="text-sm font-medium">Engineering</span>
              </a>
              
              <a href="#" className="bg-gray-900 text-white p-4 flex flex-col items-center justify-center rounded-md hover:bg-gray-800 transition-colors">
                <div className="w-16 h-16 mb-2 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M20,80 L20,50 L40,50 L40,80 Z M45,80 L45,40 L65,40 L65,80 Z M70,80 L70,60 L90,60 L90,80 Z M15,35 L90,35 L90,30 L15,30 Z"></path>
                    <path d="M75,30 L75,20 L80,15 L85,20 L85,30 Z"></path>
                  </svg>
                </div>
                <span className="text-sm font-medium">Manufacturing</span>
              </a>
              
              <a href="#" className="bg-gray-900 text-white p-4 flex flex-col items-center justify-center rounded-md hover:bg-gray-800 transition-colors">
                <div className="w-16 h-16 mb-2 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M20,70 L20,50 L80,50 L80,70 Z M25,50 L25,40 C25,30 40,30 50,30 C60,30 75,30 75,40 L75,50 Z M35,70 C35,75 30,80 25,80 C20,80 15,75 15,70 L35,70 Z M85,70 C85,75 80,80 75,80 C70,80 65,75 65,70 L85,70 Z"></path>
                  </svg>
                </div>
                <span className="text-sm font-medium">Automotive</span>
              </a>
              
              <a href="#" className="bg-gray-900 text-white p-4 flex flex-col items-center justify-center rounded-md hover:bg-gray-800 transition-colors">
                <div className="w-16 h-16 mb-2 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M20,60 L20,40 L80,40 L80,60 Z M75,40 L90,25 L90,60 L75,60 Z M20,60 L10,70 L10,30 L20,40 Z"></path>
                  </svg>
                </div>
                <span className="text-sm font-medium">Aerospace</span>
              </a>
              
              <a href="#" className="bg-gray-900 text-white p-4 flex flex-col items-center justify-center rounded-md hover:bg-gray-800 transition-colors">
                <div className="w-16 h-16 mb-2 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" viewBox="0 0 100 100" fill="currentColor">
                    <circle cx="65" cy="35" r="15"></circle>
                    <path d="M60,50 L60,80 L70,80 L70,50 Z M20,80 L50,30 L55,35 L30,80 Z"></path>
                  </svg>
                </div>
                <span className="text-sm font-medium">Education</span>
              </a>
              
              <a href="#" className="bg-gray-900 text-white p-4 flex flex-col items-center justify-center rounded-md hover:bg-gray-800 transition-colors">
                <div className="w-16 h-16 mb-2 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" viewBox="0 0 100 100" fill="currentColor">
                    <rect x="40" y="20" width="20" height="60" rx="10"></rect>
                    <path d="M60,30 C80,30 90,50 80,70 M40,30 C20,30 10,50 20,70"></path>
                  </svg>
                </div>
                <span className="text-sm font-medium">Medical</span>
              </a>
              
              <a href="#" className="bg-gray-900 text-white p-4 flex flex-col items-center justify-center rounded-md hover:bg-gray-800 transition-colors">
                <div className="w-16 h-16 mb-2 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" viewBox="0 0 100 100">
                    <rect x="20" y="20" width="15" height="15" rx="2" fill="currentColor"></rect>
                    <rect x="42" y="20" width="15" height="15" rx="2" fill="currentColor"></rect>
                    <rect x="64" y="20" width="15" height="15" rx="2" fill="currentColor"></rect>
                    <rect x="20" y="42" width="15" height="15" rx="2" fill="currentColor"></rect>
                    <rect x="42" y="42" width="15" height="15" rx="2" fill="currentColor"></rect>
                    <rect x="64" y="42" width="15" height="15" rx="2" fill="currentColor"></rect>
                    <rect x="20" y="64" width="15" height="15" rx="2" fill="currentColor"></rect>
                    <rect x="42" y="64" width="15" height="15" rx="2" fill="currentColor"></rect>
                    <rect x="64" y="64" width="15" height="15" rx="2" fill="currentColor"></rect>
                  </svg>
                </div>
                <span className="text-sm font-medium">All Industries</span>
              </a>
            </div>
          </div>
        </section>

        {/* Innovating Markets Section - Our 3D Printing Equipment */}
        <section className="py-10 md:py-16 bg-black text-white">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-10 ml-0 md:ml-4">Our 3D Printing Equipment</h2>
            
            <div className="relative">
              {/* Navigation buttons */}
              <button 
                onClick={scrollMarketLeft}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full w-8 h-8 md:w-12 md:h-12 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
                aria-label="Previous market"
              >
                <span className="sr-only">Previous</span>
                <ArrowLeft size={16} className="text-black md:hidden" />
                <ArrowLeft size={24} className="text-black hidden md:block" />
              </button>
              <button 
                onClick={scrollMarketRight}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full w-8 h-8 md:w-12 md:h-12 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
                aria-label="Next market"
              >
                <span className="sr-only">Next</span>
                <ArrowRight size={16} className="text-black md:hidden" />
                <ArrowRight size={24} className="text-black hidden md:block" />
              </button>
              
              {/* Scrollable printers */}
              <div 
                ref={marketsRef}
                className={`flex overflow-x-auto py-4 md:py-8 px-2 md:px-4 ${styles.hideScrollbar}`}
              >
                <div className="flex gap-3 md:gap-4">
                  <div className="min-w-[240px] md:min-w-[300px] flex flex-col">
                    <div className="w-full h-48 md:h-64 bg-white mb-3 md:mb-4 flex items-center justify-center overflow-hidden">
                      <img src="/3dprinters/prusa-i3-mk3s-3d-printer-tashkent.webp" alt="Prusa i3 MK3S+" className="w-full h-full object-contain" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-0 md:mb-1">Prusa i3 MK3S+</h3>
                    <p className="text-gray-400 mb-2 md:mb-3 text-xs md:text-sm">FDM Printer</p>
                    <button className="border border-white py-1 md:py-2 px-3 md:px-4 hover:bg-white hover:text-black transition-colors w-fit text-sm">
                      More Details
                    </button>
                  </div>
                  
                  <div className="min-w-[240px] md:min-w-[300px] flex flex-col">
                    <div className="w-full h-48 md:h-64 bg-white mb-3 md:mb-4 flex items-center justify-center overflow-hidden">
                      <img src="/3dprinters/prusa-i3-mk3s-mmu2s-multicolor-3d-printer-tashkent.webp" alt="Prusa i3 MK3S+ MMU2S" className="w-full h-full object-contain" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-0 md:mb-1">Prusa i3 MK3S+ MMU2S</h3>
                    <p className="text-gray-400 mb-2 md:mb-3 text-xs md:text-sm">Multi-Material FDM</p>
                    <button className="border border-white py-1 md:py-2 px-3 md:px-4 hover:bg-white hover:text-black transition-colors w-fit text-sm">
                      More Details
                    </button>
                  </div>
                  
                  <div className="min-w-[240px] md:min-w-[300px] flex flex-col">
                    <div className="w-full h-48 md:h-64 bg-white mb-3 md:mb-4 flex items-center justify-center overflow-hidden">
                      <img src="/3dprinters/formlabs-form3-sla-3d-printer-tashkent.webp" alt="Formlabs Form 3" className="w-full h-full object-contain" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-0 md:mb-1">Formlabs Form 3</h3>
                    <p className="text-gray-400 mb-2 md:mb-3 text-xs md:text-sm">SLA Resin Printer</p>
                    <button className="border border-white py-1 md:py-2 px-3 md:px-4 hover:bg-white hover:text-black transition-colors w-fit text-sm">
                      More Details
                    </button>
                  </div>
                  
                  <div className="min-w-[240px] md:min-w-[300px] flex flex-col">
                    <div className="w-full h-48 md:h-64 bg-white mb-3 md:mb-4 flex items-center justify-center overflow-hidden">
                      <img src="/3dprinters/phrozen-sonic-mega-8k-resin-3d-printer-uzbekistan.webp" alt="Phrozen Sonic Mega 8K" className="w-full h-full object-contain" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-0 md:mb-1">Phrozen Sonic Mega 8K</h3>
                    <p className="text-gray-400 mb-2 md:mb-3 text-xs md:text-sm">MSLA Resin Printer</p>
                    <button className="border border-white py-1 md:py-2 px-3 md:px-4 hover:bg-white hover:text-black transition-colors w-fit text-sm">
                      More Details
                    </button>
                  </div>
                  
                  <div className="min-w-[240px] md:min-w-[300px] flex flex-col">
                    <div className="w-full h-48 md:h-64 bg-white mb-3 md:mb-4 flex items-center justify-center overflow-hidden">
                      <img src="/3dprinters/skrinter-3d-printer-uzbekistan.webp" alt="Skrinter" className="w-full h-full object-contain" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-0 md:mb-1">Skrinter</h3>
                    <p className="text-gray-400 mb-2 md:mb-3 text-xs md:text-sm">Desktop FDM</p>
                    <button className="border border-white py-1 md:py-2 px-3 md:px-4 hover:bg-white hover:text-black transition-colors w-fit text-sm">
                      More Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest News Section */}
        <section className="py-10 md:py-16 bg-black text-white">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-10 ml-0 md:ml-4">Latest News</h2>
            
            {/* Main featured news */}
            <div className="rounded-lg overflow-hidden mb-6 md:mb-10">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative aspect-video lg:aspect-auto">
                  <img 
                    src="/3dprinters/formlabs-form3-sla-3d-printer-tashkent.webp" 
                    alt="Form Cure 2nd Generation" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-black p-4 md:p-8 flex flex-col justify-center">
                  <div className="text-xs font-semibold text-[#f05a28] uppercase tracking-wide mb-1 md:mb-2">
                    BLAZING FAST POST-CURING
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-4 text-white">
                    Form Cure (2nd Generation): Post-Cure Parts 2×-8.6× Faster
                  </h3>
                  <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6">
                    Introducing Form Cure (2nd Generation), offering blazing fast curing and nearly instant heat up time. Save 2×-8.6× in cure time over Form Cure (1st Generation) in a bigger cure that can fit any part printed on Form 4.
                  </p>
                  <button className="bg-white text-black py-2 px-4 md:px-6 rounded text-xs md:text-sm font-semibold hover:bg-gray-200 transition-colors w-fit uppercase">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {/* Secondary news items */}
              <div className="bg-black rounded-lg overflow-hidden border border-gray-800">
                <div className="aspect-[3/2] overflow-hidden">
                  <img 
                    src="/3dprinters/spare-s4-file.webp" 
                    alt="Tough 1500 Resin" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 md:p-4">
                  <div className="text-xs font-semibold text-[#f05a28] uppercase tracking-wide mb-1">
                    NOW EVEN TOUGHER
                  </div>
                  <h3 className="text-base md:text-lg font-bold mb-0 md:mb-2 text-white line-clamp-2">
                    Tough 1500 Resin V2 Rivals Polypropylene
                  </h3>
                </div>
              </div>
              
              <div className="bg-black rounded-lg overflow-hidden border border-gray-800">
                <div className="aspect-[3/2] overflow-hidden">
                  <img 
                    src="/3dprinters/spare-s3-file.webp" 
                    alt="Form 4 Delivers" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 md:p-4">
                  <div className="text-xs font-semibold text-[#f05a28] uppercase tracking-wide mb-1">
                    FLAWLESS PRINTS, EVERY TIME
                  </div>
                  <h3 className="text-base md:text-lg font-bold mb-0 md:mb-2 text-white line-clamp-2">
                    Form 4 Delivers 99% Print Success Rate
                  </h3>
                </div>
              </div>
              
              <div className="bg-black rounded-lg overflow-hidden border border-gray-800 sm:col-span-2 md:col-span-1">
                <div className="aspect-[3/2] overflow-hidden">
                  <img 
                    src="/3dprinters/raise3d-pro3-industrial-3d-printer-tashkent.webp" 
                    alt="Special Pricing for Educational Institutions" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 md:p-4">
                  <div className="text-xs font-semibold text-[#f05a28] uppercase tracking-wide mb-1">
                    EMPOWERING THE NEXT GENERATION
                  </div>
                  <h3 className="text-base md:text-lg font-bold mb-0 md:mb-2 text-white line-clamp-2">
                    Special Pricing for Educational Institutions
                  </h3>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-6 md:mt-8">
              <a 
                href="#" 
                className="bg-[#f05a28] text-white py-2 px-4 md:px-6 rounded flex items-center gap-1 md:gap-2 hover:bg-[#e04a18] transition-colors uppercase text-xs md:text-sm font-semibold"
              >
                Read All News
                <span className="text-lg md:text-xl">›</span>
              </a>
            </div>
          </div>
        </section>

        {/* Placeholder for additional content */}
        <section className="py-10 md:py-16 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
              Our 3D Printing Capabilities
            </h2>
            {/* Content will be added later */}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ThreeDPrintingPage; 