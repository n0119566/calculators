import { useState } from 'react';
import { NumberInput, Select, Button, Group, Text, Stack, Card } from '@mantine/core';
import { useForm } from '@mantine/form';
import { formatNumber } from '../utils/formatters';

type UnitSystem = 'metric' | 'imperial';

interface BMIFormValues {
  unitSystem: UnitSystem;
  height: number;
  weight: number;
}

interface BMIResult {
  bmi: number;
  category: string;
}

const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  if (bmi < 35) return 'Obesity (Class I)';
  if (bmi < 40) return 'Obesity (Class II)';
  return 'Extreme Obesity (Class III)';
};

export function BMICalculator() {
  const [result, setResult] = useState<BMIResult | null>(null);

  const form = useForm<BMIFormValues>({
    initialValues: {
      unitSystem: 'metric',
      height: 170,
      weight: 70,
    },
    validate: {
      height: (value) => value <= 0 ? 'Height must be positive' : null,
      weight: (value) => value <= 0 ? 'Weight must be positive' : null,
    },
  });

  const calculateBMI = (values: BMIFormValues) => {
    const { unitSystem, height, weight } = values;
    let bmi: number;
    
    if (unitSystem === 'metric') {
      // Metric formula: weight (kg) / (height (m))²
      const heightInMeters = height / 100; // cm to m
      bmi = weight / (heightInMeters * heightInMeters);
    } else {
      // Imperial formula: (weight (lbs) * 703) / (height (inches))²
      bmi = (weight * 703) / (height * height);
    }
    
    setResult({
      bmi,
      category: getBMICategory(bmi),
    });
  };

  const getHeightLabel = () => {
    return form.values.unitSystem === 'metric' ? 'Height (cm)' : 'Height (inches)';
  };

  const getWeightLabel = () => {
    return form.values.unitSystem === 'metric' ? 'Weight (kg)' : 'Weight (lbs)';
  };

  const handleUnitSystemChange = (value: UnitSystem) => {
    form.setValues({
      unitSystem: value,
      // Reset to default values for the selected unit system
      height: value === 'metric' ? 170 : 67,
      weight: value === 'metric' ? 70 : 154,
    });
    
    // Clear previous result
    setResult(null);
  };

  return (
    <Card withBorder shadow="sm" p="lg" radius="md">
      <Stack>
        <Text fw={500} size="lg">BMI Calculator</Text>
        
        <form onSubmit={form.onSubmit(calculateBMI)}>
          <Stack gap="md">
            <Select
              label="Unit System"
              data={[
                { value: 'metric', label: 'Metric (cm, kg)' },
                { value: 'imperial', label: 'Imperial (inches, lbs)' },
              ]}
              value={form.values.unitSystem}
              onChange={(value) => handleUnitSystemChange(value as UnitSystem)}
            />
            
            <NumberInput
              label={getHeightLabel()}
              placeholder="Enter height"
              {...form.getInputProps('height')}
              min={1}
              thousandSeparator=","
            />
            
            <NumberInput
              label={getWeightLabel()}
              placeholder="Enter weight"
              {...form.getInputProps('weight')}
              min={1}
              thousandSeparator=","
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
            <Text fw={700}>BMI: {formatNumber(result.bmi, 1)}</Text>
            <Text>Category: {result.category}</Text>
          </Stack>
        )}
      </Stack>
    </Card>
  );
}