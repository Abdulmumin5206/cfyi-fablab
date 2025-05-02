import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface AboutCard {
  id: string;
  titleKey: string;
  contentKey: string;
  buttonTextKey: string;
  buttonLink: string;
  accentColor: string;
}

const AboutSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const cards: AboutCard[] = [
    {
      id: "why-us",
      titleKey: "about.title",
      contentKey: "about.description",
      buttonTextKey: "about.learnMore",
      buttonLink: "/",
      accentColor: "bg-brand-yellow",
    },
    {
      id: "heritage",
      titleKey: "about.title",
      contentKey: "about.description",
      buttonTextKey: "about.learnMore",
      buttonLink: "/",
      accentColor: "bg-brand-yellow",
    },
    {
      id: "sustainability",
      titleKey: "about.title",
      contentKey: "about.description",
      buttonTextKey: "about.learnMore",
      buttonLink: "/",
      accentColor: "bg-brand-yellow",
    },
    {
      id: "contact-us",
      titleKey: "contact.title",
      contentKey: "about.description",
      buttonTextKey: "about.learnMore",
      buttonLink: "/",
      accentColor: "bg-brand-yellow",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
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
    <section ref={sectionRef} className="py-10 sm:py-12 md:py-16 bg-brand-gray">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 md:mb-12">
          {t('about.title')}
        </h2>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {cards.map((card, index) => (
              <div
                key={card.id}
                className="flex-none w-[85%] mr-4 sm:mr-6 snap-start"
              >
                <div className="bg-white p-4 sm:p-6 md:p-8">
                  <div className="flex flex-col h-full">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 ${card.accentColor} mb-4 sm:mb-6`}></div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">{t(card.titleKey)}</h3>
                    <p className="text-sm sm:text-base mb-4 sm:mb-6 flex-grow">{t(card.contentKey)}</p>
                    <a
                      href={card.buttonLink}
                      className="inline-flex items-center space-x-1 border border-black py-1.5 sm:py-2 px-3 sm:px-4 text-sm sm:text-base hover:bg-black hover:text-white transition-colors"
                    >
                      <span className="ml-1">{t(card.buttonTextKey)}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={`bg-white p-5 sm:p-6 md:p-8 transition-all duration-700 transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex flex-col h-full">
                <div className={`w-6 h-6 sm:w-8 sm:h-8 ${card.accentColor} mb-4 sm:mb-6`}></div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">{t(card.titleKey)}</h3>
                <p className="text-sm sm:text-base mb-4 sm:mb-6 flex-grow">{t(card.contentKey)}</p>
                <a
                  href={card.buttonLink}
                  className="inline-flex items-center space-x-1 border border-black py-1.5 sm:py-2 px-3 sm:px-4 text-sm sm:text-base hover:bg-black hover:text-white transition-colors"
                >
                  <span className="ml-1">{t(card.buttonTextKey)}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
