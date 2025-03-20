import type { Meta, StoryObj } from '@storybook/react';
import AssetModal from './assetModal';
import { Asset } from '@/app/types/asset';

const meta: Meta<typeof AssetModal> = {
  title: 'Components/AssetModal',
  component: AssetModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AssetModal>;

// Sample asset for testing
const sampleAsset: Asset = {
  id: '1',
  name: 'Sample KPI',
  description: 'This is a sample KPI asset with business questions and visuals.',
  type: 'KPI',
  hits: 100,
  creationDate: '2024-01-01',
  updatedDate: '2024-01-01',
  hasVisuals: true,
  businessQuestions: [
    'What is the current performance?',
    'What are the key drivers?',
    'What actions are needed?',
    'What are the risks and opportunities?',
  ],
};

export const Default: Story = {
  args: {
    asset: sampleAsset,
    isOpen: true,
    onClose: () => {},
  },
};

export const WithoutBusinessQuestions: Story = {
  args: {
    asset: {
      ...sampleAsset,
      businessQuestions: [],
    },
    isOpen: true,
    onClose: () => {},
  },
};

export const WithoutVisuals: Story = {
  args: {
    asset: {
      ...sampleAsset,
      hasVisuals: false,
    },
    isOpen: true,
    onClose: () => {},
  },
};

export const Closed: Story = {
  args: {
    asset: sampleAsset,
    isOpen: false,
    onClose: () => {},
  },
}; 