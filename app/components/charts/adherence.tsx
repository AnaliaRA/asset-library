import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Asset } from '@/types/asset';

interface AdherenceChartProps {
  asset: Asset;
}

const AdherenceChart: React.FC<AdherenceChartProps> = ({ asset }) => {
  const data = [
    { category: 'Guidelines', adherence: 85 },
    { category: 'Protocol', adherence: 75 },
    { category: 'Standards', adherence: 90 },
    { category: 'Best Practices', adherence: 82 },
  ];

  return (
    <div className="w-full h-[300px] p-4">
      <h3 className="text-lg font-semibold mb-4">{asset.name} Adherence Metrics</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="adherence" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdherenceChart;
