import React, { useState, useEffect } from 'react';
import { Asset } from '@/app/types/asset';
import { favoriteService } from '@/app/firebase/favoriteService';

interface FavoriteButtonProps {
  asset: Asset;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ asset }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const status = await favoriteService.isFavorite(asset.id);
      setIsFavorite(status);
    };
    checkFavoriteStatus();
  }, [asset.id]);

  const handleToggleFavorite = async () => {
    setIsLoading(true);
    try {
      if (isFavorite) {
        await favoriteService.removeFromFavorites(asset.id);
        setIsFavorite(false);
      } else {
        await favoriteService.addToFavorites(asset);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors cursor-pointer ${
        isFavorite 
          ? 'bg-red-600 text-white hover:bg-red-700' 
          : 'bg-gray-900 text-white hover:bg-gray-800'
      }`}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        className="w-5 h-5"
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span>{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</span>
    </button>
  );
};

export default FavoriteButton; 