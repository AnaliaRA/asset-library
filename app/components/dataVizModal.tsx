import React from 'react';
import { Asset } from '../types/asset';
import EngagementChart from '@/app/components/charts/engagement';
import AdherenceChart from '@/app/components/charts/adherence';
import SatisfactionChart from '@/app/components/charts/satisfaction';

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
    <div className="fixed inset-0 bg-opacity-15 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 overflow-hidden border border-gray-200 shadow-xl">
        <div className="flex flex-row-reverse p-6">
          <div className="flex items-center space-x-2">
            <button
              onClick={copyLink}
              className="text-gray-400 hover:text-gray-600"
              title="Copy link"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="px-6 pb-4">
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
        </div>
        <div className="overflow-x-auto">
          <div className="flex flex-nowrap gap-4 p-6 min-w-max">
            <EngagementChart asset={asset} />
            <AdherenceChart asset={asset} />
            <SatisfactionChart asset={asset} />
            <EngagementChart asset={asset} />
            <AdherenceChart asset={asset} />
            <SatisfactionChart asset={asset} />
          </div>
        </div>
        <div className="p-6 pt-2">
          <button className="w-full bg-gray-900 text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>Favorite item</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataVizModal;
