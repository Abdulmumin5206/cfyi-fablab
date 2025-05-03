import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "@/styles/Slider.module.css";
import SlaMaterials from "@/components/SlaMaterials";
import FdmFilaments from "@/components/FdmFilaments";

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
        {/* New Hero Section with image on left and text on right */}
        <section className="bg-white py-16 md:py-24 pt-36 md:pt-48">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center">
              {/* Left side image */}
              <div className="w-full lg:w-3/4 mb-12 lg:mb-0 pr-0 lg:pr-8">
                <div className="relative w-full">
                  <img 
                    src="/fablab/optimized_for_web_jpeg-03072024_dsl_core_set_311.webp" 
                    alt="3D Printing Equipment Core Set" 
                    className="w-full aspect-[4/3] object-cover h-auto max-h-[650px]"
                  />
                </div>
              </div>
              
              {/* Right side content */}
              <div className="w-full lg:w-1/2 pl-0 lg:pl-10">
                <div className="text-blue-600 font-medium mb-2">STEREOLITHOGRAPHY (SLA) TECHNOLOGY</div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">High-Precision <span className="text-gray-600">SLA 3D Printing Services</span></h1>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700">Ultra-smooth surface finish with 25-micron precision</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700">Wide range of engineering and dental resins available</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700">Ideal for detailed prototypes, medical models, and production parts</p>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a href="#" className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-md hover:bg-blue-700 transition-colors text-center">
                    Get a Quote
                  </a>
                  <a href="#" className="inline-block bg-white text-blue-600 font-medium px-6 py-3 rounded-md border border-blue-600 hover:bg-blue-50 transition-colors text-center">
                    Request Sample Parts
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
                Tackle any problem <span className="text-gray-600">with our industry-leading materials, or use Open Material Mode.</span>
              </h1>
              
              <div className="flex flex-wrap gap-2 mb-8">
                <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm">
                  <span>General Purpose</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm">
                  <span>Tough</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm">
                  <span>Rigid</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm">
                  <span>Flame Retardant</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm">
                  <span>Silicone</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm">
                  <span>Elastic</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm">
                  <span>Biocompatible</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm">
                  <span>Polyurethane</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm">
                  <span>Ceramic</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm">
                  <span>Open Material Mode</span>
                </button>
              </div>
              
              <button className="bg-[#f05a28] hover:bg-[#e04a18] text-white px-6 py-3 rounded-md font-medium">
                REQUEST A SAMPLE PART
              </button>
            </div>
            
            {/* Right side video */}
            <div className="w-full lg:w-3/4 lg:pl-8">
              <div className="relative w-full">
                <video
                  ref={videoRef}
                  className="w-full aspect-[4/3] object-cover h-auto max-h-[650px]"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  onError={handleVideoError}
                  onLoadedData={handleVideoLoad}
                >
                  <source 
                    src="/video/clearcast_loop_240903_720p_1mbps_h264.mp4" 
                    type="video/mp4" 
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Video: 3D printing process and material applications
              </div>
            </div>
          </div>
        </section>
        
        {/* Case Studies Section - Moved up */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">See Also</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Case Study 1 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
                <div className="md:w-2/5 h-48 md:h-auto overflow-hidden">
                  <img 
                    src="/fablab/3.jpg" 
                    alt="Black Diamond parts" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-3/5 p-6">
                  <div className="text-blue-600 text-sm font-semibold mb-2">CASE STUDY: LOOKS-LIKE PROTOTYPES</div>
                  <h3 className="text-xl font-bold mb-4">How Black Diamond Reduced Costs by 84% With Rapid Prototyping on the Form 3L</h3>
                  <a href="#" className="text-blue-600 flex items-center gap-2 font-medium hover:text-blue-800 transition-colors">
                    Read the Story
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Case Study 2 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
                <div className="md:w-2/5 h-48 md:h-auto overflow-hidden">
                  <img 
                    src="/fablab/1.jpg" 
                    alt="Ford Explorer" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-3/5 p-6">
                  <div className="text-blue-600 text-sm font-semibold mb-2">CASE STUDY: WORKS-LIKE PROTOTYPES</div>
                  <h3 className="text-xl font-bold mb-4">How Ford Developed the New Explorer Using Formlabs SLA and SLS 3D Printers</h3>
                  <a href="#" className="text-blue-600 flex items-center gap-2 font-medium hover:text-blue-800 transition-colors">
                    Read the Story
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Case Study 3 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
                <div className="md:w-2/5 h-48 md:h-auto overflow-hidden">
                  <img 
                    src="/fablab/11.jpg" 
                    alt="SLA Prototyping" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-3/5 p-6">
                  <div className="text-blue-600 text-sm font-semibold mb-2">CASE STUDY: LOOKS-LIKE PROTOTYPES</div>
                  <h3 className="text-xl font-bold mb-4">Rapid SLA Prototyping With The New Draft Resin</h3>
                  <a href="#" className="text-blue-600 flex items-center gap-2 font-medium hover:text-blue-800 transition-colors">
                    Read the Story
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Case Study 4 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
                <div className="md:w-2/5 h-48 md:h-auto overflow-hidden">
                  <img 
                    src="/fablab/13.jpg" 
                    alt="Mechanical Watches" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-3/5 p-6">
                  <div className="text-blue-600 text-sm font-semibold mb-2">CASE STUDY: LOOKS-LIKE PROTOTYPES</div>
                  <h3 className="text-xl font-bold mb-4">Producing High-Precision Prototypes for Mechanical Watches Using 3D Printing</h3>
                  <a href="#" className="text-blue-600 flex items-center gap-2 font-medium hover:text-blue-800 transition-colors">
                    Read the Story
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SLA 3D Printing Equipment Section - Modern Card Layout */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-16 text-center">Our SLA 3D Printing Equipment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Form 4 Card */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-32 md:h-36 bg-gray-100 relative">
                  <img src="/3dprinters/1.formlabs-form3-01_2_1.png" alt="Form 4 background" className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
                </div>
                <div className="-mt-16 z-10 flex justify-center w-full">
                  <img src="/3dprinters/formlabs-form3-01_2_1.png" alt="Form 4" className="w-48 h-56 object-contain" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-6 pb-8 w-full text-center">
                  <div className="text-[11px] font-semibold text-blue-700 mb-1 tracking-widest uppercase text-center mt-2">MAXIMUM VERSATILITY</div>
                  <h3 className="text-2xl font-bold mb-3 text-center">FormLabs Form 3</h3>
                  <p className="text-gray-700 mb-4 text-center text-base">Produce high-quality, functional prototypes and end-use parts with an extensive materials library.</p>
                  <hr className="w-12 border-t border-gray-200 my-3" />
                </div>
              </div>
              {/* Form 4L Card */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-32 md:h-36 bg-gray-100 relative">
                  <img src="/3dprinters/1.Phrozen.jpg" alt="Form 4L background" className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
                </div>
                <div className="-mt-16 z-10 flex justify-center w-full">
                  <img src="/3dprinters/Phrozen.png" alt="Form 4L" className="w-48 h-56 object-contain" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-6 pb-8 w-full text-center">
                  <div className="text-[11px] font-semibold text-blue-700 mb-1 tracking-widest uppercase text-center mt-2">THINK BIG</div>
                  <h3 className="text-2xl font-bold mb-3 text-center">PHROZEN Sonic MEGA 8K MSLA</h3>
                  <p className="text-gray-700 mb-4 text-center text-base">Take control of large-scale part production, increase your throughput, and bring your biggest ideas to life.</p>
                  <hr className="w-12 border-t border-gray-200 my-3" />
                </div>
              </div>
              {/* Fuse 1+ 30W Card */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-32 md:h-36 bg-gray-100 relative">
                  <img src="/3dprinters/1.Phrozen mini.avif" alt="Fuse 1+ 30W background" className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
                </div>
                <div className="-mt-16 z-10 flex justify-center w-full">
                  <img src="/3dprinters/Phrozen mini.png" alt="Fuse 1+ 30W" className="w-48 h-56 object-contain" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-6 pb-8 w-full text-center">
                  <div className="text-[11px] font-semibold text-blue-700 mb-1 tracking-widest uppercase text-center mt-2">HIGHEST PERFORMANCE</div>
                  <h3 className="text-2xl font-bold mb-3 text-center">PHROZEN Sonic Mini 8K MSLA</h3>
                  <p className="text-gray-700 mb-4 text-center text-base">Bring production-ready nylon 3D printing onto your benchtop with an affordable, compact selective laser sintering (SLS) platform.</p>
                  <hr className="w-12 border-t border-gray-200 my-3" />
                </div>
              </div>
              {/* Prusa i3 MK3S+ Card */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-32 md:h-36 bg-gray-100 relative">
                  <img src="/3dprinters/1.prusa.jpg" alt="Prusa i3 MK3S+ background" className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
                </div>
                <div className="-mt-16 z-10 flex justify-center w-full">
                  <img src="/3dprinters/Prusa.png" alt="Prusa i3 MK3S+" className="w-48 h-56 object-contain" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-6 pb-8 w-full text-center">
                  <div className="text-[11px] font-semibold text-blue-700 mb-1 tracking-widest uppercase text-center mt-2">RELIABLE PERFORMANCE</div>
                  <h3 className="text-2xl font-bold mb-3 text-center">Original Prusa SL1S Complete</h3>
                  <p className="text-gray-700 mb-4 text-center text-base">Trusted FDM 3D printer for robust, versatile prototyping and production.</p>
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
                <div className="text-orange-500 font-medium mb-2">FUSED DEPOSITION MODELING (FDM) TECHNOLOGY</div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">Versatile <span className="text-gray-400">FDM 3D Printing Services</span></h1>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-300">Durable functional prototypes with various infill patterns</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-300">Multiple materials including PLA, PETG, ABS, TPU, and composites</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-300">Perfect for concept models, jigs, fixtures, and end-use parts</p>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a href="#" className="inline-block bg-orange-600 text-white font-medium px-6 py-3 rounded-md hover:bg-orange-700 transition-colors text-center">
                    Get a Quote
                  </a>
                  <a href="#" className="inline-block bg-transparent text-orange-500 font-medium px-6 py-3 rounded-md border border-orange-500 hover:bg-orange-900 transition-colors text-center">
                    Request Sample Parts
                  </a>
                </div>
              </div>
              
              {/* Right side image */}
              <div className="w-full lg:w-3/4 lg:pl-8">
                <div className="relative w-full">
                  <img 
                    src="/3dprinters/FDM.jpeg" 
                    alt="FDM 3D Printing Equipment Core Set" 
                    className="w-full aspect-[4/3] object-cover h-auto max-h-[650px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FDM Materials Section */}
        <FdmFilaments />
        
        {/* FDM 3D Printing Equipment Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-16 text-center">Our FDM 3D Printing Equipment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Prusa i3 MK3S+ */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-32 md:h-36 bg-gray-100 relative">
                  <img src="/3dprinters/1.prusa-i3-mk3s-3d-printer-tashkent.avif" alt="Prusa i3 MK3S+ background" className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
                </div>
                <div className="-mt-16 z-10 flex justify-center w-full">
                  <img src="/3dprinters/prusa-i3-mk3s-3d-printer-tashkent.png" alt="Prusa i3 MK3S+" className="w-48 h-56 object-contain" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-6 pb-8 w-full text-center">
                  <div className="text-[11px] font-semibold text-blue-700 mb-1 tracking-widest uppercase text-center mt-2">RELIABLE WORKHORSE</div>
                  <h3 className="text-2xl font-bold mb-3 text-center">Prusa i3 MK3S+</h3>
                  <p className="text-gray-700 mb-4 text-center text-base">Versatile and robust FDM 3D printer for high-quality prototyping and production.</p>
                  <hr className="w-12 border-t border-gray-200 my-3" />
                </div>
              </div>
              {/* Prusa i3 MK3S+ MMU2S */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-32 md:h-36 bg-gray-100 relative">
                  <img src="/3dprinters/1.prusa-i3-mk3s-mmu2s-multicolor-3d-printer-tashkent.avif" alt="Prusa i3 MK3S+ MMU2S background" className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
                </div>
                <div className="-mt-16 z-10 flex justify-center w-full">
                  <img src="/3dprinters/prusa-i3-mk3s-mmu2s-multicolor-3d-printer-tashkent.png" alt="Prusa i3 MK3S+ MMU2S" className="w-48 h-56 object-contain" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-6 pb-8 w-full text-center">
                  <div className="text-[11px] font-semibold text-blue-700 mb-1 tracking-widest uppercase text-center mt-2">MULTI-MATERIAL</div>
                  <h3 className="text-2xl font-bold mb-3 text-center">Prusa i3 MK3S+ MMU2S</h3>
                  <p className="text-gray-700 mb-4 text-center text-base">Advanced multi-material FDM printing for complex, colorful parts.</p>
                  <hr className="w-12 border-t border-gray-200 my-3" />
                </div>
              </div>
              {/* Skrinter */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-32 md:h-36 bg-gray-100 relative">
                  <img src="/3dprinters/1.skrinter-3d-printer-uzbekistan.webp" alt="Skrinter background" className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
                </div>
                <div className="-mt-16 z-10 flex justify-center w-full">
                  <img src="/3dprinters/skrinter-3d-printer-uzbekistan.png" alt="Skrinter" className="w-48 h-56 object-contain" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-6 pb-8 w-full text-center">
                  <div className="text-[11px] font-semibold text-blue-700 mb-1 tracking-widest uppercase text-center mt-2">DESKTOP FDM</div>
                  <h3 className="text-2xl font-bold mb-3 text-center">Skrinter</h3>
                  <p className="text-gray-700 mb-4 text-center text-base">Compact desktop FDM printer for everyday prototyping needs.</p>
                  <hr className="w-12 border-t border-gray-200 my-3" />
                </div>
              </div>
              {/* Raise3D Pro3 */}
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-0 border border-gray-200 overflow-hidden">
                <div className="w-full h-32 md:h-36 bg-gray-100 relative">
                  <img src="/3dprinters/1.raise3d-pro3-industrial-3d-printer-tashkent.png" alt="Raise3D Pro3 background" className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
                </div>
                <div className="-mt-16 z-10 flex justify-center w-full">
                  <img src="/3dprinters/raise3d-pro3-industrial-3d-printer-tashkent.png" alt="Raise3D Pro3" className="w-48 h-56 object-contain" />
                </div>
                <div className="flex flex-col items-center justify-center px-8 pt-6 pb-8 w-full text-center">
                  <div className="text-[11px] font-semibold text-blue-700 mb-1 tracking-widest uppercase text-center mt-2">INDUSTRIAL FDM</div>
                  <h3 className="text-2xl font-bold mb-3 text-center">Raise3D Pro3</h3>
                  <p className="text-gray-700 mb-4 text-center text-base">Industrial-grade FDM 3D printer for large, durable parts.</p>
                  <hr className="w-12 border-t border-gray-200 my-3" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer bgClass="bg-white" textClass="text-gray-800" />
    </div>
  );
};

export default ThreeDPrintingPage; 