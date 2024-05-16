export function formatNumber(num: number, digits = 2) {
  return num.toLocaleString('en-US', {
    maximumFractionDigits: digits,
  })
}
