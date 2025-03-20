import React, { useState, useEffect } from 'react';
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { BarChart as RechartsBarChart, Bar, Legend } from 'recharts';
import { Asset } from '@/types/asset';

interface EngagementData {
  month: string;
  interactions: number;
}

const EngagementChart: React.FC<{ asset: Asset }> = ({ asset }) => {
  const [chartData, setChartData] = useState<EngagementData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEngagementData = async () => {
      try {
        setLoading(true);
        const mockData = [
          { month: 'Jan', interactions: Math.floor(Math.random() * 300) },
          { month: 'Feb', interactions: Math.floor(Math.random() * 300) },
          { month: 'Mar', interactions: Math.floor(Math.random() * 300) },
          { month: 'Apr', interactions: Math.floor(Math.random() * 300) },
          { month: 'May', interactions: Math.floor(Math.random() * 300) },
          { month: 'Jun', interactions: Math.floor(Math.random() * 300) },
        ];
        setChartData(mockData);
      } catch (err) {
        setError('Failed to load engagement data');
        console.error('Error fetching engagement data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEngagementData();
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
      <h2 className="text-lg font-semibold mb-2">Physician Engagement</h2>
      <ResponsiveContainer width="100%" height={200}>
        <RechartsBarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="interactions" fill="#2196F3" />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EngagementChart;
