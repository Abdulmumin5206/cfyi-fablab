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
      title: t('fablabTour.3dPrintingArea'),
      description: '',
      image: "/main/tour/3dprinting.webp",
      view: "3dprinting"
    },
    {
      id: 2,
      x: 70, // 70% from left
      y: 50, // 50% from top
      title: t('fablabTour.workshop'),
      description: '',
      image: "/main/tour/starting.webp",
      view: "entry"
    },
    {
      id: 3,
      x: 10, // Updated: 15% from left (previously 10%)
      y: 90, // 70% from top
      title: t('fablabTour.leftSideOfRoom'),
      description: '',
      image: "/main/tour/leftsideroom.webp",
      view: "leftside"
    },
    {
      id: 4,
      x: 55, // Updated: 85% from left
      y: 95, // Updated: 85% from top
      title: t('fablabTour.backSideUV'),
      description: '',
      image: "/main/tour/bacsideuvprinting.webp",
      view: "backside"
    }
  ];

  const leftSidePoints: TourPoint[] = [
    {
      id: 1,
      x: 10, // 10% from left
      y: 70, // 70% from top
      title: t('fablabTour.stickerMachine'),
      description: '',
      image: "/main/tour/stickermachine.webp",
      view: "stickermachine"
    },
    {
      id: 2,
      x: 50, // 50% from left
      y: 40, // 40% from top
      title: t('fablabTour.3dPrintingArea'),
      description: '',
      image: "/main/tour/3dprinting.webp",
      view: "3dprinting"
    },
    {
      id: 3,
      x: 70, // 70% from left
      y: 70, // 70% from top
      title: t('fablabTour.mainViewInsideRoom'),
      description: '',
      image: "/main/tour/anotherside.jpg",
      view: "anotherside"
    }
  ];

  const anothersidePoints: TourPoint[] = [
    {
      id: 1,
      x: 25, // 40% from left
      y: 40, // 40% from top
      title: t('fablabTour.cnc'),
      description: '',
      image: "/main/tour/CNCVOLTER.jpg",
      view: "backside"
    },
    {
      id: 2,
      x: 5, // 20% from left
      y: 40, // 40% from top
      title: t('fablabTour.backsideUvCncLaser'),
      description: '',
      image: "/main/tour/bacsideuvprinting.webp",
      view: "backside"
    },
    {
      id: 3,
      x: 20, // 40% from left
      y: 66, // 70% from top
      title: t('fablabTour.anotherViewLeftside'),
      description: '',
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
    <section className="w-full py-6 sm:py-8 md:py-12 lg:py-16 bg-white overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-3 sm:px-4 lg:px-6">
        <div className="relative">
          {/* Text content with slide animation */}
          <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-full lg:w-1/3 transition-all duration-500 ease-in-out transform ${
            isExpanded ? 'lg:-translate-x-full lg:opacity-0' : 'lg:translate-x-0 lg:opacity-100'
          } z-10 lg:z-0 ${isExpanded ? 'hidden lg:block' : 'block lg:block'} hidden md:hidden`}>
            <div className="space-y-3 sm:space-y-4 lg:space-y-6 pr-0 lg:pr-4 text-center lg:text-left">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#329db7] leading-tight">
                {t('innovationHub.title')}
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                {t('innovationHub.description')}
              </p>
            </div>
          </div>

          {/* Image container with slide animation */}
          <div className={`w-full lg:ml-auto transition-all duration-500 ease-in-out ${
            isExpanded ? 'lg:w-full' : 'lg:w-2/3'
          }`}>
            <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] xl:h-[550px] overflow-hidden shadow-lg lg:ml-6">
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
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white rounded-full p-1.5 sm:p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-30"
                >
                  <Home className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600" />
                </button>
              )}
              
              {/* Interactive Points */}
              {getCurrentPoints().map((point) => (
                <button
                  key={point.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                    activePoint === point.id ? 'scale-110 sm:scale-125 z-20' : 'hover:scale-105 sm:hover:scale-110 z-10'
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
                        <div className="relative bg-[#309eb7] rounded-full w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                          <Home className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                        </div>
                      </div>
                    ) : (
                      // Regular dot for other points
                      <div className="relative">
                        <div className="absolute inset-0 bg-[#309eb7] rounded-full animate-ping opacity-75"></div>
                        <div className="relative bg-[#309eb7] rounded-full w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-white rounded-full"></div>
                        </div>
                      </div>
                    )}
                    
                    {/* Tooltip */}
                    <div className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-white rounded-lg shadow-lg text-xs sm:text-sm whitespace-nowrap transition-all duration-300 ${
                      activePoint === point.id ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}>
                      {point.title}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageFabLabTour; 