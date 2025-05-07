import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const PrototypingPage = () => {
  const { t } = useTranslation();
  const [videosLoaded, setVideosLoaded] = useState<boolean[]>([false, false, false]);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const videoRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null)
  ];
  
  // Local video files in the public directory
  const videos = [
    "/fablab/prototyping/videos/1.mp4",
    "/fablab/prototyping/videos/2.mp4",
    "/fablab/prototyping/videos/3.mp4"
  ];

  // Handle smooth scrolling for anchor links
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      // Add offset for header height
      const offset = 80;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      setActiveSection(targetId);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Update document title
    document.title = "Prototyping Services | FabLab";
    
    // Lazy load videos to improve mobile performance
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observers = videoRefs.map((ref, index) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && ref.current && !videosLoaded[index]) {
            const newLoadedState = [...videosLoaded];
            newLoadedState[index] = true;
            setVideosLoaded(newLoadedState);
            
            ref.current.load();
            ref.current.play().catch(e => {
              console.log(`Video ${index + 1} play error:`, e);
              document.addEventListener('click', function playOnClick() {
                ref.current?.play();
                document.removeEventListener('click', playOnClick);
              }, { once: true });
            });
            observer.unobserve(entry.target);
          }
        });
      }, options);
      
      if (ref.current) {
        observer.observe(ref.current);
      }
      
      return observer;
    });
    
    // Track scroll position to update active section
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      const sections = [
        { id: 'hero', position: 0 },
        { id: 'design', position: document.getElementById('design')?.offsetTop || 0 },
        { id: 'prototype', position: document.getElementById('prototype')?.offsetTop || 0 },
        { id: 'manufacture', position: document.getElementById('manufacture')?.offsetTop || 0 }
      ];
      
      // Find the current section based on scroll position
      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].position) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup observers and event listeners on component unmount
    return () => {
      observers.forEach((observer, index) => {
        if (videoRefs[index].current) {
          observer.unobserve(videoRefs[index].current!);
        }
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, [videosLoaded]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      {/* Main content */}
      <main className="flex-1">
        {/* Hero Section - Full screen with side-by-side sections */}
        <section id="hero" className="relative w-full h-screen overflow-hidden">
          <div className="flex flex-col md:flex-row h-full">
            {/* First Section - Design */}
            <div className="h-1/3 md:h-full md:w-1/3 bg-[#35469d] relative overflow-hidden">
              <div className="absolute inset-0">
                {!videosLoaded[0] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#35469d] bg-opacity-70 z-10">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <video 
                  ref={videoRefs[0]}
                  src={videos[0]}
                  className="absolute object-cover w-full h-full"
                  muted
                  playsInline
                  loop
                  preload="none"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center z-20">
                  <div className="container mx-auto px-4">
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="text-white"
                    >
                      <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-4">
                        Design
                      </h2>
                      <p className="text-xs md:text-base mb-2 md:mb-4 max-w-[200px] md:max-w-none">
                        Turn your ideas into reality with our design services.
                      </p>
                      <a 
                        href="#design" 
                        onClick={(e) => scrollToSection(e, 'design')}
                        className="inline-block bg-[#35469d] border-2 border-white text-white py-1 px-3 md:py-2 md:px-4 rounded hover:bg-opacity-90 transition-all text-xs md:text-sm"
                      >
                        Learn More
                      </a>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Section - Prototype */}
            <div className="h-1/3 md:h-full md:w-1/3 bg-[#294078] relative overflow-hidden">
              <div className="absolute inset-0">
                {!videosLoaded[1] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#294078] bg-opacity-70 z-10">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <video 
                  ref={videoRefs[1]}
                  src={videos[1]}
                  className="absolute object-cover w-full h-full"
                  muted
                  playsInline
                  loop
                  preload="none"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center z-20">
                  <div className="container mx-auto px-4">
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="text-white"
                    >
                      <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-4">
                        Prototype
                      </h2>
                      <p className="text-xs md:text-base mb-2 md:mb-4 max-w-[200px] md:max-w-none">
                        Build functional prototypes with our advanced equipment.
                      </p>
                      <a 
                        href="#prototype" 
                        onClick={(e) => scrollToSection(e, 'prototype')}
                        className="inline-block bg-[#294078] border-2 border-white text-white py-1 px-3 md:py-2 md:px-4 rounded hover:bg-opacity-90 transition-all text-xs md:text-sm"
                      >
                        Learn More
                      </a>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            {/* Third Section - Manufacture */}
            <div className="h-1/3 md:h-full md:w-1/3 bg-[#1E2F5C] relative overflow-hidden">
              <div className="absolute inset-0">
                {!videosLoaded[2] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#1E2F5C] bg-opacity-70 z-10">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <video 
                  ref={videoRefs[2]}
                  src={videos[2]}
                  className="absolute object-cover w-full h-full"
                  muted
                  playsInline
                  loop
                  preload="none"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center z-20">
                  <div className="container mx-auto px-4">
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                      className="text-white"
                    >
                      <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-4">
                        Manufacture
                      </h2>
                      <p className="text-xs md:text-base mb-2 md:mb-4 max-w-[200px] md:max-w-none">
                        Scale your projects with UV printing, sticker production, and small-batch manufacturing.
                      </p>
                      <a 
                        href="#manufacture" 
                        onClick={(e) => scrollToSection(e, 'manufacture')}
                        className="inline-block bg-[#1E2F5C] border-2 border-white text-white py-1 px-3 md:py-2 md:px-4 rounded hover:bg-opacity-90 transition-all text-xs md:text-sm"
                      >
                        Learn More
                      </a>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">Our Prototyping Services</h2>
            
            {/* Design Section */}
            <div id="design" className="mb-16 scroll-mt-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">Design</h3>
                  <p className="text-gray-600 mb-4">
                    Our design services help turn your innovative ideas into tangible concepts. We work closely with you to understand your vision, requirements, and constraints.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Concept development and ideation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>3D modeling and CAD design</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Design for manufacturing optimizations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>User experience and interface design</span>
                    </li>
                  </ul>
                </div>
                <div className="order-1 md:order-2">
                  <img 
                    src="/prototyping/Design.jpeg" 
                    alt="Design process" 
                    className="rounded-lg shadow-lg w-full h-auto object-cover aspect-[4/3]"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://placehold.co/600x400/e2e8f0/1e293b?text=Design+Services";
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* Prototype Section */}
            <div id="prototype" className="mb-16 scroll-mt-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <img 
                    src="/prototyping/Prototype.webp" 
                    alt="Prototyping equipment" 
                    className="rounded-lg shadow-lg w-full h-auto object-cover aspect-[4/3]"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://placehold.co/600x400/e2e8f0/1e293b?text=Prototyping+Services";
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">Prototype</h3>
                  <p className="text-gray-600 mb-4">
                    Bring your designs to life with our advanced prototyping services. We use state-of-the-art equipment to create functional prototypes for testing and validation.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Rapid prototyping with 3D printing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>CNC machining for precision components</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Laser cutting and engraving</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Electronic prototyping and PCB fabrication</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Manufacture Section */}
            <div id="manufacture" className="mb-8 scroll-mt-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">Manufacture</h3>
                  <p className="text-gray-600 mb-4">
                    Scale your project from prototype to production with our manufacturing capabilities. We help you move from concept to market-ready products efficiently with advanced machines including UV printing and sticker production.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Small batch production runs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>UV printing for high-quality finishes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Custom sticker and label production</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Assembly and quality control</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Production optimization</span>
                    </li>
                  </ul>
                </div>
                <div className="order-1 md:order-2">
                  <img 
                    src="/fablab/prototyping/manufacture.jpg" 
                    alt="Manufacturing process" 
                    className="rounded-lg shadow-lg w-full h-auto object-cover aspect-[4/3]"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://placehold.co/600x400/e2e8f0/1e293b?text=Manufacturing+Services";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Ready to Turn Your Ideas into Reality?</h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-8">
              Our team of experts is ready to help you through every stage of the development process, from initial concept to final production.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-blue-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
            >
              Contact Us Today
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrototypingPage;