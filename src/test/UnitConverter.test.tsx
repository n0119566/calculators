import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UnitConverter } from '../calculators/unitConverter';
import { TestWrapper } from './TestWrapper';

// Mock Mantine components
vi.mock('@mantine/core', async () => {
  const actual = await vi.importActual('@mantine/core');
  return {
    ...actual,
    TextInput: ({ label, value, onChange, ...props }: any) => (
      <div>
        <label>{label}</label>
        <input 
          data-testid={`input-${label?.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`}
          value={value}
          onChange={(e) => onChange && onChange(e)}
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

describe('UnitConverter', () => {
  it('renders the unit converter form', () => {
    render(
      <TestWrapper>
        <UnitConverter />
      </TestWrapper>
    );
    
    expect(screen.getByText('Unit Converter')).toBeInTheDocument();
    expect(screen.getByTestId('select-conversion-type')).toBeInTheDocument();
    expect(screen.getByTestId('input-value')).toBeInTheDocument();
    expect(screen.getByTestId('select-from')).toBeInTheDocument();
    expect(screen.getByTestId('select-to')).toBeInTheDocument();
    expect(screen.getByText('Convert')).toBeInTheDocument();
  });

  it('converts units correctly when form is submitted', () => {
    render(
      <TestWrapper>
        <UnitConverter />
      </TestWrapper>
    );
    
    // Fill the form
    fireEvent.change(screen.getByTestId('input-value'), { target: { value: '100' } });
    
    // Submit form
    fireEvent.click(screen.getByText('Convert'));
    
    // Check if result is displayed
    expect(screen.getByText(/Result:/)).toBeInTheDocument();
  });
});