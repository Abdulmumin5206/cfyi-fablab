
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
    <section ref={sectionRef} className="py-16 bg-brand-gray">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-5xl font-bold mb-12">
          A Heritage of Adaption and Innovation
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={`bg-white p-8 transition-all duration-700 transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex flex-col h-full">
                <div className={`w-8 h-8 ${card.accentColor} mb-6`}></div>
                <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                <p className="mb-6 flex-grow">{card.content}</p>
                <a
                  href={card.buttonLink}
                  className="inline-flex items-center space-x-1 border border-black py-2 px-4 hover:bg-black hover:text-white transition-colors"
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
