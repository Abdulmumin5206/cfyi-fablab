import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import GradientText from './GradientText';
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
    description: '3dPrinting.materials.fdm.prusament.description',
    properties: [
      '3dPrinting.materials.fdm.prusament.properties.biodegradable',
      '3dPrinting.materials.fdm.prusament.properties.easyToPrint',
      '3dPrinting.materials.fdm.prusament.properties.goodSurfaceFinish',
      '3dPrinting.materials.fdm.prusament.properties.rigid'
    ],
    applications: [
      '3dPrinting.materials.fdm.prusament.applications.prototypes',
      '3dPrinting.materials.fdm.prusament.applications.displayModels',
      '3dPrinting.materials.fdm.prusament.applications.lowWearParts'
    ],
    imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Blend Ms. Pink.avif',
    colors: [
      { 
        name: '3dPrinting.materials.fdm.prusament.colors.msPink', 
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Blend Ms. Pink.avif',
        color: 'linear-gradient(135deg, #FF8EC7, #FF69B4)'
      },
      { 
        name: '3dPrinting.materials.fdm.prusament.colors.vanillaWhite', 
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Vanilla White.avif',
        color: '#F8F8F0',
        needsBorder: true
      },
      { 
        name: '3dPrinting.materials.fdm.prusament.colors.jetBlack', 
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Jet Black.avif',
        color: '#1A1A1A'
      },
      { 
        name: '3dPrinting.materials.fdm.prusament.colors.pearlMouse', 
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Pearl Mouse.avif',
        color: 'linear-gradient(135deg, #B8B8B8, #D0D0D0)'
      },
      { 
        name: '3dPrinting.materials.fdm.prusament.colors.ohMyGold', 
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Blend Oh My Gold.avif',
        color: 'linear-gradient(135deg, #FFD700, #FDB931)'
      },
      { 
        name: '3dPrinting.materials.fdm.prusament.colors.galaxySilver', 
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Galaxy Silver.avif',
        color: 'linear-gradient(135deg, #C0C0C0, #E8E8E8)',
        needsBorder: true
      },
      {
        name: '3dPrinting.materials.fdm.prusament.colors.prusaOrange',
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Prusa Orange.avif',
        color: '#FF6B18'
      },
      {
        name: '3dPrinting.materials.fdm.prusament.colors.mysticBrown',
        imageUrl: '/3dprinters/PrusaPLA/Premium Mystic Brown.png',
        color: '#8B4513'
      },
      {
        name: '3dPrinting.materials.fdm.prusament.colors.armyGreen',
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Army Green.avif',
        color: '#4B5320'
      },
      {
        name: '3dPrinting.materials.fdm.prusament.colors.royalBlue',
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Blend Royal Blue.avif',
        color: 'linear-gradient(135deg, #4169E1, #1E90FF)'
      },
      {
        name: '3dPrinting.materials.fdm.prusament.colors.opalGreen',
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Opal Green.avif',
        color: 'linear-gradient(135deg, #50C878, #40E0D0)'
      },
      {
        name: '3dPrinting.materials.fdm.prusament.colors.mySilverness',
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Blend My Silverness.avif',
        color: 'linear-gradient(135deg, #C0C0C0, #D3D3D3)',
        needsBorder: true
      },
      {
        name: '3dPrinting.materials.fdm.prusament.colors.limeGreen',
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Blend Lime Green.avif',
        color: '#32CD32'
      },
      {
        name: '3dPrinting.materials.fdm.prusament.colors.simplyGreen',
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Simply Green.avif',
        color: '#008000'
      },
      {
        name: '3dPrinting.materials.fdm.prusament.colors.gravityGrey',
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Gravity Grey.avif',
        color: '#808080'
      },
      {
        name: '3dPrinting.materials.fdm.prusament.colors.pearlBlue',
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Pearl Blue.avif',
        color: 'linear-gradient(135deg, #4169E1, #87CEEB)'
      },
      {
        name: '3dPrinting.materials.fdm.prusament.colors.yellow',
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Yellow.webp',
        color: '#FFD700'
      },
      {
        name: '3dPrinting.materials.fdm.prusament.colors.pineappleYellow',
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Pineapple Yellow.avif',
        color: '#FFE135'
      },
      {
        name: '3dPrinting.materials.fdm.prusament.colors.lila',
        imageUrl: '/3dprinters/PrusaPLA/Prusament PLA Lila.avif',
        color: '#C8A2C8'
      }
    ],
    selectedColor: '3dPrinting.materials.fdm.prusament.colors.msPink'
  },
  {
    id: 'filamentum-pla',
    name: 'FILAMENTUM PLA',
    type: 'FDM',
    description: '3dPrinting.materials.fdm.filamentum.description',
    properties: [
      '3dPrinting.materials.fdm.filamentum.properties.highQuality',
      '3dPrinting.materials.fdm.filamentum.properties.preciseDiameter',
      '3dPrinting.materials.fdm.filamentum.properties.excellentPrintability',
      '3dPrinting.materials.fdm.filamentum.properties.uniqueColors'
    ],
    applications: [
      '3dPrinting.materials.fdm.filamentum.applications.decorative',
      '3dPrinting.materials.fdm.filamentum.applications.architectural',
      '3dPrinting.materials.fdm.filamentum.applications.designPrototypes',
      '3dPrinting.materials.fdm.filamentum.applications.artProjects'
    ],
    imageUrl: '/3dprinters/FIlamentumPLA/PLA_Fillamentum__Gold_happens_1KG_540x.webp',
    colors: [
      {
        name: '3dPrinting.materials.fdm.filamentum.colors.goldHappens',
        imageUrl: '/3dprinters/FIlamentumPLA/PLA_Fillamentum__Gold_happens_1KG_540x.webp',
        color: 'linear-gradient(135deg, #FFD700, #DAA520)'
      },
      {
        name: '3dPrinting.materials.fdm.filamentum.colors.electricGrey',
        imageUrl: '/3dprinters/FIlamentumPLA/PLA_Fillamentum_Eletric_Grey_1KG_540x.webp',
        color: '#A9A9A9'
      },
      {
        name: '3dPrinting.materials.fdm.filamentum.colors.rapunzelSilver',
        imageUrl: '/3dprinters/FIlamentumPLA/PLA_Fillamentum__Rapunzel_Silver_1KG_540x.webp',
        color: 'linear-gradient(135deg, #C0C0C0, #E8E8E8)',
        needsBorder: true
      },
      {
        name: '3dPrinting.materials.fdm.filamentum.colors.pureWhite',
        imageUrl: '/3dprinters/FIlamentumPLA/PLA_Fillamentum_White_1KG__1_540x.webp',
        color: '#FFFFFF',
        needsBorder: true
      },
      {
        name: '3dPrinting.materials.fdm.filamentum.colors.metallicGrey',
        imageUrl: '/3dprinters/FIlamentumPLA/PLA Extrafill Metallic Grey.avif',
        color: 'linear-gradient(135deg, #808080, #A8A8A8)'
      },
      {
        name: '3dPrinting.materials.fdm.filamentum.colors.melonYellow',
        imageUrl: '/3dprinters/FIlamentumPLA/PLA_Extrafill_Melon_Yellow_1_75_540x.webp',
        color: '#FFCC33'
      },
      {
        name: '3dPrinting.materials.fdm.filamentum.colors.purpleRed',
        imageUrl: '/3dprinters/FIlamentumPLA/PLA_Fillamentum_Purple_Red_1KG_540x.webp',
        color: '#9B2D30'
      },
      {
        name: '3dPrinting.materials.fdm.filamentum.colors.chocolateBrown',
        imageUrl: '/3dprinters/FIlamentumPLA/PLA_Fillamentum__Chocolate_brown_1KG_540x.webp',
        color: '#654321'
      },
      {
        name: '3dPrinting.materials.fdm.filamentum.colors.crystalClearIcelandBlue',
        imageUrl: '/3dprinters/FIlamentumPLA/PLA_Extrafill_Crystal_Clear_Iceland_Blue_1_75_540x.webp',
        color: 'linear-gradient(135deg, #87CEEB, #B0E0E6)'
      },
      {
        name: '3dPrinting.materials.fdm.filamentum.colors.luminousGreen',
        imageUrl: '/3dprinters/FIlamentumPLA/PLA_Extrafill_Luminous_Green_1_75_540x.webp',
        color: '#90EE90'
      },
      {
        name: '3dPrinting.materials.fdm.filamentum.colors.nobleBlue',
        imageUrl: '/3dprinters/FIlamentumPLA/PLA_Extrafill_Noble_Blue_1_75_540x.webp',
        color: '#000080'
      }
    ],
    selectedColor: '3dPrinting.materials.fdm.filamentum.colors.goldHappens'
  },
  {
    id: 'raise-premium',
    name: 'RAISE3D Premium Materials',
    type: 'FDM',
    description: '3dPrinting.materials.fdm.raise3d.description',
    properties: [
      '3dPrinting.materials.fdm.raise3d.properties.industrialGrade',
      '3dPrinting.materials.fdm.raise3d.properties.highAccuracy',
      '3dPrinting.materials.fdm.raise3d.properties.excellentAdhesion',
      '3dPrinting.materials.fdm.raise3d.properties.professionalFinish'
    ],
    applications: [
      '3dPrinting.materials.fdm.raise3d.applications.industrialPrototypes',
      '3dPrinting.materials.fdm.raise3d.applications.manufacturingAids',
      '3dPrinting.materials.fdm.raise3d.applications.professionalModels',
      '3dPrinting.materials.fdm.raise3d.applications.productionParts'
    ],
    imageUrl: '/3dprinters/RAISE/Raise3DPremiumPLAWhite-2CardboardSpool_600x600.webp',
    colors: [
      // PLA Colors
      {
        name: '3dPrinting.materials.fdm.raise3d.colors.plaWhite',
        imageUrl: '/3dprinters/RAISE/Raise3DPremiumPLAWhite-2CardboardSpool_600x600.webp',
        color: '#FFFFFF',
        needsBorder: true
      },
      {
        name: '3dPrinting.materials.fdm.raise3d.colors.plaBlack',
        imageUrl: '/3dprinters/RAISE/Raise3DPremiumPLABlack-2CardboardSpool_600x600.webp',
        color: '#1A1A1A'
      },
      {
        name: '3dPrinting.materials.fdm.raise3d.colors.plaBlue',
        imageUrl: '/3dprinters/RAISE/Raise3DPremiumPLABlue-2CardboardSpool_600x600.webp',
        color: '#0047AB'
      },
      {
        name: '3dPrinting.materials.fdm.raise3d.colors.plaRed',
        imageUrl: '/3dprinters/RAISE/Raise3DPremiumPLARed-2CardboardSpool_600x600.webp',
        color: '#CC0000'
      },
      {
        name: '3dPrinting.materials.fdm.raise3d.colors.plaOrange',
        imageUrl: '/3dprinters/RAISE/Raise3DPremiumPLAOrange-2CardboardSpool_600x600.webp',
        color: '#FFA500'
      },
      // ABS Colors
      {
        name: '3dPrinting.materials.fdm.raise3d.colors.absWhite',
        imageUrl: '/3dprinters/RAISE/Raise3DPremiumABSWhite-2CardboardSpool_600x600.webp',
        color: '#FFFFFF',
        needsBorder: true
      },
      {
        name: '3dPrinting.materials.fdm.raise3d.colors.absBlack',
        imageUrl: '/3dprinters/RAISE/Raise3D Black Premium ABS Filament.webp',
        color: '#1A1A1A'
      },
      {
        name: '3dPrinting.materials.fdm.raise3d.colors.absGrey',
        imageUrl: '/3dprinters/RAISE/Raise3D Grey Premium ABS Filament.webp',
        color: '#808080'
      },
      // PC Color
      {
        name: '3dPrinting.materials.fdm.raise3d.colors.pcWhite',
        imageUrl: '/3dprinters/RAISE/Raise3DPremiumPCWhite-2CardboardSpool_600x600.webp',
        color: '#FFFFFF',
        needsBorder: true
      },
      // TPU Color
      {
        name: '3dPrinting.materials.fdm.raise3d.colors.tpuWhite',
        imageUrl: '/3dprinters/RAISE/Raise3DPremiumTPU-95AWhite-2CardboardSpool_600x600.webp',
        color: '#FFFFFF',
        needsBorder: true
      }
    ],
    selectedColor: '3dPrinting.materials.fdm.raise3d.colors.plaWhite',
    isPremium: true
  },
  // SLA Materials
  {
    id: 'prusament-resin',
    name: 'PRUSAMENT Resin',
    type: 'SLA',
    description: '3dPrinting.materials.sla.prusament.description',
    properties: [
      '3dPrinting.materials.sla.prusament.properties.highDetail',
      '3dPrinting.materials.sla.prusament.properties.multipleVariants',
      '3dPrinting.materials.sla.prusament.properties.professionalQuality',
      '3dPrinting.materials.sla.prusament.properties.wideColorRange'
    ],
    applications: [
      '3dPrinting.materials.sla.prusament.applications.detailedPrototypes',
      '3dPrinting.materials.sla.prusament.applications.flexibleParts',
      '3dPrinting.materials.sla.prusament.applications.displayModels',
      '3dPrinting.materials.sla.prusament.applications.functionalPrints'
    ],
    imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin Model Transparent Clear.avif',
    colors: [
      // Model Resin Colors
      {
        name: '3dPrinting.materials.sla.prusament.colors.modelTransparentClear',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin Model Transparent Clear.avif',
        color: 'linear-gradient(135deg, #FFFFFF80, #FFFFFF40)',
        needsBorder: true
      },
      {
        name: '3dPrinting.materials.sla.prusament.colors.modelTransparentGreen',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin Model Transparent Green.avif',
        color: 'linear-gradient(135deg, #00FF0080, #00FF0040)',
        needsBorder: true
      },
      {
        name: '3dPrinting.materials.sla.prusament.colors.modelTransparentRed',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin Model Transparent Red.avif',
        color: 'linear-gradient(135deg, #FF000080, #FF000040)',
        needsBorder: true
      },
      {
        name: '3dPrinting.materials.sla.prusament.colors.modelAnthraciteGrey',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin Model Anthracite Grey.avif',
        color: '#2F4F4F'
      },
      {
        name: '3dPrinting.materials.sla.prusament.colors.modelBrickRed',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin Model Brick Red.avif',
        color: '#8B0000'
      },
      {
        name: '3dPrinting.materials.sla.prusament.colors.modelClassicRed',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin Model Classic Red.avif',
        color: '#DC143C'
      },
      {
        name: '3dPrinting.materials.sla.prusament.colors.modelPrusaOrange',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin Model Prusa Orange 1kg.avif',
        color: '#FF6B18'
      },
      {
        name: '3dPrinting.materials.sla.prusament.colors.modelTerraBrown',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin Model Terra Brown.avif',
        color: '#8B4513'
      },
      {
        name: '3dPrinting.materials.sla.prusament.colors.modelSandstone',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin Model Sandstone.avif',
        color: '#DEB887'
      },
      {
        name: '3dPrinting.materials.sla.prusament.colors.modelBrightYellow',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin Model Bright Yellow.avif',
        color: '#FFD700'
      },
      {
        name: '3dPrinting.materials.sla.prusament.colors.modelGrassGreen',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin Model Grass Green.avif',
        color: '#228B22'
      },
      // Flex80 Colors
      {
        name: '3dPrinting.materials.sla.prusament.colors.flex80TransparentClear',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin Flex80 Transparent Clear.avif',
        color: 'linear-gradient(135deg, #FFFFFF80, #FFFFFF40)',
        needsBorder: true
      },
      {
        name: '3dPrinting.materials.sla.prusament.colors.flex80Black',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin Flex80 Black.avif',
        color: '#000000'
      },
      // BioBased60 Colors
      {
        name: '3dPrinting.materials.sla.prusament.colors.bioBased60NaturalYellow',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin BioBased60 Natural Yellow.avif',
        color: '#F0E68C'
      },
      {
        name: '3dPrinting.materials.sla.prusament.colors.bioBased60HerbalGreen',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin BioBased60 Herbal Green.avif',
        color: '#2E8B57'
      },
      {
        name: '3dPrinting.materials.sla.prusament.colors.bioBased60MagmaRed',
        imageUrl: '/3dprinters/PrusaSLAResin/Prusament Resin BioBased60 Magma Red.avif',
        color: '#8B0000'
      }
    ],
    selectedColor: '3dPrinting.materials.sla.prusament.colors.modelTransparentClear'
  },
  {
    id: 'phrozen-resin',
    name: 'PHROZEN Resin',
    type: 'SLA',
    description: '3dPrinting.materials.sla.phrozen.description',
    properties: [
      '3dPrinting.materials.sla.phrozen.properties.highResolution',
      '3dPrinting.materials.sla.phrozen.properties.specializedFormulas',
      '3dPrinting.materials.sla.phrozen.properties.waterWashable',
      '3dPrinting.materials.sla.phrozen.properties.castingCapable'
    ],
    applications: [
      '3dPrinting.materials.sla.phrozen.applications.jewelryCasting',
      '3dPrinting.materials.sla.phrozen.applications.detailedModels',
      '3dPrinting.materials.sla.phrozen.applications.professionalPrints',
      '3dPrinting.materials.sla.phrozen.applications.specialtyApplications'
    ],
    imageUrl: '/3dprinters/PhrozenSLAResin/AquaBlue_1400x1600_1.webp',
    colors: [
      {
        name: '3dPrinting.materials.sla.phrozen.colors.aquaBlue',
        imageUrl: '/3dprinters/PhrozenSLAResin/AquaBlue_1400x1600_1.webp',
        color: '#00CED1',
        needsBorder: true
      },
      {
        name: '3dPrinting.materials.sla.phrozen.colors.aquaGreen',
        imageUrl: '/3dprinters/PhrozenSLAResin/Phrozen Aqua 3D Printing Resin Green.webp',
        color: '#2E8B57',
        needsBorder: true
      },
      {
        name: '3dPrinting.materials.sla.phrozen.colors.aquaGray',
        imageUrl: '/3dprinters/PhrozenSLAResin/Aqua-Gray8K_1400x1600_4.webp',
        color: '#808080'
      },
      {
        name: '3dPrinting.materials.sla.phrozen.colors.castableGreenW20',
        imageUrl: '/3dprinters/PhrozenSLAResin/Phrozen Castable Resin W20 Green.webp',
        color: '#228B22'
      },
      {
        name: '3dPrinting.materials.sla.phrozen.colors.castableOrangeW40',
        imageUrl: '/3dprinters/PhrozenSLAResin/Phrozen Castable Resin W40 Orange.webp',
        color: '#FFA500'
      },
      {
        name: '3dPrinting.materials.sla.phrozen.colors.castableViolet',
        imageUrl: '/3dprinters/PhrozenSLAResin/violet - Phrozen Castable Jewelry 3D Printing Resin.webp',
        color: '#8A2BE2'
      }
    ],
    selectedColor: '3dPrinting.materials.sla.phrozen.colors.aquaBlue'
  },
  {
    id: 'formlabs-resin',
    name: 'FORMLABS Resin',
    type: 'SLA',
    description: '3dPrinting.materials.sla.formlabs.description',
    properties: [
      '3dPrinting.materials.sla.formlabs.properties.engineeringGrade',
      '3dPrinting.materials.sla.formlabs.properties.industryCertified',
      '3dPrinting.materials.sla.formlabs.properties.highestPrecision',
      '3dPrinting.materials.sla.formlabs.properties.professionalQuality'
    ],
    applications: [
      '3dPrinting.materials.sla.formlabs.applications.engineeringParts',
      '3dPrinting.materials.sla.formlabs.applications.medicalDevices',
      '3dPrinting.materials.sla.formlabs.applications.dentalApplications',
      '3dPrinting.materials.sla.formlabs.applications.industrialPrototypes'
    ],
    imageUrl: '/3dprinters/FormlabsSLAResin/Formlabs Clear v4 Resin.jpg',
    colors: [
      {
        name: '3dPrinting.materials.sla.formlabs.colors.clearV4',
        imageUrl: '/3dprinters/FormlabsSLAResin/Formlabs Clear v4 Resin.jpg',
        color: 'linear-gradient(135deg, #FFFFFF80, #FFFFFF40)',
        needsBorder: true
      },
      {
        name: '3dPrinting.materials.sla.formlabs.colors.whiteV4',
        imageUrl: '/3dprinters/FormlabsSLAResin/Formlabs White v4 Resin.jpg',
        color: '#FFFFFF',
        needsBorder: true
      },
      {
        name: '3dPrinting.materials.sla.formlabs.colors.greyV4',
        imageUrl: '/3dprinters/FormlabsSLAResin/Formlabs Grey v4 Resin.jpg',
        color: '#808080'
      },
      {
        name: '3dPrinting.materials.sla.formlabs.colors.blackV4',
        imageUrl: '/3dprinters/FormlabsSLAResin/Formlabs Black v4 Resin.jpg',
        color: '#000000'
      },
      {
        name: '3dPrinting.materials.sla.formlabs.colors.colorKit',
        imageUrl: '/3dprinters/FormlabsSLAResin/Formlabs Color Kit.jpg',
        color: 'linear-gradient(135deg, #FF0000, #00FF00, #0000FF)'
      },
      {
        name: '3dPrinting.materials.sla.formlabs.colors.colorBase',
        imageUrl: '/3dprinters/FormlabsSLAResin/Color Base Resin.webp',
        color: '#F5F5F5',
        needsBorder: true
      },
      {
        name: '3dPrinting.materials.sla.formlabs.colors.castableWax40',
        imageUrl: '/3dprinters/FormlabsSLAResin/Formlabs Castable Wax 40 Resin Cartridge.png',
        color: '#DAA520'
      }
    ],
    selectedColor: '3dPrinting.materials.sla.formlabs.colors.clearV4',
    isPremium: true
  }
];

