import { useState } from 'react';
import { NumberInput, Button, Group, Text, Stack, Card } from '@mantine/core';
import { useForm } from '@mantine/form';
import { formatCurrency } from '../utils/formatters';

interface LoanFormValues {
  loanAmount: number;
  interestRate: number;
  termYears: number;
}

interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

export function LoanCalculator() {
  const [result, setResult] = useState<LoanResult | null>(null);

  const form = useForm<LoanFormValues>({
    initialValues: {
      loanAmount: 100000,
      interestRate: 5,
      termYears: 30,
    },
    validate: {
      loanAmount: (value) => value <= 0 ? 'Amount must be positive' : null,
      interestRate: (value) => value <= 0 ? 'Interest rate must be positive' : null,
      termYears: (value) => value <= 0 ? 'Term must be positive' : null,
    },
  });

  const calculatePayment = (values: LoanFormValues) => {
    const { loanAmount, interestRate, termYears } = values;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = termYears * 12;
    
    // Monthly payment formula: P = L[r(1+r)^n]/[(1+r)^n-1]
    const monthlyPayment = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;
    
    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest
    });
  };

  return (
    <Card withBorder shadow="sm" p="lg" radius="md">
      <Stack>
        <Text fw={500} size="lg">Loan Calculator</Text>
        
        <form onSubmit={form.onSubmit(calculatePayment)}>
          <Stack gap="md">
            <NumberInput
              label="Loan Amount ($)"
              placeholder="Enter loan amount"
              {...form.getInputProps('loanAmount')}
              min={1}
              thousandSeparator=","
              inputMode="numeric"
            />
            
            <NumberInput
              label="Interest Rate (%)"
              placeholder="Enter annual interest rate"
              {...form.getInputProps('interestRate')}
              min={0.01}
              step={0.01}
              decimalScale={2}
              inputMode="decimal"
            />
            
            <NumberInput
              label="Term (Years)"
              placeholder="Enter loan term in years"
              {...form.getInputProps('termYears')}
              min={1}
              max={50}
              inputMode="numeric"
            />
            
            <Group justify="flex-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  form.reset();
                  setResult(null);
                }}
              >
                Clear
              </Button>
              <Button type="submit">Calculate</Button>
            </Group>
          </Stack>
        </form>
        
        {result !== null && (
          <Stack mt="md">
            <Text fw={700}>Monthly Payment: {formatCurrency(result.monthlyPayment)}</Text>
            <Text>Total Payment: {formatCurrency(result.totalPayment)}</Text>
            <Text>Total Interest: {formatCurrency(result.totalInterest)}</Text>
          </Stack>
        )}
      </Stack>
    </Card>
  );
}