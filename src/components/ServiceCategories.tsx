import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  images: string[];
  logoText: string;
  buttonText: string;
  buttonLink: string;
  color: string;
}

const categories: ServiceCategory[] = [
  {
    id: "3d-printing",
    title: "3D Printing",
    description: "Advanced 3D printing solutions for rapid prototyping and production. Custom materials, high precision, and quick turnaround times.",
    images: [
      "/main/3dprinting1.jpg",
      "/main/3dprinting2.jpg",
      "/main/3dprinting3.jpg",
    ],
    logoText: "Think: 3D Printing",
    buttonText: "Explore 3D Printing",
    buttonLink: "/3d-printing",
    color: "bg-[#cb2026]",
  },
  {
    id: "mould",
    title: "Mould",
    description: "Precision mould design and manufacturing for various industries. Custom solutions with high-quality materials and expert craftsmanship.",
    images: [
      "/main/spareparts1.webp",
      "/main/sparepart2.webp",
      "/main/molding1.jpg",
      "/main/molding2.jpg",
    ],
    logoText: "Think: Mould",
    buttonText: "Explore Mould",
    buttonLink: "/mould",
    color: "bg-[#0e9a48]",
  },
  {
    id: "engineering",
    title: "Engineering",
    description: "Pioneering textile expertise in engineering. We specialise in fibre/feather cusion fillings machines and fabric inspection tables with emergency repairs.",
    images: [
      "/fablab/13.jpg",
      "/fablab/1.jpg",
      "/fablab/11.jpg",
    ],
    logoText: "Think: Engineering",
    buttonText: "Explore Engineering",
    buttonLink: "/engineering",
    color: "bg-[#35469d]",
  },
];

const ServiceCategories = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({
    "3d-printing": 0,
    "mould": 0,
    "engineering": 0,
  });

  // Auto-scroll effect for image sliders
  useEffect(() => {
    // Only start auto-scroll when section is visible
    if (!isVisible) return;
    
    const intervalIds = categories.map(category => {
      return setInterval(() => {
        setCurrentImageIndex(prev => ({
          ...prev,
          [category.id]: (prev[category.id] + 1) % category.images.length
        }));
      }, 3000 + Math.random() * 1000); // Slightly different interval for each slider to make them look less synchronized
    });
    
    return () => {
      intervalIds.forEach(id => clearInterval(id));
    };
  }, [isVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-white relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1600px] relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            Our Specialties
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our range of specialized services designed to meet your manufacturing and engineering needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 max-w-[1600px] mx-auto">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`transition-all duration-700 transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Auto-scrolling Image Slider */}
              <div className="relative aspect-square mb-10 overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                {/* Images with auto-transition */}
                {category.images.map((image, imgIndex) => (
                  <div
                    key={imgIndex}
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                      currentImageIndex[category.id] === imgIndex 
                        ? 'opacity-100 z-10' 
                        : 'opacity-0 z-0'
                    }`}
                    style={{ backgroundImage: `url(${image})` }}
                  />
                ))}
                
                {/* Category Label */}
                <div className={`absolute bottom-0 left-0 ${category.color} py-2 px-4 z-20`}>
                  <p className="text-white font-medium">
                    {category.id === "3d-printing" ? "3D Printing" : 
                     category.id === "mould" ? "Moulding and Spare Parts" : 
                     "Engineering"}
                  </p>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-sm mb-5 text-gray-700 leading-relaxed">{category.description}</p>

              {/* Button */}
              <a
                href={category.buttonLink}
                className={`inline-flex items-center ${category.color} text-white py-1.5 px-3 hover:opacity-90 transition-opacity text-sm`}
              >
                <span>{category.buttonText}</span>
                <ArrowRight size={14} className="ml-1.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories; 