import { useState, useEffect } from "react";

interface Material {
  id: number;
  name: string;
  mainImage: string;
  sampleImages: string[];
}

export default function SlaMaterials() {
  // Material data
  const materials: Material[] = [
    {
      id: 1,
      name: "Prusament Resin Flex80 White",
      mainImage: "/3dprinters/SLA/Prusament Resin Flex80 White.avif",
      sampleImages: [
        "/3dprinters/SLA/FWhite1.avif",
        "/3dprinters/SLA/FWhite2.jpg"
      ]
    },
    {
      id: 2,
      name: "Prusament Resin Flex80 Black",
      mainImage: "/3dprinters/SLA/Prusament Resin Flex80 Black.avif",
      sampleImages: [
        "/3dprinters/SLA/FBlack1.avif",
        "/3dprinters/SLA/FBlack2.avif"
      ]
    },
    {
      id: 3,
      name: "Prusament Resin Flex80 Transparent",
      mainImage: "/3dprinters/SLA/Prusament Resin Flex80 Transparent Clear.avif",
      sampleImages: [
        "/3dprinters/SLA/FTransparent1.avif",
        "/3dprinters/SLA/Ftransparent2.avif"
      ]
    },
    {
      id: 4,
      name: "Prusament Resin BioBased60 Natural Yellow",
      mainImage: "/3dprinters/SLA/Prusament Resin BioBased60 Natural Yellow.avif",
      sampleImages: [
        "/3dprinters/SLA/FOrange1.avif",
        "/3dprinters/SLA/FTransparentmodel1.avif"
      ]
    },
    {
      id: 5,
      name: "Prusament Resin BioBased60 Herbal Green",
      mainImage: "/3dprinters/SLA/Prusament Resin BioBased60 Herbal Green.avif",
      sampleImages: [
        "/3dprinters/SLA/FTransparentmodel1.avif",
        "/3dprinters/SLA/FTransparentmodel2.avif"
      ]
    },
    {
      id: 6,
      name: "Prusament Resin BioBased60 Magma Red",
      mainImage: "/3dprinters/SLA/Prusament Resin BioBased60 Magma Red.avif",
      sampleImages: [
        "/3dprinters/SLA/FClassic Red1.avif",
        "/3dprinters/SLA/FClassic Red2.avif"
      ]
    },
    {
      id: 7,
      name: "SLA Resin Anthracite",
      mainImage: "/3dprinters/SLA/FAnthracite1.avif",
      sampleImages: [
        "/3dprinters/SLA/FAnthracite1.avif",
        "/3dprinters/SLA/FBlack1.avif"
      ]
    }
  ];

  const [selectedMaterial, setSelectedMaterial] = useState<Material>(materials[0]);
  const [mainDisplayImage, setMainDisplayImage] = useState<string>(materials[0].sampleImages[0]);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Function to handle material selection
  const handleMaterialSelect = (material: Material) => {
    setSelectedMaterial(material);
  };

  // Update display image when material changes
  useEffect(() => {
    if (selectedMaterial?.sampleImages?.length > 0) {
      setMainDisplayImage(selectedMaterial.sampleImages[0]);
    }
  }, [selectedMaterial]);

  // Function to handle thumbnail click
  const handleThumbnailClick = (image: string) => {
    setMainDisplayImage(image);
  };

  // Toggle fullscreen image view
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Navigate to next/previous image in fullscreen mode
  const navigateImages = (direction: 'next' | 'prev', e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent closing the fullscreen view
    
    const currentIndex = selectedMaterial.sampleImages.indexOf(mainDisplayImage);
    const imagesCount = selectedMaterial.sampleImages.length;
    
    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % imagesCount;
      setMainDisplayImage(selectedMaterial.sampleImages[nextIndex]);
    } else {
      const prevIndex = (currentIndex - 1 + imagesCount) % imagesCount;
      setMainDisplayImage(selectedMaterial.sampleImages[prevIndex]);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50 text-gray-900">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-16 text-center">SLA Materials</h2>
        
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Material selection grid - Left side */}
          <div className="w-full lg:w-2/5">
            <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold">Select a Resin</h3>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {materials.map((material) => (
                    <div 
                      key={material.id}
                      className={`material-card cursor-pointer bg-white border rounded-lg p-3 transition-all ${
                        selectedMaterial.id === material.id 
                          ? 'border-blue-500 shadow-md' 
                          : 'border-gray-200 hover:border-blue-500 hover:shadow-md'
                      }`}
                      onClick={() => handleMaterialSelect(material)}
                    >
                      <div className="w-full h-32 flex items-center justify-center mb-3">
                        <img 
                          src={material.mainImage} 
                          alt={material.name} 
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <h4 className="font-semibold text-center text-sm">{material.name}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Selected material details - Right side */}
          <div className="w-full lg:w-3/5">
            <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex items-center">
              <div className="h-[600px] relative w-full">
                {/* Main image display */}
                <div 
                  className="h-full flex items-center justify-center bg-white p-3 cursor-pointer"
                  onClick={toggleFullscreen}
                >
                  <img 
                    src={mainDisplayImage} 
                    alt={`${selectedMaterial.name} Example`} 
                    className="max-h-[500px] max-w-full object-contain mx-auto"
                  />
                </div>
                
                {/* Left arrow navigation */}
                <button 
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-black w-10 h-10 flex items-center justify-center transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImages('prev', e);
                  }}
                >
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                {/* Right arrow navigation */}
                <button 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-black w-10 h-10 flex items-center justify-center transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImages('next', e);
                  }}
                >
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6L15 12L9 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen image view */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
          onClick={toggleFullscreen}
        >
          <div className="relative max-w-5xl max-h-screen p-4 w-full flex items-center justify-center">
            <img 
              src={mainDisplayImage} 
              alt={`${selectedMaterial.name} Fullscreen`} 
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button 
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center"
              onClick={toggleFullscreen}
            >
              ✕
            </button>
            
            {/* Left arrow navigation */}
            <button 
              className="absolute left-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all"
              onClick={(e) => navigateImages('prev', e)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {/* Right arrow navigation */}
            <button 
              className="absolute right-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all"
              onClick={(e) => navigateImages('next', e)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6L15 12L9 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
} 