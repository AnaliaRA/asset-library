# Asset Library

A modern web application for managing and visualizing business assets, built with Next.js and TypeScript.

## Tech Stack

- **Framework**: Next.js 15.2.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Database**: Firebase & Firestore
- **Store Management**: Zustand 4.4
- **Testing**: 
  - Jest
  - React Testing Library
  - Storybook 8.0.0
  - Vitest (for Storybook tests)
- **Development Tools**:
  - ESLint
  - Prettier
  - TypeScript
  - PostCSS
  - ### Next.js 14


## Features

- Asset management and organization
- Interactive data visualization
- Search and filtering capabilities
- Responsive design
- Component documentation with Storybook
- Comprehensive test coverage

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/asset-library.git
   cd asset-library
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run storybook` - Start Storybook development server
- `npm run test-storybook` - Run Storybook tests

## Project Structure

```
asset-library/
├── app/                    # Main application code
│   ├── components/        # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── data/            # Data management
│   ├── assets/          # Static assets
│   ├── api/             # API routes
│   ├── store/           # Zustand state management
│   ├── firebase/        # Firebase configuration
│   ├── import/          # Asset import functionality
│   └── types/           # TypeScript type definitions
├── scripts/              # Utility scripts
├── types/                # Global TypeScript types
├── public/              # Static files
└── .storybook/          # Storybook configuration
```

## Testing

The project uses a combination of testing tools:

- **Jest**: For unit and integration tests
- **React Testing Library**: For component testing
- **Storybook**: For component development and testing
- **Vitest**: For Storybook interaction tests

