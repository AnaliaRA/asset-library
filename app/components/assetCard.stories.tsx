import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/test';
import AssetCard from './assetCard';

const meta: Meta<typeof AssetCard> = {
  title: 'Components/AssetCard',
  component: AssetCard,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/test',
        query: {}
      }
    }
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Story />
      </div>
    )
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AssetCard>;

export const KPIAsset: Story = {
  args: {
    asset: {
      id: '1',
      name: 'Sample KPI Asset',
      type: 'kpi',
      description: 'This is a sample KPI asset for demonstration.',
      creationDate: '2024-03-01',
      updatedDate: '2024-03-20',
      businessQuestions: [
        'What is the KPI trend?',
        'How does KPI compare to last year?'
      ],
      amountOfPages: 5,
      hasVisuals: true,
      hits: 12
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check if the asset name is displayed
    const assetName = canvas.getByTestId('asset-name');
    expect(assetName).toHaveTextContent('Sample KPI Asset');

    // Check if the description is displayed
    const description = canvas.getByTestId('asset-description');
    expect(description).toHaveTextContent('This is a sample KPI asset for demonstration.');

    // Check if the date is displayed
    const date = canvas.getByTestId('asset-date');
    expect(date).toBeInTheDocument();
  }
};

export const DataVizAsset: Story = {
  args: {
    asset: {
      id: '2',
      name: 'Sample Data Visualization',
      type: 'dataviz',
      description: 'This is a sample data visualization asset.',
      creationDate: '2024-03-15',
      updatedDate: '2024-03-20',
      businessQuestions: [
        'What insights can we draw from this visualization?'
      ],
      amountOfPages: 3,
      hasVisuals: true,
      hits: 8
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check if the asset name is displayed
    const assetName = canvas.getByTestId('asset-name');
    expect(assetName).toHaveTextContent('Sample Data Visualization');

    // Check if the description is displayed
    const description = canvas.getByTestId('asset-description');
    expect(description).toHaveTextContent('This is a sample data visualization asset.');

    // Check if the date is displayed
    const date = canvas.getByTestId('asset-date');
    expect(date).toBeInTheDocument();
  }
};

export const LayoutAsset: Story = {
  args: {
    asset: {
      id: '11',
      name: 'Sample Layout',
      type: 'layout',
      description: 'This is a sample layout asset.',
      creationDate: '2024-02-01',
      updatedDate: '2024-03-15',
      businessQuestions: [],
      amountOfPages: 7,
      hasVisuals: false,
      hits: 6
    }
  }
}; 