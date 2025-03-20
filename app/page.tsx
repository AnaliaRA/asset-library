'use client';

import { Suspense, useState } from 'react';
import { useAssets } from '@/app/hooks/useAssets';
import AssetCard from '@/app/components/assetCard';
import Navigation from '@/app/components/filterBar';
import SearchBar from '@/app/components/searchBar';
import Featured from '@/app/components/featured';
import Trending from '@/app/components/trending';
import { useSearchParams } from 'next/navigation';

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    </div>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const [currentFilter, setCurrentFilter] = useState(
    searchParams.get('filter') || 'all'
  );
  const { filteredAssets, isLoading, error, searchAssets } =
    useAssets(currentFilter);

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
    searchAssets('');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold text-gray-900">Library</h1>
            <p className="text-md text-gray-500 mt-2">
              Browse for assets needed to report and present analysis.
            </p>
            <div className="w-full max-w-2xl mt-8">
              <SearchBar onSearch={searchAssets} />
            </div>
          </div>
        </div>
        <Navigation onFilterChange={handleFilterChange} />
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="space-y-12">
              <div>
                <Featured assets={filteredAssets} />
              </div>
              <div>
                <Trending
                  assets={filteredAssets}
                  currentFilter={currentFilter}
                />
              </div>
              {currentFilter !== 'all' && (
                <div>
                  <div className="mb-4">
                    <h2 className="text-2xl font-semibold">
                      All {currentFilter} Assets
                    </h2>
                    <p className="text-sm text-gray-500">
                      Browse all available {currentFilter} assets
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredAssets.map(asset => (
                      <AssetCard key={asset.name} asset={asset} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HomeContent />
    </Suspense>
  );
}
