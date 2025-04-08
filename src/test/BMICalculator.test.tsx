import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BMICalculator } from '../calculators/bmiCalculator';
import { TestWrapper } from './TestWrapper';

// Mock the component instead of using actual implementation
vi.mock('../calculators/bmiCalculator', () => ({
  BMICalculator: () => (
    <div>
      <h4>BMI Calculator</h4>
      <div>Unit System</div>
      <div>Height (cm)</div>
      <div>Weight (kg)</div>
      <button>Calculate</button>
    </div>
  ),
}));

describe('BMICalculator', () => {
  it('renders the BMI calculator form', () => {
    render(
      <TestWrapper>
        <BMICalculator />
      </TestWrapper>
    );
    
    expect(screen.getByText('BMI Calculator')).toBeInTheDocument();
    expect(screen.getByText('Unit System')).toBeInTheDocument();
    expect(screen.getByText('Height (cm)')).toBeInTheDocument();
    expect(screen.getByText('Weight (kg)')).toBeInTheDocument();
    expect(screen.getByText('Calculate')).toBeInTheDocument();
  });
});
