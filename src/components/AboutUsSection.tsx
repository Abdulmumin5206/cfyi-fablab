import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const AboutUsSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const ticking = useRef(false);
  const animationFrameId = useRef<number | null>(null);
  

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

    // Optimized scroll handler using requestAnimationFrame
    const handleScroll = () => {
      if (!ticking.current) {
        // Use requestAnimationFrame for better performance
        animationFrameId.current = requestAnimationFrame(() => {
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
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    // Use passive event listener to improve scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
      
      // Clean up animation frame if component unmounts during animation
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const cardData = [
    {
      title: t('aboutUs.cards.pioneers.title'),
      text: t('aboutUs.cards.pioneers.text'),
      buttonText: t('aboutUs.cards.pioneers.buttonText'),
      link: 'https://cfyi.uz/',
      image: '/main/About US/cfyi.svg',
      imageAlt: 'CFYI Logo'
    },
    {
      title: t('aboutUs.cards.globalNetwork.title'),
      text: t('aboutUs.cards.globalNetwork.text'),
      buttonText: t('aboutUs.cards.globalNetwork.buttonText'),
      link: 'https://fablabs.io/labs/fablabatthecenterforyouthinitiatives',
      image: '/main/About US/GlobalFablab.svg',
      imageAlt: 'FabLab Logo'
    },
    {
      title: t('aboutUs.cards.mitStandards.title'),
      text: t('aboutUs.cards.mitStandards.text'),
      buttonText: t('aboutUs.cards.mitStandards.buttonText'),
      link: 'https://fabacademy.org/',
      image: '/main/About US/Mit.jpg',
      imageAlt: 'MIT Logo'
    },
    {
      title: t('aboutUs.cards.cuttingEdgeTools.title'),
      text: t('aboutUs.cards.cuttingEdgeTools.text'),
      buttonText: t('aboutUs.cards.cuttingEdgeTools.buttonText'),
      link: 'https://cfyi.uz/fablab',
      image: '/fablab/logo.png',
      imageAlt: 'FabLab Logo'
    }
  ];

  // Memoized calculation to reduce style recalculations
  const translateY = isVisible ? `${130 - (scrollPosition * 150)}%` : '130%';

  return (
    <section 
      ref={sectionRef}
      className="relative py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 bg-gray-200 overflow-hidden"
    >
      {/* Background Logo - optimized render */}
      <div className="absolute inset-0 hidden lg:flex items-center justify-center">
        <div 
          className="w-[100%] h-[100%] relative transition-all duration-1000 ease-out"
          style={{
            transform: `translateY(${translateY}) translateZ(0)`,
            opacity: isVisible ? 0.15 : 0,
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden'
          }}
        >
          <img 
            src="/main/FABLAB.webp"
            alt="FabLab Background"
            className="w-full h-full object-contain"
            loading="eager"
            style={{
              transform: 'translateZ(0)',
              willChange: 'transform',
              backfaceVisibility: 'hidden'
            }}
          />
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-3 sm:px-4 lg:px-6 max-w-[1200px]">
        <h2 className="text-left text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-black">{t('aboutUs.title')}</h2>
        <p className="text-left text-gray-700 text-base sm:text-lg mb-6 sm:mb-8">{t('aboutUs.subtitle')}</p>
        
        {/* Mobile Layout */}
        <div className="grid grid-cols-1 gap-3 sm:hidden">
          {cardData.map((card, index) => (
            <div 
              key={index}
              className={`group bg-white/90 backdrop-blur-sm p-3 shadow-md relative flex flex-col justify-between min-h-[250px] transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="absolute top-0 right-0 w-5 h-5 bg-yellow-400"></div>
              
              {/* Content */}
              <div className="relative z-20">
                <h3 className="text-base font-bold mb-2 text-black">{card.title}</h3>
                <p className="text-gray-700 text-sm">{card.text}</p>
              </div>
              
              {/* Logo Container */}
              <div className="h-[80px] flex items-center justify-center mt-2">
                <a 
                  href={card.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full h-full flex items-center justify-center"
                >
                  <img 
                    src={card.image} 
                    alt={card.imageAlt} 
                    className={`object-contain transform transition-transform duration-500 group-hover:scale-110 w-[65%] h-[65%] ${card.title === 'Cutting-Edge Tools' ? 'w-[85%] h-[85%]' : ''}`}
                  />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Tablet and Desktop Layout */}
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {cardData.map((card, index) => (
            <div 
              key={index}
              className={`group bg-white/90 backdrop-blur-sm p-3 md:p-4 lg:p-5 shadow-md relative flex flex-col justify-between min-h-[280px] md:min-h-[300px] lg:min-h-[320px] transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="absolute top-0 right-0 w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 bg-yellow-400"></div>
              
              {/* Content */}
              <div className="relative z-20">
                <h3 className="text-base md:text-lg lg:text-xl font-bold mb-2 md:mb-3 text-black">{card.title}</h3>
                <p className="text-gray-700 text-sm md:text-base">{card.text}</p>
              </div>
              
              {/* Logo Container */}
              <div className="h-[80px] md:h-[90px] lg:h-[100px] flex items-center justify-center mt-2 md:mt-3">
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