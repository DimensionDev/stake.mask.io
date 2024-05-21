/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Skeleton, type BoxProps } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState, type FC } from 'react'
import { usePoolInfo } from '../../hooks/usePoolInfo'

export const ActivityStatusTag: FC<BoxProps> = ({ ...props }) => {
  const { data: pool, isLoading } = usePoolInfo()
  const [tick, setTick] = useState(0)
  useEffect(() => {
    setInterval(() => {
      setTick((n) => n + 1)
    }, 1e4)
  }, [])
  const isStarted = useMemo(() => (pool ? dayjs(pool.start_time * 1000).isBefore(Date.now()) : false), [pool, tick])
  const isEnded = useMemo(() => (pool ? dayjs(pool.end_time * 1000).isAfter(Date.now()) : false), [pool, tick])
  return (
    <Box
      bg="neutrals.9"
      color="neutrals.1"
      rounded="6px"
      fontSize="12px"
      fontWeight={600}
      lineHeight="20px"
      px="6px"
      {...props}
    >
      {isLoading || !pool ? (
        <Skeleton height="20px" width="60px" />
      ) : isEnded ? (
        t`Ended`
      ) : isStarted ? (
        t`On going`
      ) : (
        t`Not started`
      )}
    </Box>
  )
}
