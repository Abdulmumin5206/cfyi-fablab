import { useState } from "react";

interface Material {
  id: number;
  name: string;
  mainImage: string;
  company: 'Prusament' | 'Phrozen' | 'Formlabs';
  isPremium?: boolean;
}

export default function SlaMaterials() {
  // Material data
  const materials: Material[] = [
    {
      id: 1,
      name: "Prusament Resin Flex80 White",
      mainImage: "/3dprinters/SLA/Prusament Resin Flex80 White.avif",
      company: 'Prusament'
    },
    {
      id: 2,
      name: "Prusament Resin Flex80 Black",
      mainImage: "/3dprinters/SLA/Prusament Resin Flex80 Black.avif",
      company: 'Prusament'
    },
    {
      id: 3,
      name: "Prusament Resin Flex80 Transparent",
      mainImage: "/3dprinters/SLA/Prusament Resin Flex80 Transparent Clear.avif",
      company: 'Prusament'
    },
    {
      id: 4,
      name: "Prusament Resin BioBased60 Natural Yellow",
      mainImage: "/3dprinters/SLA/Prusament Resin BioBased60 Natural Yellow.avif",
      company: 'Prusament'
    },
    {
      id: 5,
      name: "Prusament Resin BioBased60 Herbal Green",
      mainImage: "/3dprinters/SLA/Prusament Resin BioBased60 Herbal Green.avif",
      company: 'Prusament'
    },
    {
      id: 6,
      name: "Prusament Resin BioBased60 Magma Red",
      mainImage: "/3dprinters/SLA/Prusament Resin BioBased60 Magma Red.avif",
      company: 'Prusament'
    },
    {
      id: 7,
      name: "Formlabs Tough Resin",
      mainImage: "/3dprinters/SLA/FAnthracite1.avif",
      company: 'Formlabs',
      isPremium: true
    }
  ];

  const [selectedMaterial, setSelectedMaterial] = useState<Material>(materials[0]);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Filter materials based on selected company
  const filteredMaterials = selectedCompany 
    ? materials.filter(material => material.company === selectedCompany)
    : materials;

  // Function to handle company filter selection
  const handleCompanyFilter = (company: string | null) => {
    setSelectedCompany(company);
    // Reset selected material to first item in filtered list
    const firstFilteredMaterial = company 
      ? materials.find(m => m.company === company) || materials[0]
      : materials[0];
    setSelectedMaterial(firstFilteredMaterial);
  };

  // Toggle fullscreen image view
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Premium SLA Materials
          </h2>
        </div>

        {/* Company Filters */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => handleCompanyFilter(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCompany === null
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Materials
            </button>
            <button
              onClick={() => handleCompanyFilter('Prusament')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCompany === 'Prusament'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Prusament
            </button>
            <button
              onClick={() => handleCompanyFilter('Phrozen')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCompany === 'Phrozen'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Phrozen
            </button>
            <button
              onClick={() => handleCompanyFilter('Formlabs')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCompany === 'Formlabs'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Formlabs Premium
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Materials Grid - Left Side */}
          <div className="lg:col-span-6">
            <div className="bg-gray-50 rounded-2xl p-4 h-full">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 h-full">
                {filteredMaterials.map((material) => (
                  <div 
                    key={material.id}
                    className={`group relative bg-white rounded-xl transition-all duration-200 cursor-pointer h-full ${
                      selectedMaterial.id === material.id 
                        ? 'ring-2 ring-blue-500 shadow-md' 
                        : 'hover:shadow-md hover:ring-1 hover:ring-gray-200'
                    }`}
                    onClick={() => setSelectedMaterial(material)}
                  >
                    <div className="aspect-square rounded-t-xl overflow-hidden bg-gray-50 p-2">
                      <img 
                        src={material.mainImage} 
                        alt={material.name} 
                        className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-105"
                      />
                      {material.isPremium && (
                        <div className="absolute top-1 right-1">
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                            Premium
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-1.5">
                      <h3 className="text-xs font-medium text-gray-900 line-clamp-2">
                        {material.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Section - Right Side */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
              <div className="relative aspect-square bg-gray-50 h-full">
                <img 
                  src={selectedMaterial.mainImage} 
                  alt={`${selectedMaterial.name} Preview`} 
                  className="w-full h-full object-contain p-6"
                />
                <button 
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors shadow-sm"
                  onClick={toggleFullscreen}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Preview Modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-50 transition-opacity duration-300"
          onClick={toggleFullscreen}
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
          <div className="relative h-full flex items-center justify-center p-4">
            <div className="relative max-w-6xl w-full">
              <img 
                src={selectedMaterial.mainImage} 
                alt={`${selectedMaterial.name} Fullscreen`} 
                className="max-w-full max-h-[90vh] object-contain mx-auto"
              />
              <button 
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                onClick={toggleFullscreen}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
} 