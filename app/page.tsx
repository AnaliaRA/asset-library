'use client';

import { Suspense, useState, useEffect } from 'react';
import { useAssets } from '@/app/hooks/useAssets';
import Navigation from '@/app/components/filterBar';
import SearchBar from '@/app/components/searchBar';
import Featured from '@/app/components/featured';
import Trending from '@/app/components/trending';
import FilteredAssets from '@/app/components/filteredAssets';
import LoadingSpinner from '@/app/components/loadingSpinner';
import { useSearchParams, useRouter } from 'next/navigation';

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentFilter, setCurrentFilter] = useState(
    searchParams.get('filter') || 'all'
  );
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('search') || ''
  );
  const { filteredAssets, isLoading, error, searchAssets } =
    useAssets(currentFilter);

  // Initialize search term from URL
  useEffect(() => {
    if (searchTerm) {
      searchAssets(searchTerm);
    }
  }, [searchTerm, searchAssets]); // Added missing dependencies

  // Update URL when filter changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentFilter === 'all') {
      params.delete('filter');
    } else {
      params.set('filter', currentFilter);
    }
    if (searchTerm) {
      params.set('search', searchTerm);
    } else {
      params.delete('search');
    }
    router.push(`?${params.toString()}`);
  }, [currentFilter, searchTerm, router, searchParams]);

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    searchAssets(term);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search assets..."
              activeFilter={currentFilter !== 'all' ? currentFilter : undefined}
            />
            <Navigation onFilterChange={handleFilterChange} />
          </div>
          {isLoading ? (
            <LoadingSpinner />
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
              <FilteredAssets
                assets={filteredAssets}
                currentFilter={currentFilter}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<LoadingSpinner />}>
          <HomeContent />
        </Suspense>
      </div>
    </div>
  );
}
