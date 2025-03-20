import React, { useState } from 'react';
import Image from 'next/image';
import { Asset } from '../types/asset';
import AssetModal from './assetModal';
import DataVizModal from './dataVizModal';

const AssetCard: React.FC<{ asset: Asset }> = ({ asset }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
        onClick={() => setIsModalOpen(true)}
        data-testid="asset-card"
      >
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <Image
              src="/clock-icon.svg"
              alt="Clock icon"
              width={24}
              height={24}
              className="text-gray-500"
            />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate" data-testid="asset-name">
            {asset.name}
          </h3>
          <p className="text-sm text-gray-500 truncate" data-testid="asset-description">
            {asset.description}
          </p>
          <p className="text-xs text-gray-600 mt-1" data-testid="asset-date">
            {new Date(asset.updatedDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      {asset.type === 'dataviz' ? (
        <DataVizModal
          asset={asset}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      ) : (
        <AssetModal
          asset={asset}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default AssetCard;
