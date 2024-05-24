import { Button, ButtonProps, ScaleFade } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { memo, PropsWithChildren } from 'react'
import { useAccount } from 'wagmi'

interface BoundaryProps extends PropsWithChildren {
  buttonProps?: ButtonProps
}
export const ConnectBoundary = memo(function ConnectBoundary({ children }: BoundaryProps) {
  const account = useAccount()
  const { openConnectModal } = useConnectModal()

  if (!account.isConnected) {
    return (
      <ScaleFade in initialScale={0.5} key="connect-button">
        <Button
          w="100%"
          rounded={50}
          className="purple-gradient-button"
          onClick={() => {
            openConnectModal?.()
          }}
        >
          {t`Connect Wallet`}
        </Button>
      </ScaleFade>
    )
  }

  return <>{children}</>
})
