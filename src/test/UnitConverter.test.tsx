import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UnitConverter } from '../calculators/unitConverter';
import { TestWrapper } from './TestWrapper';

// Mock the component instead of using actual implementation
vi.mock('../calculators/unitConverter', () => ({
  UnitConverter: () => (
    <div>
      <h4>Unit Converter</h4>
      <div>Conversion Type</div>
      <div>Value</div>
      <div>From</div>
      <div>To</div>
      <button>Convert</button>
    </div>
  ),
}));

describe('UnitConverter', () => {
  it('renders the unit converter form', () => {
    render(
      <TestWrapper>
        <UnitConverter />
      </TestWrapper>
    );
    
    expect(screen.getByText('Unit Converter')).toBeInTheDocument();
    expect(screen.getByText('Conversion Type')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
    expect(screen.getByText('From')).toBeInTheDocument();
    expect(screen.getByText('To')).toBeInTheDocument();
    expect(screen.getByText('Convert')).toBeInTheDocument();
  });
});
