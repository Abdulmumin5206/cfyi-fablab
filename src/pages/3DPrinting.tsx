import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "@/styles/Slider.module.css";
import SlaMaterials from "@/components/SlaMaterials";
import FdmFilaments from "@/components/FdmFilaments";
import { useTranslation } from "react-i18next";

const ThreeDPrintingPage = () => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const marketsRef = useRef<HTMLDivElement>(null);
  const [currentPrinterIndex, setCurrentPrinterIndex] = useState(0);

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
    document.title = t("3dPrinting.hero.title") + " | FabLab";
    
    console.log("3D Printing page mounted");
  }, [t]);

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
        {/* New Full-size Hero Section */}
        <section className="relative w-full h-screen">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img 
            src="/3dprinters/hero.webp" 
            alt="3D Printing Hero" 
            className="w-full h-full object-cover"
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

        {/* --- SLA 3D Printing Services Section (Distinct, after Hero) --- */}
        <section id="sla-printing-services" className="bg-white py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center">
              {/* Left side image */}
              <div className="w-full lg:w-2/3 mb-12 lg:mb-0 pr-0 lg:pr-8">
                <div className="relative w-full">
                  <img 
                    src="/fablab/optimized_for_web_jpeg-03072024_dsl_core_set_311.webp" 
                    alt="3D Printing Equipment Core Set" 
                    className="w-full aspect-auto object-cover h-auto max-h-[800px]"
                  />
                </div>
              </div>
              {/* Right side content */}
              <div className="w-full lg:w-1/2 pl-0 lg:pl-10">
                <div className="text-[#329db7] font-medium mb-2">{t("3dPrinting.hero.subtitle")}</div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">{t("3dPrinting.hero.title")}</h1>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700">{t("3dPrinting.hero.features.precision")}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700">{t("3dPrinting.hero.features.materials")}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700">{t("3dPrinting.hero.features.applications")}</p>
                  </div>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a href="#" className="inline-block bg-[#329db7] text-white font-medium px-6 py-3 rounded-md hover:bg-[#2b86a0] transition-colors text-center">
                    {t("3dPrinting.hero.buttons.quote")}
                  </a>
                  <a href="#" className="inline-block bg-white text-[#329db7] font-medium px-6 py-3 rounded-md border border-[#329db7] hover:bg-[#f0f7fa] transition-colors text-center">
                    {t("3dPrinting.hero.buttons.samples")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Hero section with video on right side - Moved here */}
        <section className="relative bg-white text-gray-900">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col lg:flex-row items-center">
            {/* Left side content */}
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0 pr-0 lg:pr-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {t('3dPrinting.materials.tackleAnyProblem')}
              </h1>
              <div className="flex flex-wrap gap-2 mb-8">
                {materialTypeKeys.map((key) => (
                  <button key={key} className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm">
                    <span>{t(`3dPrinting.materials.types.${key}`)}</span>
                  </button>
                ))}
              </div>
              <button className="bg-[#329db7] hover:bg-[#2b86a0] text-white px-6 py-3 rounded-md font-medium">
                {t('3dPrinting.materials.requestSample')}
              </button>
            </div>
            
            {/* Right side video */}
            <div className="w-full lg:w-3/4 lg:pl-8">
              <div className="relative w-full">
                <img 
                  src="/3dprinters/Hero2.webp" 
                  alt="Industry-leading materials" 
                  className="w-full object-contain h-auto max-h-[800px]"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* SLA 3D Printing Equipment Section - Modern Card Layout */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-16 text-center">{t("3dPrinting.equipment.title")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Form 4 Card */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-32 md:h-36 bg-gray-100 relative">
                  <img src="/3dprinters/1.formlabs-form3-01_2_1.webp" alt="Form 4 background" className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
                </div>
                <div className="-mt-16 z-10 flex justify-center w-full">
                  <img src="/3dprinters/formlabs-form3-01_2_1.webp" alt="Form 4" className="w-48 h-56 object-contain" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-6 pb-8 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center mt-2">MAXIMUM VERSATILITY</div>
                  <h3 className="text-2xl font-bold mb-3 text-center">{t("3dPrinting.equipment.sla.items.form3.title")}</h3>
                  <p className="text-gray-700 mb-4 text-center text-base">{t("3dPrinting.equipment.sla.items.form3.description")}</p>
                  <hr className="w-12 border-t border-gray-200 my-3" />
                </div>
              </div>
              {/* Form 4L Card */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-32 md:h-36 bg-gray-100 relative">
                  <img src="/3dprinters/1.Phrozen.webp" alt="Form 4L background" className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
                </div>
                <div className="-mt-16 z-10 flex justify-center w-full">
                  <img src="/3dprinters/Phrozen.webp" alt="Form 4L" className="w-48 h-56 object-contain" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-6 pb-8 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center mt-2">THINK BIG</div>
                  <h3 className="text-2xl font-bold mb-3 text-center">{t("3dPrinting.equipment.sla.items.phrozenMega.title")}</h3>
                  <p className="text-gray-700 mb-4 text-center text-base">{t("3dPrinting.equipment.sla.items.phrozenMega.description")}</p>
                  <hr className="w-12 border-t border-gray-200 my-3" />
                </div>
              </div>
              {/* Fuse 1+ 30W Card */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-32 md:h-36 bg-gray-100 relative">
                  <img src="/3dprinters/1.Phrozen mini.webp" alt="Fuse 1+ 30W background" className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
                </div>
                <div className="-mt-16 z-10 flex justify-center w-full">
                  <img src="/3dprinters/Phrozen mini.webp" alt="Fuse 1+ 30W" className="w-48 h-56 object-contain" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-6 pb-8 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center mt-2">HIGHEST PERFORMANCE</div>
                  <h3 className="text-2xl font-bold mb-3 text-center">{t("3dPrinting.equipment.sla.items.phrozenMini.title")}</h3>
                  <p className="text-gray-700 mb-4 text-center text-base">{t("3dPrinting.equipment.sla.items.phrozenMini.description")}</p>
                  <hr className="w-12 border-t border-gray-200 my-3" />
                </div>
              </div>
              {/* Prusa i3 MK3S+ Card */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-32 md:h-36 bg-gray-100 relative">
                  <img src="/3dprinters/1.prusa.webp" alt="Prusa i3 MK3S+ background" className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
                </div>
                <div className="-mt-16 z-10 flex justify-center w-full">
                  <img src="/3dprinters/Prusa.webp" alt="Prusa i3 MK3S+" className="w-48 h-56 object-contain" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-6 pb-8 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center mt-2">RELIABLE PERFORMANCE</div>
                  <h3 className="text-2xl font-bold mb-3 text-center">{t("3dPrinting.equipment.sla.items.prusa.title")}</h3>
                  <p className="text-gray-700 mb-4 text-center text-base">{t("3dPrinting.equipment.sla.items.prusa.description")}</p>
                  <hr className="w-12 border-t border-gray-200 my-3" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SLA Materials Section */}
        <SlaMaterials />

        {/* Innovating Markets Section - Our 3D Printing Equipment */}
        <section className="py-10 md:py-16 bg-gray-900 text-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center">
              {/* Left side content */}
              <div className="w-full lg:w-1/2 mb-12 lg:mb-0 pr-0 lg:pr-10">
                <div className="text-[#329db7] font-medium mb-2">{t("3dPrinting.fdm.title")}</div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">{t("3dPrinting.fdm.subtitle")}</h1>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-300">{t("3dPrinting.fdm.features.durable")}</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-300">{t("3dPrinting.fdm.features.materials")}</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-300">{t("3dPrinting.fdm.features.perfect")}</p>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a href="#" className="inline-block bg-[#329db7] text-white font-medium px-6 py-3 rounded-md hover:bg-[#2b86a0] transition-colors text-center">
                    {t("3dPrinting.fdm.cta.quote")}
                  </a>
                  <a href="#" className="inline-block bg-white text-[#329db7] font-medium px-6 py-3 rounded-md border border-[#329db7] hover:bg-[#f0f7fa] transition-colors text-center">
                    {t("3dPrinting.fdm.cta.sample")}
                  </a>
                </div>
              </div>
              
              {/* Right side image */}
              <div className="w-full lg:w-3/4 lg:pl-8">
                <div className="relative w-full">
                  <img 
                    src="/3dprinters/FDM.webp" 
                    alt="FDM 3D Printing Equipment Core Set" 
                    className="w-full aspect-[4/3] object-cover h-auto max-h-[650px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FDM 3D Printing Equipment Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-16 text-center">{t("3dPrinting.fdm.equipment.title")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Prusa i3 MK3S+ */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-32 md:h-36 bg-gray-100 relative">
                  <img src="/3dprinters/1.prusa-i3-mk3s-3d-printer-tashkent.webp" alt={t("3dPrinting.fdm.equipment.prusa.title")} className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
                </div>
                <div className="-mt-16 z-10 flex justify-center w-full">
                  <img src="/3dprinters/prusa-i3-mk3s-3d-printer-tashkent.webp" alt={t("3dPrinting.fdm.equipment.prusa.title")} className="w-48 h-56 object-contain" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-6 pb-8 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center mt-2">{t("3dPrinting.fdm.equipment.prusa.subtitle")}</div>
                  <h3 className="text-2xl font-bold mb-3 text-center">{t("3dPrinting.fdm.equipment.prusa.title")}</h3>
                  <p className="text-gray-700 mb-4 text-center text-base">{t("3dPrinting.fdm.equipment.prusa.description")}</p>
                  <hr className="w-12 border-t border-gray-200 my-3" />
                </div>
              </div>
              {/* Prusa i3 MK3S+ MMU2S */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-32 md:h-36 bg-gray-100 relative">
                  <img src="/3dprinters/1.prusa-i3-mk3s-mmu2s-multicolor-3d-printer-tashkent.webp" alt={t("3dPrinting.fdm.equipment.prusaMMU.title")} className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
                </div>
                <div className="-mt-16 z-10 flex justify-center w-full">
                  <img src="/3dprinters/prusa-i3-mk3s-mmu2s-multicolor-3d-printer-tashkent.webp" alt={t("3dPrinting.fdm.equipment.prusaMMU.title")} className="w-48 h-56 object-contain" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-6 pb-8 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center mt-2">{t("3dPrinting.fdm.equipment.prusaMMU.subtitle")}</div>
                  <h3 className="text-2xl font-bold mb-3 text-center">{t("3dPrinting.fdm.equipment.prusaMMU.title")}</h3>
                  <p className="text-gray-700 mb-4 text-center text-base">{t("3dPrinting.fdm.equipment.prusaMMU.description")}</p>
                  <hr className="w-12 border-t border-gray-200 my-3" />
                </div>
              </div>
              {/* Skrinter */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-32 md:h-36 bg-gray-100 relative">
                  <img src="/3dprinters/1.skrinter-3d-printer-uzbekistan.webp" alt={t("3dPrinting.fdm.equipment.skrinter.title")} className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
                </div>
                <div className="-mt-16 z-10 flex justify-center w-full">
                  <img src="/3dprinters/skrinter-3d-printer-uzbekistan.webp" alt={t("3dPrinting.fdm.equipment.skrinter.title")} className="w-48 h-56 object-contain" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-6 pb-8 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center mt-2">{t("3dPrinting.fdm.equipment.skrinter.subtitle")}</div>
                  <h3 className="text-2xl font-bold mb-3 text-center">{t("3dPrinting.fdm.equipment.skrinter.title")}</h3>
                  <p className="text-gray-700 mb-4 text-center text-base">{t("3dPrinting.fdm.equipment.skrinter.description")}</p>
                  <hr className="w-12 border-t border-gray-200 my-3" />
                </div>
              </div>
              {/* Raise3D Pro3 */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-32 md:h-36 bg-gray-100 relative">
                  <img src="/3dprinters/1.raise3d-pro3-industrial-3d-printer-tashkent.webp" alt={t("3dPrinting.fdm.equipment.raise3d.title")} className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
                </div>
                <div className="-mt-16 z-10 flex justify-center w-full">
                  <img src="/3dprinters/raise3d-pro3-industrial-3d-printer-tashkent.webp" alt={t("3dPrinting.fdm.equipment.raise3d.title")} className="w-48 h-56 object-contain" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-6 pb-8 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center mt-2">{t("3dPrinting.fdm.equipment.raise3d.subtitle")}</div>
                  <h3 className="text-2xl font-bold mb-3 text-center">{t("3dPrinting.fdm.equipment.raise3d.title")}</h3>
                  <p className="text-gray-700 mb-4 text-center text-base">{t("3dPrinting.fdm.equipment.raise3d.description")}</p>
                  <hr className="w-12 border-t border-gray-200 my-3" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FDM Materials Section */}
        <FdmFilaments />

        {/* Instagram Reels Section */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Left side content */}
              <div className="w-full md:w-1/2 lg:w-2/5">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                  Behind the Scenes
                </h2>
                <p className="text-gray-600 mb-6">
                  Follow our journey and discover how we bring your ideas to life through cutting-edge 3D printing technology.
                </p>
                <a 
                  href="https://www.instagram.com/reel/DJD-FBzMS-N/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#329db7] text-white rounded-lg hover:bg-[#2b86a0] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Follow Us on Instagram
                </a>
              </div>

              {/* Right side reel */}
              <div className="w-full md:w-1/2 lg:w-3/5 flex justify-center md:justify-end">
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

      </main>

      <Footer bgClass="bg-black" textClass="text-white" />
    </div>
  );
};

export default ThreeDPrintingPage; 