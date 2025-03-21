'use client';

import { Suspense } from 'react';
import LoadingSpinner from '@/app/components/loadingSpinner';
import AssetsContent from '@/app/assets/page';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<LoadingSpinner />}>
          <AssetsContent />
        </Suspense>
      </div>
    </div>
  );
}
