import React, { useState } from 'react';
import AssetCard from './assetCard';
import { Asset } from '@/app/hooks/useAssets';

interface TrendingProps {
  assets: Asset[];
}

const Trending = ({ assets }: TrendingProps) => {
  const [showAll, setShowAll] = useState(false);
  const sortedAssets = [...assets].sort((a, b) => b.hits - a.hits);
  const displayedAssets = showAll ? sortedAssets : sortedAssets.slice(0, 4);

  return (
    <div className="w-full">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">Trending</h2>
        <h3 className="text-sm text-gray-500">Most used assets this month</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedAssets.map((asset) => (
          <AssetCard key={asset.name} asset={asset} />
        ))}
      </div>
      {assets.length > 4 && (
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