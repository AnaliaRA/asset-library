import React, { useState, useEffect } from 'react';
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { Asset } from '@/types/asset';

interface AdherenceData {
  month: string;
  adherence: number;
}

const AdherenceChart: React.FC<{ asset: Asset }> = ({ asset }) => {
  const [chartData, setChartData] = useState<AdherenceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdherenceData = async () => {
      try {
        setLoading(true);
        const mockData = [
          { month: 'Jan', adherence: 78 },
          { month: 'Feb', adherence: 82 },
          { month: 'Mar', adherence: 85 },
          { month: 'Apr', adherence: 87 },
          { month: 'May', adherence: 90 },
          { month: 'Jun', adherence: 88 },
        ];
        setChartData(mockData);
      } catch (err) {
        setError('Failed to load engagement data');
        console.error('Error fetching engagement data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdherenceData();
  }, [asset.id]);

  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">Patient Adherence Rate</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="adherence"
            stroke="#4CAF50"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdherenceChart;
