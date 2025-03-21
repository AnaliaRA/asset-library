import { create, StateCreator } from 'zustand';
import { Asset } from '../types/asset';
import { assetService } from '../firebase/assetService';

interface AssetState {
  assets: Asset[];
  filteredAssets: Asset[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  searchTerm: string;
  currentFilter: string;
  
  fetchAssets: () => Promise<void>;
  setSearchTerm: (term: string) => void;
  setFilter: (filter: string) => void;
  setPage: (page: number) => void;
  searchAssets: (term: string) => void;
}

const ASSETS_PER_PAGE = 10;

const createAssetStore: StateCreator<AssetState> = (set, get) => ({
  assets: [],
  filteredAssets: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: ASSETS_PER_PAGE,
  totalItems: 0,
  searchTerm: '',
  currentFilter: 'all',

  fetchAssets: async () => {
    try {
      set({ isLoading: true, error: null });
      const assets = await assetService.getAllAssets();
      set({ 
        assets,
        filteredAssets: assets,
        totalItems: assets.length,
        isLoading: false 
      });
    } catch {
      set({ 
        error: 'Failed to fetch assets',
        isLoading: false 
      });
    }
  },

  setSearchTerm: (term: string) => {
    set({ searchTerm: term });
    get().searchAssets(term);
  },

  setFilter: (filter: string) => {
    set({ currentFilter: filter });
    const { assets, searchTerm } = get();
    let filtered = assets;
    
    if (filter !== 'all') {
      filtered = assets.filter((asset: Asset) => asset.type.toLowerCase() === filter.toLowerCase());
    }
    
    if (searchTerm) {
      filtered = filtered.filter((asset: Asset) =>
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    set({ 
      filteredAssets: filtered,
      totalItems: filtered.length,
      currentPage: 1
    });
  },

  setPage: (page: number) => {
    set({ currentPage: page });
  },

  searchAssets: (term: string) => {
    const { assets, currentFilter } = get();
    let filtered = assets;
    
    if (currentFilter !== 'all') {
      filtered = assets.filter((asset: Asset) => asset.type.toLowerCase() === currentFilter.toLowerCase());
    }
    
    if (term) {
      filtered = filtered.filter((asset: Asset) =>
        asset.name.toLowerCase().includes(term.toLowerCase()) ||
        asset.description.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    set({ 
      filteredAssets: filtered,
      totalItems: filtered.length,
      currentPage: 1
    });
  },
});

export const useAssetStore = create<AssetState>()(createAssetStore); 