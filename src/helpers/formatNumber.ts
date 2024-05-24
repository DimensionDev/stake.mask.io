export function formatNumber(num: number | undefined, digits = 2) {
  if (!num) return num
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: digits,
  })
}
