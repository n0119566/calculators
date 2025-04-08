/**
 * Format a number with commas for thousands separators
 * @param value Number to format
 * @param decimals Number of decimal places
 * @returns Formatted string with commas
 */
export const formatNumber = (value: number, decimals: number = 0): string => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * Format a number as currency (USD)
 * @param value Number to format as currency
 * @param decimals Number of decimal places
 * @returns Formatted string with $ symbol and commas
 */
export const formatCurrency = (value: number, decimals: number = 2): string => {
  return `$${formatNumber(value, decimals)}`;
};