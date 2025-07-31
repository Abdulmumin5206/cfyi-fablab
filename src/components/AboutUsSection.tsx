import React from 'react';
import { useTranslation } from 'react-i18next';
import GradientText from './GradientText';

const AboutUsSection = () => {
  const { t } = useTranslation();

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

  return (
    <section 
      className="relative py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 bg-gray-200 overflow-hidden"
    >


      <div className="container relative z-10 mx-auto px-3 sm:px-4 lg:px-6 max-w-[1200px]">
        <div className="text-left mb-3 sm:mb-4">
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={4}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2"
          >
            {t('aboutUs.title')}
          </GradientText>
        </div>
        <p className="text-left text-gray-700 text-base sm:text-lg mb-6 sm:mb-8">{t('aboutUs.subtitle')}</p>
        
        {/* Mobile Layout */}
        <div className="grid grid-cols-1 gap-3 sm:hidden">
          {cardData.map((card, index) => (
            <div 
              key={index}
              className="group bg-white/90 backdrop-blur-sm p-3 shadow-md relative flex flex-col justify-between min-h-[250px]"
            >
              <div className="absolute top-0 right-0 w-5 h-5 bg-[#329db7]" style={{ marginTop: "-1px", marginRight: "-1px" }}></div>
              
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
              className="group bg-white/90 backdrop-blur-sm p-3 md:p-4 lg:p-5 shadow-md relative flex flex-col justify-between min-h-[280px] md:min-h-[300px] lg:min-h-[320px]"
            >
              <div className="absolute top-0 right-0 w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 bg-[#329db7]" style={{ marginTop: "-1px", marginRight: "-1px" }}></div>
              
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