import React from 'react';
import AssetCard from './assetCard';
import Pagination from './pagination';
import { Asset } from '@/app/types/asset';
import { useAssetStore } from '@/app/store/assetStore';

interface FilteredAssetsProps {
  assets: Asset[];
  currentFilter: string;
}

const FilteredAssets = ({ assets, currentFilter }: FilteredAssetsProps) => {
  const { currentPage, itemsPerPage, setPage } = useAssetStore();
  
  if (currentFilter === 'all') return null;

  const totalPages = Math.ceil(assets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAssets = assets.slice(startIndex, startIndex + itemsPerPage);

  return (
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
        {paginatedAssets.map(asset => (
          <AssetCard key={asset.name} asset={asset} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default FilteredAssets; 