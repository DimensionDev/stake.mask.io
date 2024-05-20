import dayjs from 'dayjs'

export function formatSeconds(seconds: number, pattern?: string) {
  return dayjs(seconds * 1000).format(pattern)
}
