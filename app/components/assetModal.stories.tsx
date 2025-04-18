import type { Meta, StoryObj } from '@storybook/react';
import AssetModal from './assetModal';
import { Asset } from '@/app/types/asset';

const meta: Meta<typeof AssetModal> = {
  title: 'Components/AssetModal',
  component: AssetModal,
  parameters: {
    layout: 'centered',
    a11y: {
      config: {
        rules: [
          {
            id: 'aria-allowed-attr',
            enabled: true,
          },
          {
            id: 'aria-required-attr',
            enabled: true,
          },
          {
            id: 'aria-valid-attr-value',
            enabled: true,
          },
          {
            id: 'aria-valid-attr',
            enabled: true,
          },
          {
            id: 'aria-roles',
            enabled: true,
          },
          {
            id: 'aria-required-children',
            enabled: true,
          },
          {
            id: 'aria-required-parent',
            enabled: true,
          },
          {
            id: 'aria-unsupported-elements',
            enabled: true,
          },
          {
            id: 'aria-hidden-focus',
            enabled: true,
          },
          {
            id: 'aria-toggle-field-name',
            enabled: true,
          },
          {
            id: 'button-name',
            enabled: true,
          },
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'document-title',
            enabled: true,
          },
          {
            id: 'html-has-lang',
            enabled: true,
          },
          {
            id: 'landmark-one-main',
            enabled: true,
          },
          {
            id: 'landmark-unique',
            enabled: true,
          },
          {
            id: 'meta-viewport',
            enabled: true,
          },
          {
            id: 'page-has-heading-one',
            enabled: true,
          },
          {
            id: 'region',
            enabled: true,
          },
          {
            id: 'scope-attr-valid',
            enabled: true,
          },
          {
            id: 'skip-link',
            enabled: true,
          },
          {
            id: 'tabindex',
            enabled: true,
          },
        ],
      },
      options: {
        checks: {
          'color-contrast': { enabled: true },
          'aria-allowed-attr': { enabled: true },
          'aria-required-attr': { enabled: true },
          'aria-valid-attr-value': { enabled: true },
          'aria-valid-attr': { enabled: true },
          'aria-roles': { enabled: true },
          'aria-required-children': { enabled: true },
          'aria-required-parent': { enabled: true },
          'aria-unsupported-elements': { enabled: true },
          'aria-hidden-focus': { enabled: true },
          'aria-toggle-field-name': { enabled: true },
          'button-name': { enabled: true },
          'document-title': { enabled: true },
          'html-has-lang': { enabled: true },
          'landmark-one-main': { enabled: true },
          'landmark-unique': { enabled: true },
          'meta-viewport': { enabled: true },
          'page-has-heading-one': { enabled: true },
          'region': { enabled: true },
          'scope-attr-valid': { enabled: true },
          'skip-link': { enabled: true },
          'tabindex': { enabled: true },
        },
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AssetModal>;

// Sample asset for testing
const sampleAsset: Asset = {
  id: '1',
  name: 'Sample Asset',
  description: 'This is a sample asset with business questions and visuals.',
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
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'aria-allowed-attr',
            enabled: true,
            selector: '[role="dialog"]',
          },
        ],
      },
    },
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
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'aria-allowed-attr',
            enabled: true,
            selector: '[role="dialog"]',
          },
        ],
      },
    },
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
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'aria-allowed-attr',
            enabled: true,
            selector: '[role="dialog"]',
          },
        ],
      },
    },
  },
};

export const WithLayout: Story = {
  args: {
    asset: {
      ...sampleAsset,
      type: 'layout',
    },
    isOpen: true,
    onClose: () => {},
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'aria-allowed-attr',
            enabled: true,
            selector: '[role="dialog"]',
          },
        ],
      },
    },
  },
};

export const WithDataViz: Story = {
  args: {
    asset: {
      ...sampleAsset,
      type: 'dataviz',
    },
    isOpen: true,
    onClose: () => {},
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'aria-allowed-attr',
            enabled: true,
            selector: '[role="dialog"]',
          },
        ],
      },
    },
  },
};

export const Closed: Story = {
  args: {
    asset: sampleAsset,
    isOpen: false,
    onClose: () => {},
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'aria-allowed-attr',
            enabled: true,
            selector: '[role="dialog"]',
          },
        ],
      },
    },
  },
}; 