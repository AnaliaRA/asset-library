import React from 'react';

import AssetCard from '@/app/components/assetCard';
import Pagination from '@/app/components/pagination';
import { Asset } from '@/app/types/asset';
import { useAssetStore } from '@/app/store/assetStore';
import { usePathname } from 'next/navigation';

interface FilteredAssetsProps {
  assets: Asset[];
  currentFilter: string;
}

const FilteredAssets = ({ assets, currentFilter }: FilteredAssetsProps) => {
  const { currentPage, itemsPerPage, setPage } = useAssetStore();
  const pathname = usePathname();
  
  if (currentFilter === 'all' && pathname !== '/assets') return null;

  const totalPages = Math.ceil(assets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAssets = assets.slice(startIndex, startIndex + itemsPerPage);
  const title = currentFilter === 'all' ? 'All Assets' : `${currentFilter} Assets`;

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-4">
          {title}
        </h2>
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