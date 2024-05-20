import { Button, ButtonProps, ScaleFade } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { PropsWithChildren, memo } from 'react'
import { useAccount, useBalance } from 'wagmi'
import { usePoolStore } from '../../store/poolStore'

interface BoundaryProps extends PropsWithChildren {
  amount: bigint
  buttonProps?: ButtonProps
}
export const MaskBalanceBoundary = memo(function MaskBalanceBoundary({ children, amount }: BoundaryProps) {
  const account = useAccount()
  const { maskTokenAddress } = usePoolStore()
  const balance = useBalance({ address: account.address, token: maskTokenAddress })
  const insufficientBalance = balance.data === undefined ? true : balance.data.value < amount

  if (insufficientBalance) {
    return (
      <ScaleFade in initialScale={0.5} key="balance-button">
        <Button isDisabled w="100%" className="purple-gradient-button">
          {t`Insufficient balance`}
        </Button>
      </ScaleFade>
    )
  }

  return <>{children}</>
})
