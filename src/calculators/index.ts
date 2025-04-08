import { LoanCalculator } from './loanCalculator';
import { UnitConverter } from './unitConverter';
import { BMICalculator } from './bmiCalculator';

export interface Calculator {
  id: string;
  name: string;
  component: React.ComponentType;
}

export const calculators: Calculator[] = [
  {
    id: 'loan',
    name: 'Loan Calculator',
    component: LoanCalculator,
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    component: UnitConverter,
  },
  {
    id: 'bmi',
    name: 'BMI Calculator',
    component: BMICalculator,
  },
];