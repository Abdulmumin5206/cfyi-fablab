import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import { useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEOHelmet from "@/components/SEOHelmet";
import GradientText from "@/components/GradientText";

const DigitalFabricationPage = () => {
  const { t } = useTranslation(['digitalfabrication', 'translation']);
  const location = useLocation();
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Define JSON-LD schema for Digital Fabrication page
  const fabricationSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Digital Fabrication Services in Uzbekistan",
    "provider": {
      "@type": "Organization",
      "name": "FabLab CFYI",
      "url": "https://fablab-cfyi.uz",
      "logo": "https://fablab-cfyi.uz/fablab/logo.webp",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "Uzbekistan",
        "addressLocality": "Tashkent"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+998770884977",
        "contactType": "customer service"
      }
    },
    "serviceType": "Digital Fabrication",
    "description": "Professional digital fabrication services including CNC machining, laser cutting, precision manufacturing, and rapid prototyping for industrial and commercial applications.",
    "areaServed": {
      "@type": "Country",
      "name": "Uzbekistan"
    },
    "offers": {
      "@type": "Offer",
      "description": "CNC machining, laser cutting, digital manufacturing services",
      "priceCurrency": "UZS",
      "availability": "https://schema.org/InStock"
    },
    "image": "https://fablab-cfyi.uz/digital-fabrication/hero.webp",
    "url": "https://fablab-cfyi.uz/digital-fabrication",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Fabrication Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "CNC Machining",
          "description": "Precision CNC machining services for various materials"
        },
        {
          "@type": "Offer",
          "name": "Laser Cutting",
          "description": "High-precision laser cutting services"
        },
        {
          "@type": "Offer",
          "name": "UV Printing",
          "description": "UV printing on various materials and surfaces"
        },
        {
          "@type": "Offer",
          "name": "Precision Manufacturing",
          "description": "High-precision manufacturing services for industrial applications"
        }
      ]
    }
  };

  // Define breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://fablab-cfyi.uz/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Digital Fabrication Services",
        "item": "https://fablab-cfyi.uz/digital-fabrication"
      }
    ]
  };

  // Combine schemas for SEO
  const combinedSchema = [fabricationSchema, breadcrumbSchema];

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Handle hash navigation
    if (location.hash === '#precision-manufacturing') {
      const precisionSection = document.getElementById('precision-manufacturing');
      if (precisionSection) {
        setTimeout(() => {
          precisionSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f7]">
      <SEOHelmet
        title="Digital Fabrication Services"
        description="Professional digital fabrication services in Uzbekistan. CNC machining, laser cutting, precision manufacturing, and rapid prototyping for industrial applications. Advanced manufacturing solutions."
        keywords="изготовление деталей Ташкент, detal tayyorlash Toshkent, фрезерование ЧПУ, CNC ishlov berish, лазерная резка Узбекистан, lazer kesish, производство на заказ, buyurtma bo'yicha ishlab chiqarish, UV печать, стикеры Ташкент, stiker ishlab chiqarish, прецизионное производство"
        image="/digital-fabrication/hero.webp"
        schema={combinedSchema}
        canonicalPath="/digital-fabrication"
      />
      <Header />
      
      <main className="flex-grow bg-[#f5f5f7]">
        {/* Hero section */}
        <section className="relative w-full h-screen">
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
              <div className="w-8 h-8 md:w-12 md:h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          )}
          <img 
            src="/digital-fabrication/hero.webp" 
            alt="Digital Fabrication Hero" 
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

        {/* UV Printing Excellence Section */}
        <section className="section-spacing bg-[#f5f5f7]">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1300px]">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2">
                <div className="max-w-[1200px]l mx-auto text-left lg:text-left flex flex-col items-start lg:items-start">
                  <div className="section-title-wrapper">
                    <GradientText
                      colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                      animationSpeed={4}
                      className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral']"
                    >
                      {t("uvPrinting.title", { ns: 'digitalfabrication' })}
                    </GradientText>
                  </div>
                  
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 font-['Magistral']">
                    {t("uvPrinting.description", { ns: 'digitalfabrication' })}
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{t("uvPrinting.features.instantCuring", { ns: 'digitalfabrication' })}</p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{t("uvPrinting.features.vibrantColors", { ns: 'digitalfabrication' })}</p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{t("uvPrinting.features.anyMaterial", { ns: 'digitalfabrication' })}</p>
                    </div>
                  </div>

                  <a 
                    href="#equipment" 
                    onClick={(e) => {
                      e.preventDefault();
                      const equipmentSection = document.getElementById('equipment');
                      if (equipmentSection) {
                        equipmentSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="inline-flex items-center space-x-2 bg-[#329db7] text-white px-6 py-3 text-base sm:text-lg font-medium hover:bg-[#2b86a0] transition-colors duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span>{t("uvPrinting.cta", { ns: 'digitalfabrication' })}</span>
                    <ArrowRight size={20} />
                  </a>
                </div>
              </div>

              {/* Right side image */}
              <div className="w-full lg:w-1/2 relative">
                <ImageComparisonSlider
                  beforeImage="/digital-fabrication/righside.webp"
                  afterImage="/digital-fabrication/leftside.webp"
                  alt="UV Printing Comparison"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sticker Machine Section */}
        <section className="section-spacing bg-[#f5f5f7]">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1300px]">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2">
                <div className="max-w-[1200px]l mx-auto text-left lg:text-left flex flex-col items-start lg:items-start">
                  <div className="section-title-wrapper">
                    <GradientText
                      colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                      animationSpeed={4}
                      className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral']"
                    >
                      {t('stickerProduction.title', { ns: 'digitalfabrication' })}
                    </GradientText>
                  </div>
                  
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 font-['Magistral']">
                    {t('stickerProduction.description', { ns: 'digitalfabrication' })}
                  </p>

                  <div className="space-y-4 mb-8 w-full">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{t('stickerProduction.features.preciseCutting', { ns: 'digitalfabrication' })}</p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{t('stickerProduction.features.highResolution', { ns: 'digitalfabrication' })}</p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{t('stickerProduction.features.materialOptions', { ns: 'digitalfabrication' })}</p>
                    </div>
                  </div>

                  <a 
                    href="https://t.me/+998770884977"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-[#329db7] text-white px-6 py-3 text-base sm:text-lg font-medium hover:bg-[#2b86a0] transition-colors duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span>{t('stickerProduction.cta', { ns: 'digitalfabrication' })}</span>
                    <ArrowRight size={20} />
                  </a>
                </div>
              </div>

              {/* Right side with image */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative rounded-xl overflow-hidden shadow-xl bg-white">
                  <img 
                    src="/digital-fabrication/sticker-production.webp" 
                    alt="Sticker Production" 
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Equipment Showcase Section */}
        <section id="equipment" className="section-spacing bg-[#f5f5f7]">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1300px]">
            <div className="section-title-wrapper text-center">
              <div className="flex justify-center">
                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={4}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral']"
                >
                  {t('equipment.title', { ns: 'digitalfabrication' })}
                </GradientText>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* UV Printer */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-40 md:h-48 bg-white relative pt-6">
                  <img src="/digital-fabrication/UV.jpg" alt={t('equipment.uvPrinter.alt', { ns: 'digitalfabrication' })} className="absolute inset-0 w-full h-full object-contain object-center" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-4 pb-4 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center font-['Magistral']">{t('equipment.uvPrinter.category', { ns: 'digitalfabrication' })}</div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-center text-gray-900 font-['Magistral']">{t('equipment.uvPrinter.title', { ns: 'digitalfabrication' })}</h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 text-center font-['Magistral']">{t('equipment.uvPrinter.description', { ns: 'digitalfabrication' })}</p>
                </div>
              </div>

              {/* Sticker Machine */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-40 md:h-48 bg-white relative pt-6">
                  <img src="/digital-fabrication/Stickerr.jpg" alt={t('equipment.stickerCutter.alt', { ns: 'digitalfabrication' })} className="absolute inset-0 w-full h-full object-contain object-center" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-4 pb-4 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center font-['Magistral']">{t('equipment.stickerCutter.category', { ns: 'digitalfabrication' })}</div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-center text-gray-900 font-['Magistral']">{t('equipment.stickerCutter.title', { ns: 'digitalfabrication' })}</h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 text-center font-['Magistral']">{t('equipment.stickerCutter.description', { ns: 'digitalfabrication' })}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Precision Laser Cutting Section */}
        <section id="precision-manufacturing" className="section-spacing bg-[#f5f5f7]">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1300px]">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2">
                <div className="max-w-[1200px]l mx-auto text-left lg:text-left flex flex-col items-start lg:items-start">
                  <div className="section-title-wrapper">
                    <GradientText
                      colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                      animationSpeed={4}
                      className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral']"
                    >
                      {t('laserCutting.title', { ns: 'digitalfabrication' })}
                    </GradientText>
                  </div>
                  
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 font-['Magistral']">
                    {t('laserCutting.description', { ns: 'digitalfabrication' })}
                  </p>

                  <div className="space-y-4 mb-8 w-full">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{t('laserCutting.features.highPrecision', { ns: 'digitalfabrication' })}</p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{t('laserCutting.features.cleanEdges', { ns: 'digitalfabrication' })}</p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{t('laserCutting.features.materialCompatibility', { ns: 'digitalfabrication' })}</p>
                    </div>
                  </div>

                  <a 
                    href="#precision-equipment"
                    onClick={(e) => {
                      e.preventDefault();
                      const precisionSection = document.getElementById('precision-equipment');
                      if (precisionSection) {
                        precisionSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="inline-flex items-center space-x-2 bg-[#329db7] text-white px-6 py-3 text-base sm:text-lg font-medium hover:bg-[#2b86a0] transition-colors duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span>{t('laserCutting.cta', { ns: 'digitalfabrication' })}</span>
                    <ArrowRight size={20} />
                  </a>
                </div>
              </div>

              {/* Right side with image - Laser Cutting */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative rounded-xl overflow-hidden shadow-xl bg-white">
                  <img 
                    src="/precision-manufacturing/laser.webp" 
                    alt={t('serviceCategories.digitalFabrication.laserCutting.imageAlt')} 
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CNC Wood Machining Section */}
        <section className="section-spacing bg-[#f5f5f7]">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1300px]">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2">
                <div className="max-w-[1200px]l mx-auto text-left lg:text-left flex flex-col items-start lg:items-start">
                  <div className="section-title-wrapper">
                    <GradientText
                      colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                      animationSpeed={4}
                      className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral']"
                    >
                      {t('cncMachining.title', { ns: 'digitalfabrication' })}
                    </GradientText>
                  </div>
                  
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 font-['Magistral']">
                    {t('cncMachining.description', { ns: 'digitalfabrication' })}
                  </p>

                  <div className="space-y-4 mb-8 w-full">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{t('cncMachining.features.carvingRelief', { ns: 'digitalfabrication' })}</p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{t('cncMachining.features.preciseJoinery', { ns: 'digitalfabrication' })}</p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Magistral']">{t('cncMachining.features.customComponents', { ns: 'digitalfabrication' })}</p>
                    </div>
                  </div>

                  <a 
                    href="#precision-equipment"
                    onClick={(e) => {
                      e.preventDefault();
                      const precisionSection = document.getElementById('precision-equipment');
                      if (precisionSection) {
                        precisionSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="inline-flex items-center space-x-2 bg-[#329db7] text-white px-6 py-3 text-base sm:text-lg font-medium hover:bg-[#2b86a0] transition-colors duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span>{t('cncMachining.cta', { ns: 'digitalfabrication' })}</span>
                    <ArrowRight size={20} />
                  </a>
                </div>
              </div>

              {/* Right side with image - CNC */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative rounded-xl overflow-hidden shadow-xl bg-white">
                  <img 
                    src="/precision-manufacturing/cnc.webp" 
                    alt={t('serviceCategories.digitalFabrication.cncMachining.imageAlt')} 
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Precision Manufacturing Equipment Showcase Section */}
        <section id="precision-equipment" className="section-spacing bg-[#f5f5f7]">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1300px]">
            <div className="section-title-wrapper text-center">
              <div className="flex justify-center">
                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={4}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral']"
                >
                  {t('precisionManufacturingEquipment.title', { ns: 'digitalfabrication' })}
                </GradientText>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Roland DG Shape */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-40 md:h-48 bg-white relative pt-6">
                  <img src="/precision-manufacturing/roland-dgshape-1.jpg" alt={t('precisionManufacturingEquipment.rolandDGShape.alt', { ns: 'digitalfabrication' })} className="absolute inset-0 w-full h-full object-contain object-center" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-4 pb-4 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center font-['Magistral']">{t('precisionManufacturingEquipment.rolandDGShape.category', { ns: 'digitalfabrication' })}</div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-center text-gray-900 font-['Magistral']">{t('precisionManufacturingEquipment.rolandDGShape.title', { ns: 'digitalfabrication' })}</h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 text-center font-['Magistral']">{t('precisionManufacturingEquipment.rolandDGShape.description', { ns: 'digitalfabrication' })}</p>
                </div>
              </div>

              {/* SRM-20 */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-40 md:h-48 bg-white relative pt-6">
                  <img src="/precision-manufacturing/srm-20.jpg" alt={t('precisionManufacturingEquipment.srm20.alt', { ns: 'digitalfabrication' })} className="absolute inset-0 w-full h-full object-contain object-center" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-4 pb-4 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center font-['Magistral']">{t('precisionManufacturingEquipment.srm20.category', { ns: 'digitalfabrication' })}</div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-center text-gray-900 font-['Magistral']">{t('precisionManufacturingEquipment.srm20.title', { ns: 'digitalfabrication' })}</h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 text-center font-['Magistral']">{t('precisionManufacturingEquipment.srm20.description', { ns: 'digitalfabrication' })}</p>
                </div>
              </div>

              {/* Photon IM */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-40 md:h-48 bg-white relative pt-6">
                  <img src="/precision-manufacturing/photonim-1.jpg" alt={t('precisionManufacturingEquipment.photonIM.alt', { ns: 'digitalfabrication' })} className="absolute inset-0 w-full h-full object-contain object-center" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-4 pb-4 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center font-['Magistral']">{t('precisionManufacturingEquipment.photonIM.category', { ns: 'digitalfabrication' })}</div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-center text-gray-900 font-['Magistral']">{t('precisionManufacturingEquipment.photonIM.title', { ns: 'digitalfabrication' })}</h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 text-center font-['Magistral']">{t('precisionManufacturingEquipment.photonIM.description', { ns: 'digitalfabrication' })}</p>
                </div>
              </div>
            </div>

            {/* Last two cards centered */}
            <div className="mt-8 flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ width: '66.666667%' }}>
                {/* Volters */}
                <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                  <div className="w-full h-40 md:h-48 bg-white relative pt-6">
                    <img src="/precision-manufacturing/volters.jpg" alt={t('precisionManufacturingEquipment.volterS.alt', { ns: 'digitalfabrication' })} className="absolute inset-0 w-full h-full object-contain object-center" />
                  </div>
                  <div className="flex flex-col items-center justify-center px-8 pt-4 pb-4 w-full text-center">
                    <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center font-['Magistral']">{t('precisionManufacturingEquipment.volterS.category', { ns: 'digitalfabrication' })}</div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-center text-gray-900 font-['Magistral']">{t('precisionManufacturingEquipment.volterS.title', { ns: 'digitalfabrication' })}</h3>
                    <p className="text-sm sm:text-base md:text-lg text-gray-700 text-center font-['Magistral']">{t('precisionManufacturingEquipment.volterS.description', { ns: 'digitalfabrication' })}</p>
                  </div>
                </div>

                {/* MDX-50 */}
                <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                  <div className="w-full h-40 md:h-48 bg-white relative pt-6">
                    <img src="/precision-manufacturing/mdx-50.jpg" alt={t('precisionManufacturingEquipment.mdx50.alt', { ns: 'digitalfabrication' })} className="absolute inset-0 w-full h-full object-contain object-center" />
                  </div>
                  <div className="flex flex-col items-center justify-center px-8 pt-4 pb-4 w-full text-center">
                    <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center font-['Magistral']">{t('precisionManufacturingEquipment.mdx50.category', { ns: 'digitalfabrication' })}</div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-center text-gray-900 font-['Magistral']">{t('precisionManufacturingEquipment.mdx50.title', { ns: 'digitalfabrication' })}</h3>
                    <p className="text-sm sm:text-base md:text-lg text-gray-700 text-center font-['Magistral']">{t('precisionManufacturingEquipment.mdx50.description', { ns: 'digitalfabrication' })}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Behind the Scenes Section */}
        <section className="section-spacing bg-[#f5f5f7]">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1350px]">
            <div className="flex flex-col items-center justify-center gap-8 max-w-[1300px] mx-auto">
              <div className="section-title-wrapper text-center">
                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={4}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral']"
                >
                  {t('behindTheScenes.title', { ns: 'digitalfabrication' })}
                </GradientText>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 text-center font-['Magistral']">
                {t('behindTheScenes.description', { ns: 'digitalfabrication' })}
              </p>
              <div className="w-full max-w-[350px] aspect-[9/16] rounded-xl overflow-hidden shadow-xl">
                <video 
                  className="w-full h-full object-cover"
                  controls
                  poster="/digital-fabrication/UV.jpg"
                >
                  <source src="/digital-fabrication/uvlaser.mp4" type="video/mp4" />
                  {t('behindTheScenes.videoSupportText', { ns: 'digitalfabrication' })}
                </video>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a 
                  href="https://www.instagram.com/reel/DGPupgNsXk_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#329db7] text-white rounded-lg hover:bg-[#2b86a0] transition-colors w-fit font-['Magistral']"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  {t('behindTheScenes.instagramCta', { ns: 'digitalfabrication' })}
                </a>
                <a 
                  href="https://t.me/CenterForYouthInitiatives"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0088cc] text-white rounded-lg hover:bg-[#0077b3] transition-colors w-fit font-['Magistral']"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  {t('behindTheScenes.telegramCta', { ns: 'digitalfabrication' })}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section-spacing bg-[#f5f5f7]">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1300px]">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2 space-y-8">
                <div className="inline-block">
                  <span className="bg-[#329db7]/10 text-[#329db7] text-sm font-semibold px-4 py-2 rounded-full font-['Magistral']">
                    {t('contactSection.badge', { ns: 'digitalfabrication' })}
                  </span>
                </div>
                
                <div className="section-title-wrapper">
                  <GradientText
                    colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                    animationSpeed={4}
                    className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral']"
                  >
                    {t('contactSection.title', { ns: 'digitalfabrication' })}
                  </GradientText>
                </div>
                
                <p className="text-sm sm:text-base md:text-lg text-gray-600 font-['Magistral']">
                  {t('contactSection.description', { ns: 'digitalfabrication' })}
                </p>

                <a 
                  href="https://t.me/+998770884977"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-[#329db7] text-white px-6 py-3 text-base sm:text-lg font-medium hover:bg-[#2b86a0] transition-colors duration-300 hover:shadow-lg hover:-translate-y-0.5 font-['Magistral']"
                >
                  <span>{t('contactSection.cta', { ns: 'digitalfabrication' })}</span>
                  <ArrowRight size={20} />
                </a>
              </div>

              {/* Right side image */}
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-xl overflow-hidden shadow-xl">
                  <img 
                    src="/digital-fabrication/contact.webp" 
                    alt={t('contactSection.imageAlt', { ns: 'digitalfabrication' })} 
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DigitalFabricationPage; 