import { useState } from 'react';
import { NumberInput, Button, Group, Text, Stack, Card } from '@mantine/core';
import { useForm } from '@mantine/form';

interface LoanFormValues {
  loanAmount: number;
  interestRate: number;
  termYears: number;
}

export function LoanCalculator() {
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

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
    const payment = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    setMonthlyPayment(payment);
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
            />
            
            <NumberInput
              label="Interest Rate (%)"
              placeholder="Enter annual interest rate"
              {...form.getInputProps('interestRate')}
              min={0.01}
              step={0.01}
              precision={2}
            />
            
            <NumberInput
              label="Term (Years)"
              placeholder="Enter loan term in years"
              {...form.getInputProps('termYears')}
              min={1}
              max={50}
            />
            
            <Group justify="flex-end">
              <Button type="submit">Calculate</Button>
            </Group>
          </Stack>
        </form>
        
        {monthlyPayment !== null && (
          <Stack mt="md">
            <Text fw={700}>Monthly Payment: ${monthlyPayment.toFixed(2)}</Text>
            <Text>Total Payment: ${(monthlyPayment * form.values.termYears * 12).toFixed(2)}</Text>
            <Text>Total Interest: ${(monthlyPayment * form.values.termYears * 12 - form.values.loanAmount).toFixed(2)}</Text>
          </Stack>
        )}
      </Stack>
    </Card>
  );
}