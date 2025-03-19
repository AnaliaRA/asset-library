'use client';

import { useEffect, useState } from 'react';
import { Asset } from '@/types/asset';
import { useParams } from 'next/navigation';

export default function AssetPage() {
  const params = useParams();
  const [asset, setAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        setLoading(true);
        const response = await fetch('/assets.json');
        const assets = await response.json();
        const foundAsset = assets.find((a: Asset) => a.id === parseInt(params.id as string));
        setAsset(foundAsset || null);
      } catch (error) {
        console.error('Error fetching asset:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAsset();
  }, [params.id]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!asset) {
    return <div className="p-4">Asset not found</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{asset.name}</h1>
      
      <div className="grid gap-4 bg-white rounded-lg shadow p-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Details</h2>
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
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{asset.description}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Business Questions</h2>
          <ul className="list-disc pl-5">
            {asset.businessQuestions.map((question, index) => (
              <li key={index} className="text-gray-700">{question}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Dates</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Created</p>
              <p className="font-medium">{new Date(asset.creationDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Updated</p>
              <p className="font-medium">{new Date(asset.updatedDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 