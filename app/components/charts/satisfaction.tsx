import React, { useState, useEffect } from 'react';
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { BarChart as RechartsBarChart, Bar, Legend } from 'recharts';
import { Asset } from '@/types/asset';

interface satisfactionData {
  category: string;
  score: number;
}

const COLORS = ['#4CAF50', '#2196F3', '#FF9800'];

const SatisfactionChart: React.FC<{ asset: Asset }> = ({ asset }) => {
  const [chartData, setChartData] = useState<satisfactionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSatisfactionData = async () => {
      try {
        setLoading(true);
        const mockData: satisfactionData[] = [
          { category: 'Patients', score: 4.2 },
          { category: 'Doctors', score: 4.5 },
          { category: 'Pharmacies', score: 3.9 },
        ];
        setChartData(mockData);
      } catch (err) {
        setError('Failed to load engagement data');
        console.error('Error fetching engagement data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSatisfactionData();
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
      <h2 className="text-lg font-semibold mb-2">Satisfaction Score</h2>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="score"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {chartData.map((_, index: number) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SatisfactionChart;
