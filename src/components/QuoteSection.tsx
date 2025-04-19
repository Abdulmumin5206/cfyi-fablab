
import { useEffect, useRef, useState } from "react";

const QuoteSection = () => {
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
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="relative">
              " If a job's worth doing,
              <span
                className={`absolute left-0 right-0 bottom-0 bg-black transition-all duration-1000 ${
                  isVisible ? "h-[4px] w-full opacity-100" : "h-0 w-0 opacity-0"
                }`}
                style={{ transitionDelay: "300ms" }}
              ></span>
            </span>
            <br />
            <span className="text-gray-300">
              it's worth doing well "
              <span
                className={`block h-[4px] bg-black transition-all duration-1000 mt-2 ${
                  isVisible ? "w-48 opacity-100" : "w-0 opacity-0"
                }`}
                style={{ transitionDelay: "600ms" }}
              ></span>
            </span>
          </h2>
          <div
            className={`mt-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "900ms" }}
          >
            <p className="text-xl font-semibold">: JOHN TAYLOR</p>
            <p className="text-gray-600">
              2nd Generation family member & Co-Founder of James Robinson Fibres
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
