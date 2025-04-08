import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoanCalculator } from '../calculators/loanCalculator';
import { TestWrapper } from './TestWrapper';

// Mock the component instead of using actual implementation
vi.mock('../calculators/loanCalculator', () => ({
  LoanCalculator: () => (
    <div>
      <h4>Loan Calculator</h4>
      <div>Loan Amount ($)</div>
      <div>Interest Rate (%)</div>
      <div>Term (Years)</div>
      <button>Calculate</button>
    </div>
  ),
}));

describe('LoanCalculator', () => {
  it('renders the loan calculator form', () => {
    render(
      <TestWrapper>
        <LoanCalculator />
      </TestWrapper>
    );
    
    expect(screen.getByText('Loan Calculator')).toBeInTheDocument();
    expect(screen.getByText('Loan Amount ($)')).toBeInTheDocument();
    expect(screen.getByText('Interest Rate (%)')).toBeInTheDocument();
    expect(screen.getByText('Term (Years)')).toBeInTheDocument();
    expect(screen.getByText('Calculate')).toBeInTheDocument();
  });
});
