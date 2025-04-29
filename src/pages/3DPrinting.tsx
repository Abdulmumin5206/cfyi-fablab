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
        {/* New Hero Section with image on left and text on right */}
        <section className="bg-white py-16 md:py-24 pt-36 md:pt-48">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Left side image */}
              <div className="w-full md:w-1/2 md:pr-4 lg:pr-8">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="/fablab/optimized_for_web_jpeg-03072024_dsl_core_set_311.webp" 
                    alt="3D Printing Equipment Core Set" 
                    className="w-full h-auto object-cover aspect-[16/9]"
                  />
                </div>
              </div>
              
              {/* Right side content */}
              <div className="w-full md:w-1/2">
                <div className="text-blue-600 font-medium mb-2">STEREOLITHOGRAPHY (SLA) TECHNOLOGY</div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">High-Precision SLA 3D Printing Services</h1>
                
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
            <div className="w-full lg:w-1/2 lg:pl-8">
              <div className="relative rounded-md overflow-hidden border-2 border-[#f05a28] shadow-xl">
                <video
                  ref={videoRef}
                  className="w-full aspect-[16/9] object-cover"
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

        {/* SLA 3D Printing Equipment Section - Moved after case studies */}
        <section className="py-16 md:py-24 bg-white text-gray-900">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-16">Our SLA 3D Printing Equipment</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {/* Printer 1 */}
              <div className="flex flex-col">
                <div className="w-full h-64 bg-white mb-4 flex items-center justify-center p-4 rounded border border-gray-200">
                  <img src="/3dprinters/formlabs-form3-sla-3d-printer-tashkent.webp" alt="Formlabs Form 3" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-2xl font-bold">Formlabs Form 3</h3>
                <p className="text-gray-600 mb-4">SLA Resin Printer</p>
                <button className="border border-gray-800 py-2 px-4 hover:bg-gray-800 hover:text-white transition-colors w-fit text-sm">
                  More Details
                </button>
              </div>
              
              {/* Printer 2 */}
              <div className="flex flex-col">
                <div className="w-full h-64 bg-white mb-4 flex items-center justify-center p-4 rounded border border-gray-200">
                  <img src="/3dprinters/formlabs-form3-sla-3d-printer-tashkent.webp" alt="Formlabs Form 3+" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-2xl font-bold">Formlabs Form 3+</h3>
                <p className="text-gray-600 mb-4">SLA Resin Printer</p>
                <button className="border border-gray-800 py-2 px-4 hover:bg-gray-800 hover:text-white transition-colors w-fit text-sm">
                  More Details
                </button>
              </div>
              
              {/* Printer 3 */}
              <div className="flex flex-col">
                <div className="w-full h-64 bg-white mb-4 flex items-center justify-center p-4 rounded border border-gray-200">
                  <img src="/3dprinters/phrozen-sonic-mega-8k-resin-3d-printer-uzbekistan.webp" alt="Phrozen Sonic Mega 8K" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-2xl font-bold">Phrozen Sonic Mega 8K</h3>
                <p className="text-gray-600 mb-4">MSLA Resin Printer</p>
                <button className="border border-gray-800 py-2 px-4 hover:bg-gray-800 hover:text-white transition-colors w-fit text-sm">
                  More Details
                </button>
              </div>
              
              {/* Printer 4 */}
              <div className="flex flex-col">
                <div className="w-full h-64 bg-white mb-4 flex items-center justify-center p-4 rounded border border-gray-200">
                  <img src="/3dprinters/formlabs-form3-sla-3d-printer-tashkent.webp" alt="Formlabs Form 3L" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-2xl font-bold">Formlabs Form 3L</h3>
                <p className="text-gray-600 mb-4">Large Format SLA</p>
                <button className="border border-gray-800 py-2 px-4 hover:bg-gray-800 hover:text-white transition-colors w-fit text-sm">
                  More Details
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Innovating Markets Section - Our 3D Printing Equipment */}
        <section className="py-10 md:py-16 bg-gray-900 text-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Left side image */}
              <div className="w-full md:w-1/2 md:pr-4 lg:pr-8">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="/3dprinters/prusa-i3-mk3s-3d-printer-tashkent.webp" 
                    alt="FDM 3D Printing Equipment Core Set" 
                    className="w-full h-auto object-cover aspect-[16/9]"
                  />
                </div>
              </div>
              
              {/* Right side content */}
              <div className="w-full md:w-1/2">
                <div className="text-orange-500 font-medium mb-2">FUSED DEPOSITION MODELING (FDM) TECHNOLOGY</div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">Versatile FDM 3D Printing Services</h1>
                
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
            </div>
          </div>
        </section>
        
        {/* FDM Materials Section */}
        <section className="relative bg-gray-900 text-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col lg:flex-row items-center">
            {/* Left side content */}
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0 pr-0 lg:pr-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Build with <span className="text-orange-500">premium quality filaments</span> for any application
              </h1>
              
              <div className="flex flex-wrap gap-2 mb-8">
                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
                  <span>PLA</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
                  <span>ABS</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
                  <span>PETG</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
                  <span>TPU</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
                  <span>PC</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
                  <span>Nylon</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
                  <span>Carbon Fiber</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
                  <span>ASA</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
                  <span>HIPS</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
                  <span>Custom Materials</span>
                </button>
              </div>
              
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-md font-medium">
                REQUEST A SAMPLE PART
              </button>
            </div>
            
            {/* Right side video/image */}
            <div className="w-full lg:w-1/2 lg:pl-8">
              <div className="relative rounded-md overflow-hidden border-2 border-orange-500 shadow-xl">
                <video
                  className="w-full aspect-[16/9] object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source 
                    src="/video/The best 3D prints from our office, vol. 1.mp4" 
                    type="video/mp4" 
                  />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute bottom-0 left-0 right-0 bg-orange-600 text-white p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold">FDM SHOWCASE</span> The best 3D prints from our office
                    </div>
                    <button className="flex items-center gap-1 font-medium">
                      LEARN MORE
                      <span>›</span>
                    </button>
                  </div>
                </div>
                <button className="absolute top-4 right-4 bg-orange-600 rounded-full p-1 w-8 h-8 flex items-center justify-center">
                  <span className="sr-only">Pause</span>
                  ⏸
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* FDM 3D Printing Equipment Section */}
        <section className="py-16 md:py-24 bg-gray-900 text-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-16">Our FDM 3D Printing Equipment</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {/* Printer 1 */}
              <div className="flex flex-col">
                <div className="w-full h-64 bg-gray-800 mb-4 flex items-center justify-center p-4 rounded">
                  <img src="/3dprinters/prusa-i3-mk3s-3d-printer-tashkent.webp" alt="Prusa i3 MK3S+" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-2xl font-bold">Prusa i3 MK3S+</h3>
                <p className="text-gray-400 mb-4">FDM Printer</p>
                <button className="border border-white py-2 px-4 hover:bg-white hover:text-gray-900 transition-colors w-fit text-sm">
                  More Details
                </button>
              </div>
              
              {/* Printer 2 */}
              <div className="flex flex-col">
                <div className="w-full h-64 bg-gray-800 mb-4 flex items-center justify-center p-4 rounded">
                  <img src="/3dprinters/prusa-i3-mk3s-mmu2s-multicolor-3d-printer-tashkent.webp" alt="Prusa i3 MK3S+ MMU2S" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-2xl font-bold">Prusa i3 MK3S+ MMU2S</h3>
                <p className="text-gray-400 mb-4">Multi-Material FDM</p>
                <button className="border border-white py-2 px-4 hover:bg-white hover:text-gray-900 transition-colors w-fit text-sm">
                  More Details
                </button>
              </div>
              
              {/* Printer 3 */}
              <div className="flex flex-col">
                <div className="w-full h-64 bg-gray-800 mb-4 flex items-center justify-center p-4 rounded">
                  <img src="/3dprinters/skrinter-3d-printer-uzbekistan.webp" alt="Skrinter" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-2xl font-bold">Skrinter</h3>
                <p className="text-gray-400 mb-4">Desktop FDM</p>
                <button className="border border-white py-2 px-4 hover:bg-white hover:text-gray-900 transition-colors w-fit text-sm">
                  More Details
                </button>
              </div>
              
              {/* Printer 4 */}
              <div className="flex flex-col">
                <div className="w-full h-64 bg-gray-800 mb-4 flex items-center justify-center p-4 rounded">
                  <img src="/3dprinters/raise3d-pro3-industrial-3d-printer-tashkent.webp" alt="Raise3D Pro3" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-2xl font-bold">Raise3D Pro3</h3>
                <p className="text-gray-400 mb-4">Industrial FDM</p>
                <button className="border border-white py-2 px-4 hover:bg-white hover:text-gray-900 transition-colors w-fit text-sm">
                  More Details
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Latest News Section */}
        <section className="py-10 md:py-16 bg-black text-white">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8">
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
          <div className="max-w-[1400px] mx-auto">
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