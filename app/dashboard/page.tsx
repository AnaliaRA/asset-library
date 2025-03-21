'use client';

import React, { useEffect, useState } from 'react';
import { Asset } from '../types/asset';
import { favoriteService } from '../firebase/favoriteService';
import Link from 'next/link';
import FavoriteCard from '../components/favoriteCard';

const Dashboard = () => {
  const [favorites, setFavorites] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favoriteAssets = await favoriteService.getFavorites();
        setFavorites(favoriteAssets);
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const handleRemoveFavorite = async (assetId: string) => {
    try {
      await favoriteService.removeFromFavorites(assetId);
      setFavorites(favorites.filter(asset => asset.id !== assetId));
    } catch (error) {
      console.error('Error removing favorite:', error);
      // Things to do:
      // - Show a toast notification
      // - Log the error to the console
      // - Redirect to the dashboard
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
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
          <h2 className="mt-4 text-xl font-semibold text-gray-900">No favorites yet</h2>
          <p className="mt-2 text-gray-500">
            Start adding assets to your favorites to see them here.
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Browse Assets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((asset) => (
          <FavoriteCard 
            key={asset.id} 
            asset={asset} 
            onRemove={handleRemoveFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard; 