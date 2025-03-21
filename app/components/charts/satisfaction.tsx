import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Asset } from '@/app/types/asset';

interface SatisfactionChartProps {
  asset: Asset;
}

const SatisfactionChart: React.FC<SatisfactionChartProps> = ({ asset }) => {
  const data = [
    { subject: 'Usability', score: 90 },
    { subject: 'Performance', score: 85 },
    { subject: 'Reliability', score: 88 },
    { subject: 'Design', score: 92 },
    { subject: 'Features', score: 87 },
  ];

  return (
    <div className="w-full h-[300px] p-4">
      <h3 className="text-lg font-semibold mb-4">{asset.name} Satisfaction Metrics</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name="Satisfaction"
            dataKey="score"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SatisfactionChart;
