'use client';

import React, { useState, useEffect } from 'react';
import { Asset } from '@/app/types/asset';
import { assetService } from '@/app/firebase/assetService';
import FiltersBar from '@/app/components/filterBar';
import SearchBar from '@/app/components/searchBar';
import Featured from '@/app/components/featured';
import Trending from '@/app/components/trending';
import FilteredAssets from '@/app/components/filteredAssets';
import LoadingSpinner from '@/app/components/loadingSpinner';

const AssetsContent = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const fetchedAssets = await assetService.getAllAssets();
        setAssets(fetchedAssets);
      } catch (error) {
        console.error('Error loading assets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAssets();
  }, []);

  const handleSearch = (term: string) => {
    setSearchQuery(term);
  };

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
  };

  const filteredAssets = assets.filter((asset) => {
    if (currentFilter !== 'all' && asset.type.toLowerCase() !== currentFilter.toLowerCase()) {
      return false;
    }
    
    if (searchQuery) {
      return (
        asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return true;
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Assets</h1>
        <p className="text-gray-600">
          Browse and search through our collection of assets.
        </p>
      </div>

      <div className="mb-8">
        <SearchBar 
          onSearch={handleSearch} 
          activeFilter={currentFilter !== 'all' ? currentFilter : undefined}
          placeholder={currentFilter !== 'all' ? `Search in ${currentFilter}...` : 'Search all assets...'}
        />
      </div>

      <div className="mb-8">
        <FiltersBar onFilterChange={handleFilterChange} />
      </div>

      <div className="mb-8">
        <Featured
          assets={filteredAssets}
        />
      </div>
      <div className="mb-8">
        <Trending
          assets={filteredAssets}
          currentFilter={currentFilter}
        />
      </div>
      <div className="mb-8">
        <FilteredAssets
          assets={filteredAssets}
          currentFilter={currentFilter}
        />
      </div>
    </div>
  );
};

export default AssetsContent; 