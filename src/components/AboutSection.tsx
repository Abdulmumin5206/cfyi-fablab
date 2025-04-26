import { useEffect, useRef, useState } from "react";

interface AboutCard {
  id: string;
  title: string;
  content: string;
  buttonText: string;
  buttonLink: string;
  accentColor: string;
}

const cards: AboutCard[] = [
  {
    id: "why-us",
    title: "Why Us?",
    content: "At Think Group, we believe that every fibre, every material, and every product has the potential to make a positive difference through our three dynamic divisions – Think Fibres, Think Non-Wovens and Think Engineering.",
    buttonText: "Learn More",
    buttonLink: "/",
    accentColor: "bg-brand-yellow",
  },
  {
    id: "heritage",
    title: "Heritage",
    content: "Our history shows our ability to anticipate market changes and adapt accordingly. This forward-thinking approach continues to drive our innovation today.",
    buttonText: "Learn More",
    buttonLink: "/",
    accentColor: "bg-brand-yellow",
  },
  {
    id: "sustainability",
    title: "Sustainability",
    content: "Today, as Think Group, we're writing the next chapter of our story. We're leveraging our deep understanding of textiles, commitment to sustainability, and drive for innovation to create solutions for the 21st century and beyond.",
    buttonText: "Learn More",
    buttonLink: "/",
    accentColor: "bg-brand-yellow",
  },
  {
    id: "contact-us",
    title: "Contact Us",
    content: "Whether you're in flooring, furniture, automotive, construction, or any industry in need of advanced fibre or non-woven solutions, Think Group is your partner in innovation. Let's think together about how we can transform your products, improve your sustainability profile, and create value for your customers.",
    buttonText: "Learn More",
    buttonLink: "/",
    accentColor: "bg-brand-yellow",
  },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
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
          A Heritage of Adaption and Innovation
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
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">{card.title}</h3>
                    <p className="text-sm sm:text-base mb-4 sm:mb-6 flex-grow">{card.content}</p>
                    <a
                      href={card.buttonLink}
                      className="inline-flex items-center space-x-1 border border-black py-1.5 sm:py-2 px-3 sm:px-4 text-sm sm:text-base hover:bg-black hover:text-white transition-colors"
                    >
                      <span className="ml-1">{card.buttonText}</span>
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
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">{card.title}</h3>
                <p className="text-sm sm:text-base mb-4 sm:mb-6 flex-grow">{card.content}</p>
                <a
                  href={card.buttonLink}
                  className="inline-flex items-center space-x-1 border border-black py-1.5 sm:py-2 px-3 sm:px-4 text-sm sm:text-base hover:bg-black hover:text-white transition-colors"
                >
                  <span className="ml-1">{card.buttonText}</span>
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
