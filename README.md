# Asset Library

A modern web application for managing and visualizing business assets, built with Next.js and TypeScript.

## Tech Stack

- **Framework**: Next.js 15.2.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
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
├── app/                    # Next.js app directory
│   ├── assets/            # Asset-related pages
│   ├── components/        # Reusable components
│   │   └── charts/       # Chart components
│   └── layout.tsx        # Root layout
├── public/                # Static assets
├── .storybook/           # Storybook configuration
└── types/                # TypeScript type definitions
```

## Testing

The project uses a combination of testing tools:

- **Jest**: For unit and integration tests
- **React Testing Library**: For component testing
- **Storybook**: For component development and testing
- **Vitest**: For Storybook interaction tests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
