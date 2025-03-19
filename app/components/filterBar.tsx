"use client";

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
];

interface NavigationProps {
  onFilterChange: (filter: string) => void;
}

const Navigation = ({ onFilterChange }: NavigationProps) => {
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get('filter') || 'featured';

  return (
    <nav className="flex justify-center space-x-4 mt-4 mb-8">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={`?filter=${item.type}`}
          className={`px-3 py-2 text-sm font-medium ${
            currentFilter === item.type
              ? 'text-gray-900 font-semibold'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => onFilterChange(item.type)}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation; 