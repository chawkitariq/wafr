export function formatMAD(value: number): string {
  return new Intl.NumberFormat('fr-MA').format(Math.round(value)) + ' MAD'
}
