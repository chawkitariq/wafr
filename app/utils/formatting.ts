/**
 * Formats a MAD amount using Moroccan French locale conventions
 * (space as thousands separator, no decimals) and appends the currency code.
 * Example: 1234567 → "1 234 567 MAD"
 */
export function formatMAD(value: number): string {
  return new Intl.NumberFormat('fr-MA').format(Math.round(value)) + ' MAD'
}
