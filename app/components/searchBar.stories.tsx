import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import SearchBar from './searchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

// Base story with mock search function
export const Default: Story = {
  args: {
    onSearch: fn(),
  },
  // Adding play function for interaction testing
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    
    // Get the search input
    const searchInput = canvas.getByPlaceholderText('Type to search...');
    
    // Test 1: Type in the search input
    await userEvent.type(searchInput, 'test search');
    
    // Test 2: Clear the input
    await userEvent.clear(searchInput);
    
    expect(args.onSearch).toHaveBeenCalledWith('test search');
    expect((searchInput as HTMLInputElement).value).toBe('');
  },
};

export const WithCustomPlaceholder: Story = {
  args: {
    onSearch: fn(),
    placeholder: 'Search assets...',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByPlaceholderText('Search assets...');
    
    await userEvent.type(searchInput, 'test search');
    expect(args.onSearch).toHaveBeenCalledWith('test search');
  },
};

export const WithInteraction: Story = {
  args: {
    onSearch: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByPlaceholderText('Type to search...');
    
    // Test keyboard interaction
    await userEvent.type(searchInput, 'test');
    await userEvent.keyboard('{Enter}');
    expect(args.onSearch).toHaveBeenCalledWith('test');
  },
};

export const EdgeCases: Story = {
  args: {
    onSearch: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByPlaceholderText('Type to search...');
    
    // Test empty string
    await userEvent.type(searchInput, ' ');
    await userEvent.keyboard('{Enter}');
    expect(args.onSearch).toHaveBeenCalledWith(' ');
    
    // Test special characters
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, '!@#$%^&*()');
    await userEvent.keyboard('{Enter}');
    expect(args.onSearch).toHaveBeenCalledWith('!@#$%^&*()');
  },
}; 