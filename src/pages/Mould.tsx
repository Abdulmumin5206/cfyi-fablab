import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import styles from "@/styles/Slider.module.css";

const MouldPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marketsRef = useRef<HTMLDivElement>(null);
  const equipmentContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const equipmentItems = 5; // Total number of equipment items
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const animationRef = useRef<number | null>(null);
  const scrollPositionRef = useRef(0);
  
  // Image comparison slider references and state
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderKnobRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50); // Start in the middle
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update document title
    document.title = "Mould & Molding Services | FabLab";
    
    console.log("Mould page mounted");
  }, []);

  // Optimized continuous animation effect for equipment carousel
  useEffect(() => {
    if (!equipmentContainerRef.current) return;
    
    const container = equipmentContainerRef.current;
    const firstItem = container.querySelector('.equipment-item') as HTMLElement;
    
    if (!firstItem) return;
    
    // Get the full width of an item including gap
    const itemWidth = firstItem.offsetWidth + 24; // 24px = gap (space-x-6)
    
    const animate = () => {
      if (!equipmentContainerRef.current || isPaused) {
        animationRef.current && cancelAnimationFrame(animationRef.current);
        return;
      }
      
      const container = equipmentContainerRef.current;
      
      // Increment position at a steady rate
      scrollPositionRef.current += 0.8; // Smoother, slightly slower speed
      
      // When first item is completely scrolled out of view
      if (scrollPositionRef.current >= itemWidth) {
        // Move first item to the end
        const firstItemElement = container.querySelector('.equipment-item') as HTMLElement;
        if (firstItemElement) {
          const clone = firstItemElement.cloneNode(true) as HTMLElement;
          container.appendChild(clone);
          container.removeChild(firstItemElement);
          
          // Reset scroll position to create seamless loop
          scrollPositionRef.current = 0;
        }
      }
      
      // Apply transformation without any conditional logic that might cause jumps
      container.style.transform = `translateX(-${scrollPositionRef.current}px)`;
      
      // Continue the animation
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start the animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup animation on component unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  // Initialize image comparison slider
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && sliderRef.current) {
        const sliderRect = sliderRef.current.getBoundingClientRect();
        const newPosition = ((e.clientX - sliderRect.left) / sliderRect.width) * 100;
        const clampedPosition = Math.max(0, Math.min(100, newPosition));
        setSliderPosition(clampedPosition);
      }
    };
    
    const handleTouchStart = () => {
      setIsDragging(true);
    };
    
    const handleTouchEnd = () => {
      setIsDragging(false);
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && sliderRef.current) {
        const sliderRect = sliderRef.current.getBoundingClientRect();
        const newPosition = ((e.touches[0].clientX - sliderRect.left) / sliderRect.width) * 100;
        const clampedPosition = Math.max(0, Math.min(100, newPosition));
        setSliderPosition(clampedPosition);
      }
    };
    
    // Add event listeners
    if (sliderKnobRef.current) {
      sliderKnobRef.current.addEventListener('mousedown', handleMouseDown);
      sliderKnobRef.current.addEventListener('touchstart', handleTouchStart);
    }
    
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    return () => {
      // Remove event listeners on cleanup
      if (sliderKnobRef.current) {
        sliderKnobRef.current.removeEventListener('mousedown', handleMouseDown);
        sliderKnobRef.current.removeEventListener('touchstart', handleTouchStart);
      }
      
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging]);

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
                    <p>Cost-effective alternative to metallic molds for lower production runs</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p>High-precision SLA printing for master patterns and direct part production</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p>Specialized in spare parts production and small batch manufacturing</p>
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
        
        {/* Why Go Digital Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-center">Why Go Digital?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Benefit 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 w-32 h-32 flex items-center justify-center">
                  <img src="/mould/lower_costs.webp" alt="Lower Costs" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl font-bold mb-3">Lower Costs</h3>
                <p className="text-gray-600">Avoid the high up-front investment of tooling and reduce labor costs.</p>
              </div>
              
              {/* Benefit 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 w-32 h-32 flex items-center justify-center">
                  <img src="/mould/faster_time.webp" alt="Faster Turnaround Time" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl font-bold mb-3">Faster Turnaround Time</h3>
                <p className="text-gray-600">Produce high-quality patterns within 24 hours.</p>
              </div>
              
              {/* Benefit 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 w-32 h-32 flex items-center justify-center">
                  <img src="/mould/clean_workflow.webp" alt="Design Freedom" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl font-bold mb-3">Design Freedom</h3>
                <p className="text-gray-600">Create intricate shapes that would be difficult to achieve with traditional molding.</p>
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

        {/* Our Equipment for Moulding & Spare Parts Section */}
        <section className="py-16 md:py-24 bg-gray-900 text-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 text-white text-center">Our Equipment for Moulding & Spare Parts</h1>
              
              {/* Equipment slider - continuous motion version */}
              <div className="w-full max-w-5xl mx-auto overflow-hidden">
                <div className="relative">
                  <div className="overflow-hidden mb-6">
                    <div 
                      ref={equipmentContainerRef}
                      className="flex space-x-6 py-4 px-2 transition-none" 
                      style={{ width: 'max-content' }}
                    >
                      {/* Equipment 1 */}
                      <div 
                        className="w-[300px] flex-shrink-0 relative transform transition-all duration-300 equipment-item"
                        onMouseEnter={() => {
                          setIsPaused(true);
                          setHoveredItem(0);
                        }}
                        onMouseLeave={() => {
                          setIsPaused(false);
                          setHoveredItem(null);
                        }}
                        style={{
                          transform: hoveredItem === 0 ? 'scale(1.05)' : 'scale(1)',
                          zIndex: hoveredItem === 0 ? 10 : 1
                        }}
                      >
                        <div className="bg-white rounded-lg overflow-hidden p-4 border border-gray-200 h-full shadow-lg transition-shadow duration-300" 
                          style={{
                            boxShadow: hoveredItem === 0 ? '0 10px 25px rgba(0, 0, 0, 0.2)' : ''
                          }}
                        >
                          <div className="h-64 mb-4 flex items-center justify-center overflow-hidden">
                            <img src="/mould/Equipments/formlabs-form3-01_2_1.webp" alt="Form 3 SLA Printer" 
                              className="h-full object-contain transition-transform duration-700" 
                              style={{
                                transform: hoveredItem === 0 ? 'scale(1.1) rotate(2deg)' : 'scale(1) rotate(0)'
                              }}
                            />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Form 3 SLA Printer</h3>
                          <div 
                            className="overflow-hidden transition-all duration-500"
                            style={{
                              maxHeight: hoveredItem === 0 ? '100px' : '0',
                              opacity: hoveredItem === 0 ? 1 : 0
                            }}
                          >
                            <p className="text-gray-600 text-sm text-center">High-resolution SLA printing with exceptional detail for precise master patterns.</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Equipment 2 */}
                      <div 
                        className="w-[300px] flex-shrink-0 relative transform transition-all duration-300 equipment-item"
                        onMouseEnter={() => {
                          setIsPaused(true);
                          setHoveredItem(1);
                        }}
                        onMouseLeave={() => {
                          setIsPaused(false);
                          setHoveredItem(null);
                        }}
                        style={{
                          transform: hoveredItem === 1 ? 'scale(1.05)' : 'scale(1)',
                          zIndex: hoveredItem === 1 ? 10 : 1
                        }}
                      >
                        <div className="bg-white rounded-lg overflow-hidden p-4 border border-gray-200 h-full shadow-lg transition-shadow duration-300"
                          style={{
                            boxShadow: hoveredItem === 1 ? '0 10px 25px rgba(0, 0, 0, 0.2)' : ''
                          }}
                        >
                          <div className="h-64 mb-4 flex items-center justify-center overflow-hidden">
                            <img src="/mould/Equipments/Phrozen.webp" alt="Phrozen Sonic Mega 8K" 
                              className="h-full object-contain transition-transform duration-700"
                              style={{
                                transform: hoveredItem === 1 ? 'scale(1.1) rotate(2deg)' : 'scale(1) rotate(0)'
                              }}
                            />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Phrozen Sonic Mega 8K</h3>
                          <div 
                            className="overflow-hidden transition-all duration-500"
                            style={{
                              maxHeight: hoveredItem === 1 ? '100px' : '0',
                              opacity: hoveredItem === 1 ? 1 : 0
                            }}
                          >
                            <p className="text-gray-600 text-sm text-center">Large format 8K resolution for producing multiple parts with incredible detail.</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Equipment 3 */}
                      <div 
                        className="w-[300px] flex-shrink-0 relative transform transition-all duration-300 equipment-item"
                        onMouseEnter={() => {
                          setIsPaused(true);
                          setHoveredItem(2);
                        }}
                        onMouseLeave={() => {
                          setIsPaused(false);
                          setHoveredItem(null);
                        }}
                        style={{
                          transform: hoveredItem === 2 ? 'scale(1.05)' : 'scale(1)',
                          zIndex: hoveredItem === 2 ? 10 : 1
                        }}
                      >
                        <div className="bg-white rounded-lg overflow-hidden p-4 border border-gray-200 h-full shadow-lg transition-shadow duration-300"
                          style={{
                            boxShadow: hoveredItem === 2 ? '0 10px 25px rgba(0, 0, 0, 0.2)' : ''
                          }}
                        >
                          <div className="h-64 mb-4 flex items-center justify-center overflow-hidden">
                            <img src="/mould/Equipments/Raise.webp" alt="Raise3D Pro3" 
                              className="h-full object-contain transition-transform duration-700"
                              style={{
                                transform: hoveredItem === 2 ? 'scale(1.1) rotate(2deg)' : 'scale(1) rotate(0)'
                              }}
                            />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Raise3D Pro3</h3>
                          <div 
                            className="overflow-hidden transition-all duration-500"
                            style={{
                              maxHeight: hoveredItem === 2 ? '100px' : '0',
                              opacity: hoveredItem === 2 ? 1 : 0
                            }}
                          >
                            <p className="text-gray-600 text-sm text-center">Professional FDM printer for robust functional parts and specialized materials.</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Equipment 4 */}
                      <div 
                        className="w-[300px] flex-shrink-0 relative transform transition-all duration-300 equipment-item"
                        onMouseEnter={() => {
                          setIsPaused(true);
                          setHoveredItem(3);
                        }}
                        onMouseLeave={() => {
                          setIsPaused(false);
                          setHoveredItem(null);
                        }}
                        style={{
                          transform: hoveredItem === 3 ? 'scale(1.05)' : 'scale(1)',
                          zIndex: hoveredItem === 3 ? 10 : 1
                        }}
                      >
                        <div className="bg-white rounded-lg overflow-hidden p-4 border border-gray-200 h-full shadow-lg transition-shadow duration-300"
                          style={{
                            boxShadow: hoveredItem === 3 ? '0 10px 25px rgba(0, 0, 0, 0.2)' : ''
                          }}
                        >
                          <div className="h-64 mb-4 flex items-center justify-center overflow-hidden">
                            <img src="/mould/Equipments/Phrozen mini.webp" alt="Phrozen Mini 8K" 
                              className="h-full object-contain transition-transform duration-700"
                              style={{
                                transform: hoveredItem === 3 ? 'scale(1.1) rotate(2deg)' : 'scale(1) rotate(0)'
                              }}
                            />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Phrozen Mini 8K</h3>
                          <div 
                            className="overflow-hidden transition-all duration-500"
                            style={{
                              maxHeight: hoveredItem === 3 ? '100px' : '0',
                              opacity: hoveredItem === 3 ? 1 : 0
                            }}
                          >
                            <p className="text-gray-600 text-sm text-center">Compact desktop 8K resin printer delivering exceptional detail for small parts.</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Equipment 5 */}
                      <div 
                        className="w-[300px] flex-shrink-0 relative transform transition-all duration-300 equipment-item"
                        onMouseEnter={() => {
                          setIsPaused(true);
                          setHoveredItem(4);
                        }}
                        onMouseLeave={() => {
                          setIsPaused(false);
                          setHoveredItem(null);
                        }}
                        style={{
                          transform: hoveredItem === 4 ? 'scale(1.05)' : 'scale(1)',
                          zIndex: hoveredItem === 4 ? 10 : 1
                        }}
                      >
                        <div className="bg-white rounded-lg overflow-hidden p-4 border border-gray-200 h-full shadow-lg transition-shadow duration-300"
                          style={{
                            boxShadow: hoveredItem === 4 ? '0 10px 25px rgba(0, 0, 0, 0.2)' : ''
                          }}
                        >
                          <div className="h-64 mb-4 flex items-center justify-center overflow-hidden">
                            <img src="/mould/Equipments/Prusa.webp" alt="Prusa i3 MK3S+" 
                              className="h-full object-contain transition-transform duration-700"
                              style={{
                                transform: hoveredItem === 4 ? 'scale(1.1) rotate(2deg)' : 'scale(1) rotate(0)'
                              }}
                            />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Prusa i3 MK3S+</h3>
                          <div 
                            className="overflow-hidden transition-all duration-500"
                            style={{
                              maxHeight: hoveredItem === 4 ? '100px' : '0',
                              opacity: hoveredItem === 4 ? 1 : 0
                            }}
                          >
                            <p className="text-gray-600 text-sm text-center">Reliable workhorse for rapid prototyping and functional parts with wide material compatibility.</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Duplicate equipment items for smooth looping - at least 2 full sets */}
                      <div className="w-[300px] flex-shrink-0 relative transition-all duration-300 equipment-item">
                        <div className="bg-white rounded-lg overflow-hidden p-4 border border-gray-200">
                          <div className="h-64 mb-4 flex items-center justify-center">
                            <img src="/mould/Equipments/formlabs-form3-01_2_1.webp" alt="Form 3 SLA Printer" className="h-full object-contain" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 text-center">Form 3 SLA Printer</h3>
                        </div>
                      </div>
                      
                      <div className="w-[300px] flex-shrink-0 relative transition-all duration-300 equipment-item">
                        <div className="bg-white rounded-lg overflow-hidden p-4 border border-gray-200">
                          <div className="h-64 mb-4 flex items-center justify-center">
                            <img src="/mould/Equipments/Phrozen.webp" alt="Phrozen Sonic Mega 8K" className="h-full object-contain" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 text-center">Phrozen Sonic Mega 8K</h3>
                        </div>
                      </div>
                      
                      <div className="w-[300px] flex-shrink-0 relative transition-all duration-300 equipment-item">
                        <div className="bg-white rounded-lg overflow-hidden p-4 border border-gray-200">
                          <div className="h-64 mb-4 flex items-center justify-center">
                            <img src="/mould/Equipments/Raise.webp" alt="Raise3D Pro3" className="h-full object-contain" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 text-center">Raise3D Pro3</h3>
                        </div>
                      </div>
                    </div>
                  </div>
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
                  We specialize in creating high-quality spare parts using SLA 3D printing and casting techniques when original replacements are unavailable or prohibitively expensive.
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
                    <p className="text-gray-700">Replicate discontinued parts faster and more affordably than traditional methods</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700">Create custom parts tailored to your specific requirements with high precision</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700">Rapid prototyping and small production runs without expensive tooling costs</p>
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
              
              {/* Right side video - replaced with image */}
              <div className="w-full lg:w-3/4 lg:pl-8">
                <div className="relative w-full">
                  <img
                    src="/mould/spare1.webp"
                    alt="Custom Spare Parts Production"
                    className="w-full aspect-[4/3] object-cover h-auto max-h-[650px] rounded-md shadow-lg"
                  />
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  Custom spare parts production using SLA printing and silicone moulding techniques
                </div>
              </div>
            </div>
            
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-gray-800">Lower Costs</h3>
                <p className="text-gray-600">Avoid the high up-front investment of tooling and reduce labor costs.</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-gray-800">Faster Turnaround Time</h3>
                <p className="text-gray-600">Produce high-quality patterns within 24 hours.</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-gray-800">Flexible Manufacturing</h3>
                <p className="text-gray-600">Introduce on-demand production to increase flexibility and reduce dependence on large physical inventories.</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-gray-800">Design Freedom</h3>
                <p className="text-gray-600">Create intricate, organic shapes, condense assemblies, and introduce customization.</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-gray-800">Precision and Repeatability</h3>
                <p className="text-gray-600">Produce accurate tools and ensure process repeatability compared to manual methods.</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-gray-800">Lightweight and Ergonomic</h3>
                <p className="text-gray-600">Increase operator comfort and machine lifetime with lightweight and ergonomic plastic tools.</p>
              </div>
            </div>
            
            <div className="mt-24 flex flex-col lg:flex-row items-center">
              {/* Left side image comparison slider */}
              <div className="w-full lg:w-3/4 lg:pr-8">
                <div className="relative w-full">
                  {/* Image comparison slider */}
                  <div 
                    ref={sliderRef}
                    className="relative overflow-hidden rounded-md shadow-lg cursor-pointer aspect-[4/3] max-h-[650px] select-none"
                    style={{ backgroundColor: 'white', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none', userSelect: 'none' }}
                  >
                    {/* Before image (right image) - positioned absolutely, full width */}
                    <div className="absolute inset-0 select-none pointer-events-none">
                      <img 
                        src="/mould/spareright.webp" 
                        alt="Custom Spare Parts Example 2" 
                        className="w-full h-full object-cover select-none"
                        draggable="false"
                      />
                    </div>
                    
                    {/* After image (left image) - clipped based on slider position */}
                    <div 
                      className="absolute inset-0 overflow-hidden z-10 select-none pointer-events-none" 
                      style={{ width: `${sliderPosition}%` }}
                    >
                      <img 
                        src="/mould/spareleft.webp" 
                        alt="Custom Spare Parts Example 1" 
                        className="w-full h-full object-cover select-none"
                        style={{ 
                          width: `${100 / (sliderPosition / 100)}%`,
                          maxWidth: 'none' /* Prevent image constraint issues */
                        }}
                        draggable="false"
                      />
                    </div>
                    
                    {/* Slider control - increased z-index */}
                    <div 
                      className="absolute inset-y-0 z-20 pointer-events-none select-none"
                      style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                    >
                      {/* Vertical line */}
                      <div className="absolute inset-y-0 w-0.5 bg-white shadow-lg select-none"></div>
                      
                      {/* Draggable knob */}
                      <div 
                        ref={sliderKnobRef}
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl cursor-ew-resize pointer-events-auto border border-gray-200 hover:shadow-2xl transition-shadow select-none"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 select-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8M8 12h8m-8 5h8" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Additional div to prevent any overlay effect */}
                    <div className="absolute inset-0 pointer-events-none select-none" style={{ background: 'none', mixBlendMode: 'normal' }}></div>
                  </div>
                  
                  {/* Caption */}
                  <div className="mt-4 text-sm text-gray-500 text-center">
                    Drag the slider to compare before and after custom spare parts production
                  </div>
                </div>
              </div>
              
              {/* Right side content */}
              <div className="w-full lg:w-1/2 mt-12 lg:mt-0 pl-0 lg:pl-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Custom parts <span className="text-gray-600">when standard replacements are unavailable</span>
                </h1>
                
                <div className="space-y-4 mb-8">
                  <p className="text-gray-700">
                    Our advanced SLA printing and moulding capabilities allow us to reproduce discontinued or hard-to-find parts with precision and accuracy at a fraction of traditional manufacturing costs.
                  </p>
                  <p className="text-gray-700">
                    We can work from original parts, technical drawings, or even create new designs based on your specifications - all without the need for expensive metallic molds. 
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
                <h3 className="text-xl font-bold mb-3">How does SLA printing compare to traditional metallic molds?</h3>
                <p className="text-gray-700">SLA printing offers faster turnaround times and lower costs for small to medium production runs. While traditional metallic molds are better for mass production, our SLA technology provides exceptional detail and precision without the high upfront tooling costs.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">How long does the production process take?</h3>
                <p className="text-gray-700">The timeline depends on project complexity. Simple parts can be completed in 1-2 days, while complex projects may take 1 week. SLA printing significantly reduces lead times compared to traditional methods.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">What are the limitations of SLA printing for parts?</h3>
                <p className="text-gray-700">While SLA printing offers exceptional detail and quality, it has limitations in terms of material properties and production volume. We'll help you determine if SLA is right for your project or if alternative methods would be more suitable.</p>
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