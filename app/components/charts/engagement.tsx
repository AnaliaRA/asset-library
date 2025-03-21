import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Asset } from '@/app/types/asset';

interface EngagementChartProps {
  asset: Asset;
}

const EngagementChart: React.FC<EngagementChartProps> = ({ asset }) => {
  const data = [
    { month: 'Jan', engagement: 65 },
    { month: 'Feb', engagement: 59 },
    { month: 'Mar', engagement: 80 },
    { month: 'Apr', engagement: 81 },
    { month: 'May', engagement: 56 },
    { month: 'Jun', engagement: 55 },
  ];

  return (
    <div className="w-full h-[300px] p-4" data-testid="engagement-chart">
      <h3 className="text-lg font-semibold mb-4">{asset.name} Engagement Over Time</h3>
      <p className="text-sm text-gray-600 mb-2">{asset.name}</p>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="engagement"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EngagementChart;
