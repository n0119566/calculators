import { Tabs } from '@mantine/core';
import { useStore } from '../store/useStore';
import { calculators } from '../calculators';

export function CalculatorSelector() {
  const { selectedCalculator, setSelectedCalculator } = useStore();

  const handleChange = (value: string) => {
    setSelectedCalculator(value);
  };

  return (
    <Tabs value={selectedCalculator} onChange={handleChange}>
      <Tabs.List>
        {calculators.map((calc) => (
          <Tabs.Tab key={calc.id} value={calc.id}>
            {calc.name}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
}