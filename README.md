# Asset Library

A modern, responsive asset management system built with Next.js that allows users to browse, search, and filter various types of assets for reporting and analysis presentation.

## Tech Stack

- **Frontend Framework**: [Next.js](https://nextjs.org) 15.2.3
- **UI Library**: React 19.0.0
- **Styling**: TailwindCSS 4
- **Charts & Visualizations**: Recharts 2.15.1
- **Type Safety**: TypeScript 5
- **Code Quality**:
  - ESLint 9
  - Prettier 3.2.5
  - ESLint Config Next 15.2.3

## Project Structure

```
asset-library/
├── app/                    # Main application code
│   ├── components/        # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── data/            # Data management
│   ├── assets/          # Static assets
│   └── api/             # API routes
├── types/                # TypeScript type definitions
└── public/              # Static files
```

## Features

### Core Components

1. **Asset Card Component**
   - Displays individual asset information
   - Responsive design for various screen sizes
   - Interactive elements for asset preview

2. **Filter Bar**
   - Navigation component for filtering assets by category
   - Dynamic filter updates

3. **Search Bar**
   - Real-time asset search functionality
   - Optimized search performance

4. **Featured Section**
   - Highlights important or new assets
   - Curated selection of assets

5. **Trending Section**
   - Shows popular or frequently used assets
   - Category-specific trending items

### Key Features

- **Dynamic Filtering**: Filter assets by various categories
- **Real-time Search**: Instant search results as you type
- **Responsive Design**: Optimized for all device sizes
- **Loading States**: Smooth loading transitions with animations
- **Error Handling**: Graceful error state management
- **Modern UI**: Clean and intuitive user interface

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
