import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";

const ThreeDScanningPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update document title
    document.title = "3D Scanning Services | Modern Glide Design";
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="relative w-full h-screen">
          <img 
            src="/3d-scanning/hero.webp" 
            alt="3D Scanning Hero" 
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

        {/* High-Resolution 3D Scanning Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1200px]">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2">
                <div className="max-w-xl mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 leading-tight text-gray-900 font-['Magistral']">
                    High-Resolution 3D Scanning
                  </h2>
                  
                  <p className="text-base sm:text-lg text-gray-600 mb-8 font-['Magistral']">
                    Capture precise digital replicas of physical objects with our advanced 3D scanning technology. Perfect for reverse engineering, quality control, and digital preservation.
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
                      <p className="text-base sm:text-lg text-gray-700 font-['Magistral']">Sub-millimeter accuracy</p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-base sm:text-lg text-gray-700 font-['Magistral']">Full-color texture mapping</p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-base sm:text-lg text-gray-700 font-['Magistral']">Multiple file format support</p>
                    </div>
                  </div>

                  <a 
                    href="#contact" 
                    className="inline-flex items-center space-x-2 bg-[#329db7] text-white px-6 py-3 text-base sm:text-lg font-medium hover:bg-[#2b86a0] transition-colors duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span>Explore 3D Scanning</span>
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
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1200px]">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2">
                <div className="max-w-xl mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 leading-tight text-gray-900 font-['Magistral']">
                    Versatile Applications
                  </h2>
                  
                  <p className="text-base sm:text-lg text-gray-600 mb-8 font-['Magistral']">
                    From product development to cultural preservation, our 3D scanning services support a wide range of applications with unmatched precision and detail.
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
                      <p className="text-base sm:text-lg text-gray-700 font-['Magistral']">Reverse engineering</p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-base sm:text-lg text-gray-700 font-['Magistral']">Quality control and inspection</p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-base sm:text-lg text-gray-700 font-['Magistral']">Digital archiving and preservation</p>
                    </div>
                  </div>

                  <a 
                    href="#contact" 
                    className="inline-flex items-center space-x-2 bg-[#329db7] text-white px-6 py-3 text-base sm:text-lg font-medium hover:bg-[#2b86a0] transition-colors duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span>View Applications</span>
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
        <section className="py-16 md:py-24 bg-[#f7f7f7]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-16 text-center">Our Equipment</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* EinScan SP V2 Scanner */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-96 bg-white overflow-hidden">
                  <img src="/3d-scanning/3D SCANNER EINSCAN SP V2.webp" alt="EinScan SP V2" className="w-full h-full object-cover object-center" loading="lazy" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-4 pb-4 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center">High Precision</div>
                  <h3 className="text-2xl font-bold mb-2 text-center">EinScan SP V2</h3>
                  <p className="text-gray-700 text-center text-base">Professional-grade structured light scanner with 0.05mm accuracy for detailed surface capture.</p>
                </div>
              </div>

              {/* EinScan H Scanner */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-96 bg-white overflow-hidden">
                  <img src="/3d-scanning/3D SCANNER EINSCAN H.webp" alt="EinScan H" className="w-full h-full object-cover object-center" loading="lazy" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-4 pb-4 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center">Handheld Solution</div>
                  <h3 className="text-2xl font-bold mb-2 text-center">EinScan H</h3>
                  <p className="text-gray-700 text-center text-base">Portable handheld scanner with 0.1mm accuracy for flexible scanning of various objects.</p>
                </div>
              </div>

              {/* Academia 50 Scanner */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-96 bg-white overflow-hidden">
                  <img src="/3d-scanning/SYS-ACA-SC50P1 ACADEMIA 50.webp" alt="Academia 50" className="w-full h-full object-cover object-center" loading="lazy" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-4 pb-4 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center">Educational Grade</div>
                  <h3 className="text-2xl font-bold mb-2 text-center">Academia 50</h3>
                  <p className="text-gray-700 text-center text-base">High-resolution 3D scanner designed for educational and research applications.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EinScan SP V2 Guide Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1200px]">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left side with image */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative rounded-xl overflow-hidden shadow-xl bg-white">
                  <img 
                    src="/3d-scanning/SP2.webp" 
                    alt="EinScan SP V2 Scanner"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>

              {/* Right side content */}
              <div className="w-full lg:w-1/2">
                <div className="max-w-xl mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 leading-tight text-gray-900 font-['Magistral']">
                    Guide to Using the EinScan SP V2
                  </h2>
                  
                  <p className="text-base sm:text-lg text-gray-600 mb-8 font-['Magistral']">
                    [Placeholder for the blog content about using the EinScan SP V2 scanner. This section will explain the steps, tips, and best practices for achieving high-quality scans.]
                  </p>

                  <a 
                    href="#contact" 
                    className="inline-flex items-center space-x-2 bg-[#329db7] text-white px-6 py-3 text-base sm:text-lg font-medium hover:bg-[#2b86a0] transition-colors duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span>Read the Full Guide</span>
                    <ArrowRight size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1200px]">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2 space-y-8">
                <div className="inline-block">
                  <span className="bg-[#329db7]/10 text-[#329db7] text-sm font-semibold px-4 py-2 rounded-full font-['Magistral']">
                    Get Started Today
                  </span>
                </div>
                
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight font-['Magistral']">
                  Ready to Digitize Your Objects?
                </h2>
                
                <p className="text-base sm:text-lg text-gray-600 font-['Magistral']">
                  Contact us today to discuss your 3D scanning needs. Our team of experts is ready to help you capture precise digital replicas of your objects.
                </p>

                <a 
                  href="#contact" 
                  className="inline-flex items-center space-x-2 bg-[#329db7] text-white px-6 py-3 text-base sm:text-lg font-medium hover:bg-[#2b86a0] transition-colors duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <span>Contact Us</span>
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