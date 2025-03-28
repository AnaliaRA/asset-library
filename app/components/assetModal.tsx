import React, { useEffect, useRef } from 'react';
import { Asset } from '../types/asset';
import EngagementChart from '@/app/components/charts/engagement';
import FavoriteButton from '@/app/components/favoriteButton';

interface AssetModalProps {
  asset: Asset;
  isOpen: boolean;
  onClose: () => void;
}

const AssetModal: React.FC<AssetModalProps> = ({ asset, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      previousActiveElement.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const copyLink = () => {
    const url = `${window.location.origin}/assets/${asset.id}`;
    navigator.clipboard.writeText(url);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-25 flex items-start justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        ref={modalRef}
        className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col"
      >
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
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="gap-2">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gray-100 rounded-full">
                <svg
                  className="w-8 h-8 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  aria-hidden="true"
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
            <h2 id="modal-title" className="text-xl font-semibold text-center flex flex-col items-center gap-2">
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
        <div className="px-3 py-2 grid grid-cols-4 gap-4 border-t border-b border-gray-200">
          <div>
            <div className="text-xl font-semibold">{asset.hits}</div>
            <div className="text-sm text-gray-500">Used</div>
          </div>
          <div>
            <div className="text-xl font-semibold">{asset.type}</div>
            <div className="text-sm text-gray-500">Type</div>
          </div>
          <div>
            <div className="text-xl font-semibold">6</div>
            <div className="text-sm text-gray-500">Pages No.</div>
          </div>
          <div>
            <div className="text-xl font-semibold">
              {new Date(asset.creationDate).toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
              })}
            </div>
            <div className="text-sm text-gray-500">Last Updated</div>
          </div>
        </div>
        {asset.type.toLowerCase() === 'kpi' &&
          asset.businessQuestions &&
          asset.businessQuestions.length > 0 && (
            <div className="px-6 pb-2">
              <h3 className="font-semibold m-2">Business Questions</h3>
              <div className="grid grid-cols-2 gap-4">
                {asset.businessQuestions.slice(0, 2).map((question, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="font-medium mb-2">Question {index + 1}</div>
                    <div className="text-sm text-gray-600">{question}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {asset.hasVisuals && (
          <div 
            className="overflow-y-auto"
            role="region"
            aria-label="Charts section"
            tabIndex={0}
            style={{ scrollBehavior: 'smooth' }}
          >
            <EngagementChart asset={asset} />
          </div>
        )}

        {!asset.needsApproval && (
          <div className="p-6 pt-2">
            <FavoriteButton asset={asset} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetModal;
