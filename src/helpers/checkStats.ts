import urlcat from 'urlcat'

import { FIREFLY_API_ROOT } from '@/constants/api'
import { fetchJSON } from '@/helpers/fetchJSON'

/** Trigger backend refreshing data */
export async function checkStats() {
  const url = urlcat(FIREFLY_API_ROOT, 'v1/mask_stake/check_token')
  await fetchJSON(url)
}
