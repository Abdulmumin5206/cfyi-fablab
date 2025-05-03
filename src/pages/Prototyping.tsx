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
        
        // Add autoplay attribute and add a click event to play the videos
        const playVideo = () => {
          if (ref.current) {
            ref.current.play().catch(e => {
              console.log(`Video ${index + 1} play error:`, e);
              // If there's an error on autoplay, set up a click handler to play on user interaction
              document.addEventListener('click', function playOnClick() {
                ref.current?.play();
                document.removeEventListener('click', playOnClick);
              }, { once: true });
            });
          }
        };
        
        playVideo();
        
        // Additional attempt to play after a short delay
        setTimeout(playVideo, 1000);
      }
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
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
            
            {/* Video Overlay */}
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
            
            {/* Video Overlay */}
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
            
            {/* Video Overlay */}
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
      <div className="md:hidden flex flex-col pt-24">
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
            
            {/* Video Overlay */}
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
            
            {/* Video Overlay */}
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
            
            {/* Video Overlay */}
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
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Prototyping Services</h2>
          
          {/* Laser Cutting */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center mb-20"
          >
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold mb-4 text-[#35469d]">Laser Cutting</h3>
              <p className="mb-4">
                Our high-precision laser cutting service offers exceptional accuracy for a wide range of materials including acrylic, wood, cardboard, and select metals. 
              </p>
              <ul className="list-disc pl-5 mb-4">
                <li>Precision cutting with tolerances down to 0.1mm</li>
                <li>Maximum material dimensions of 900 x 600 mm</li>
                <li>Thickness from 0.5mm to 20mm (material dependent)</li>
                <li>Intricate designs and complex geometries</li>
                <li>Fast turnaround times</li>
              </ul>
              <p>
                Perfect for signage, architectural models, product prototypes, artistic pieces, and custom components.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/fablab/laser-cutting.jpg" 
                alt="Laser cutting in action" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </motion.div>
          
          {/* CNC Machining */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row-reverse items-center mb-20"
          >
            <div className="md:w-1/2 mb-8 md:mb-0 md:pl-8">
              <h3 className="text-2xl font-bold mb-4 text-[#35469d]">CNC Machining</h3>
              <p className="mb-4">
                Our CNC machining capabilities allow for high-precision removal of material to create complex three-dimensional shapes from a variety of materials including wood, plastics, and metals.
              </p>
              <ul className="list-disc pl-5 mb-4">
                <li>3-axis CNC milling for precise prototypes</li>
                <li>Ability to work with wood, plastics, aluminum, and other soft metals</li>
                <li>Maximum work area of 600 x 400 x 150mm</li>
                <li>Tolerances as tight as 0.05mm</li>
                <li>Ideal for functional prototypes and end-use parts</li>
              </ul>
              <p>
                CNC machining is ideal for creating custom enclosures, functional mechanical parts, molds, and jigs or fixtures.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/fablab/cnc-machining.jpg" 
                alt="CNC machining process" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </motion.div>
          
          {/* 3D Scanning */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center mb-20"
          >
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold mb-4 text-[#35469d]">3D Scanning</h3>
              <p className="mb-4">
                Our advanced 3D scanning services create detailed digital models of physical objects. These scans can be used for reverse engineering, quality control, or as a starting point for further design work.
              </p>
              <ul className="list-disc pl-5 mb-4">
                <li>High-resolution scanning with accuracy up to 0.1mm</li>
                <li>Objects of various sizes from small components to larger objects</li>
                <li>Output in industry-standard file formats (.stl, .obj, .ply)</li>
                <li>Post-processing services to clean and optimize scan data</li>
                <li>Integration with CAD software for design modifications</li>
              </ul>
              <p>
                3D scanning is perfect for reverse engineering, archiving physical objects, creating digital twins, and capturing complex organic shapes.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/fablab/3d-scanning.jpg" 
                alt="3D scanning technology" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </motion.div>
          
          {/* UV Printing */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row-reverse items-center mb-20"
          >
            <div className="md:w-1/2 mb-8 md:mb-0 md:pl-8">
              <h3 className="text-2xl font-bold mb-4 text-[#35469d]">UV Printing</h3>
              <p className="mb-4">
                Our UV printing technology allows for high-resolution, full-color printing directly onto a wide variety of flat materials including plastics, wood, glass, metal, and more.
              </p>
              <ul className="list-disc pl-5 mb-4">
                <li>Print area up to 600 x 400mm</li>
                <li>Full CMYK + White printing capabilities</li>
                <li>Ability to print on materials up to 150mm thick</li>
                <li>Durable, scratch-resistant finish</li>
                <li>High resolution up to 1440 dpi</li>
              </ul>
              <p>
                UV printing is excellent for product branding, custom signage, promotional items, control panels, and personalized gifts.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/fablab/uv-printing.jpg" 
                alt="UV printing process" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </motion.div>
          
          {/* Stickers and Vinyl Cutting */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center"
          >
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold mb-4 text-[#35469d]">Stickers & Vinyl Cutting</h3>
              <p className="mb-4">
                Our vinyl cutting and sticker production services allow for the creation of custom decals, labels, and signage in a variety of colors and finishes.
              </p>
              <ul className="list-disc pl-5 mb-4">
                <li>Precision cutting of vinyl and adhesive materials</li>
                <li>Full-color printing with lamination options</li>
                <li>Indoor and outdoor-grade materials available</li>
                <li>Die-cut custom shapes and contours</li>
                <li>Various finishes including matte, glossy, and metallic</li>
              </ul>
              <p>
                Perfect for business signage, vehicle graphics, window displays, product labels, and promotional materials.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/fablab/vinyl-cutting.jpg" 
                alt="Vinyl cutting and sticker production" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Contact us today to discuss your prototyping needs or book a session to use our equipment with guidance from our expert staff.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/contact" 
              className="bg-[#35469d] text-white py-3 px-8 rounded hover:bg-opacity-90 transition-all"
            >
              Contact Us
            </a>
            <a 
              href="/book-session" 
              className="bg-[#E6DB00] text-black py-3 px-8 rounded hover:bg-opacity-90 transition-all"
            >
              Book a Session
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default PrototypingPage; 
