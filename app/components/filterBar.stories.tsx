import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import FiltersBar from './filterBar';

const meta: Meta<typeof FiltersBar> = {
  title: 'Components/FilterBar',
  component: FiltersBar,
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
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FiltersBar>;

export const Default: Story = {
  args: {
    onFilterChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find and click the "Featured" filter button
    const featuredButton = canvas.getByTestId('filter-all');
    await userEvent.click(featuredButton);
    expect(args.onFilterChange).toHaveBeenCalledWith('all');

    // Find and click the "KPI" filter button
    const kpiButton = canvas.getByTestId('filter-kpi');
    await userEvent.click(kpiButton);
    expect(args.onFilterChange).toHaveBeenCalledWith('kpi');

    // Find and click the "Layouts" filter button
    const layoutsButton = canvas.getByTestId('filter-layout');
    await userEvent.click(layoutsButton);
    expect(args.onFilterChange).toHaveBeenCalledWith('layout');
  },
}; 