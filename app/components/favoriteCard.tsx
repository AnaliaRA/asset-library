import React, { useState } from 'react';
import Link from 'next/link';
import { Asset } from '../types/asset';
import EngagementChart from './charts/engagement';
import AdherenceChart from './charts/adherence';
import SatisfactionChart from './charts/satisfaction';
import ConfirmationDialog from './confirmationDialog';

interface FavoriteCardProps {
  asset: Asset;
  onRemove: (assetId: string) => void;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({ asset, onRemove }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const renderChart = () => {
    switch (asset.type.toLowerCase()) {
      case 'kpi':
        return <EngagementChart asset={asset} />;
      case 'layout':
        return <AdherenceChart asset={asset} />;
      default:
        return <SatisfactionChart asset={asset} />;
    }
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmRemove = () => {
    setShowConfirmation(false);
    onRemove(asset.id);
  };

  return (
    <>
      <Link
        href={`/assets/${asset.id}`}
        className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 relative"
      >
        <button
          onClick={handleRemoveClick}
          className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors duration-200 z-10"
          aria-label={`Remove ${asset.name} from favorites`}
        >
          <svg 
            className="w-4 h-4 text-gray-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="p-8 mb-16">
          {renderChart()}
        </div>
      </Link>

      <ConfirmationDialog
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmRemove}
        title="Remove from Favorites"
        message={`Are you sure you want to remove "${asset.name}" from your favorites?`}
        confirmText="Remove"
        cancelText="Cancel"
      />
    </>
  );
};

export default FavoriteCard; 