import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  // Intersection Observer for video autoplay
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Lazy video play
  useEffect(() => {
    if (!isInView || !videoRef.current) return;
    videoRef.current.play().catch(error => {
      console.error('Video playback error:', error);
      setIsVideoLoading(false);
    });
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100vh] w-full bg-black md:h-[90vh] lg:h-screen"
    >
      <div className="w-full h-full">
        {isVideoLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
            <div className="w-8 h-8 md:w-12 md:h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
        <video
          ref={videoRef}
          className="w-full h-full object-cover object-center"
          muted
          loop
          playsInline
          preload="metadata"
          poster="/fablab/1.jpg"
          onCanPlay={() => setIsVideoLoading(false)}
          onError={(e) => {
            console.error('Video playback error:', e);
            setIsVideoLoading(false);
          }}
          onLoadStart={() => setIsVideoLoading(true)}
          onLoadedData={() => setIsVideoLoading(false)}
          onAbort={(e) => {
            console.error('Video loading error:', e);
            setIsVideoLoading(false);
          }}
        >
          <source src="/video/Fablab video horizontal.webm" type="video/webm" />
          <source src="/video/FabLab video horizontal.mp4" type="video/mp4" />
          {t('video.fallbackText')}
        </video>
        <div className="absolute inset-0 bg-black/50 z-10"></div>
      </div>
    </section>
  );
};

export default HeroSection;
