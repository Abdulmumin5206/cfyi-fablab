import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

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
      x: 30,
      y: 45,
      title: t('fablabTour.3dPrintingArea'),
      description: '',
      image: "/main/tour/3dprinting.webp",
      view: "3dprinting"
    },
    {
      id: 2,
      x: 70,
      y: 50,
      title: t('fablabTour.workshop'),
      description: '',
      image: "/main/tour/starting.webp",
      view: "entry"
    },
    {
      id: 3,
      x: 10,
      y: 90,
      title: t('fablabTour.leftSideOfRoom'),
      description: '',
      image: "/main/tour/leftsideroom.webp",
      view: "leftside"
    },
    {
      id: 4,
      x: 55,
      y: 95,
      title: t('fablabTour.backSideUV'),
      description: '',
      image: "/main/tour/bacsideuvprinting.webp",
      view: "backside"
    }
  ];

  const leftSidePoints: TourPoint[] = [
    {
      id: 1,
      x: 10,
      y: 70,
      title: t('fablabTour.stickerMachine'),
      description: '',
      image: "/main/tour/stickermachine.webp",
      view: "stickermachine"
    },
    {
      id: 2,
      x: 50,
      y: 40,
      title: t('fablabTour.3dPrintingArea'),
      description: '',
      image: "/main/tour/3dprinting.webp",
      view: "3dprinting"
    },
    {
      id: 3,
      x: 70,
      y: 70,
      title: t('fablabTour.mainViewInsideRoom'),
      description: '',
      image: "/main/tour/anotherside.jpg",
      view: "anotherside"
    }
  ];

  const anothersidePoints: TourPoint[] = [
    {
      id: 1,
      x: 25,
      y: 40,
      title: t('fablabTour.cnc'),
      description: '',
      image: "/main/tour/CNCVOLTER.jpg",
      view: "backside"
    },
    {
      id: 2,
      x: 5,
      y: 40,
      title: t('fablabTour.backsideUvCncLaser'),
      description: '',
      image: "/main/tour/bacsideuvprinting.webp",
      view: "backside"
    },
    {
      id: 3,
      x: 20,
      y: 66,
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
    <section className="w-full py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-12">
          {/* Left side content */}
          <motion.div 
            className="w-full lg:w-1/3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#329db7] leading-tight">
                {t('innovationHub.title')}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {t('innovationHub.description')}
              </p>
            </div>
          </motion.div>

          {/* Right side image container */}
          <motion.div 
            className="w-full lg:w-2/3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-xl shadow-xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={activeImage}
                  alt="FabLab Tour"
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/600x400/e2e8f0/1e293b?text=FabLab+Tour";
                  }}
                />
              </AnimatePresence>
              
              {/* Home button for expanded view */}
              {isExpanded && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={handleCloseExpanded}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-30"
                >
                  <Home className="w-5 h-5 sm:w-6 sm:h-6 text-[#329db7]" />
                </motion.button>
              )}
              
              {/* Interactive Points */}
              {getCurrentPoints().map((point) => (
                <motion.button
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
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: point.id * 0.1 }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#329db7] rounded-full animate-ping opacity-75"></div>
                    <div className="relative bg-[#329db7] rounded-full w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-white rounded-full"></div>
                    </div>
                    
                    {/* Tooltip */}
                    <motion.div 
                      className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1.5 bg-white rounded-lg shadow-lg text-sm sm:text-base whitespace-nowrap"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: activePoint === point.id ? 1 : 0,
                        y: activePoint === point.id ? 0 : 10
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {point.title}
                    </motion.div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImageFabLabTour; 