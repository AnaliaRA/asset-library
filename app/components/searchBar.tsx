'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  activeFilter?: string;
}

const SearchBar = ({ onSearch, placeholder = 'Type to search...', activeFilter }: SearchBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('search', encodeURIComponent(value));
    } else {
      params.delete('search');
    }
    router.push(`?${params.toString()}`);
    onSearch(value);
  };

  return (
    <div className="flex flex-col items-center w-full" data-testid="search-container">
      <div className="relative w-full max-w-2xl mx-auto">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={placeholder}
          onChange={e => handleSearch(e.target.value)}
          value={searchParams.get('search') || ''}
          data-testid="search-input"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            data-testid="search-icon"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      {activeFilter && (
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="text-sm text-gray-600">Active filter:</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {activeFilter}
          </span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
