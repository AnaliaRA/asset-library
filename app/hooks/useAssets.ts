import { useEffect } from 'react';
import { Asset } from '../types/asset';
import { useAssetStore } from '../store/assetStore';

interface UseAssetsReturn {
  assets: Asset[];
  filteredAssets: Asset[];
  isLoading: boolean;
  error: string | null;
  searchAssets: (term: string) => void;
}

export function useAssets(typeFilter: string = 'all'): UseAssetsReturn {
  const {
    assets,
    filteredAssets,
    isLoading,
    error,
    fetchAssets,
    setFilter,
    searchAssets,
  } = useAssetStore();

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  useEffect(() => {
    setFilter(typeFilter);
  }, [typeFilter, setFilter]);

  return {
    assets,
    filteredAssets,
    isLoading,
    error,
    searchAssets,
  };
}
