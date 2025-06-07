import { useState, useRef, useEffect } from 'react';
import { useTranslation } from "react-i18next";

interface ImageComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  alt: string;
}

const ImageComparisonSlider = ({ beforeImage, afterImage, alt }: ImageComparisonSliderProps) => {
  const { t } = useTranslation();
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault(); // Prevent text selection
    isDragging.current = true;
    handleMove(e);
  };

  const handleEnd = () => {
    isDragging.current = false;
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault(); // Prevent text selection

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const position = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  useEffect(() => {
    const handleMouseUp = () => handleEnd();
    const handleTouchEnd = () => handleEnd();

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[500px] overflow-hidden rounded-xl shadow-xl cursor-ew-resize select-none"
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
    >
      {/* Before Image (Full width) */}
      <img
        src={beforeImage}
        alt={`${alt} - Before`}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* After Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={afterImage}
          alt={`${alt} - After`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            width: `${100 / (sliderPosition / 100)}%`,
            transform: 'scale(1.2) translateY(2%)',
            transformOrigin: 'left center'
          }}
        />
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/80 cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Slider Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110">
          <div className="w-8 h-8 rounded-full bg-[#329db7] flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
        {t("serviceCategories.digitalFabrication.uvPrinting.labels.emptyKeyboard")}
      </div>
      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
        {t("serviceCategories.digitalFabrication.uvPrinting.labels.uvPrintedDesign")}
      </div>
    </div>
  );
};

export default ImageComparisonSlider; 