import React from 'react';
import type { Preview } from "@storybook/react";
import { withTests } from '@storybook/addon-jest';
import results from '../.jest-test-results.json';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/test',
        query: {}
      }
    },
    jest: ['*'],
  },
  decorators: [
    withTests({
      results,
    }),
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};

export default preview; 