export const truncate = (value: number, decimalPlaces: number = 3): number => {
  const exponent = Math.pow(10, decimalPlaces);
  const truncated = Math.floor(value * exponent) / exponent;

  return truncated;
};
