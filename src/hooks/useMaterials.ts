import { useState, useEffect } from 'react';

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
    color: string;
    needsBorder?: boolean;
  }[];
  selectedColor?: string;
  isPremium?: boolean;
}

export const useMaterials = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMaterials = async () => {
      try {
        setLoading(true);
        // Import the JSON data
        const materialsData = await import('@/data/materials.json');
        const rawMaterials = materialsData.default || materialsData;
        // Type assertion to ensure proper typing
        setMaterials(rawMaterials as Material[]);
        setError(null);
      } catch (err) {
        console.error('Failed to load materials:', err);
        setError('Failed to load materials data');
        // Fallback to empty array
        setMaterials([]);
      } finally {
        setLoading(false);
      }
    };

    loadMaterials();
  }, []);

  const updateMaterialColor = (materialId: string, colorName: string) => {
    setMaterials(prev => 
      prev.map(material => 
        material.id === materialId 
          ? { ...material, selectedColor: colorName }
          : material
      )
    );
  };

  const fdmMaterials = materials.filter(m => m.type === 'FDM');
  const slaMaterials = materials.filter(m => m.type === 'SLA');

  return {
    materials,
    fdmMaterials,
    slaMaterials,
    loading,
    error,
    updateMaterialColor
  };
}; 