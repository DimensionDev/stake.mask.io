/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Skeleton, type BoxProps } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { type FC } from 'react'
import { usePoolInfo } from '../../hooks/usePoolInfo'
import { usePoolState } from '../../hooks/usePoolState'

export const ActivityStatusTag: FC<BoxProps> = ({ ...props }) => {
  const { data: pool, isLoading } = usePoolInfo()

  const { isStarted, isEnded } = usePoolState(pool)

  return (
    <Box
      bg={isEnded ? 'neutrals.5' : 'neutrals.9'}
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
        t`Ongoing`
      ) : (
        t`Not started`
      )}
    </Box>
  )
}
