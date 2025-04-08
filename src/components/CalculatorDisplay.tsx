import { Container } from '@mantine/core';
import { useStore } from '../store/useStore';
import { calculators } from '../calculators';

export function CalculatorDisplay() {
  const { selectedCalculator } = useStore();
  
  const currentCalculator = calculators.find(calc => calc.id === selectedCalculator);
  
  if (!currentCalculator) {
    return <div>Calculator not found</div>;
  }
  
  const CalculatorComponent = currentCalculator.component;
  
  return (
    <Container size="sm" py="xl">
      <CalculatorComponent />
    </Container>
  );
}