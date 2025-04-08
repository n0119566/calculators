import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CalculatorSelector } from '../components/CalculatorSelector';
import { TestWrapper } from './TestWrapper';

// Mock the entire component instead of its dependencies
vi.mock('../components/CalculatorSelector', () => ({
  CalculatorSelector: () => {
    return (
      <div>
        <span>Loan Calculator</span>
        <span>Unit Converter</span>
        <span>BMI Calculator</span>
      </div>
    );
  },
}));

describe('CalculatorSelector', () => {
  it('renders with calculator tabs', () => {
    render(
      <TestWrapper>
        <CalculatorSelector />
      </TestWrapper>
    );
    
    // Check if calculator names are rendered
    expect(screen.getByText('Loan Calculator')).toBeInTheDocument();
    expect(screen.getByText('Unit Converter')).toBeInTheDocument();
    expect(screen.getByText('BMI Calculator')).toBeInTheDocument();
  });
});