import React, { useRef, useEffect, useState } from 'react';

const AboutUsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Handle scroll
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top;
        const windowHeight = window.innerHeight;
        
        // Calculate how far through the section we've scrolled (0 to 1)
        const scrollProgress = 1 - (sectionTop / windowHeight);
        
        // Limit the value between 0 and 1
        const limitedProgress = Math.min(Math.max(scrollProgress, 0), 1);
        
        setScrollPosition(limitedProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const cardData = [
    {
      title: 'Pioneers',
      text: 'We are proud to be the first official FabLab in Uzbekistan, paving the way for digital fabrication and innovation in the region. Our lab operates under the umbrella of CFYI (Center for Youth Innovation), empowering the next generation of creators and engineers.',
      buttonText: 'Learn more about CFYI',
      link: 'https://cfyi.uz/',
      image: '/main/About US/cfyi.svg',
      imageAlt: 'CFYI Logo'
    },
    {
      title: 'Global Network',
      text: 'As part of the worldwide FabLab network, we are connected to a global community of makers, educators, and innovators. The FabLab concept, rooted in open access and knowledge sharing, is transforming local communities across the planet.',
      buttonText: 'Learn more about the FabLab network',
      link: 'https://fablabs.io/labs/fablabatthecenterforyouthinitiatives',
      image: '/main/About US/GlobalFablab.svg',
      imageAlt: 'FabLab Logo'
    },
    {
      title: 'MIT Standards',
      text: 'Our FabLab is built on the original MIT FabLab principles, ensuring that we meet the global standards of innovation, safety, and accessibility established by the Massachusetts Institute of Technology.',
      buttonText: 'Learn more about MIT FabLabs',
      link: 'https://fabacademy.org/',
      image: '/main/About US/Mit.jpg',
      imageAlt: 'MIT Logo'
    },
    {
      title: 'Cutting-Edge Tools',
      text: 'Equipped with advanced digital fabrication tools, from high-precision CNCs to industrial-grade 3D printers and laser cutters, we offer unmatched opportunities for prototyping, education, and production.',
      buttonText: 'Explore our equipment',
      link: 'https://cfyi.uz/fablab',
      image: '/fablab/logo.png',
      imageAlt: 'FabLab Logo'
    }
  ];

  // Calculate transform based on scroll position
  const translateY = isVisible ? `${130 - (scrollPosition * 150)}%` : '130%';

  return (
    <section 
      ref={sectionRef}
      className="relative py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-gray-200 overflow-hidden"
    >
      {/* Background Logo */}
      <div className="absolute inset-0 hidden lg:flex items-center justify-center">
        <div 
          className="w-[100%] h-[100%] relative transition-all duration-1000 ease-out"
          style={{
            transform: `translateY(${translateY})`,
            opacity: isVisible ? 0.15 : 0,
          }}
        >
          <img 
            src="/main/FABLAB.webp"
            alt="FabLab Background"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
        <h2 className="text-left text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-black">Behind the Innovation</h2>
        <p className="text-left text-gray-700 text-lg mb-8 sm:mb-12">Feels modern, fitting for a FabLab with cutting-edge tools.</p>
        
        {/* Mobile Layout */}
        <div className="grid grid-cols-1 gap-4 sm:hidden">
          {cardData.map((card, index) => (
            <div 
              key={index}
              className={`group bg-white/90 backdrop-blur-sm p-4 shadow-md relative flex flex-col justify-between min-h-[280px] transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="absolute top-0 right-0 w-6 h-6 bg-yellow-400"></div>
              
              {/* Content */}
              <div className="relative z-20">
                <h3 className="text-lg font-bold mb-2 text-black">{card.title}</h3>
                <p className="text-gray-700 text-sm">{card.text}</p>
              </div>
              
              {/* Logo Container */}
              <div className="h-[90px] flex items-center justify-center mt-2">
                <a 
                  href={card.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full h-full flex items-center justify-center"
                >
                  <img 
                    src={card.image} 
                    alt={card.imageAlt} 
                    className={`object-contain transform transition-transform duration-500 group-hover:scale-110 w-[65%] h-[65%] md:w-[70%] md:h-[70%] lg:w-[75%] lg:h-[75%] ${card.title === 'Cutting-Edge Tools' ? 'w-[85%] h-[85%] md:w-[90%] md:h-[90%] lg:w-[95%] lg:h-[95%]' : ''}`}
                  />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Tablet and Desktop Layout */}
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {cardData.map((card, index) => (
            <div 
              key={index}
              className={`group bg-white/90 backdrop-blur-sm p-4 md:p-5 lg:p-6 shadow-md relative flex flex-col justify-between min-h-[300px] md:min-h-[320px] lg:min-h-[340px] transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="absolute top-0 right-0 w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-yellow-400"></div>
              
              {/* Content */}
              <div className="relative z-20">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 lg:mb-3 text-black">{card.title}</h3>
                <p className="text-gray-700 text-sm md:text-base lg:text-lg">{card.text}</p>
              </div>
              
              {/* Logo Container */}
              <div className="h-[90px] md:h-[100px] lg:h-[110px] flex items-center justify-center mt-2 md:mt-3 lg:mt-3">
                <a 
                  href={card.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full h-full flex items-center justify-center"
                >
                  <img 
                    src={card.image} 
                    alt={card.imageAlt} 
                    className={`object-contain transform transition-transform duration-500 group-hover:scale-110 w-[65%] h-[65%] md:w-[70%] md:h-[70%] lg:w-[75%] lg:h-[75%] ${card.title === 'Cutting-Edge Tools' ? 'w-[85%] h-[85%] md:w-[90%] md:h-[90%] lg:w-[95%] lg:h-[95%]' : ''}`}
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