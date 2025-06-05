import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import { useLocation } from "react-router-dom";

const DigitalFabricationPage = () => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update document title
    document.title = "Digital Fabrication Services | Modern Glide Design";

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
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="relative w-full h-screen">
          <img 
            src="/digital-fabrication/hero.webp" 
            alt="Digital Fabrication Hero" 
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

        {/* UV Printing Section */}
        <section className="bg-[#f7f7f7] py-16 md:py-24 overflow-visible">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-start gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2">
                <div className="max-w-xl mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-gray-900">
                    UV Printing Excellence
                  </h2>
                  
                  <p className="text-lg text-gray-600 mb-8">
                    Experience the future of printing with our state-of-the-art UV printing technology. Perfect for creating vibrant, durable prints on a wide range of materials with exceptional detail and color accuracy.
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
                      <p className="text-gray-600">Instant curing for immediate handling</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-gray-600">Vibrant colors with exceptional durability</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-gray-600">Print on virtually any material</p>
                    </div>
                  </div>

                  <button className="inline-flex items-center px-6 py-3 bg-[#329db7] text-white rounded-lg hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                    Explore UV Printing
                  </button>
                </div>
              </div>

              {/* Right side with image */}
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
        <section className="bg-white py-16 md:py-24 overflow-visible">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row-reverse items-start gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2">
                <div className="max-w-xl mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-gray-900">
                    Professional Sticker Production
                  </h2>
                  
                  <p className="text-lg text-gray-600 mb-8">
                    Create high-quality stickers with our advanced cutting and printing technology. From custom designs to bulk production, we deliver precise, durable stickers for any application.
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
                      <p className="text-gray-600">Precise cutting for complex shapes</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-gray-600">High-resolution printing</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-gray-600">Various material options</p>
                    </div>
                  </div>

                  <button className="inline-flex items-center px-6 py-3 bg-[#329db7] text-white rounded-lg hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                    Create Your Stickers
                  </button>
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
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-16 text-center">Digital Fabrication Equipment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* UV Printer */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-40 md:h-48 bg-white relative pt-6">
                  <img src="/digital-fabrication/UV.jpg" alt="UV Printer" className="absolute inset-0 w-full h-full object-contain object-center" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-4 pb-4 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center">Professional UV Printing</div>
                  <h3 className="text-2xl font-bold mb-2 text-center">Roland UV Printer</h3>
                  <p className="text-gray-700 text-center text-base">High-resolution UV printing with instant curing technology for exceptional quality and durability.</p>
                </div>
              </div>

              {/* Sticker Machine */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-40 md:h-48 bg-white relative pt-6">
                  <img src="/digital-fabrication/Stickerr.jpg" alt="Sticker Cutting Machine" className="absolute inset-0 w-full h-full object-contain object-center" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-4 pb-4 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center">Precision Cutting</div>
                  <h3 className="text-2xl font-bold mb-2 text-center">Roland Sticker Cutter</h3>
                  <p className="text-gray-700 text-center text-base">Advanced cutting technology for precise, complex sticker shapes with perfect registration.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Precision Laser Cutting Section */}
        <section id="precision-manufacturing" className="bg-white py-16 md:py-24 overflow-visible">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-start gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2">
                <div className="max-w-xl mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-gray-900">
                    Precision Laser Cutting
                  </h2>
                  
                  <p className="text-lg text-gray-600 mb-8">
                    Experience the precision of our advanced laser cutting technology, perfect for creating intricate designs in wood and other materials with exceptional accuracy and clean edges.
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
                      <p className="text-gray-600">High-precision cutting for complex designs</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-gray-600">Clean, burnished edges on wood</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-gray-600">Versatile material compatibility</p>
                    </div>
                  </div>

                  <button className="inline-flex items-center px-6 py-3 bg-[#329db7] text-white rounded-lg hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                    Explore Laser Cutting
                  </button>
                </div>
              </div>

              {/* Right side with image - Laser Cutting */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative rounded-xl overflow-hidden shadow-xl bg-white">
                  <img 
                    src="/precision-manufacturing/laser.webp" 
                    alt="Laser Cutting" 
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CNC Wood Machining Section */}
        <section className="bg-[#f7f7f7] py-16 md:py-24 overflow-visible">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row-reverse items-start gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2">
                <div className="max-w-xl mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-gray-900">
                    CNC Wood Machining
                  </h2>
                  
                  <p className="text-lg text-gray-600 mb-8">
                    Transform your woodworking projects with our state-of-the-art CNC machining capabilities. From intricate carvings to precise joinery, we bring your designs to life with unmatched accuracy.
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
                      <p className="text-gray-600">3D carving and relief work</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-gray-600">Precise joinery and inlays</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-gray-600">Custom furniture components</p>
                    </div>
                  </div>

                  <button className="inline-flex items-center px-6 py-3 bg-[#329db7] text-white rounded-lg hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                    Explore CNC Machining
                  </button>
                </div>
              </div>

              {/* Right side with image - CNC */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative rounded-xl overflow-hidden shadow-xl bg-white">
                  <img 
                    src="/precision-manufacturing/cnc.webp" 
                    alt="CNC Wood Machining" 
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Precision Manufacturing Equipment Showcase Section */}
        <section className="py-16 md:py-24 bg-[#f7f7f7]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-16 text-center">Precision Manufacturing Equipment</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Roland DG Shape */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-40 md:h-48 bg-white relative pt-6">
                  <img src="/precision-manufacturing/roland-dgshape-1.jpg" alt="Roland DG Shape" className="absolute inset-0 w-full h-full object-contain object-center" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-4 pb-4 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center">Advanced Milling</div>
                  <h3 className="text-2xl font-bold mb-2 text-center">Roland DG Shape</h3>
                  <p className="text-gray-700 text-center text-base">High-precision 3D milling machine for creating detailed prototypes and production parts.</p>
                </div>
              </div>

              {/* SRM-20 */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-40 md:h-48 bg-white relative pt-6">
                  <img src="/precision-manufacturing/srm-20.jpg" alt="SRM-20" className="absolute inset-0 w-full h-full object-contain object-center" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-4 pb-4 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center">Precision Milling</div>
                  <h3 className="text-2xl font-bold mb-2 text-center">SRM-20</h3>
                  <p className="text-gray-700 text-center text-base">Compact desktop milling machine for precise machining of small parts and prototypes.</p>
                </div>
              </div>

              {/* Photon IM */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-40 md:h-48 bg-white relative pt-6">
                  <img src="/precision-manufacturing/photonim-1.jpg" alt="Photon IM" className="absolute inset-0 w-full h-full object-contain object-center" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-4 pb-4 w-full text-center">
                  <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center">Laser Engraving</div>
                  <h3 className="text-2xl font-bold mb-2 text-center">Photonim GS6040</h3>
                  <p className="text-gray-700 text-center text-base">Advanced laser engraving machine for precise and detailed surface marking and engraving.</p>
                </div>
              </div>
            </div>

            {/* Last two cards centered */}
            <div className="mt-8 flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ width: '66.666667%' }}>
                {/* Volters */}
                <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                  <div className="w-full h-40 md:h-48 bg-white relative pt-6">
                    <img src="/precision-manufacturing/volters.jpg" alt="Volters" className="absolute inset-0 w-full h-full object-contain object-center" />
                  </div>
                  <div className="flex flex-col items-center justify-center px-8 pt-4 pb-4 w-full text-center">
                    <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center">Milling & Engraving</div>
                    <h3 className="text-2xl font-bold mb-2 text-center">VOLTER-S</h3>
                    <p className="text-gray-700 text-center text-base">Professional milling and engraving machine for precise material processing and surface finishing.</p>
                  </div>
                </div>

                {/* MDX-50 */}
                <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                  <div className="w-full h-40 md:h-48 bg-white relative pt-6">
                    <img src="/precision-manufacturing/mdx-50.jpg" alt="MDX-50" className="absolute inset-0 w-full h-full object-contain object-center" />
                  </div>
                  <div className="flex flex-col items-center justify-center px-8 pt-4 pb-4 w-full text-center">
                    <div className="text-[11px] font-semibold text-[#329db7] mb-1 tracking-widest uppercase text-center">CNC Milling</div>
                    <h3 className="text-2xl font-bold mb-2 text-center">MDX-50</h3>
                    <p className="text-gray-700 text-center text-base">Advanced CNC milling machine for high-precision machining and prototyping.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Behind the Scenes Section */}
        <section className="relative bg-[#f7f7f7] text-gray-900 border-t border-gray-100">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="flex flex-col items-center justify-center gap-8 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
                Behind the Scenes
              </h2>
              <p className="text-gray-600 text-center">
                Follow our journey and discover how we bring your ideas to life through cutting-edge digital fabrication technology.
              </p>
              <div className="w-full max-w-[350px] aspect-[9/16] rounded-xl overflow-hidden shadow-xl">
                <video 
                  className="w-full h-full object-cover"
                  controls
                  poster="/digital-fabrication/UV.jpg"
                >
                  <source src="/digital-fabrication/uvlaser.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
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
                  Follow Us on Instagram
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
                  Follow Us on Telegram
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2 space-y-8">
                <div className="inline-block">
                  <span className="bg-[#329db7]/10 text-[#329db7] text-sm font-semibold px-4 py-2 rounded-full">
                    Get Started Today
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Ready to Bring Your Ideas to Life?
                </h2>
                
                <p className="text-xl text-gray-600">
                  Contact us today to discuss your project requirements. Our team of experts is ready to help you create stunning UV prints and custom stickers.
                </p>

                <button className="inline-flex items-center px-6 py-3 bg-[#329db7] text-white rounded-lg hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                  Contact Us
                </button>
              </div>

              {/* Right side image */}
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-xl overflow-hidden shadow-xl">
                  <img 
                    src="/digital-fabrication/contact.webp" 
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

export default DigitalFabricationPage; 