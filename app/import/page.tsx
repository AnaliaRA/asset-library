'use client';

import { useState } from 'react';
import { importSampleData, ImportType } from '../firebase/importData';

export default function ImportPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [importType, setImportType] = useState<ImportType>('all');

  const handleImport = async () => {
    try {
      setStatus('loading');
      setError(null);
      await importSampleData(importType);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'An error occurred during import');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Import Sample Data
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Select the type of data to import and click the button below
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-6">
          <div className="w-64">
            <label htmlFor="importType" className="block text-sm font-medium text-gray-700 mb-2">
              Select Import Type
            </label>
            <select
              id="importType"
              value={importType}
              onChange={(e) => setImportType(e.target.value as ImportType)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All Assets (43 items)</option>
              <option value="sample">Sample Assets (33 items)</option>
              <option value="storyboard">Storyboard Assets (10 items)</option>
            </select>
          </div>

          <button
            onClick={handleImport}
            disabled={status === 'loading'}
            className={`px-4 py-2 rounded-md text-white font-medium ${
              status === 'loading'
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {status === 'loading' ? 'Importing...' : 'Import Selected Data'}
          </button>
        </div>

        {status === 'success' && (
          <div className="mt-6 text-center text-green-600">
            ✅ {importType === 'all' ? 'All' : importType} data imported successfully!
          </div>
        )}

        {status === 'error' && (
          <div className="mt-6 text-center text-red-600">
            ❌ Error: {error}
          </div>
        )}

        <div className="mt-12 prose prose-blue mx-auto">
          <h2>Import Details</h2>
          <ul>
            <li><strong>Sample Assets (33):</strong> Mix of KPIs, data visualizations, and layouts</li>
            <li><strong>Storyboard Assets (10):</strong> Various storyboards for different business purposes</li>
            <li><strong>All Assets (43):</strong> Complete set of both sample and storyboard assets</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 