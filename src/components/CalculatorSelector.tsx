import { SegmentedControl, Select, Box } from '@mantine/core';
import { useStore } from '../store/useStore';
import { calculators } from '../calculators';
import { useViewportSize } from '@mantine/hooks';

export function CalculatorSelector() {
  const { selectedCalculator, setSelectedCalculator } = useStore();
  const { width } = useViewportSize();

  const handleChange = (value: string | null) => {
    if (value) {
      setSelectedCalculator(value);
    }
  };

  // For mobile screens, use a dropdown instead of tabs
  if (width < 768) {
    return (
      <Box mb="md">
        <Select
          value={selectedCalculator}
          onChange={handleChange}
          data={calculators.map(calc => ({ value: calc.id, label: calc.name }))}
          placeholder="Select calculator"
          clearable={false}
        />
      </Box>
    );
  }

  return (
    <Box mb="md">
      <SegmentedControl
        value={selectedCalculator}
        onChange={handleChange}
        data={calculators.map(calc => ({ 
          value: calc.id, 
          label: calc.name 
        }))}
        fullWidth
      />
    </Box>
  );
}