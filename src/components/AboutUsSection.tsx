import React, { useRef, useEffect, useState } from 'react';

const AboutUsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const cardData = [
    {
      title: 'Pioneers',
      text: 'We are proud to be the first official FabLab in Uzbekistan, paving the way for digital fabrication and innovation in the region. Our lab operates under the umbrella of CFYI (Center for Youth Innovation), empowering the next generation of creators and engineers.',
      buttonText: 'Learn more about CFYI',
      link: 'https://cfyi.uz/',
      image: '/main/About US/cfyi.svg', // Assuming this SVG exists in the folder
      imageAlt: 'CFYI Logo'
    },
    {
      title: 'Global Network',
      text: 'As part of the worldwide FabLab network, we are connected to a global community of makers, educators, and innovators. The FabLab concept, rooted in open access and knowledge sharing, is transforming local communities across the planet.',
      buttonText: 'Learn more about the FabLab network',
      link: 'https://fablabs.io/labs/fablabatthecenterforyouthinitiatives',
      image: '/main/About US/GlobalFablab.svg', // Assuming this SVG exists
      imageAlt: 'FabLab Logo'
    },
    {
      title: 'MIT Standards',
      text: 'Our FabLab is built on the original MIT FabLab principles, ensuring that we meet the global standards of innovation, safety, and accessibility established by the Massachusetts Institute of Technology.',
      buttonText: 'Learn more about MIT FabLabs',
      link: 'https://fabacademy.org/',
      image: '/main/About US/Mit.jpg', // Assuming this SVG exists
      imageAlt: 'MIT Logo'
    },
    {
      title: 'Cutting-Edge Tools',
      text: 'Equipped with advanced digital fabrication tools, from high-precision CNCs to industrial-grade 3D printers and laser cutters, we offer unmatched opportunities for prototyping, education, and production.',
      buttonText: 'Explore our equipment',
      link: 'https://cfyi.uz/labs', // Linking to the Labs page on CFYI as a relevant page
      image: '/main/About US/equipment.svg', // Assuming a relevant SVG exists
      imageAlt: 'Cutting-Edge Tools'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-gray-200"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
        <h2 className="text-left text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-black">Behind the Innovation</h2>
        <p className="text-left text-gray-700 text-lg mb-8 sm:mb-12">Feels modern, fitting for a FabLab with cutting-edge tools.</p>
        {/* Mobile Layout */}
        <div className="grid grid-cols-1 gap-6 sm:hidden">
          {cardData.map((card, index) => (
            <div 
              key={index}
              className={`group bg-white p-4 shadow-md relative flex flex-col justify-between min-h-[300px] transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="absolute top-0 right-0 w-8 h-8 bg-yellow-400"></div>
              
              {/* Content */}
              <div className="relative z-20">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 text-black">{card.title}</h3>
                <p className="text-gray-700 text-base">{card.text}</p>
              </div>
              
              {/* Logo Container */}
              <div className="h-[120px] flex items-center justify-start">
                <a 
                  href={card.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full h-full flex items-center justify-start pl-4"
                >
                  <img 
                    src={card.image} 
                    alt={card.imageAlt} 
                    className={`object-contain transform transition-transform duration-500 group-hover:scale-110 w-[60%] h-[60%] mt-4`}
                  />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Tablet and Desktop Layout */}
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardData.map((card, index) => (
            <div 
              key={index}
              className={`group bg-white p-4 sm:p-6 lg:p-8 shadow-md relative flex flex-col justify-between min-h-[350px] lg:min-h-[400px] transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="absolute top-0 right-0 w-8 h-8 bg-yellow-400"></div>
              
              {/* Content */}
              <div className="relative z-20">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 text-black">{card.title}</h3>
                <p className="text-gray-700 text-base">{card.text}</p>
              </div>
              
              {/* Logo Container */}
              <div className="h-[120px] flex items-center justify-start">
                <a 
                  href={card.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full h-full flex items-center justify-start pl-4"
                >
                  <img 
                    src={card.image} 
                    alt={card.imageAlt} 
                    className={`object-contain transform transition-transform duration-500 group-hover:scale-110 w-[60%] h-[60%] mt-4`}
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection; 