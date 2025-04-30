import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "@/styles/Slider.module.css";

const MouldPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marketsRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update document title
    document.title = "Mould & Molding Services | FabLab";
    
    console.log("Mould page mounted");
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
        {/* Hero Section with Full-Width Video */}
        <section className="relative w-full h-screen">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
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
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
          
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-white">
              <div className="max-w-2xl">
                <div className="text-gray-300 font-medium mb-2">PROFESSIONAL MOULDING SOLUTIONS</div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Custom Mould & Casting Services</h1>
                
                <div className="space-y-4 text-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p>Silicone mould making for complex geometries</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p>Polyurethane, epoxy, and specialty resin casting</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p>Perfect for prototypes, small-batch production, and art projects</p>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a href="#" className="inline-block bg-gray-800 text-white font-medium px-6 py-3 rounded-md hover:bg-black transition-colors text-center">
                    Get a Quote
                  </a>
                  <a href="#" className="inline-block bg-white text-gray-800 font-medium px-6 py-3 rounded-md border border-gray-800 hover:bg-gray-100 transition-colors text-center">
                    Learn About Materials
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <a href="#materials" className="flex flex-col items-center text-white">
              <span className="mb-2">Scroll Down</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </section>
        
        {/* Materials Section */}
        <section id="materials" className="relative bg-white text-gray-900">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col lg:flex-row items-center">
            {/* Left side content */}
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0 pr-0 lg:pr-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Premium quality <span className="text-gray-600">materials for every mould and casting project</span>
              </h1>
              
              <div className="flex flex-wrap gap-2 mb-8">
                <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm">
                  <span>Silicone</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm">
                  <span>Polyurethane</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm">
                  <span>Epoxy</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm">
                  <span>Rigid</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm">
                  <span>Flexible</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm">
                  <span>Transparent</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm">
                  <span>Food-Safe</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm">
                  <span>High-Temperature</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm">
                  <span>Specialty Fillers</span>
                </button>
              </div>
              
              <button className="bg-gray-800 hover:bg-black text-white px-6 py-3 rounded-md font-medium">
                REQUEST A CONSULTATION
              </button>
            </div>
            
            {/* Right side image */}
            <div className="w-full lg:w-3/4 lg:pl-8">
              <div className="relative w-full">
                <img 
                  src="/mould/imhero.webp" 
                  alt="Premium Moulding Materials" 
                  className="w-full aspect-[4/3] object-cover h-auto max-h-[650px]"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Case Studies Section */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Moulding Applications</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Case Study 1 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
                <div className="md:w-2/5 h-48 md:h-auto overflow-hidden">
                  <img 
                    src="/mould/Screenshot_7.jpg" 
                    alt="Product Design Prototype" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-3/5 p-6">
                  <div className="text-blue-600 text-sm font-semibold mb-2">PRODUCT DESIGN</div>
                  <h3 className="text-xl font-bold mb-4">Creating High-Fidelity Prototypes with Silicone Moulds</h3>
                  <a href="#" className="text-blue-600 flex items-center gap-2 font-medium hover:text-blue-800 transition-colors">
                    Learn More
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
                    src="/mould/optimized_for_web_jpeg-07202023_rigid_10k_sample_card_2_189d-sh-standard-square.webp" 
                    alt="Architectural Model" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-3/5 p-6">
                  <div className="text-blue-600 text-sm font-semibold mb-2">ARCHITECTURE</div>
                  <h3 className="text-xl font-bold mb-4">Architectural Elements Casting for Model Making and Restoration</h3>
                  <a href="#" className="text-blue-600 flex items-center gap-2 font-medium hover:text-blue-800 transition-colors">
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Moulding Process Section */}
        <section className="py-16 md:py-24 bg-gray-900 text-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 text-white text-center">Our Equipment for Moulding & Spare Parts</h1>
              
              {/* Equipment slider */}
              <div className="w-full">
                <div className="relative">
                  <div className="overflow-hidden" ref={marketsRef}>
                    <div className="flex space-x-6 py-4 px-2 transition-all duration-300" style={{ width: 'max-content' }}>
                      {/* Equipment 1 */}
                      <div className="w-[300px] flex-shrink-0">
                        <div className="bg-white rounded-lg overflow-hidden p-4 border border-gray-200">
                          <div className="h-64 mb-4 flex items-center justify-center">
                            <img src="/mould/Equipments/formlabs-form3-01_2_1.jpg" alt="Form 3 SLA Printer" className="h-full object-contain" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 text-center">Form 3 SLA Printer</h3>
                        </div>
                      </div>
                      
                      {/* Equipment 2 */}
                      <div className="w-[300px] flex-shrink-0">
                        <div className="bg-white rounded-lg overflow-hidden p-4 border border-gray-200">
                          <div className="h-64 mb-4 flex items-center justify-center">
                            <img src="/mould/Equipments/Phrozen.png" alt="Phrozen Sonic Mega 8K" className="h-full object-contain" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 text-center">Phrozen Sonic Mega 8K</h3>
                        </div>
                      </div>
                      
                      {/* Equipment 3 */}
                      <div className="w-[300px] flex-shrink-0">
                        <div className="bg-white rounded-lg overflow-hidden p-4 border border-gray-200">
                          <div className="h-64 mb-4 flex items-center justify-center">
                            <img src="/mould/Equipments/Raise.png" alt="Raise3D Pro3" className="h-full object-contain" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 text-center">Raise3D Pro3</h3>
                        </div>
                      </div>
                      
                      {/* Equipment 4 */}
                      <div className="w-[300px] flex-shrink-0">
                        <div className="bg-white rounded-lg overflow-hidden p-4 border border-gray-200">
                          <div className="h-64 mb-4 flex items-center justify-center">
                            <img src="/mould/Equipments/Phrozen mini.png" alt="Phrozen Mini 8K" className="h-full object-contain" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 text-center">Phrozen Mini 8K</h3>
                        </div>
                      </div>
                      
                      {/* Equipment 5 */}
                      <div className="w-[300px] flex-shrink-0">
                        <div className="bg-white rounded-lg overflow-hidden p-4 border border-gray-200">
                          <div className="h-64 mb-4 flex items-center justify-center">
                            <img src="/mould/Equipments/Prusa.avif" alt="Prusa i3 MK3S+" className="h-full object-contain" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 text-center">Prusa i3 MK3S+</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Navigation Arrows */}
                  <button 
                    onClick={scrollMarketLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-gray-700 hover:bg-gray-600 w-10 h-10 rounded-full flex items-center justify-center z-10 shadow-md"
                  >
                    <ArrowLeft className="w-5 h-5 text-white" />
                  </button>
                  <button 
                    onClick={scrollMarketRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-gray-700 hover:bg-gray-600 w-10 h-10 rounded-full flex items-center justify-center z-10 shadow-md"
                  >
                    <ArrowRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Spare Parts Section */}
        <section className="py-16 md:py-24 bg-gray-100 text-gray-900">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center">
              {/* Left side content */}
              <div className="w-full lg:w-1/2 mb-12 lg:mb-0 pr-0 lg:pr-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Replacement & Custom Spare Parts</h2>
                <p className="text-gray-700 mb-6 text-lg">
                  We specialize in creating high-quality spare parts using moulding and casting techniques when original replacements are unavailable or prohibitively expensive.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700">Replicate discontinued parts for machinery and equipment</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700">Create custom parts tailored to your specific requirements</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700">Wide range of materials for different applications</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#" className="inline-block bg-gray-800 text-white font-medium px-6 py-3 rounded-md hover:bg-black transition-colors text-center">
                    Request a Part
                  </a>
                  <a href="#" className="inline-block bg-white text-gray-800 font-medium px-6 py-3 rounded-md border border-gray-800 hover:bg-gray-100 transition-colors text-center">
                    View Sample Parts
                  </a>
                </div>
              </div>
              
              {/* Right side video */}
              <div className="w-full lg:w-3/4 lg:pl-8">
                <div className="relative w-full">
                  <video
                    className="w-full aspect-[4/3] object-cover h-auto max-h-[650px]"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                  >
                    <source 
                      src="/video/clearcast_loop_240903_720p_1mbps_h264.mp4" 
                      type="video/mp4" 
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  Video: Custom spare parts production process using silicone moulding
                </div>
              </div>
            </div>
            
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded shadow-sm">
                <div className="text-3xl font-bold mb-2 text-gray-800">01</div>
                <h3 className="text-xl font-bold mb-2">Assessment</h3>
                <p className="text-gray-600">We analyze your original part or blueprint to understand specifications and requirements.</p>
              </div>
              
              <div className="bg-white p-6 rounded shadow-sm">
                <div className="text-3xl font-bold mb-2 text-gray-800">02</div>
                <h3 className="text-xl font-bold mb-2">Design & Prototyping</h3>
                <p className="text-gray-600">We create a master pattern using precision 3D printing or machining technologies.</p>
              </div>
              
              <div className="bg-white p-6 rounded shadow-sm">
                <div className="text-3xl font-bold mb-2 text-gray-800">03</div>
                <h3 className="text-xl font-bold mb-2">Mould Creation</h3>
                <p className="text-gray-600">We develop a high-detail silicone mould capable of producing multiple copies.</p>
              </div>
              
              <div className="bg-white p-6 rounded shadow-sm">
                <div className="text-3xl font-bold mb-2 text-gray-800">04</div>
                <h3 className="text-xl font-bold mb-2">Production</h3>
                <p className="text-gray-600">We cast your parts using materials optimized for your specific application needs.</p>
              </div>
            </div>
            
            <div className="mt-24 flex flex-col lg:flex-row items-center">
              {/* Left side image */}
              <div className="w-full lg:w-3/4 lg:pr-8">
                <div className="relative w-full">
                  <img 
                    src="/mould/optimized_for_web_jpeg-07202023_rigid_10k_sample_card_2_189d-sh-standard-square.webp" 
                    alt="Custom Spare Parts Examples" 
                    className="w-full aspect-[4/3] object-cover h-auto max-h-[650px]"
                  />
                </div>
              </div>
              
              {/* Right side content */}
              <div className="w-full lg:w-1/2 mt-12 lg:mt-0 pl-0 lg:pl-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Custom parts <span className="text-gray-600">when standard replacements are unavailable</span>
                </h1>
                
                <div className="space-y-4 mb-8">
                  <p className="text-gray-700">
                    Our advanced moulding and casting capabilities allow us to reproduce discontinued or hard-to-find parts with precision and accuracy.
                  </p>
                  <p className="text-gray-700">
                    We can work from original parts, technical drawings, or even create new designs based on your specifications. 
                  </p>
                </div>
                
                <button className="bg-gray-800 hover:bg-black text-white px-6 py-3 rounded-md font-medium">
                  EXPLORE CASE STUDIES
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Spare Parts Applications Section */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Spare Parts Applications</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Application 1 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
                <div className="md:w-2/5 h-48 md:h-auto overflow-hidden">
                  <img 
                    src="/mould/Screenshot_7.jpg" 
                    alt="Industrial Machine Parts" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-3/5 p-6">
                  <div className="text-blue-600 text-sm font-semibold mb-2">INDUSTRIAL EQUIPMENT</div>
                  <h3 className="text-xl font-bold mb-4">Replacement Parts for Industrial Machinery and Equipment</h3>
                  <a href="#" className="text-blue-600 flex items-center gap-2 font-medium hover:text-blue-800 transition-colors">
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Application 2 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
                <div className="md:w-2/5 h-48 md:h-auto overflow-hidden">
                  <img 
                    src="/mould/optimized_for_web_jpeg-07202023_rigid_10k_sample_card_2_189d-sh-standard-square.webp" 
                    alt="Consumer Product Parts" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-3/5 p-6">
                  <div className="text-blue-600 text-sm font-semibold mb-2">CONSUMER PRODUCTS</div>
                  <h3 className="text-xl font-bold mb-4">Custom Parts for Consumer Products and Home Appliances</h3>
                  <a href="#" className="text-blue-600 flex items-center gap-2 font-medium hover:text-blue-800 transition-colors">
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-10 md:py-16 bg-gray-50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">Frequently Asked Questions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">What materials can be used for mould making?</h3>
                <p className="text-gray-700">We offer various silicone rubbers with different durometers and properties to suit your specific project needs, including tin-cure, platinum-cure, and specialty formulations.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">Which casting materials do you offer?</h3>
                <p className="text-gray-700">We work with polyurethane resins, epoxy resins, casting urethanes, polyester resins, and specialty materials including flexible, rigid, transparent, and filled formulations.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">How long does the moulding process take?</h3>
                <p className="text-gray-700">The timeline depends on project complexity. Simple moulds can be completed in 2-3 days, while complex projects may take 1-2 weeks. We'll provide a specific timeline during consultation.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">Can you create food-safe moulds?</h3>
                <p className="text-gray-700">Yes, we offer food-grade silicone options for culinary applications, chocolate making, and food presentation. We'll help you select the appropriate food-safe material for your project.</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <a href="#" className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
                Ask Us a Question
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MouldPage; 