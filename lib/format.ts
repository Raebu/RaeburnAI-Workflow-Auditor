export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0
  }).format(value);
}

export function formatHours(value: number) {
  return new Intl.NumberFormat('en-GB', {
    maximumFractionDigits: 0
  }).format(value);
}
