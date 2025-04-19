
import { useEffect, useRef, useState } from "react";

const ScrollAnimationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far into the section we've scrolled (0 to 1)
      let progress = 0;
      
      if (top < windowHeight && top > -height) {
        // Section is visible
        progress = Math.min(Math.max((windowHeight - top) / (windowHeight + height), 0), 1);
      } else if (top <= -height) {
        // Section is completely scrolled past
        progress = 1;
      }
      
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 relative">
            Fibres, Fillings & Non-Wovens
            <span
              className="absolute -bottom-2 left-0 h-1 bg-black transition-all duration-700 ease-out"
              style={{ width: `${scrollProgress * 100}%` }}
            ></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="relative overflow-hidden"
              style={{
                transform: `translateY(${Math.max(0, 1 - scrollProgress * 1.5) * 100}px)`,
                opacity: scrollProgress * 1.5 > 0.5 ? 1 : scrollProgress * 1.5 * 2,
                transition: "transform 0.5s ease-out, opacity 0.8s ease-out",
              }}
            >
              <div className="h-64 bg-gray-200 mb-4 overflow-hidden">
                <div
                  className="w-full h-full bg-black"
                  style={{
                    clipPath: `inset(0 ${100 - scrollProgress * 120}% 0 0)`,
                    transition: "clip-path 1s ease-out",
                  }}
                ></div>
              </div>
              <h3 className="text-2xl font-bold mb-2">Product Category {item}</h3>
              <p className="text-gray-700">
                Innovative solutions that transform industries and create sustainable futures.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollAnimationSection;
