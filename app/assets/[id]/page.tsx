'use client';

import { useEffect, useState } from 'react';
import { Asset } from '@/types/asset';
import { useParams } from 'next/navigation';
import EngagementChart from '@/app/components/charts/engagement';
import AdherenceChart from '@/app/components/charts/adherence';
import SatisfactionChart from '@/app/components/charts/satisfaction';

export default function AssetPage() {
  const params = useParams();
  const [asset, setAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/assets/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch asset');
        }
        const foundAsset = await response.json();

        if ('error' in foundAsset) {
          setError(foundAsset.error);
          setAsset(null);
        } else {
          setAsset(foundAsset);
        }
      } catch (error) {
        console.error('Error fetching asset:', error);
        setError('Failed to load asset data');
        setAsset(null);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchAsset();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
          Asset not found
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">{asset.name}</h1>

      <div className="grid gap-4 bg-white rounded-lg shadow p-6">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-center">Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Type</p>
              <p className="font-medium">{asset.type}</p>
            </div>
            <div>
              <p className="text-gray-600">Pages</p>
              <p className="font-medium">{asset.amountOfPages}</p>
            </div>
            <div>
              <p className="text-gray-600">Has Visuals</p>
              <p className="font-medium">{asset.hasVisuals ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <p className="text-gray-600">Hits</p>
              <p className="font-medium">{asset.hits}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-center">
            Description
          </h2>
          <p className="text-gray-700">{asset.description}</p>
        </div>

        {asset.type.toLowerCase() === 'kpi' &&
          asset.businessQuestions &&
          asset.businessQuestions.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-center">
                Business Questions
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {asset.businessQuestions.map((question, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="font-medium mb-2">Question {index + 1}</div>
                    <div className="text-sm text-gray-600">{question}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        <div>
          <h2 className="text-xl font-semibold mb-2 text-center">Dates</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Created</p>
              <p className="font-medium">
                {new Date(asset.creationDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Updated</p>
              <p className="font-medium">
                {new Date(asset.updatedDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {asset.hasVisuals && (
          <div>
            <h2 className="text-xl font-semibold mb-2 text-center">
              Analytics
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <EngagementChart asset={asset} />
              <AdherenceChart asset={asset} />
              <SatisfactionChart asset={asset} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
