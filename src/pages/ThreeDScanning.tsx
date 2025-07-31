import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import SEOHelmet from "@/components/SEOHelmet";

const ThreeDScanningPage = () => {
  const { t } = useTranslation('3dscanning');

  // Define JSON-LD schema for 3D Scanning page
  const scanningSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "3D Scanning Services",
    "provider": {
      "@type": "Organization",
      "name": "FabLab CFYI",
      "url": "https://fablab-cfyi.uz"
    },
    "serviceType": "3D Scanning",
    "description": "Professional 3D scanning services with high precision scanners for reverse engineering, quality control, and digital archiving.",
    "offers": {
      "@type": "Offer",
      "description": "High-precision 3D scanning services"
    }
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update document title
    document.title = "3D Scanning Services | Fablab Uzbekistan";
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f7]">
      <SEOHelmet
        title="3D Scanning Services"
        description="Professional 3D scanning services in Uzbekistan. High-precision 3D scanning for reverse engineering, quality control, prototyping, and digital archiving with advanced scanning technology."
        keywords="3D сканирование Ташкент, 3D skanerlash Toshkent, услуги 3D сканирования, 3D skanerlash xizmatlari, 3D сканер Узбекистан, сканирование объектов Ташкент, obyekt skanerlash, высокоточное сканирование, reverse engineering, quality control, prototyping"
        image="/3dscanning/hero.webp"
        schema={scanningSchema}
        canonicalPath="/3d-scanning"
      />
      <Header />
      
      <main className="flex-grow bg-[#f5f5f7]">
        {/* High-Resolution 3D Scanning Section */}
        <section className="pt-40 md:pt-48 pb-16 md:pb-24 bg-[#f5f5f7]">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1350px]">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2">
                <div className="max-w-xl mx-auto text-left lg:text-left flex flex-col items-start lg:items-start">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 leading-tight text-gray-900 font-['Magistral']">
                    {t("highResolution.title")}
                  </h2>
                  
                  <p className="text-base sm:text-lg text-gray-600 mb-8 font-['Magistral']">
                    {t("highResolution.description")}
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
                      <p className="text-base sm:text-lg text-gray-700 font-['Magistral']">{t("highResolution.features.accuracy")}</p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-base sm:text-lg text-gray-700 font-['Magistral']">{t("highResolution.features.textureMapping")}</p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-base sm:text-lg text-gray-700 font-['Magistral']">{t("highResolution.features.fileFormats")}</p>
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
                    <span>{t("highResolution.cta")}</span>
                    <ArrowRight size={20} />
                  </a>
                </div>
              </div>

              {/* Right side with image */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative rounded-xl overflow-hidden shadow-xl bg-white">
                  <img 
                    src="/3d-scanning/scanning.webp" 
                    alt="3D Scanning Technology" 
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1350px]">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2">
                <div className="max-w-xl mx-auto text-left lg:text-left flex flex-col items-start lg:items-start">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 leading-tight text-gray-900 font-['Magistral']">
                    {t("applications.title")}
                  </h2>
                  
                  <p className="text-base sm:text-lg text-gray-600 mb-8 font-['Magistral']">
                    {t("applications.description")}
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
                      <p className="text-base sm:text-lg text-gray-700 font-['Magistral']">{t("applications.features.reverseEngineering")}</p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-base sm:text-lg text-gray-700 font-['Magistral']">{t("applications.features.qualityControl")}</p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-base sm:text-lg text-gray-700 font-['Magistral']">{t("applications.features.digitalArchiving")}</p>
                    </div>
                  </div>

                  <a 
                    href="#guide"
                    onClick={(e) => {
                      e.preventDefault();
                      const guideSection = document.getElementById('guide');
                      if (guideSection) {
                        guideSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="inline-flex items-center space-x-2 bg-[#329db7] text-white px-6 py-3 text-base sm:text-lg font-medium hover:bg-[#2b86a0] transition-colors duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span>{t("applications.cta")}</span>
                    <ArrowRight size={20} />
                  </a>
                </div>
              </div>

              {/* Right side with image */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative rounded-xl overflow-hidden shadow-xl bg-white">
                  <img 
                    src="/3d-scanning/scanning2.webp" 
                    alt="3D Scanning Applications" 
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Equipment Showcase Section */}
        <section id="equipment" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-[#f7f7f7]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-16 text-center">{t('equipment.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1000px] mx-auto">
              {/* EinScan SP V2 Scanner */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-[400px] bg-white overflow-hidden">
                  <img src="/3d-scanning/3D SCANNER EINSCAN SP V2.webp" alt={t('equipment.einScanSPV2.title')} className="w-full h-full object-cover object-center" loading="lazy" />
                </div>
                <div className="flex flex-col items-center justify-center px-6 pt-4 pb-4 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center">{t('equipment.einScanSPV2.category')}</div>
                  <h3 className="text-xl font-bold mb-2 text-center">{t('equipment.einScanSPV2.title')}</h3>
                  <p className="text-gray-700 text-center text-sm">{t('equipment.einScanSPV2.description')}</p>
                </div>
              </div>

              {/* Autoscan Inspec Scanner */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-[400px] bg-white overflow-hidden">
                  <img src="/3d-scanning/3D SCANNER AUTOSCAN-INSPEC.webp" alt={t('equipment.autoscanInspec.title')} className="w-full h-full object-cover object-center" loading="lazy" />
                </div>
                <div className="flex flex-col items-center justify-center px-6 pt-4 pb-4 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center">{t('equipment.autoscanInspec.category')}</div>
                  <h3 className="text-xl font-bold mb-2 text-center">{t('equipment.autoscanInspec.title')}</h3>
                  <p className="text-gray-700 text-center text-sm">{t('equipment.autoscanInspec.description')}</p>
                </div>
              </div>

              {/* EinScan H Scanner */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-[400px] bg-white overflow-hidden">
                  <img src="/3d-scanning/3D SCANNER EINSCAN H.webp" alt={t('equipment.einScanH.title')} className="w-full h-full object-cover object-center" loading="lazy" />
                </div>
                <div className="flex flex-col items-center justify-center px-6 pt-4 pb-4 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center">{t('equipment.einScanH.category')}</div>
                  <h3 className="text-xl font-bold mb-2 text-center">{t('equipment.einScanH.title')}</h3>
                  <p className="text-gray-700 text-center text-sm">{t('equipment.einScanH.description')}</p>
                </div>
              </div>

              {/* Academia 50 Scanner */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-[400px] bg-white overflow-hidden">
                  <img src="/3d-scanning/SYS-ACA-SC50P1 ACADEMIA 50.webp" alt={t('equipment.academia50.title')} className="w-full h-full object-cover object-center" loading="lazy" />
                </div>
                <div className="flex flex-col items-center justify-center px-6 pt-4 pb-4 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center">{t('equipment.academia50.category')}</div>
                  <h3 className="text-xl font-bold mb-2 text-center">{t('equipment.academia50.title')}</h3>
                  <p className="text-gray-700 text-center text-sm">{t('equipment.academia50.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EinScan SP V2 Guide Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1350px]">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left side with image */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative rounded-xl overflow-hidden shadow-xl bg-white">
                  <img 
                    src="/3d-scanning/SP2.webp" 
                    alt={t('serviceCategories.3dScanning.guide.einScanSPV2.imageAlt')}
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>

              {/* Right side content */}
              <div className="w-full lg:w-1/2">
                <div className="max-w-xl mx-auto text-left lg:text-left flex flex-col items-start lg:items-start">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 leading-tight text-gray-900 font-['Magistral']">
                    {t('guide.einScanSPV2.title')}
                  </h2>
                  
                  <p className="text-base sm:text-lg text-gray-600 mb-8 font-['Magistral']">
                    {t('guide.einScanSPV2.description')}
                  </p>

                  <a 
                    href="#guide"
                    onClick={(e) => {
                      e.preventDefault();
                      const guideSection = document.getElementById('guide');
                      if (guideSection) {
                        guideSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="inline-flex items-center space-x-2 bg-[#329db7] text-white px-6 py-3 text-base sm:text-lg font-medium hover:bg-[#2b86a0] transition-colors duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span>{t('guide.einScanSPV2.cta')}</span>
                    <ArrowRight size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-[#f7f7f7]">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1350px]">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2 space-y-8">
                <div className="inline-block">
                  <span className="bg-[#329db7]/10 text-[#329db7] text-sm font-semibold px-4 py-2 rounded-full font-['Magistral']">
                    {t('contactSection.badge')}
                  </span>
                </div>
                
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight font-['Magistral']">
                  {t('contactSection.title')}
                </h2>
                
                <p className="text-base sm:text-lg text-gray-600 font-['Magistral']">
                  {t('contactSection.description')}
                </p>

                <a 
                  href="https://t.me/+998770884977"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-[#329db7] text-white px-6 py-3 text-base sm:text-lg font-medium hover:bg-[#2b86a0] transition-colors duration-300 hover:shadow-lg hover:-translate-y-0.5 font-['Magistral']"
                >
                  <span>{t('contactSection.cta')}</span>
                  <ArrowRight size={20} />
                </a>
              </div>

              {/* Right side image */}
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-xl overflow-hidden shadow-xl">
                  <img 
                    src="/3d-scanning/contact.webp" 
                    alt="Contact Us" 
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

export default ThreeDScanningPage; 