'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface NavItem {
  label: string;
  type: string;
}

const navItems: NavItem[] = [
  { label: 'Featured', type: 'all' },
  { label: 'KPI', type: 'kpi' },
  { label: 'Layouts', type: 'layout' },
  { label: 'Storyboards', type: 'storyboard' },
  { label: 'Data Viz', type: 'dataviz' },
];

interface NavigationProps {
  onFilterChange: (filter: string) => void;
}

const FiltersBar = ({ onFilterChange }: NavigationProps) => {
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get('filter') || 'featured';

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, type: string) => {
    e.preventDefault();
    onFilterChange(type);
  };

  return (
    <nav className="flex justify-center space-x-4 mt-4 mb-8" data-testid="filter-nav">
      {navItems.map(item => (
        <Link
          key={item.label}
          href={`?filter=${item.type}`}
          className={`px-3 py-2 text-sm font-medium ${
            currentFilter === item.type
              ? 'text-gray-900 font-semibold'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={(e) => handleClick(e, item.type)}
          data-testid={`filter-${item.type}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default FiltersBar;
