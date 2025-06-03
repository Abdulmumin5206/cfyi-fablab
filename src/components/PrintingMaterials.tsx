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
    needsBorder?: boolean;
  }[];
  selectedColor?: string;
  isPremium?: boolean;
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
        color: '#F8F8F0',
        needsBorder: true
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
        color: 'linear-gradient(135deg, #C0C0C0, #E8E8E8)',
        needsBorder: true
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
        color: 'linear-gradient(135deg, #C0C0C0, #D3D3D3)',
        needsBorder: true
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
        color: 'linear-gradient(135deg, #C0C0C0, #E8E8E8)',
        needsBorder: true
      },
      {
        name: 'Pure White',
        imageUrl: '/3dprinters/FIlamentumPLA/PLA_Fillamentum_White_1KG__1_540x.webp',
        color: '#FFFFFF',
        needsBorder: true
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
    id: 'raise-premium',
    name: 'RAISE3D Premium Materials',
    type: 'FDM',
    description: 'Professional-grade materials optimized for the Raise3D Pro3 series. Superior quality and consistency for industrial applications.',
    properties: [
      'Industrial grade',
      'High dimensional accuracy',
      'Excellent layer adhesion',
      'Professional finish'
    ],
    applications: [
      'Industrial prototypes',
      'Manufacturing aids',
      'Professional models',
      'Production parts'
    ],
    imageUrl: '/3dprinters/RAISE/Raise3DPremiumPLAWhite-2CardboardSpool_600x600.webp',
    colors: [
      // PLA Colors
      {
        name: 'PLA White',
        imageUrl: '/3dprinters/RAISE/Raise3DPremiumPLAWhite-2CardboardSpool_600x600.webp',
        color: '#FFFFFF',
        needsBorder: true
      },
      {
        name: 'PLA Black',
        imageUrl: '/3dprinters/RAISE/Raise3DPremiumPLABlack-2CardboardSpool_600x600.webp',
        color: '#1A1A1A'
      },
      {
        name: 'PLA Blue',
        imageUrl: '/3dprinters/RAISE/Raise3DPremiumPLABlue-2CardboardSpool_600x600.webp',
        color: '#0047AB'
      },
      {
        name: 'PLA Red',
        imageUrl: '/3dprinters/RAISE/Raise3DPremiumPLARed-2CardboardSpool_600x600.webp',
        color: '#CC0000'
      },
      {
        name: 'PLA Orange',
        imageUrl: '/3dprinters/RAISE/Raise3DPremiumPLAOrange-2CardboardSpool_600x600.webp',
        color: '#FFA500'
      },
      // ABS Colors
      {
        name: 'ABS White',
        imageUrl: '/3dprinters/RAISE/Raise3DPremiumABSWhite-2CardboardSpool_600x600.webp',
        color: '#FFFFFF',
        needsBorder: true
      },
      {
        name: 'ABS Black',
        imageUrl: '/3dprinters/RAISE/Raise3D Black Premium ABS Filament.webp',
        color: '#1A1A1A'
      },
      {
        name: 'ABS Grey',
        imageUrl: '/3dprinters/RAISE/Raise3D Grey Premium ABS Filament.webp',
        color: '#808080'
      },
      // PC Color
      {
        name: 'PC White',
        imageUrl: '/3dprinters/RAISE/Raise3DPremiumPCWhite-2CardboardSpool_600x600.webp',
        color: '#FFFFFF',
        needsBorder: true
      },
      // TPU Color
      {
        name: 'TPU White',
        imageUrl: '/3dprinters/RAISE/Raise3DPremiumTPU-95AWhite-2CardboardSpool_600x600.webp',
        color: '#FFFFFF',
        needsBorder: true
      }
    ],
    selectedColor: 'PLA White',
    isPremium: true
  },
  // SLA Materials
  {
    id: 'prusament-resin',
    name: 'PRUSAMENT Resin',
    type: 'SLA',
    description: 'High-quality SLA resins from Prusa Research offering exceptional detail, various properties, and multiple color options. Including standard model resins, flexible variants, and eco-friendly bio-based options.',
    properties: [
      'High detail',
      'Multiple variants',
      'Professional quality',
      'Wide color range'
    ],
    applications: [
      'Detailed prototypes',
      'Flexible parts',
      'Display models',
      'Functional prints'
    ],
    imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin Model Transparent Clear.avif',
    colors: [
      // Model Resin Colors
      {
        name: 'Model Transparent Clear',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin Model Transparent Clear.avif',
        color: 'linear-gradient(135deg, #FFFFFF80, #FFFFFF40)',
        needsBorder: true
      },
      {
        name: 'Model Transparent Green',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin Model Transparent Green.avif',
        color: 'linear-gradient(135deg, #00FF0080, #00FF0040)',
        needsBorder: true
      },
      {
        name: 'Model Transparent Red',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin Model Transparent Red.avif',
        color: 'linear-gradient(135deg, #FF000080, #FF000040)',
        needsBorder: true
      },
      {
        name: 'Model Anthracite Grey',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin Model Anthracite Grey.avif',
        color: '#2F4F4F'
      },
      {
        name: 'Model Brick Red',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin Model Brick Red.avif',
        color: '#8B0000'
      },
      {
        name: 'Model Classic Red',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin Model Classic Red.avif',
        color: '#DC143C'
      },
      {
        name: 'Model Prusa Orange',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin Model Prusa Orange 1kg.avif',
        color: '#FF6B18'
      },
      {
        name: 'Model Terra Brown',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin Model Terra Brown.avif',
        color: '#8B4513'
      },
      {
        name: 'Model Sandstone',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin Model Sandstone.avif',
        color: '#DEB887'
      },
      {
        name: 'Model Bright Yellow',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin Model Bright Yellow.avif',
        color: '#FFD700'
      },
      {
        name: 'Model Grass Green',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin Model Grass Green.avif',
        color: '#228B22'
      },
      // Flex80 Colors
      {
        name: 'Flex80 Transparent Clear',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin Flex80 Transparent Clear.avif',
        color: 'linear-gradient(135deg, #FFFFFF80, #FFFFFF40)',
        needsBorder: true
      },
      {
        name: 'Flex80 Black',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin Flex80 Black.avif',
        color: '#000000'
      },
      // BioBased60 Colors
      {
        name: 'BioBased60 Natural Yellow',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin BioBased60 Natural Yellow.avif',
        color: '#F0E68C'
      },
      {
        name: 'BioBased60 Herbal Green',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin BioBased60 Herbal Green.avif',
        color: '#2E8B57'
      },
      {
        name: 'BioBased60 Magma Red',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin BioBased60 Magma Red.avif',
        color: '#8B0000'
      }
    ],
    selectedColor: 'Model Transparent Clear'
  },
  {
    id: 'phrozen-resin',
    name: 'PHROZEN Resin',
    type: 'SLA',
    description: 'Professional-grade SLA resins from Phrozen, optimized for high-resolution 3D printing. Features specialized formulations for jewelry casting and water-washable options.',
    properties: [
      'High resolution',
      'Specialized formulas',
      'Water-washable options',
      'Casting capable'
    ],
    applications: [
      'Jewelry casting',
      'Detailed models',
      'Professional prints',
      'Specialty applications'
    ],
    imageUrl: '/3dprinters/PhrozenSLAResin/AquaBlue_1400x1600_1.webp',
    colors: [
      {
        name: 'Aqua Blue',
        imageUrl: '/3dprinters/PhrozenSLAResin/AquaBlue_1400x1600_1.webp',
        color: '#00CED1',
        needsBorder: true
      },
      {
        name: 'Aqua Green',
        imageUrl: '/3dprinters/PhrozenSLAResin/Phrozen Aqua 3D Printing Resin Green.webp',
        color: '#2E8B57',
        needsBorder: true
      },
      {
        name: 'Aqua Gray',
        imageUrl: '/3dprinters/PhrozenSLAResin/Aqua-Gray8K_1400x1600_4.webp',
        color: '#808080'
      },
      {
        name: 'Castable Green W20',
        imageUrl: '/3dprinters/PhrozenSLAResin/Phrozen Castable Resin W20 Green.webp',
        color: '#228B22'
      },
      {
        name: 'Castable Orange W40',
        imageUrl: '/3dprinters/PhrozenSLAResin/Phrozen Castable Resin W40 Orange.webp',
        color: '#FFA500'
      },
      {
        name: 'Castable Violet',
        imageUrl: '/3dprinters/PhrozenSLAResin/violet - Phrozen Castable Jewelry 3D Printing Resin.webp',
        color: '#8A2BE2'
      }
    ],
    selectedColor: 'Aqua Blue'
  },
  {
    id: 'formlabs-resin',
    name: 'FORMLABS Resin',
    type: 'SLA',
    description: 'Professional-grade engineering resins from Formlabs, offering unmatched quality and precision. Industry-leading materials for demanding applications.',
    properties: [
      'Engineering grade',
      'Industry certified',
      'Highest precision',
      'Professional quality'
    ],
    applications: [
      'Engineering parts',
      'Medical devices',
      'Dental applications',
      'Industrial prototypes'
    ],
    imageUrl: '/3dprinters/FormlabsSLAResin/Formlabs Clear v4 Resin.jpg',
    colors: [
      {
        name: 'Clear v4',
        imageUrl: '/3dprinters/FormlabsSLAResin/Formlabs Clear v4 Resin.jpg',
        color: 'linear-gradient(135deg, #FFFFFF80, #FFFFFF40)',
        needsBorder: true
      },
      {
        name: 'White v4',
        imageUrl: '/3dprinters/FormlabsSLAResin/Formlabs White v4 Resin.jpg',
        color: '#FFFFFF',
        needsBorder: true
      },
      {
        name: 'Grey v4',
        imageUrl: '/3dprinters/FormlabsSLAResin/Formlabs Grey v4 Resin.jpg',
        color: '#808080',
        needsBorder: true
      },
      {
        name: 'Black v4',
        imageUrl: '/3dprinters/FormlabsSLAResin/Formlabs Black v4 Resin.jpg',
        color: '#000000'
      },
      {
        name: 'Color Kit',
        imageUrl: '/3dprinters/FormlabsSLAResin/Formlabs Color Kit.jpg',
        color: 'linear-gradient(135deg, #FF0000, #00FF00, #0000FF)'
      },
      {
        name: 'Color Base',
        imageUrl: '/3dprinters/FormlabsSLAResin/Color Base Resin.webp',
        color: '#F5F5F5',
        needsBorder: true
      },
      {
        name: 'Castable Wax 40',
        imageUrl: '/3dprinters/FormlabsSLAResin/Formlabs Castable Wax 40 Resin Cartridge.png',
        color: '#DAA520'
      }
    ],
    selectedColor: 'Clear v4',
    isPremium: true
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
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {material.isPremium && (
                    <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-full text-sm font-medium shadow-md">
                      Premium
                    </span>
                  )}
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
                            } ${
                              color.needsBorder ? 'border-2 border-gray-300' : ''
                            }`}
                            style={{
                              background: color.color
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