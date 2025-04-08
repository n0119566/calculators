# Calculators

A modern web application providing various calculators for everyday use.

## Features

- **Multiple Calculators:**
  - Loan Calculator: Calculate monthly payments, total payments, and interest
  - Unit Converter: Convert between various units (length, weight, temperature)
  - BMI Calculator: Calculate Body Mass Index and determine weight category

- **User-Friendly Interface:**
  - Clean, responsive design that works on both mobile and desktop
  - Dark/light mode toggle
  - Easy calculator switching
  - Formatted numbers with thousand separators
  - Clear button to reset each calculator

## Technologies Used

- React 19
- TypeScript
- Vite (for fast development and building)
- Mantine UI (for components and theming)
- Zustand (for state management)
- Vitest and Testing Library (for testing)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm test`: Run tests
- `npm run preview`: Preview the production build locally

## Design Decisions

- Used Mantine for UI components to ensure a consistent, accessible design
- Implemented responsive layout for all screen sizes
- Added input validation to prevent calculation errors
- Followed a modular approach with separate calculator components
- Applied consistent formatting for readability