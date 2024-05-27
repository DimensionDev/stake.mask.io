export function formatNumber(num: number | undefined, digits = 2) {
  if (!num) return num
  return num.toLocaleString('en-US', {
    minimumFractionDigits: Math.min(2, digits),
    maximumFractionDigits: digits,
  })
}
