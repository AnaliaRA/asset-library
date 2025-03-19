import { useState, useEffect } from 'react';

export interface Asset {
  id: number;
  name: string;
  description: string;
  type: string;
  creationDate: string;
  updatedDate: string;
  hits: number;
}

interface UseAssetsReturn {
  assets: Asset[];
  filteredAssets: Asset[];
  isLoading: boolean;
  error: string | null;
  searchAssets: (term: string) => void;
}

export function useAssets(typeFilter: string = 'featured'): UseAssetsReturn {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`/api/assets?type=${typeFilter}`);
        if (!response.ok) {
          throw new Error('Failed to fetch assets');
        }
        const data = await response.json();
        setAssets(data);
        setFilteredAssets(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch assets');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssets();
  }, [typeFilter]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = assets.filter(asset => 
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAssets(filtered);
    } else {
      setFilteredAssets(assets);
    }
  }, [searchTerm, assets]);

  const searchAssets = (term: string) => {
    setSearchTerm(term);
  };

  return {
    assets,
    filteredAssets,
    isLoading,
    error,
    searchAssets
  };
} 