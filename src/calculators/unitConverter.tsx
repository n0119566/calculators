import { useState } from 'react';
import { TextInput, Select, Button, Group, Text, Stack, Card } from '@mantine/core';
import { useForm } from '@mantine/form';

type ConversionType = 'length' | 'weight' | 'temperature';
type LengthUnit = 'meters' | 'kilometers' | 'miles' | 'feet' | 'inches';
type WeightUnit = 'kilograms' | 'grams' | 'pounds' | 'ounces';
type TemperatureUnit = 'celsius' | 'fahrenheit' | 'kelvin';

interface UnitConverterFormValues {
  inputValue: string;
  conversionType: ConversionType;
  fromUnit: string;
  toUnit: string;
}

const lengthUnits: LengthUnit[] = ['meters', 'kilometers', 'miles', 'feet', 'inches'];
const weightUnits: WeightUnit[] = ['kilograms', 'grams', 'pounds', 'ounces'];
const temperatureUnits: TemperatureUnit[] = ['celsius', 'fahrenheit', 'kelvin'];

// Length conversion factors (to meters)
const lengthToMeters: Record<LengthUnit, number> = {
  meters: 1,
  kilometers: 1000,
  miles: 1609.34,
  feet: 0.3048,
  inches: 0.0254,
};

// Weight conversion factors (to grams)
const weightToGrams: Record<WeightUnit, number> = {
  grams: 1,
  kilograms: 1000,
  pounds: 453.592,
  ounces: 28.3495,
};

// Temperature conversions require special formulas
const convertTemperature = (
  value: number, 
  fromUnit: TemperatureUnit, 
  toUnit: TemperatureUnit
): number => {
  // First convert to Kelvin
  let kelvin: number;
  
  switch (fromUnit) {
    case 'celsius':
      kelvin = value + 273.15;
      break;
    case 'fahrenheit':
      kelvin = (value - 32) * 5/9 + 273.15;
      break;
    case 'kelvin':
    default:
      kelvin = value;
      break;
  }
  
  // Then convert from Kelvin to target unit
  switch (toUnit) {
    case 'celsius':
      return kelvin - 273.15;
    case 'fahrenheit':
      return (kelvin - 273.15) * 9/5 + 32;
    case 'kelvin':
    default:
      return kelvin;
  }
};

export function UnitConverter() {
  const [result, setResult] = useState<number | null>(null);
  const [availableUnits, setAvailableUnits] = useState<string[]>(lengthUnits);

  const form = useForm<UnitConverterFormValues>({
    initialValues: {
      inputValue: '',
      conversionType: 'length',
      fromUnit: 'meters',
      toUnit: 'feet',
    },
    validate: {
      inputValue: (value) => {
        const num = parseFloat(value);
        return isNaN(num) ? 'Please enter a valid number' : null;
      },
    },
  });

  const handleConversionTypeChange = (type: ConversionType) => {
    let units: string[] = [];
    let defaultFrom = '';
    let defaultTo = '';
    
    switch (type) {
      case 'length':
        units = lengthUnits;
        defaultFrom = 'meters';
        defaultTo = 'feet';
        break;
      case 'weight':
        units = weightUnits;
        defaultFrom = 'kilograms';
        defaultTo = 'pounds';
        break;
      case 'temperature':
        units = temperatureUnits;
        defaultFrom = 'celsius';
        defaultTo = 'fahrenheit';
        break;
    }
    
    setAvailableUnits(units);
    form.setValues({
      ...form.values,
      conversionType: type,
      fromUnit: defaultFrom,
      toUnit: defaultTo,
    });
  };

  const convert = (values: UnitConverterFormValues) => {
    const { inputValue, conversionType, fromUnit, toUnit } = values;
    const inputNum = parseFloat(inputValue);
    
    if (isNaN(inputNum)) {
      return;
    }
    
    let converted: number;
    
    switch (conversionType) {
      case 'length': {
        const fromUnitTyped = fromUnit as LengthUnit;
        const toUnitTyped = toUnit as LengthUnit;
        // Convert to base unit (meters) then to target unit
        const inMeters = inputNum * lengthToMeters[fromUnitTyped];
        converted = inMeters / lengthToMeters[toUnitTyped];
        break;
      }
      case 'weight': {
        const fromUnitTyped = fromUnit as WeightUnit;
        const toUnitTyped = toUnit as WeightUnit;
        // Convert to base unit (grams) then to target unit
        const inGrams = inputNum * weightToGrams[fromUnitTyped];
        converted = inGrams / weightToGrams[toUnitTyped];
        break;
      }
      case 'temperature': {
        converted = convertTemperature(
          inputNum, 
          fromUnit as TemperatureUnit, 
          toUnit as TemperatureUnit
        );
        break;
      }
      default:
        converted = 0;
    }
    
    setResult(converted);
  };

  return (
    <Card withBorder shadow="sm" p="lg" radius="md">
      <Stack>
        <Text fw={500} size="lg">Unit Converter</Text>
        
        <form onSubmit={form.onSubmit(convert)}>
          <Stack gap="md">
            <Select
              label="Conversion Type"
              data={[
                { value: 'length', label: 'Length' },
                { value: 'weight', label: 'Weight' },
                { value: 'temperature', label: 'Temperature' },
              ]}
              value={form.values.conversionType}
              onChange={(value) => handleConversionTypeChange(value as ConversionType)}
            />
            
            <TextInput
              label="Value"
              placeholder="Enter value to convert"
              {...form.getInputProps('inputValue')}
            />
            
            <Group grow>
              <Select
                label="From"
                data={availableUnits.map(unit => ({ value: unit, label: unit }))}
                {...form.getInputProps('fromUnit')}
              />
              
              <Select
                label="To"
                data={availableUnits.map(unit => ({ value: unit, label: unit }))}
                {...form.getInputProps('toUnit')}
              />
            </Group>
            
            <Group justify="flex-end">
              <Button type="submit">Convert</Button>
            </Group>
          </Stack>
        </form>
        
        {result !== null && (
          <Text mt="md" fw={700}>
            Result: {parseFloat(form.values.inputValue)} {form.values.fromUnit} = {result.toFixed(6)} {form.values.toUnit}
          </Text>
        )}
      </Stack>
    </Card>
  );
}