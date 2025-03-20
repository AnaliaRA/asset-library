import React from 'react';
import AssetCard from './assetCard';
import { Asset } from '@/app/types/asset';

interface FeaturedProps {
  assets: Asset[];
}

const Featured = ({ assets }: FeaturedProps) => {
  const sortedAssets = [...assets].sort(
    (a, b) =>
      new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime()
  );
  return (
    <div className="w-full">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">Featured</h2>
        <h3 className="text-sm text-gray-500">
          Curated top picks from this week
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white">
        {sortedAssets.slice(0, 4).map(asset => (
          <AssetCard key={asset.name} asset={asset} />
        ))}
      </div>
    </div>
  );
};

export default Featured;
