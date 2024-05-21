import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { PoolInfo } from '../types/api'

export function usePoolState(pool: PoolInfo | undefined) {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    setInterval(() => {
      setTick((n) => n + 1)
    }, 1e4)
  }, [])
  return useMemo(() => {
    const isStarted = pool ? dayjs(pool.start_time * 1000).isBefore(Date.now()) : false
    const isEnded = pool ? dayjs(pool.end_time * 1000).isBefore(Date.now()) : false
    return { isStarted, isEnded } as const
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool, tick])
}
