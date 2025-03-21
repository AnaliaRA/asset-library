'use client';

import React, { useState, useEffect } from 'react';
import { Asset } from '@/app/types/asset';
import { assetService } from '@/app/firebase/assetService';
import { requestService } from '@/app/firebase/requestService';

const Request = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<string>('');
  const [justification, setJustification] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const fetchedAssets = await assetService.getAllAssets();
        setAssets(fetchedAssets);
      } catch (error) {
        console.error('Error loading assets:', error);
      }
    };

    if (isModalOpen) {
      loadAssets();
    }
  }, [isModalOpen]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAsset('');
    setJustification('');
  };

  const handleSubmit = async () => {
    if (!selectedAsset || !justification) return;

    setIsLoading(true);
    try {
      const asset = assets.find(a => a.id === selectedAsset);
      if (asset) {
        await requestService.createRequest(asset, justification);
        closeModal();
      }
    } catch (error) {
      console.error('Error submitting request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative top-0 right-0">
      <button
        onClick={openModal}
        className="flex items-center gap-2 rounded-lg bg-gray-600 px-4 py-2 text-white shadow-md hover:bg-gray-700"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 12h18m-9-9v18"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        Request
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl mx-4 overflow-hidden border border-gray-200 shadow-xl">
            <div className="flex flex-row-reverse p-6">
              <button
                onClick={closeModal}
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

            <div className="px-6 pb-4">
              <div className="gap-2">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gray-100 rounded-full">
                    <svg
                      className="w-8 h-8 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-center">
                  Request Asset Access
                </h2>
                <h3 className="text-gray-600 text-center mt-2">
                  Select an asset and provide justification for access
                </h3>
              </div>
            </div>

            <div className="px-6 py-4 space-y-4">
              <div>
                <label htmlFor="asset" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Asset
                </label>
                <select
                  id="asset"
                  value={selectedAsset}
                  onChange={(e) => setSelectedAsset(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 bg-white"
                >
                  <option value="">Select an asset...</option>
                  {assets.map((asset) => (
                    <option key={asset.id} value={asset.id}>
                      {asset.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="justification" className="block text-sm font-medium text-gray-700 mb-1">
                  Justification
                </label>
                <textarea
                  id="justification"
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  className="w-full h-40 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 bg-gray-50"
                  placeholder="Please provide a reason for requesting access to this asset..."
                />
              </div>
            </div>

            <div className="p-6 pt-2 flex gap-3">
              <button
                onClick={closeModal}
                className="w-1/2 bg-gray-100 text-gray-700 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-200 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!selectedAsset || !justification || isLoading}
                className="w-1/2 bg-gray-900 text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Request;
