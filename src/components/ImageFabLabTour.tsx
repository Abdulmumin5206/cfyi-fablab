import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';

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
  const [activeImage, setActiveImage] = useState('/main/tour/starting.webp');
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [currentView, setCurrentView] = useState('entry');

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
      y: 40, // 40% from top
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
      x: 10, // 10% from left
      y: 70, // 70% from top
      title: "Left Side of the Room",
      description: "Additional workspace and equipment area",
      image: "/main/tour/leftsideroom.webp",
      view: "leftside"
    },
    {
      id: 4,
      x: 70, // 70% from left
      y: 70, // 70% from top
      title: "Back Side - UV Printing, CNC & Laser",
      description: "Advanced manufacturing equipment including UV printing, CNC machines, and laser cutting systems",
      image: "/main/tour/bacsideuvprinting.webp",
      view: "backside"
    }
  ];

  const leftSidePoints: TourPoint[] = [
    {
      id: 1,
      x: 50, // 50% from left
      y: 40, // 40% from top
      title: "3D Printing Area",
      description: "State-of-the-art 3D printers for rapid prototyping",
      image: "/main/tour/3dprinting.webp",
      view: "3dprinting"
    },
    {
      id: 2,
      x: 50, // 50% from left
      y: 50, // 50% from top
      title: "Main Workshop View",
      description: "Overview of our main workshop area",
      image: "/main/tour/anotherside.jpg",
      view: "leftside"
    },
    {
      id: 3,
      x: 10, // 10% from left
      y: 70, // 70% from top
      title: "Sticker Machine",
      description: "Professional sticker printing and cutting equipment",
      image: "/main/tour/stickermachine.webp",
      view: "stickermachine"
    },
    {
      id: 4,
      x: 80, // 80% from left
      y: 80, // 80% from top
      title: "Back to Entry",
      description: "Return to the main entrance view",
      image: "/main/tour/starting.webp",
      view: "entry",
      isBackButton: true
    }
  ];

  const threeDPrintingPoints: TourPoint[] = [
    {
      id: 1,
      x: 80, // 80% from left
      y: 80, // 80% from top
      title: "Back to Entry",
      description: "Return to the main entrance view",
      image: "/main/tour/starting.webp",
      view: "entry",
      isBackButton: true
    }
  ];

  const stickerMachinePoints: TourPoint[] = [
    {
      id: 1,
      x: 80, // 80% from left
      y: 80, // 80% from top
      title: "Back to Entry",
      description: "Return to the main entrance view",
      image: "/main/tour/starting.webp",
      view: "entry",
      isBackButton: true
    }
  ];

  const backsidePoints: TourPoint[] = [
    {
      id: 1,
      x: 80, // 80% from left
      y: 80, // 80% from top
      title: "Back to Entry",
      description: "Return to the main entrance view",
      image: "/main/tour/starting.webp",
      view: "entry",
      isBackButton: true
    }
  ];

  const handlePointClick = (point: TourPoint) => {
    setActiveImage(point.image);
    setActivePoint(point.id);
    setCurrentView(point.view);
  };

  const getCurrentPoints = () => {
    switch (currentView) {
      case 'entry':
        return entryPoints;
      case 'leftside':
        return leftSidePoints;
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
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left side - Text content */}
            <div className="lg:col-span-4 space-y-6 lg:pr-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                What We Have in FABLAB?
              </h2>
              <p className="text-lg lg:text-xl text-gray-600">
                Our state-of-the-art FabLab is equipped with cutting-edge technology and tools to bring your ideas to life. From 3D printing to CNC machining, we have everything you need to turn your concepts into reality.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <span className="text-blue-600">•</span>
                  <span>Advanced 3D Printing Technology</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-600">•</span>
                  <span>CNC Machining Equipment</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-600">•</span>
                  <span>Laser Cutting Systems</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-600">•</span>
                  <span>Professional Design Software</span>
                </li>
              </ul>
            </div>
            
            {/* Right side - Interactive Image */}
            <div className="lg:col-span-8 relative h-[500px] md:h-[600px] lg:h-[700px] rounded-lg overflow-hidden shadow-xl">
              <img
                src={activeImage}
                alt="FabLab Tour"
                className="w-full h-full object-cover transition-all duration-300 ease-in-out"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://placehold.co/600x400/e2e8f0/1e293b?text=FabLab+Tour";
                }}
              />
              
              {/* Interactive Points */}
              {getCurrentPoints().map((point) => (
                <button
                  key={point.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                    activePoint === point.id ? 'scale-125' : 'hover:scale-110'
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
                        <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-75"></div>
                        <div className="relative bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center">
                          <Home className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    ) : (
                      // Regular dot for other points
                      <div className="relative">
                        <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-75"></div>
                        <div className="relative bg-blue-600 rounded-full w-4 h-4"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Tooltip */}
                  <div className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-white rounded-lg shadow-lg transition-opacity duration-300 ${
                    activePoint === point.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}>
                    <h3 className="font-bold text-sm text-gray-900">{point.title}</h3>
                    <p className="text-xs text-gray-600">{point.description}</p>
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