import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BMICalculator } from '../calculators/bmiCalculator';
import { TestWrapper } from './TestWrapper';

// Mock Mantine components
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
    Select: ({ label, data, value, onChange, ...props }: any) => (
      <div>
        <label>{label}</label>
        <select 
          data-testid={`select-${label?.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          {...props}
        >
          {data.map((item: any) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>
      </div>
    ),
    Button: ({ children, onClick, type }: any) => (
      <button type={type} onClick={onClick}>{children}</button>
    ),
  };
});

describe('BMICalculator', () => {
  it('renders the BMI calculator form with default values', () => {
    render(
      <TestWrapper>
        <BMICalculator />
      </TestWrapper>
    );
    
    expect(screen.getByText('BMI Calculator')).toBeInTheDocument();
    expect(screen.getByTestId('select-unit-system')).toBeInTheDocument();
    expect(screen.getByTestId('input-height-(cm)')).toBeInTheDocument();
    expect(screen.getByTestId('input-weight-(kg)')).toBeInTheDocument();
    expect(screen.getByText('Calculate')).toBeInTheDocument();
  });

  it('calculates BMI correctly when form is submitted', () => {
    render(
      <TestWrapper>
        <BMICalculator />
      </TestWrapper>
    );
    
    // Use default values and submit
    fireEvent.click(screen.getByText('Calculate'));
    
    // Check if BMI and category are displayed
    expect(screen.getByText(/BMI:/)).toBeInTheDocument();
    expect(screen.getByText(/Category:/)).toBeInTheDocument();
  });

  it('switches between unit systems correctly', () => {
    render(
      <TestWrapper>
        <BMICalculator />
      </TestWrapper>
    );
    
    // Change unit system to imperial
    fireEvent.change(screen.getByTestId('select-unit-system'), { target: { value: 'imperial' } });
    
    // Check if labels have changed
    expect(screen.getByText('Height (inches)')).toBeInTheDocument();
    expect(screen.getByText('Weight (lbs)')).toBeInTheDocument();
  });
});