const PrintingMaterials = () => {
  const { t } = useTranslation('3dprinting');
  const [selectedType, setSelectedType] = useState<'ALL' | 'SLA' | 'FDM'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const materialsPerPage = 9;
  const [materials, setMaterials] = useState<Material[]>(initialMaterials);

  const filteredMaterials = materials.filter(material => {
    const matchesType = selectedType === 'ALL' || material.type === selectedType;
    const matchesSearch = material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t(material.description).toLowerCase().includes(searchQuery.toLowerCase());
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

  return (
    <section id="materials-section" className="section-spacing bg-[#f5f5f7]">
              <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-title-wrapper flex flex-col items-center">
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={4}
            className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral'] mb-4"
          >
            {t('3dPrinting.materials.title')}
          </GradientText>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg font-['Magistral'] max-w-2xl">
            {t('3dPrinting.materials.subtitle')}
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedType('ALL')}
              className={`px-6 py-2 rounded-full ${
                selectedType === 'ALL'
                  ? 'bg-[#329db7] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              } transition-colors`}
            >
              {t('3dPrinting.materials.filters.all')}
            </button>
            <button
              onClick={() => setSelectedType('FDM')}
              className={`px-6 py-2 rounded-full ${
                selectedType === 'FDM'
                  ? 'bg-[#329db7] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              } transition-colors`}
            >
              {t('3dPrinting.materials.filters.fdm')}
            </button>
            <button
              onClick={() => setSelectedType('SLA')}
              className={`px-6 py-2 rounded-full ${
                selectedType === 'SLA'
                  ? 'bg-[#329db7] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              } transition-colors`}
            >
              {t('3dPrinting.materials.filters.sla')}
            </button>
          </div>
          
          <input
            type="text"
            placeholder={t('3dPrinting.materials.search.placeholder')}
            className="w-full md:w-[300px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#329db7] focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
                      {t('3dPrinting.materials.premium')}
                    </span>
                  )}
                  <span className="px-3 py-1 bg-white/90 rounded-full text-sm font-medium text-[#329db7]">
                    {material.type}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3">{material.name}</h3>
                <p className="text-gray-600 text-sm sm:text-base mb-4">{t(material.description)}</p>
                
                {material.colors && (
                  <div className="mb-6">
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">{t('3dPrinting.materials.colors.title')}</h4>
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
                            aria-label={t(color.name)}
                          />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            {t(color.name)}
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {material.colors && material.selectedColor && (
                  <div className="mb-6">
                    <p className="text-xs sm:text-sm text-gray-600">
                      {t('3dPrinting.materials.colors.selected')}: <span className="font-medium text-gray-900">{t(material.selectedColor)}</span>
                    </p>
                  </div>
                )}
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">{t('3dPrinting.materials.properties.title')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {material.properties.map((property, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 rounded-full text-xs sm:text-sm text-gray-600"
                        >
                          {t(property)}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">{t('3dPrinting.materials.applications.title')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {material.applications.map((application, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 rounded-full text-xs sm:text-sm text-gray-600"
                        >
                          {t(application)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-full ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-[#329db7] text-white hover:bg-[#2a8ba0]'
              } transition-colors`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-full ${
                  currentPage === page
                    ? 'bg-[#329db7] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                } transition-colors`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-[#329db7] text-white hover:bg-[#2a8ba0]'
              } transition-colors`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PrintingMaterials;