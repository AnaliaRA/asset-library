import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/test';
import EngagementChart from './engagement';

const meta: Meta<typeof EngagementChart> = {
  title: 'Charts/EngagementChart',
  component: EngagementChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EngagementChart>;

const mockAsset = {
  id: 1,
  name: 'Test Asset',
  type: 'kpi',
  description: 'Test description',
  creationDate: '2024-01-01',
  updatedDate: '2024-03-20',
  hasVisuals: true,
  hits: 100,
};

export const Default: Story = {
  args: {
    asset: mockAsset,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check if the chart container is rendered
    const chartContainer = canvas.getByTestId('engagement-chart');
    expect(chartContainer).toBeInTheDocument();

    // Check if the chart title is displayed with the asset name
    const chartTitle = canvas.getByText('Test Asset Engagement Over Time');
    expect(chartTitle).toBeInTheDocument();

    // Check if the asset name is displayed in the subtitle
    const assetName = canvas.getByText('Test Asset');
    expect(assetName).toBeInTheDocument();
  }
};

export const WithContainer: Story = {
  args: {
    asset: mockAsset,
  },
  decorators: [
    (Story) => (
      <div className="w-[600px] h-[400px] p-5 bg-white">
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check if the chart container is rendered
    const chartContainer = canvas.getByTestId('engagement-chart');
    expect(chartContainer).toBeInTheDocument();

    // Check if the chart title is displayed with the asset name
    const chartTitle = canvas.getByText('Test Asset Engagement Over Time');
    expect(chartTitle).toBeInTheDocument();

    // Check if the asset name is displayed in the subtitle
    const assetName = canvas.getByText('Test Asset');
    expect(assetName).toBeInTheDocument();
  }
}; 