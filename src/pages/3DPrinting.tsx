import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "@/styles/Slider.module.css";
import { useTranslation } from "react-i18next";
import PrintingMaterials from "@/components/PrintingMaterials";
import SEOHelmet from "@/components/SEOHelmet";

const ThreeDPrintingPage = () => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const marketsRef = useRef<HTMLDivElement>(null);
  const [currentPrinterIndex, setCurrentPrinterIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Define JSON-LD schema for 3D Printing page
  const printingSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "3D Printing Services",
    "provider": {
      "@type": "Organization",
      "name": "FabLab CFYI",
      "url": "https://fablab-cfyi.uz"
    },
    "serviceType": "3D Printing",
    "description": "Professional 3D printing services including FDM and SLA technologies with a wide range of materials and applications.",
    "offers": {
      "@type": "Offer",
      "description": "Professional 3D printing services"
    }
  };

  const materialTypeKeys = [
    'generalPurpose',
    'tough',
    'rigid',
    'flameRetardant',
    'silicone',
    'elastic',
    'biocompatible',
    'polyurethane',
    'ceramic',
    'openMaterialMode',
  ];

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update document title
    document.title = "3D Printing Services | Fablab Uzbekistan";
    
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
      <SEOHelmet
        title="3D Printing Services"
        description="Professional 3D printing services in Uzbekistan. From FDM to SLA, we offer high-quality 3D printing with various materials for prototyping, manufacturing and engineering solutions."
        keywords="3D печать Ташкент, 3D bosib chiqarish Toshkent, 3D принтинг услуги, 3D print xizmatlari, печать пластиком Узбекистан, plastik bosib chiqarish, изготовление прототипов, prototip tayyorlash, 3D моделирование, 3D modellashtirish, FDM печать, SLA печать, промышленная 3D печать"
        image="/3dprinters/hero.webp"
        schema={printingSchema}
        canonicalPath="/3d-printing"
      />
      <Header />
      
      <main className="flex-grow">
        {/* Hero section with video */}
        <section className="relative w-full h-screen bg-white">
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-20">
              <div className="w-8 h-8 md:w-12 md:h-12 border-4 border-[#329db7]/20 border-t-[#329db7] rounded-full animate-spin"></div>
            </div>
          )}
          <img 
            src="/3dprinters/hero.webp" 
            alt="3D Printing Hero" 
            className="w-full h-full object-cover"
            onLoad={() => setIsImageLoading(false)}
          />
          {/* Scroll Down Icon */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </div>
        </section>

        {/* Minimalist Content Section */}
        <section className="py-16 md:py-24 bg-[#f7f7f7]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-start gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2">
                <div className="max-w-xl mx-auto text-left lg:text-left flex flex-col items-start lg:items-start">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-black font-['Magistral']">
                    {t("3dPrinting.manufacturing.title")}
                  </h2>
                  
                  <p className="text-gray-700 text-base sm:text-lg mb-3 sm:mb-4 font-['Magistral']">
                    {t("3dPrinting.manufacturing.description")}
                  </p>

                  <a 
                    href="#fdm"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById('fdm');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="inline-flex items-center px-6 py-3 bg-[#329db7] text-white rounded-lg hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    {t("3dPrinting.manufacturing.cta")}
                  </a>
                </div>
              </div>

              {/* Right side with two image containers */}
              <div className="w-full lg:w-1/2 relative pt-16">
                {/* First image container - larger and in front */}
                <div className="relative z-30 w-[55%] ml-auto transform translate-y-2 transition-transform hover:-translate-y-1">
                  <div className="aspect-[5/6] relative overflow-hidden shadow-2xl rounded-xl bg-white hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transition-all duration-300">
                    <img 
                      src="/3dprinters/slaprinters.webp" 
                      alt="Professional 3D Printing Equipment" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Second image container - smaller and behind */}
                <div className="absolute top-4 left-0 w-[50%] z-10 transition-transform hover:-translate-y-1">
                  <div className="aspect-[7/8] relative overflow-hidden shadow-xl rounded-xl bg-white hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transition-all duration-300">
                    <img 
                      src="/3dprinters/hero22.webp" 
                      alt="FDM 3D Printing Solutions" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Section: Transform Your Vision */}
        <section id="fdm" className="py-16 md:py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-start gap-12">
              {/* Left side with main image and floating elements */}
              <div className="w-full lg:w-1/2 relative">
                {/* Main image container */}
                <div className="relative rounded-xl overflow-hidden shadow-xl bg-white">
                  <img 
                    src="/3dprinters/FDM.webp" 
                    alt="Complex 3D Printing" 
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>

                {/* Floating stats cards */}
                <div className="hidden sm:block absolute bottom-4 left-4 sm:bottom-8 sm:left-8 lg:-bottom-8 lg:-left-8 bg-white rounded-2xl shadow-xl p-4 max-w-[240px]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#329db7]/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">{t("3dPrinting.fdm.highlights.colors")}</p>
                      <p className="text-base font-bold text-gray-900">{t("3dPrinting.fdm.highlights.multiMaterial")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#329db7]/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">{t("3dPrinting.fdm.highlights.buildArea")}</p>
                      <p className="text-base font-bold text-gray-900">{t("3dPrinting.fdm.highlights.extraLarge")}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side content */}
              <div className="w-full lg:w-1/2">
                <div className="max-w-xl mx-auto text-left lg:text-left flex flex-col items-start">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-black font-['Magistral']">
                    {t("3dPrinting.fdm.title")}
                  </h2>
                  
                  <p className="text-gray-700 text-base sm:text-lg mb-3 sm:mb-4 font-['Magistral']">
                    {t("3dPrinting.fdm.description")}
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-gray-700 text-base sm:text-lg font-['Magistral']">{t("3dPrinting.fdm.features.multiMaterial")}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-gray-700 text-base sm:text-lg font-['Magistral']">{t("3dPrinting.fdm.features.engineeringGrade")}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-gray-700 text-base sm:text-lg font-['Magistral']">{t("3dPrinting.fdm.features.advancedFeatures")}</p>
                    </div>
                  </div>

                  <a 
                    href="#fdm-equipment"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('fdm-equipment')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center px-6 py-3 bg-[#329db7] text-white rounded-lg hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    {t("3dPrinting.fdm.cta")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Instagram Reels Section */}
        <section className="relative bg-[#f7f7f7] text-gray-900 border-t border-gray-100">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Left side content */}
              <div className="w-full md:w-1/2 lg:w-2/5">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                  {t("digitalFabrication.behindTheScenes.title")}
                </h2>
                <p className="text-base sm:text-lg text-gray-600 mb-6">
                  {t("digitalFabrication.behindTheScenes.description")}
                </p>
                <div className="flex flex-col gap-4">
                  <a 
                    href="https://www.instagram.com/reel/DGPupgNsXk_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#329db7] text-white rounded-lg hover:bg-[#2b86a0] transition-colors w-fit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    {t("digitalFabrication.behindTheScenes.instagramCta")}
                  </a>
                  <a 
                    href="https://t.me/CenterForYouthInitiatives"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0088cc] text-white rounded-lg hover:bg-[#0077b3] transition-colors w-fit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                    {t("digitalFabrication.behindTheScenes.telegramCta")}
                  </a>
                </div>
              </div>

              {/* Right side reels */}
              <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col md:flex-row gap-4 justify-center md:justify-end">
                <div className="w-full max-w-[400px] aspect-[9/16] rounded-xl overflow-hidden shadow-xl">
                  <iframe
                    className="w-full h-full"
                    src="https://www.instagram.com/reel/DGPupgNsXk_/embed"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="w-full max-w-[400px] aspect-[9/16] rounded-xl overflow-hidden shadow-xl">
                  <iframe
                    className="w-full h-full"
                    src="https://www.instagram.com/reel/DJD-FBzMS-N/embed"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SLA Detail Showcase Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-start gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2">
                <div className="max-w-xl mx-auto text-left lg:text-left flex flex-col items-start">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-black font-['Magistral']">
                    {t("3dPrinting.sla.title")}
                  </h2>
                  
                  <p className="text-gray-700 text-base sm:text-lg mb-3 sm:mb-4 font-['Magistral']">
                    {t("3dPrinting.sla.description")}
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-gray-700 text-base sm:text-lg font-['Magistral']">{t("3dPrinting.sla.features.layerHeight")}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-gray-700 text-base sm:text-lg font-['Magistral']">{t("3dPrinting.sla.features.surfaceFinish")}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-gray-700 text-base sm:text-lg font-['Magistral']">{t("3dPrinting.sla.features.applications")}</p>
                    </div>
                  </div>

                  <a 
                    href="#sla-equipment"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('sla-equipment')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center px-6 py-3 bg-[#329db7] text-white rounded-lg hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    {t("3dPrinting.sla.cta")}
                  </a>
                </div>
              </div>

              {/* Right side with main image and circular detail */}
              <div className="w-full lg:w-1/2 relative flex justify-end">
                {/* Main image container */}
                <div className="relative rounded-xl overflow-hidden shadow-xl bg-white w-[800px] max-w-full ml-auto">
                  <img 
                    src="/3dprinters/slahigh.webp" 
                    alt="Full SLA Print" 
                    className="w-full h-[500px] object-cover"
                    width={800}
                    height={600}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>

                {/* Circular detail overlay */}
                <div className="absolute z-10 w-[180px] h-[180px] md:w-[220px] md:h-[220px] right-8 bottom-8 md:-right-16 md:-bottom-12 group">
                  {/* Simple white circle container */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-[0_8px_32px_rgba(0,0,0,0.2)] group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)] transition-all duration-300">
                    <img 
                      src="/3dprinters/slazoom.webp" 
                      alt="SLA Print Detail Zoom" 
                      className="w-full h-full object-cover transform scale-125 group-hover:scale-150 transition-transform duration-300"
                    />
                    {/* Subtle circular gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-full"></div>
                  </div>
                </div>

                {/* Connecting line */}
                <div className="absolute z-0 w-20 h-20 -right-8 -bottom-8 border-r-4 border-b-4 border-[#329db7]/20 rounded-br-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* SLA 3D Printing Equipment Section */}
        <section id="sla-equipment" className="py-16 md:py-24 bg-[#f7f7f7]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-black font-['Magistral'] text-center">
              {t("3dPrinting.equipment.sla.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Formlabs Form 3+ */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-32 md:h-36 bg-gray-100 relative">
                  <img src="/3dprinters/1.formlabs-form3-01_2_1.webp" alt={t("3dPrinting.equipment.sla.form3.title")} className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
                </div>
                <div className="-mt-16 z-10 flex justify-center w-full">
                  <img src="/3dprinters/formlabs-form3-01_2_1.webp" alt={t("3dPrinting.equipment.sla.form3.title")} className="w-40 h-48 object-contain" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-6 pb-8 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center mt-2 font-['Magistral']">{t("3dPrinting.equipment.sla.form3.subtitle")}</div>
                  <h3 className="text-2xl font-bold mb-3 text-center font-['Magistral']">{t("3dPrinting.equipment.sla.form3.title")}</h3>
                  <p className="text-gray-700 mb-4 text-center text-base font-['Magistral']">{t("3dPrinting.equipment.sla.form3.description")}</p>
                  <hr className="w-12 border-t border-gray-200 my-3" />
                </div>
              </div>

              {/* Phrozen Sonic Mini 8K */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-32 md:h-36 bg-gray-100 relative">
                  <img src="/3dprinters/1.Phrozen mini.webp" alt={t("3dPrinting.equipment.sla.phrozenMini.title")} className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
                </div>
                <div className="-mt-16 z-10 flex justify-center w-full">
                  <img src="/3dprinters/Phrozen mini.webp" alt={t("3dPrinting.equipment.sla.phrozenMini.title")} className="w-40 h-48 object-contain" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-6 pb-8 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center mt-2 font-['Magistral']">{t("3dPrinting.equipment.sla.phrozenMini.subtitle")}</div>
                  <h3 className="text-2xl font-bold mb-3 text-center font-['Magistral']">{t("3dPrinting.equipment.sla.phrozenMini.title")}</h3>
                  <p className="text-gray-700 mb-4 text-center text-base font-['Magistral']">{t("3dPrinting.equipment.sla.phrozenMini.description")}</p>
                  <hr className="w-12 border-t border-gray-200 my-3" />
                </div>
              </div>

              {/* Phrozen Sonic MEGA */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-32 md:h-36 bg-gray-100 relative">
                  <img src="/3dprinters/1.Phrozen.webp" alt={t("3dPrinting.equipment.sla.phrozenMega.title")} className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
                </div>
                <div className="-mt-16 z-10 flex justify-center w-full">
                  <img src="/3dprinters/Phrozen.webp" alt={t("3dPrinting.equipment.sla.phrozenMega.title")} className="w-40 h-48 object-contain" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-6 pb-8 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center mt-2 font-['Magistral']">{t("3dPrinting.equipment.sla.phrozenMega.subtitle")}</div>
                  <h3 className="text-2xl font-bold mb-3 text-center font-['Magistral']">{t("3dPrinting.equipment.sla.phrozenMega.title")}</h3>
                  <p className="text-gray-700 mb-4 text-center text-base font-['Magistral']">{t("3dPrinting.equipment.sla.phrozenMega.description")}</p>
                  <hr className="w-12 border-t border-gray-200 my-3" />
                </div>
              </div>

              {/* Prusa SL1S */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-32 md:h-36 bg-gray-100 relative">
                  <img src="/3dprinters/1.prusa.webp" alt={t("3dPrinting.equipment.sla.prusa.title")} className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
                </div>
                <div className="-mt-16 z-10 flex justify-center w-full">
                  <img src="/3dprinters/Prusa.webp" alt={t("3dPrinting.equipment.sla.prusa.title")} className="w-40 h-48 object-contain" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-6 pb-8 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center mt-2 font-['Magistral']">{t("3dPrinting.equipment.sla.prusa.subtitle")}</div>
                  <h3 className="text-2xl font-bold mb-3 text-center font-['Magistral']">{t("3dPrinting.equipment.sla.prusa.title")}</h3>
                  <p className="text-gray-700 mb-4 text-center text-base font-['Magistral']">{t("3dPrinting.equipment.sla.prusa.description")}</p>
                  <hr className="w-12 border-t border-gray-200 my-3" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FDM 3D Printing Equipment Section */}
        <section id="fdm-equipment" className="py-16 md:py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-black font-['Magistral'] text-center">
              {t("3dPrinting.equipment.fdm.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Prusa i3 MK3S+ */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-32 md:h-36 bg-gray-100 relative">
                  <img src="/3dprinters/1.prusa-i3-mk3s-3d-printer-tashkent.webp" alt={t("3dPrinting.equipment.fdm.prusa.title")} className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
                </div>
                <div className="-mt-16 z-10 flex justify-center w-full">
                  <img src="/3dprinters/prusa-i3-mk3s-3d-printer-tashkent.webp" alt={t("3dPrinting.equipment.fdm.prusa.title")} className="w-40 h-48 object-contain" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-6 pb-8 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center mt-2 font-['Magistral']">{t("3dPrinting.equipment.fdm.prusa.subtitle")}</div>
                  <h3 className="text-2xl font-bold mb-3 text-center font-['Magistral']">{t("3dPrinting.equipment.fdm.prusa.title")}</h3>
                  <p className="text-gray-700 mb-4 text-center text-base font-['Magistral']">{t("3dPrinting.equipment.fdm.prusa.description")}</p>
                  <hr className="w-12 border-t border-gray-200 my-3" />
                </div>
              </div>

              {/* Prusa i3 MK3S+ MMU2S */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-32 md:h-36 bg-gray-100 relative">
                  <img src="/3dprinters/1.prusa-i3-mk3s-mmu2s-multicolor-3d-printer-tashkent.webp" alt={t("3dPrinting.equipment.fdm.prusaMMU.title")} className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
                </div>
                <div className="-mt-16 z-10 flex justify-center w-full">
                  <img src="/3dprinters/prusa-i3-mk3s-mmu2s-multicolor-3d-printer-tashkent.webp" alt={t("3dPrinting.equipment.fdm.prusaMMU.title")} className="w-40 h-48 object-contain" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-6 pb-8 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center mt-2 font-['Magistral']">{t("3dPrinting.equipment.fdm.prusaMMU.subtitle")}</div>
                  <h3 className="text-2xl font-bold mb-3 text-center font-['Magistral']">{t("3dPrinting.equipment.fdm.prusaMMU.title")}</h3>
                  <p className="text-gray-700 mb-4 text-center text-base font-['Magistral']">{t("3dPrinting.equipment.fdm.prusaMMU.description")}</p>
                  <hr className="w-12 border-t border-gray-200 my-3" />
                </div>
              </div>

              {/* Skrinter */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-32 md:h-36 bg-gray-100 relative">
                  <img src="/3dprinters/1.skrinter-3d-printer-uzbekistan.webp" alt={t("3dPrinting.equipment.fdm.skrinter.title")} className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
                </div>
                <div className="-mt-16 z-10 flex justify-center w-full">
                  <img src="/3dprinters/skrinter-3d-printer-uzbekistan.webp" alt={t("3dPrinting.equipment.fdm.skrinter.title")} className="w-40 h-48 object-contain" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-6 pb-8 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center mt-2 font-['Magistral']">{t("3dPrinting.equipment.fdm.skrinter.subtitle")}</div>
                  <h3 className="text-2xl font-bold mb-3 text-center font-['Magistral']">{t("3dPrinting.equipment.fdm.skrinter.title")}</h3>
                  <p className="text-gray-700 mb-4 text-center text-base font-['Magistral']">{t("3dPrinting.equipment.fdm.skrinter.description")}</p>
                  <hr className="w-12 border-t border-gray-200 my-3" />
                </div>
              </div>

              {/* Raise3D Pro3 */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-32 md:h-36 bg-gray-100 relative">
                  <img src="/3dprinters/1.raise3d-pro3-industrial-3d-printer-tashkent.webp" alt={t("3dPrinting.equipment.fdm.raise3d.title")} className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
                </div>
                <div className="-mt-16 z-10 flex justify-center w-full">
                  <img src="/3dprinters/raise3d-pro3-industrial-3d-printer-tashkent.webp" alt={t("3dPrinting.equipment.fdm.raise3d.title")} className="w-40 h-48 object-contain" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-6 pb-8 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center mt-2 font-['Magistral']">{t("3dPrinting.equipment.fdm.raise3d.subtitle")}</div>
                  <h3 className="text-2xl font-bold mb-3 text-center font-['Magistral']">{t("3dPrinting.equipment.fdm.raise3d.title")}</h3>
                  <p className="text-gray-700 mb-4 text-center text-base font-['Magistral']">{t("3dPrinting.equipment.fdm.raise3d.description")}</p>
                  <hr className="w-12 border-t border-gray-200 my-3" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Materials Section */}
        <PrintingMaterials />
        
        {/* 3D Printing Course Section */}
        <section className="py-16 md:py-24 bg-[#f7f7f7]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2 space-y-8">
                <div className="inline-block">
                  <span className="bg-[#329db7]/10 text-[#329db7] text-sm font-semibold px-4 py-2 rounded-full font-['Magistral']">
                    {t("3dPrinting.course.badge")}
                  </span>
                </div>
                
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight font-['Magistral']">
                  {t("3dPrinting.course.title")}
                </h2>
                
                <p className="text-gray-700 text-base sm:text-lg mb-3 sm:mb-4 font-['Magistral']">
                  {t("3dPrinting.course.description")}
                </p>

                {/* Course Features */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#329db7]/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 font-['Magistral']">{t("3dPrinting.course.features.handsOn.title")}</h3>
                      <p className="text-gray-600 font-['Magistral']">{t("3dPrinting.course.features.handsOn.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#329db7]/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 font-['Magistral']">{t("3dPrinting.course.features.expert.title")}</h3>
                      <p className="text-gray-600 font-['Magistral']">{t("3dPrinting.course.features.expert.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#329db7]/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 font-['Magistral']">{t("3dPrinting.course.features.certification.title")}</h3>
                      <p className="text-gray-600 font-['Magistral']">{t("3dPrinting.course.features.certification.description")}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <a 
                    href="https://t.me/+998770884977"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-[#329db7] text-white rounded-xl font-semibold hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 font-['Magistral']"
                  >
                    {t("3dPrinting.course.buttons.enroll")}
                  </a>
                </div>
              </div>

              {/* Right side image grid */}
              <div className="w-full lg:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                      <img 
                        src="/3dprinters/course1.webp" 
                        alt="3D Printing Basics" 
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                      <img 
                        src="/3dprinters/course2.webp" 
                        alt="Advanced Techniques" 
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                      <img 
                        src="/3dprinters/course3.webp" 
                        alt="Project Work" 
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                      <img 
                        src="/3dprinters/course4.webp" 
                        alt="Professional Equipment" 
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Footer bgClass="bg-black" textClass="text-white" />
      </main>
    </div>
  );
};

export default ThreeDPrintingPage; 