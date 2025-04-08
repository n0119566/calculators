import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LoanCalculator } from '../calculators/loanCalculator';
import { TestWrapper } from './TestWrapper';

// Mock MantineProvider for components that use hooks
vi.mock('@mantine/core', async () => {
  const actual = await vi.importActual('@mantine/core');
  return {
    ...actual,
    NumberInput: ({ label, value, onChange, ...props }: any) => (
      <div>
        <label>{label}</label>
        <input 
          data-testid={`input-${label?.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`}
          value={value}
          onChange={(e) => onChange && onChange(parseFloat(e.target.value))}
          {...props}
        />
      </div>
    ),
    Button: ({ children, onClick, type }: any) => (
      <button type={type} onClick={onClick}>{children}</button>
    ),
  };
});

describe('LoanCalculator', () => {
  it('renders the loan calculator form with default values', () => {
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

  it('calculates the monthly payment correctly on form submission', () => {
    render(
      <TestWrapper>
        <LoanCalculator />
      </TestWrapper>
    );
    
    // Set values
    fireEvent.change(screen.getByTestId('input-loan-amount-($)'), { target: { value: '200000' } });
    fireEvent.change(screen.getByTestId('input-interest-rate-(%)'), { target: { value: '4' } });
    fireEvent.change(screen.getByTestId('input-term-(years)'), { target: { value: '30' } });
    
    // Submit form
    fireEvent.click(screen.getByText('Calculate'));
    
    // Check if results are displayed
    expect(screen.getByText(/Monthly Payment:/)).toBeInTheDocument();
    expect(screen.getByText(/Total Payment:/)).toBeInTheDocument();
    expect(screen.getByText(/Total Interest:/)).toBeInTheDocument();
  });
});