import { useRef, useEffect, useState } from "react";

const SimpleVideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
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

  // Auto-play when in view
  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Auto-play failed:", error);
      });
    }
  }, [isInView]);

  return (
    <section ref={sectionRef} className="h-[70vh] bg-black flex items-center justify-center p-0 m-0">
      <div className="w-full h-full bg-black p-0 m-0">
        <div className="w-full h-full">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/fablab/1.jpg"
          >
            <source src="/video/FabLab video horizontal.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};

export default SimpleVideoSection; 