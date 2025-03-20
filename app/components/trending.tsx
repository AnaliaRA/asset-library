import React, { useState } from 'react';
import AssetCard from './assetCard';
import { Asset } from '@/app/types/asset';

interface TrendingProps {
  assets: Asset[];
  currentFilter: string;
}

const ITEMS_PER_PREVIEW = 4;
const HITS_THRESHOLD = 75;

const Trending = ({ assets, currentFilter }: TrendingProps) => {
  const [showAll, setShowAll] = useState(false);
  const popularAssets = assets.filter(asset => asset.hits > HITS_THRESHOLD);
  const sortedAssets = [...popularAssets].sort((a, b) => b.hits - a.hits);
  const displayedAssets = showAll ? sortedAssets : sortedAssets.slice(0, ITEMS_PER_PREVIEW);

  return (
    <div className="w-full">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">Trending</h2>
        <h3 className="text-sm text-gray-500">Most used assets this month</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedAssets.map(asset => (
          <AssetCard key={asset.name} asset={asset} />
        ))}
      </div>
      {popularAssets.length > 4 && currentFilter === 'all' && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <span>{showAll ? 'Show less' : 'See all trending assets'}</span>
            <svg
              className={`ml-2 w-4 h-4 transition-transform ${showAll ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Trending;
