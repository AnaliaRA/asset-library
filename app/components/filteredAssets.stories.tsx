import type { Meta, StoryObj } from '@storybook/react';
import FilteredAssets from './filteredAssets';
import { Asset } from '@/app/types/asset';
import { useAssetStore } from '@/app/store/assetStore';

const meta: Meta<typeof FilteredAssets> = {
  title: 'Components/FilteredAssets',
  component: FilteredAssets,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      // Reset the store before each story
      useAssetStore.setState({
        currentPage: 1,
        itemsPerPage: 10,
      });
      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof FilteredAssets>;

// Sample assets for testing
const sampleAssets: Asset[] = [
  {
    id: '1',
    name: 'Asset 1',
    description: 'Description 1',
    type: 'KPI',
    hits: 100,
    creationDate: '2024-01-01',
    updatedDate: '2024-01-01',
    hasVisuals: true,
    businessQuestions: ['Question 1', 'Question 2'],
  },
  {
    id: '2',
    name: 'Asset 2',
    description: 'Description 2',
    type: 'KPI',
    hits: 80,
    creationDate: '2024-01-02',
    updatedDate: '2024-01-02',
    hasVisuals: true,
    businessQuestions: ['Question 3', 'Question 4'],
  },
  {
    id: '3',
    name: 'Asset 3',
    description: 'Description 3',
    type: 'KPI',
    hits: 60,
    creationDate: '2024-01-03',
    updatedDate: '2024-01-03',
    hasVisuals: true,
    businessQuestions: ['Question 5', 'Question 6'],
  },
  {
    id: '4',
    name: 'Asset 4',
    description: 'Description 4',
    type: 'KPI',
    hits: 40,
    creationDate: '2024-01-04',
    updatedDate: '2024-01-04',
    hasVisuals: true,
    businessQuestions: ['Question 7', 'Question 8'],
  },
  {
    id: '5',
    name: 'Asset 5',
    description: 'Description 5',
    type: 'KPI',
    hits: 20,
    creationDate: '2024-01-05',
    updatedDate: '2024-01-05',
    hasVisuals: true,
    businessQuestions: ['Question 9', 'Question 10'],
  },
];

export const Default: Story = {
  args: {
    assets: sampleAssets,
    currentFilter: 'KPI',
  },
};

export const WithAllFilter: Story = {
  args: {
    assets: sampleAssets,
    currentFilter: 'all',
  },
}; 