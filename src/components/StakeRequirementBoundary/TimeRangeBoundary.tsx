import { Button, ButtonProps } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { PropsWithChildren, memo } from 'react'
import { usePoolInfo } from '../../hooks/usePoolInfo'
import { usePoolState } from '../../hooks/usePoolState'
import { Spinner } from '../Spinner'

interface BoundaryProps extends PropsWithChildren {
  buttonProps?: ButtonProps
}

export const TimeRangeBoundary = memo<BoundaryProps>(function TimeRangeBoundary({ children }) {
  const { data: poolInfo, isLoading: loadingPoolInfo } = usePoolInfo()

  const { isStarted, isEnded, isLoadingPools } = usePoolState(poolInfo)

  if (loadingPoolInfo || isLoadingPools) {
    return (
      <Button w="100%" colorScheme="red" rounded={50} isDisabled>
        <Spinner w="24px" h="24px" color="neutrals.9" />
      </Button>
    )
  }

  if (!isStarted) {
    return <Button isDisabled rounded={50} className="purple-gradient-button" w="100%">{t`Not started yet.`}</Button>
  }

  if (isEnded) {
    return <Button isDisabled rounded={50} className="purple-gradient-button" w="100%">{t`Ended`}</Button>
  }

  return <>{children}</>
})
