import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [
      '@storybook/addon-essentials',
      '@storybook/addon-onboarding',
      '@storybook/blocks',
      '@storybook/react',
      '@storybook/react-vite',
      '@storybook/testing-library',
      '@storybook/test',
      'recharts'
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
}); 