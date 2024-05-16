import { useMemo, type FC } from 'react'
import { Box, Skeleton, type BoxProps } from '@chakra-ui/react'
import { usePoolInfo } from '../../hooks/usePoolInfo'
import dayjs from 'dayjs'
import { t } from '@lingui/macro'

export const ActivityStatusTag: FC<BoxProps> = ({ ...props }) => {
  const { data: pool, isLoading } = usePoolInfo()
  const isStarted = useMemo(() => (pool ? dayjs(pool.start_time * 1000).isBefore(Date.now()) : false), [pool])
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
      {isLoading || !pool ? <Skeleton height="20px" width="60px" /> : isStarted ? t`On going` : t`Not started`}
    </Box>
  )
}
