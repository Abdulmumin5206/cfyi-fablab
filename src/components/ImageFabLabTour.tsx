import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TourPoint {
  id: number;
  x: number;
  y: number;
  title: string;
  description: string;
  image: string;
  view: string;
  isBackButton?: boolean;
}

const ImageFabLabTour = () => {
  const { t } = useTranslation();
  const [activeImage, setActiveImage] = useState('/main/tour/starting.webp');
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [currentView, setCurrentView] = useState('entry');
  const [isExpanded, setIsExpanded] = useState(false);

  // Preload all images
  useEffect(() => {
    const allImages = [
      '/main/tour/starting.webp',
      '/main/tour/3dprinting.webp',
      '/main/tour/leftsideroom.webp',
      '/main/tour/bacsideuvprinting.webp',
      '/main/tour/stickermachine.webp',
      '/main/tour/anotherside.jpg'
    ];

    allImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const entryPoints: TourPoint[] = [
    {
      id: 1,
      x: 30, // 30% from left
      y: 45, // Updated: 60% from top (previously 40%)
      title: "3D Printing Area",
      description: "State-of-the-art 3D printers for rapid prototyping",
      image: "/main/tour/3dprinting.webp",
      view: "3dprinting"
    },
    {
      id: 2,
      x: 70, // 70% from left
      y: 50, // 50% from top
      title: "Workshop",
      description: "Professional workshop with advanced machinery",
      image: "/main/tour/starting.webp",
      view: "entry"
    },
    {
      id: 3,
      x: 10, // Updated: 15% from left (previously 10%)
      y: 90, // 70% from top
      title: "Left Side of the Room",
      description: "Additional workspace and equipment area",
      image: "/main/tour/leftsideroom.webp",
      view: "leftside"
    },
    {
      id: 4,
      x: 55, // Updated: 85% from left
      y: 95, // Updated: 85% from top
      title: "Back Side - UV Printing, CNC & Laser",
      description: "Advanced manufacturing equipment including UV printing, CNC machines, and laser cutting systems",
      image: "/main/tour/bacsideuvprinting.webp",
      view: "backside"
    }
  ];

  const leftSidePoints: TourPoint[] = [
    {
      id: 1,
      x: 10, // 10% from left
      y: 70, // 70% from top
      title: "Sticker Machine",
      description: "Professional sticker printing and cutting equipment",
      image: "/main/tour/stickermachine.webp",
      view: "stickermachine"
    },
    {
      id: 2,
      x: 50, // 50% from left
      y: 40, // 40% from top
      title: "3D Printing Area",
      description: "State-of-the-art 3D printers for rapid prototyping",
      image: "/main/tour/3dprinting.webp",
      view: "3dprinting"
    },
    {
      id: 3,
      x: 70, // 70% from left
      y: 70, // 70% from top
      title: "Main View Inside Room",
      description: "Another view which is the main view inside the room",
      image: "/main/tour/anotherside.jpg",
      view: "anotherside"
    }
  ];

  const anothersidePoints: TourPoint[] = [
    {
      id: 1,
      x: 25, // 40% from left
      y: 40, // 40% from top
      title: "CNC",
      description: "CNC machine area",
      image: "/main/tour/CNCVOLTER.jpg",
      view: "backside"
    },
    {
      id: 2,
      x: 5, // 20% from left
      y: 40, // 40% from top
      title: "Backside UV CNC, Laser cutter",
      description: "Backside area with UV printer, CNC, and laser cutter",
      image: "/main/tour/bacsideuvprinting.webp",
      view: "backside"
    },
    {
      id: 3,
      x: 20, // 40% from left
      y: 66, // 70% from top
      title: "Another View (Leftside View)",
      description: "Go back to the leftside view",
      image: "/main/tour/leftsideroom.webp",
      view: "leftside"
    }
  ];

  const threeDPrintingPoints: TourPoint[] = [];

  const stickerMachinePoints: TourPoint[] = [];

  const backsidePoints: TourPoint[] = [];

  const handlePointClick = (point: TourPoint) => {
    if (!point.isBackButton) {
      setActiveImage(point.image);
      setActivePoint(point.id);
      setCurrentView(point.view);
      setIsExpanded(true);
    }
  };

  const handleCloseExpanded = () => {
    setIsExpanded(false);
    setActiveImage('/main/tour/starting.webp');
    setActivePoint(null);
    setCurrentView('entry');
  };

  const getCurrentPoints = () => {
    switch (currentView) {
      case 'entry':
        return entryPoints;
      case 'leftside':
        return leftSidePoints;
      case 'anotherside':
        return anothersidePoints;
      case '3dprinting':
        return threeDPrintingPoints;
      case 'stickermachine':
        return stickerMachinePoints;
      case 'backside':
        return backsidePoints;
      default:
        return entryPoints;
    }
  };

  return (
    <section className="w-full py-8 md:py-12 lg:py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-[2000px] mx-auto">
          <div className="relative">
            {/* Text content with slide animation */}
            <div className={`absolute left-0 top-0 w-full lg:w-1/3 transition-all duration-500 ease-in-out transform hidden lg:block ${
              isExpanded ? 'lg:-translate-x-full lg:opacity-0' : 'lg:translate-x-0 lg:opacity-100'
            } z-10 lg:z-0`}>
              <div className="space-y-4 md:space-y-6 lg:space-y-8 pr-0 lg:pr-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {t('innovationHub.title')}
                </h2>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  {t('innovationHub.description')}
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <span className="text-blue-600 text-base sm:text-lg">•</span>
                    <span className="text-sm sm:text-base">{t('innovationHub.features.3dPrinting')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-blue-600 text-base sm:text-lg">•</span>
                    <span className="text-sm sm:text-base">{t('innovationHub.features.cncLaser')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-blue-600 text-base sm:text-lg">•</span>
                    <span className="text-sm sm:text-base">{t('innovationHub.features.uvPrinting')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-blue-600 text-base sm:text-lg">•</span>
                    <span className="text-sm sm:text-base">{t('innovationHub.features.designSupport')}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Image container with slide animation */}
            <div className={`w-full lg:ml-auto transition-all duration-500 ease-in-out ${
              isExpanded ? 'lg:w-full' : 'lg:w-2/3'
            }`}>
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[500px] xl:h-[600px] overflow-hidden shadow-xl lg:ml-8">
                <img
                  src={activeImage}
                  alt="FabLab Tour"
                  className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/600x400/e2e8f0/1e293b?text=FabLab+Tour";
                  }}
                />
                
                {/* Home button for expanded view */}
                {isExpanded && (
                  <button
                    onClick={handleCloseExpanded}
                    className="absolute top-4 right-4 bg-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-30"
                  >
                    <Home className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                  </button>
                )}
                
                {/* Interactive Points */}
                {getCurrentPoints().map((point) => (
                  <button
                    key={point.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                      activePoint === point.id ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                    }`}
                    style={{
                      left: `${point.x}%`,
                      top: `${point.y}%`,
                    }}
                    onClick={() => handlePointClick(point)}
                    onMouseEnter={() => setActivePoint(point.id)}
                    onMouseLeave={() => setActivePoint(null)}
                  >
                    <div className="relative">
                      {point.isBackButton ? (
                        // Home icon for back button
                        <div className="relative">
                          <div className="absolute inset-0 bg-[#309eb7] rounded-full animate-ping opacity-75"></div>
                          <div className="relative bg-[#309eb7] rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <Home className="w-4 h-4 md:w-5 md:h-5 text-white" />
                          </div>
                        </div>
                      ) : (
                        // Regular dot for other points
                        <div className="relative">
                          <div className="absolute inset-0 bg-[#309eb7] rounded-full animate-ping opacity-75"></div>
                          <div className="relative bg-[#309eb7] rounded-full w-5 h-5 md:w-6 md:h-6 shadow-lg hover:shadow-xl transition-shadow duration-300"></div>
                        </div>
                      )}
                    </div>
                    
                    {/* Tooltip */}
                    <div className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-48 md:w-56 p-2 md:p-3 bg-white rounded-lg shadow-xl transition-all duration-300 transform ${
                      activePoint === point.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                    }`}>
                      <h3 className="font-bold text-xs md:text-sm text-gray-900 mb-1">{point.title}</h3>
                      <p className="text-[10px] md:text-xs text-gray-600 leading-relaxed">{point.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageFabLabTour; 