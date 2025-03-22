# Asset Library Project Walkthrough

## Project Overview
The Asset Library is a light, modern, responsive web application designed to present various types of assets for reporting and analysis. It serves as a centralized hub for accessing and analyzing different asset types including KPIs, layouts, storyboards, and data visualizations.

## Technology Stack

### Next.js 14
### React 18
### TypeScript 5.2
### TailwindCSS 3.4.1
### Recharts 2.10
### Firebase & Firestore
### Zustand 4.4

## Project Structure
The project follows a well-organized structure:

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

## Key Features Implementation

### 1. Core Features
The project features a comprehensive asset management system with robust categorization, metadata tracking (including creation and update dates, usage statistics), and Firebase integration for real-time updates, all implemented with TypeScript for type safety. The interactive UI layer includes responsive asset cards with preview capabilities, modal views, dynamic filtering, real-time search, trending sections, and featured content displays. These features are enhanced by sophisticated data visualization using Recharts, offering multiple interactive chart types with hover states and tooltips, all designed to be responsive across different screen sizes.

### 2. Performance Optimizations
- Implemented code splitting for faster initial load
- Server-side rendering for improved SEO
- Optimized asset loading with suspense boundaries
- Efficient state management using Zustand
- Firebase offline support

### 3. Testing Infrastructure
- Jest for unit testing
- Vitest for component testing with high coverage
- Storybook for component development and documentation
- Playwright for end-to-end testing and accessibility testing
- Integration with axe-playwright for automated accessibility checks
- Test coverage reporting and monitoring
- Automated testing in CI/CD pipeline
- Component testing through Storybook's test runner
- Visual regression testing capabilities

### 4. Development Tools
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety
- Storybook for component development
- Vite for fast development server
- PostCSS for CSS processing

## Development Practices
- Consistent code formatting with Prettier
- ESLint configuration for code quality
- Type safety throughout the application
- Component-based architecture
- Custom hooks for reusable logic
- Comprehensive testing strategy including:
  - Unit tests for business logic
  - Component tests with Storybook
  - End-to-end tests with Playwright
  - Accessibility testing with axe-playwright
- Storybook for component documentation and testing
- Git hooks for code quality checks
- Automated CI/CD pipeline

## Future Enhancements - Out of scope in the first iteration:
- Show toast notifications on success and errors for:
  - Add/Remove Favorite
  - GET Assets
  - GET Assets by Id
- Drag and Drop of assets in the Dashboard view
- Resizing of assets in the Dashboard view
- Add a view of all the pending/resolved requests
- Add unit test coverage for every component
- Export/Download functionality of assets and dashboards
- Allow the user to have multiple Dashboards
- Authentication system implementation
- Enhanced accessibility features:
  - Screen reader optimizations
  - Keyboard navigation improvements
  - High contrast mode
  - Font size adjustments
- Expanded testing infrastructure:
  - Performance testing integration
  - Load testing for Firebase operations
  - Automated accessibility compliance checks
  - Enhanced visual regression testing


## Assumptions as User Stories: 

#User Story 1: Deciding KPIs to Track
As a user,
I want to decide which KPIs to track,
So that I can monitor the most relevant metrics.

Acceptance Criteria:
The system should display all available KPIs for my area.
I should be able to see the available charting options.
I should be able to select KPIs and add them to my layout.

#User Story 2: Deep Dive into KPI Data
As a user,
I want to analyze my KPI data in detail,
So that I can gain deeper insights.

Acceptance Criteria:
The system should provide various visualizations for KPI analysis.
I should be able to select specific visuals to highlight key insights.
I should be able to annotate and capture insights to share with others.

#User Story 3: Requesting Access to Restricted Data
As a user,
When I do not have access to certain KPIs or layouts,
I want to request access and provide a reason why,
So that I can include them in my reports.

Acceptance Criteria:
The system should allow users to request access to restricted KPIs.
Users should be able to provide a justification for their request.
Upon approval, the KPI should be accessible for use in layouts.
