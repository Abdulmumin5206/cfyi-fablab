import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const PrototypingPage = () => {
  const { t } = useTranslation();
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

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Preload and play all videos simultaneously
    videoRefs.forEach((ref, index) => {
      if (ref.current) {
        ref.current.load();
        
        const playVideo = () => {
          if (ref.current) {
            ref.current.play().catch(e => {
              console.log(`Video ${index + 1} play error:`, e);
              document.addEventListener('click', function playOnClick() {
                ref.current?.play();
                document.removeEventListener('click', playOnClick);
              }, { once: true });
            });
          }
        };
        
        playVideo();
        setTimeout(playVideo, 1000);
      }
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      {/* Main content with negative margin to account for header height */}
      <main className="flex-1 mt-[-80px] md:mt-[-96px]">
        {/* Desktop Layout: Side by Side */}
        <div className="hidden md:flex flex-row min-h-screen pt-24">
          {/* First Section - 1/3 */}
          <section className="w-1/3 bg-[#35469d] relative overflow-hidden h-screen flex items-center">
            <div className="relative h-full w-full">
              <div className="absolute inset-0">
                <video 
                  ref={videoRefs[0]}
                  src={videos[0]}
                  className="absolute object-cover w-full h-full"
                  muted
                  playsInline
                  loop
                  autoPlay
                  preload="auto"
                />
              </div>
              
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
                <div className="container mx-auto px-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-white"
                  >
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      Design
                    </h2>
                    <p className="text-sm md:text-base mb-4">
                      Turn your ideas into reality with our design services.
                    </p>
                    <a 
                      href="#design" 
                      className="inline-block bg-[#35469d] border-2 border-white text-white py-2 px-4 rounded hover:bg-opacity-90 transition-all text-sm"
                    >
                      Learn More
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* Second Section - 1/3 */}
          <section className="w-1/3 bg-[#294078] relative overflow-hidden h-screen flex items-center">
            <div className="relative h-full w-full">
              <div className="absolute inset-0">
                <video 
                  ref={videoRefs[1]}
                  src={videos[1]}
                  className="absolute object-cover w-full h-full"
                  muted
                  playsInline
                  loop
                  autoPlay
                  preload="auto"
                />
              </div>
              
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
                <div className="container mx-auto px-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-white"
                  >
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      Prototype
                    </h2>
                    <p className="text-sm md:text-base mb-4">
                      Build functional prototypes with our advanced equipment.
                    </p>
                    <a 
                      href="#prototype" 
                      className="inline-block bg-[#294078] border-2 border-white text-white py-2 px-4 rounded hover:bg-opacity-90 transition-all text-sm"
                    >
                      Learn More
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* Third Section - 1/3 */}
          <section className="w-1/3 bg-[#1E2F5C] relative overflow-hidden h-screen flex items-center">
            <div className="relative h-full w-full">
              <div className="absolute inset-0">
                <video 
                  ref={videoRefs[2]}
                  src={videos[2]}
                  className="absolute object-cover w-full h-full"
                  muted
                  playsInline
                  loop
                  autoPlay
                  preload="auto"
                />
              </div>
              
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
                <div className="container mx-auto px-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="text-white"
                  >
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      Manufacture
                    </h2>
                    <p className="text-sm md:text-base mb-4">
                      Scale your project with our manufacturing capabilities.
                    </p>
                    <a 
                      href="#manufacture" 
                      className="inline-block bg-[#1E2F5C] border-2 border-white text-white py-2 px-4 rounded hover:bg-opacity-90 transition-all text-sm"
                    >
                      Learn More
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Mobile Layout: Stacked Horizontally */}
        <div className="md:hidden flex flex-col">
          {/* First Section - Mobile */}
          <section className="h-[33vh] bg-[#35469d] relative overflow-hidden flex items-center">
            <div className="relative h-full w-full">
              <div className="absolute inset-0">
                <video 
                  ref={videoRefs[0]}
                  src={videos[0]}
                  className="absolute object-cover w-full h-full"
                  muted
                  playsInline
                  loop
                  autoPlay
                  preload="auto"
                />
              </div>
              
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
                <div className="container mx-auto px-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-white"
                  >
                    <h2 className="text-xl font-bold mb-2">
                      Design
                    </h2>
                    <p className="text-xs mb-2 max-w-[200px]">
                      Turn your ideas into reality with our design services.
                    </p>
                    <a 
                      href="#design" 
                      className="inline-block bg-[#35469d] border-2 border-white text-white py-1 px-3 rounded hover:bg-opacity-90 transition-all text-xs"
                    >
                      Learn More
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* Second Section - Mobile */}
          <section className="h-[33vh] bg-[#294078] relative overflow-hidden flex items-center">
            <div className="relative h-full w-full">
              <div className="absolute inset-0">
                <video 
                  ref={videoRefs[1]}
                  src={videos[1]}
                  className="absolute object-cover w-full h-full"
                  muted
                  playsInline
                  loop
                  autoPlay
                  preload="auto"
                />
              </div>
              
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
                <div className="container mx-auto px-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-white"
                  >
                    <h2 className="text-xl font-bold mb-2">
                      Prototype
                    </h2>
                    <p className="text-xs mb-2 max-w-[200px]">
                      Build functional prototypes with our advanced equipment.
                    </p>
                    <a 
                      href="#prototype" 
                      className="inline-block bg-[#294078] border-2 border-white text-white py-1 px-3 rounded hover:bg-opacity-90 transition-all text-xs"
                    >
                      Learn More
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* Third Section - Mobile */}
          <section className="h-[33vh] bg-[#1E2F5C] relative overflow-hidden flex items-center">
            <div className="relative h-full w-full">
              <div className="absolute inset-0">
                <video 
                  ref={videoRefs[2]}
                  src={videos[2]}
                  className="absolute object-cover w-full h-full"
                  muted
                  playsInline
                  loop
                  autoPlay
                  preload="auto"
                />
              </div>
              
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
                <div className="container mx-auto px-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-white"
                  >
                    <h2 className="text-xl font-bold mb-2">
                      Manufacture
                    </h2>
                    <p className="text-xs mb-2 max-w-[200px]">
                      Scale your project with our manufacturing capabilities.
                    </p>
                    <a 
                      href="#manufacture" 
                      className="inline-block bg-[#1E2F5C] border-2 border-white text-white py-1 px-3 rounded hover:bg-opacity-90 transition-all text-xs"
                    >
                      Learn More
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Services Section */}
        <section id="services" className="py-16 bg-white">
          {/* ... rest of your services section remains the same ... */}
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gray-100">
          {/* ... your CTA section remains the same ... */}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrototypingPage;