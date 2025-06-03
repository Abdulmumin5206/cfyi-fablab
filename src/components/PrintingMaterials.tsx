import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Material {
  id: string;
  name: string;
  type: 'SLA' | 'FDM';
  description: string;
  properties: string[];
  applications: string[];
  imageUrl: string;
  colors?: {
    name: string;
    imageUrl: string;
    color: string; // CSS color value
  }[];
  selectedColor?: string;
}

const initialMaterials: Material[] = [
  // FDM Materials
  {
    id: 'prusament-pla',
    name: 'PRUSAMENT PLA',
    type: 'FDM',
    description: 'Biodegradable thermoplastic with excellent print quality and ease of use.',
    properties: ['Biodegradable', 'Easy to print', 'Good surface finish', 'Rigid'],
    applications: ['Prototypes', 'Display models', 'Low-wear parts'],
    imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Blend Ms. Pink.avif',
    colors: [
      { 
        name: 'Ms. Pink', 
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Blend Ms. Pink.avif',
        color: 'linear-gradient(135deg, #FF8EC7, #FF69B4)'
      },
      { 
        name: 'Vanilla White', 
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Vanilla White.avif',
        color: '#F8F8F0'
      },
      { 
        name: 'Jet Black', 
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Jet Black.avif',
        color: '#1A1A1A'
      },
      { 
        name: 'Pearl Mouse', 
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Pearl Mouse.avif',
        color: 'linear-gradient(135deg, #B8B8B8, #D0D0D0)'
      },
      { 
        name: 'Oh My Gold', 
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Blend Oh My Gold.avif',
        color: 'linear-gradient(135deg, #FFD700, #FDB931)'
      },
      { 
        name: 'Galaxy Silver', 
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Galaxy Silver.avif',
        color: 'linear-gradient(135deg, #C0C0C0, #E8E8E8)'
      },
      {
        name: 'Prusa Orange',
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Prusa Orange.avif',
        color: '#FF6B18'
      },
      {
        name: 'Mystic Brown',
        imageUrl: '/3dprinters/PrusaPLA/Premium Mystic Brown.png',
        color: '#8B4513'
      },
      {
        name: 'Army Green',
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Army Green.avif',
        color: '#4B5320'
      },
      {
        name: 'Royal Blue',
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Blend Royal Blue.avif',
        color: 'linear-gradient(135deg, #4169E1, #1E90FF)'
      },
      {
        name: 'Opal Green',
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Opal Green.avif',
        color: 'linear-gradient(135deg, #50C878, #40E0D0)'
      },
      {
        name: 'My Silverness',
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Blend My Silverness.avif',
        color: 'linear-gradient(135deg, #C0C0C0, #D3D3D3)'
      },
      {
        name: 'Lime Green',
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Blend Lime Green.avif',
        color: '#32CD32'
      },
      {
        name: 'Simply Green',
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Simply Green.avif',
        color: '#008000'
      },
      {
        name: 'Gravity Grey',
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Gravity Grey.avif',
        color: '#808080'
      },
      {
        name: 'Pearl Blue',
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Pearl Blue.avif',
        color: 'linear-gradient(135deg, #4169E1, #87CEEB)'
      },
      {
        name: 'Yellow',
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Yellow.webp',
        color: '#FFD700'
      },
      {
        name: 'Pineapple Yellow',
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Pineapple Yellow.avif',
        color: '#FFE135'
      },
      {
        name: 'Lila',
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Lila.avif',
        color: '#C8A2C8'
      }
    ],
    selectedColor: 'Ms. Pink'
  },
  {
    id: 'filamentum-pla',
    name: 'FILAMENTUM PLA',
    type: 'FDM',
    description: 'Premium quality PLA filament known for its exceptional quality and unique color palette. Made in Czech Republic with precise diameter tolerance.',
    properties: [
      'High quality materials',
      'Precise diameter',
      'Excellent printability',
      'Unique color palette'
    ],
    applications: [
      'Decorative prints',
      'Architectural models',
      'Design prototypes',
      'Art projects'
    ],
    imageUrl: '/3dprinters/FIlamentumPLA/PLA_Fillamentum__Gold_happens_1KG_540x.webp',
    colors: [
      {
        name: 'Gold Happens',
        imageUrl: '/3dprinters/FIlamentumPLA/PLA_Fillamentum__Gold_happens_1KG_540x.webp',
        color: 'linear-gradient(135deg, #FFD700, #DAA520)'
      },
      {
        name: 'Electric Grey',
        imageUrl: '/3dprinters/FIlamentumPLA/PLA_Fillamentum_Eletric_Grey_1KG_540x.webp',
        color: '#A9A9A9'
      },
      {
        name: 'Rapunzel Silver',
        imageUrl: '/3dprinters/FIlamentumPLA/PLA_Fillamentum__Rapunzel_Silver_1KG_540x.webp',
        color: 'linear-gradient(135deg, #C0C0C0, #E8E8E8)'
      },
      {
        name: 'Pure White',
        imageUrl: '/3dprinters/FIlamentumPLA/PLA_Fillamentum_White_1KG__1_540x.webp',
        color: '#FFFFFF'
      },
      {
        name: 'Metallic Grey',
        imageUrl: '/3dprinters/FIlamentumPLA/PLA Extrafill Metallic Grey.avif',
        color: 'linear-gradient(135deg, #808080, #A8A8A8)'
      },
      {
        name: 'Melon Yellow',
        imageUrl: '/3dprinters/FIlamentumPLA/PLA_Extrafill_Melon_Yellow_1_75_540x.webp',
        color: '#FFCC33'
      },
      {
        name: 'Purple Red',
        imageUrl: '/3dprinters/FIlamentumPLA/PLA_Fillamentum_Purple_Red_1KG_540x.webp',
        color: '#9B2D30'
      },
      {
        name: 'Chocolate Brown',
        imageUrl: '/3dprinters/FIlamentumPLA/PLA_Fillamentum__Chocolate_brown_1KG_540x.webp',
        color: '#654321'
      },
      {
        name: 'Crystal Clear Iceland Blue',
        imageUrl: '/3dprinters/FIlamentumPLA/PLA_Extrafill_Crystal_Clear_Iceland_Blue_1_75_540x.webp',
        color: 'linear-gradient(135deg, #87CEEB, #B0E0E6)'
      },
      {
        name: 'Luminous Green',
        imageUrl: '/3dprinters/FIlamentumPLA/PLA_Extrafill_Luminous_Green_1_75_540x.webp',
        color: '#90EE90'
      },
      {
        name: 'Noble Blue',
        imageUrl: '/3dprinters/FIlamentumPLA/PLA_Extrafill_Noble_Blue_1_75_540x.webp',
        color: '#000080'
      }
    ],
    selectedColor: 'Gold Happens'
  },
  {
    id: 'petg',
    name: 'PETG',
    type: 'FDM',
    description: 'Durable material with good chemical resistance and impact strength.',
    properties: ['Chemical resistant', 'Impact resistant', 'Food safe', 'Flexible'],
    applications: ['Mechanical parts', 'Food containers', 'Outdoor use'],
    imageUrl: '/materials/petg.webp'
  },
  {
    id: 'abs',
    name: 'ABS',
    type: 'FDM',
    description: 'Strong and impact-resistant material ideal for functional parts.',
    properties: ['Heat resistant', 'Impact resistant', 'Machinable', 'Durable'],
    applications: ['End-use parts', 'Automotive', 'Tools'],
    imageUrl: '/materials/abs.webp'
  },
  {
    id: 'tpu',
    name: 'TPU',
    type: 'FDM',
    description: 'Flexible thermoplastic polyurethane for elastic and rubber-like parts.',
    properties: ['Flexible', 'Durable', 'Abrasion resistant', 'Chemical resistant'],
    applications: ['Flexible parts', 'Gaskets', 'Protective covers'],
    imageUrl: '/materials/tpu.webp'
  },
  {
    id: 'nylon',
    name: 'Nylon',
    type: 'FDM',
    description: 'Strong and versatile material with excellent mechanical properties.',
    properties: ['Strong', 'Durable', 'Heat resistant', 'Low friction'],
    applications: ['End-use parts', 'Gears', 'Tools'],
    imageUrl: '/materials/nylon.webp'
  },
  {
    id: 'carbon-fiber',
    name: 'Carbon Fiber',
    type: 'FDM',
    description: 'High-strength composite material for professional applications.',
    properties: ['Extremely strong', 'Lightweight', 'Stiff', 'Heat resistant'],
    applications: ['Aerospace', 'Automotive', 'Professional tools'],
    imageUrl: '/materials/carbon-fiber.webp'
  },
  {
    id: 'pc',
    name: 'Polycarbonate',
    type: 'FDM',
    description: 'High-strength thermoplastic with excellent heat resistance.',
    properties: ['Heat resistant', 'Impact resistant', 'Transparent', 'Strong'],
    applications: ['Engineering parts', 'Lighting', 'Protective equipment'],
    imageUrl: '/materials/pc.webp'
  },
  {
    id: 'asa',
    name: 'ASA',
    type: 'FDM',
    description: 'UV-resistant material perfect for outdoor applications.',
    properties: ['UV stable', 'Weather resistant', 'Strong', 'Good aesthetics'],
    applications: ['Outdoor parts', 'Automotive', 'Consumer products'],
    imageUrl: '/materials/asa.webp'
  },
  // SLA Materials
  {
    id: 'standard-resin',
    name: 'Standard Resin',
    type: 'SLA',
    description: 'High-detail resin perfect for visual prototypes and display models.',
    properties: ['High detail', 'Smooth surface', 'Good accuracy', 'UV stable'],
    applications: ['Visual prototypes', 'Display models', 'Art pieces'],
    imageUrl: '/materials/standard-resin.webp'
  },
  {
    id: 'tough-resin',
    name: 'Tough Resin',
    type: 'SLA',
    description: 'Durable resin with ABS-like properties for functional prototypes.',
    properties: ['Impact resistant', 'Flexible', 'Durable', 'Machinable'],
    applications: ['Functional prototypes', 'End-use parts', 'Consumer products'],
    imageUrl: '/materials/tough-resin.webp'
  },
  {
    id: 'dental-resin',
    name: 'Dental Resin',
    type: 'SLA',
    description: 'Biocompatible resin specifically formulated for dental applications.',
    properties: ['Biocompatible', 'High accuracy', 'Medical grade', 'Sterilizable'],
    applications: ['Dental models', 'Surgical guides', 'Dental aligners'],
    imageUrl: '/materials/dental-resin.webp'
  },
  {
    id: 'clear-resin',
    name: 'Clear Resin',
    type: 'SLA',
    description: 'Transparent resin for optical applications and visual prototypes.',
    properties: ['Transparent', 'Polishable', 'UV stable', 'Water resistant'],
    applications: ['Optical parts', 'Light guides', 'Display models'],
    imageUrl: '/materials/clear-resin.webp'
  },
  {
    id: 'castable-resin',
    name: 'Castable Resin',
    type: 'SLA',
    description: 'Clean-burning resin designed for investment casting.',
    properties: ['Zero ash content', 'High detail', 'Clean burning', 'Accurate'],
    applications: ['Jewelry', 'Metal casting', 'Custom parts'],
    imageUrl: '/materials/castable-resin.webp'
  },
  {
    id: 'flexible-resin',
    name: 'Flexible Resin',
    type: 'SLA',
    description: 'Soft and flexible resin for rubber-like parts.',
    properties: ['Flexible', 'Tear resistant', 'Compressible', 'Durable'],
    applications: ['Gaskets', 'Grips', 'Prototypes'],
    imageUrl: '/materials/flexible-resin.webp'
  },
  {
    id: 'high-temp-resin',
    name: 'High Temp Resin',
    type: 'SLA',
    description: 'Heat-resistant resin for demanding applications.',
    properties: ['Heat resistant', 'Rigid', 'Durable', 'Accurate'],
    applications: ['Molds', 'Tooling', 'Heat testing'],
    imageUrl: '/materials/high-temp-resin.webp'
  },
  {
    id: 'ceramic-resin',
    name: 'Ceramic Resin',
    type: 'SLA',
    description: 'Ceramic-filled resin for technical applications.',
    properties: ['High stiffness', 'Temperature resistant', 'Low friction', 'Wear resistant'],
    applications: ['Technical parts', 'Industrial components', 'Specialty applications'],
    imageUrl: '/materials/ceramic-resin.webp'
  }
];

const PrintingMaterials = () => {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState<'ALL' | 'SLA' | 'FDM'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const materialsPerPage = 9;
  const [materials, setMaterials] = useState<Material[]>(initialMaterials);

  const filteredMaterials = materials.filter(material => {
    const matchesType = selectedType === 'ALL' || material.type === selectedType;
    const matchesSearch = material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const totalPages = Math.ceil(filteredMaterials.length / materialsPerPage);
  const indexOfLastMaterial = currentPage * materialsPerPage;
  const indexOfFirstMaterial = indexOfLastMaterial - materialsPerPage;
  const currentMaterials = filteredMaterials.slice(indexOfFirstMaterial, indexOfLastMaterial);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedType, searchQuery]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    document.getElementById('materials-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleColorChange = (materialId: string, colorName: string) => {
    setMaterials(prevMaterials => 
      prevMaterials.map(material => 
        material.id === materialId
          ? {
              ...material,
              selectedColor: colorName,
              imageUrl: material.colors?.find(c => c.name === colorName)?.imageUrl || material.imageUrl
            }
          : material
      )
    );
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            currentPage === i
              ? 'bg-[#329db7] text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <section id="materials-section" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">3D Printing Materials</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive range of high-quality materials for both FDM and SLA printing technologies,
            each carefully selected to meet specific application requirements.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedType('ALL')}
              className={`px-6 py-2 rounded-full ${
                selectedType === 'ALL'
                  ? 'bg-[#329db7] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              } transition-colors`}
            >
              All Materials
            </button>
            <button
              onClick={() => setSelectedType('FDM')}
              className={`px-6 py-2 rounded-full ${
                selectedType === 'FDM'
                  ? 'bg-[#329db7] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              } transition-colors`}
            >
              FDM Materials
            </button>
            <button
              onClick={() => setSelectedType('SLA')}
              className={`px-6 py-2 rounded-full ${
                selectedType === 'SLA'
                  ? 'bg-[#329db7] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              } transition-colors`}
            >
              SLA Materials
            </button>
          </div>
          <div className="w-full md:w-auto">
            <input
              type="text"
              placeholder="Search materials..."
              className="w-full md:w-[300px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#329db7] focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentMaterials.map((material) => (
            <div
              key={material.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
            >
              <div className="aspect-video relative overflow-hidden bg-white p-4 flex items-center justify-center">
                <img
                  src={material.imageUrl}
                  alt={material.name}
                  className="w-auto h-auto max-w-[120%] max-h-[120%] object-contain transform scale-110"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/90 rounded-full text-sm font-medium text-[#329db7]">
                    {material.type}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{material.name}</h3>
                <p className="text-gray-600 mb-4">{material.description}</p>
                
                {material.colors && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Colors</h4>
                    <div className="flex flex-wrap gap-3">
                      {material.colors.map((color) => (
                        <div key={color.name} className="relative group">
                          <button
                            onClick={() => handleColorChange(material.id, color.name)}
                            className={`relative w-8 h-8 rounded-full transition-all duration-200 ${
                              material.selectedColor === color.name
                                ? 'ring-2 ring-offset-2 ring-[#329db7] scale-110'
                                : 'hover:scale-105'
                            }`}
                            style={{
                              background: color.color,
                              border: color.color.includes('#F8F8F0') ? '1px solid #e5e7eb' : 'none'
                            }}
                            aria-label={color.name}
                          />
                          {/* Professional color name tooltip */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            {color.name}
                            {/* Arrow */}
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Add selected color name below the color picker */}
                {material.colors && material.selectedColor && (
                  <div className="mb-6">
                    <p className="text-sm text-gray-600">
                      Selected: <span className="font-medium text-gray-900">{material.selectedColor}</span>
                    </p>
                  </div>
                )}
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Properties</h4>
                    <div className="flex flex-wrap gap-2">
                      {material.properties.map((property, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                        >
                          {property}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Applications</h4>
                    <div className="flex flex-wrap gap-2">
                      {material.applications.map((application, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                        >
                          {application}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMaterials.length > materialsPerPage && (
          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {renderPaginationButtons()}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Showing {indexOfFirstMaterial + 1}-{Math.min(indexOfLastMaterial, filteredMaterials.length)} of {filteredMaterials.length} materials
            </div>
          </div>
        )}

        {filteredMaterials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No materials found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PrintingMaterials;