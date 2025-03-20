'use client';

import { useParams } from 'next/navigation';
import EngagementChart from '@/app/components/charts/engagement';
import AdherenceChart from '@/app/components/charts/adherence';
import SatisfactionChart from '@/app/components/charts/satisfaction';
import LoadingSpinner from '@/app/components/loadingSpinner';
import Error from '@/app/components/error';
import NotFound from '@/app/components/notFound';
import { useAssets } from '@/app/hooks/useAssets';

export default function AssetPage() {
  const params = useParams();
  const { assets, isLoading, error } = useAssets();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Error message={error} />;
  }

  const asset = assets.find(a => a.id === params.id);
  
  if (!asset) {
    return <NotFound />;
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">{asset.name}</h1>

      <div className="grid gap-4 bg-white rounded-lg shadow p-6">
        <section aria-labelledby="details-heading" role="region">
          <h2 id="details-heading" className="text-xl font-semibold mb-2 text-center">Details</h2>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-gray-600">Type</dt>
              <dd className="font-medium">{asset.type}</dd>
            </div>
            <div>
              <dt className="text-gray-600">Pages</dt>
              <dd className="font-medium">{asset.amountOfPages}</dd>
            </div>
            <div>
              <dt className="text-gray-600">Has Visuals</dt>
              <dd className="font-medium">{asset.hasVisuals ? 'Yes' : 'No'}</dd>
            </div>
            <div>
              <dt className="text-gray-600">Hits</dt>
              <dd className="font-medium">{asset.hits}</dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="description-heading" role="region">
          <h2 id="description-heading" className="text-xl font-semibold mb-2 text-center">
            Description
          </h2>
          <p className="text-gray-700">{asset.description}</p>
        </section>

        {asset.type.toLowerCase() === 'kpi' &&
          asset.businessQuestions &&
          asset.businessQuestions.length > 0 && (
            <section aria-labelledby="questions-heading" role="region">
              <h2 id="questions-heading" className="text-xl font-semibold mb-4 text-center">
                Business Questions
              </h2>
              <ol className="grid grid-cols-2 gap-4 list-none">
                {asset.businessQuestions.map((question, index) => (
                  <li key={index}>
                    <article className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium mb-2">Question {index + 1}</h3>
                      <p className="text-sm text-gray-600">{question}</p>
                    </article>
                  </li>
                ))}
              </ol>
            </section>
          )}

        <section aria-labelledby="dates-heading" role="region">
          <h2 id="dates-heading" className="text-xl font-semibold mb-2 text-center">Dates</h2>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-gray-600">Created</dt>
              <dd className="font-medium">
                <time dateTime={asset.creationDate}>
                  {new Date(asset.creationDate).toLocaleDateString()}
                </time>
              </dd>
            </div>
            <div>
              <dt className="text-gray-600">Updated</dt>
              <dd className="font-medium">
                <time dateTime={asset.updatedDate}>
                  {new Date(asset.updatedDate).toLocaleDateString()}
                </time>
              </dd>
            </div>
          </dl>
        </section>

        {asset.hasVisuals && (
          <section aria-labelledby="analytics-heading" role="region">
            <h2 id="analytics-heading" className="text-xl font-semibold mb-2 text-center">
              Analytics
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <article aria-label="Engagement Metrics">
                <EngagementChart asset={asset} />
              </article>
              <article aria-label="Adherence Metrics">
                <AdherenceChart asset={asset} />
              </article>
              <article aria-label="Satisfaction Metrics">
                <SatisfactionChart asset={asset} />
              </article>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
