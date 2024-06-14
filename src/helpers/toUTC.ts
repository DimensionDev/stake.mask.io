import dayjs from 'dayjs'

export function toUTC(seconds: number) {
  /* cspell:ignore UTCZ */
  return dayjs(seconds * 1000)
    .utc(false)
    .format('MM.DD YYYY HH:mm(UTCZ)')
    .replace(/0:00\)/, ')')
}
