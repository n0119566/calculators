/**
 * Validate a number input
 * @param value The value to validate
 * @param min Optional minimum value
 * @param max Optional maximum value
 * @returns True if valid, false otherwise
 */
export const isValidNumber = (value: string, min?: number, max?: number): boolean => {
  const num = parseFloat(value);
  
  if (isNaN(num)) {
    return false;
  }
  
  if (min !== undefined && num < min) {
    return false;
  }
  
  if (max !== undefined && num > max) {
    return false;
  }
  
  return true;
};

/**
 * Parse a string to a number, with validation
 * @param value The string to parse
 * @param defaultValue Default value if parsing fails
 * @param min Optional minimum value
 * @param max Optional maximum value
 * @returns The parsed number or defaultValue
 */
export const parseNumber = (
  value: string, 
  defaultValue: number = 0, 
  min?: number, 
  max?: number
): number => {
  const num = parseFloat(value);
  
  if (isNaN(num)) {
    return defaultValue;
  }
  
  if (min !== undefined && num < min) {
    return min;
  }
  
  if (max !== undefined && num > max) {
    return max;
  }
  
  return num;
};