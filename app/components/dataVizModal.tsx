import React from 'react';
import { Asset } from '../types/asset';
import EngagementChart from '@/app/components/charts/engagement';
import AdherenceChart from '@/app/components/charts/adherence';
import SatisfactionChart from '@/app/components/charts/satisfaction';
import FavoriteButton from '@/app/components/favoriteButton';

interface DataVizModalProps {
  asset: Asset;
  isOpen: boolean;
  onClose: () => void;
}

const DataVizModal: React.FC<DataVizModalProps> = ({
  asset,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const copyLink = () => {
    const url = `${window.location.origin}/assets/${asset.id}`;
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-start justify-center z-50 p-4 overflow-y-auto">
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-900">{asset.name}</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={copyLink}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Copy link to clipboard"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div 
          className="overflow-y-auto flex-1 p-6"
          role="region"
          aria-label="Modal content"
          tabIndex={0}
        >
          <div 
            className="overflow-x-auto"
            role="region"
            aria-label="Charts container"
            tabIndex={0}
          >
            <div className="gap-2">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gray-100 rounded-full">
                  <svg
                    className="w-8 h-8 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      strokeWidth="2"
                    />
                    <path d="M9 3v18M15 3v18M3 9h18M3 15h18" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-center flex flex-col items-center gap-2">
                <a
                  href={`/assets/${asset.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="uppercase hover:text-blue-600 transition-colors"
                >
                  {asset.name}
                </a>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                  {asset.type}
                </span>
              </h2>
              <h3 className="text-gray-600 text-center mt-2">
                {asset.description}
              </h3>
            </div>
            <div className="px-6 pb-4">
              <div className="flex items-center justify-center gap-2">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                  #comms
                </span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                  #coverage
                </span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                  #stakeholders
                </span>
              </div>
            </div>
            <div className="flex flex-nowrap gap-4 p-6 min-w-max">
              <EngagementChart asset={asset} />
              <AdherenceChart asset={asset} />
              <SatisfactionChart asset={asset} />
              <EngagementChart asset={asset} />
              <AdherenceChart asset={asset} />
              <SatisfactionChart asset={asset} />
            </div>
          </div>
        </div>
        <div className="p-6 pt-2">
          <FavoriteButton asset={asset} />
        </div>
      </div>
    </div>
  );
};

export default DataVizModal;
