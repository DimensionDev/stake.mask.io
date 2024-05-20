import { Button, ButtonProps, ScaleFade, useToast } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { PropsWithChildren, memo, useState } from 'react'
import { erc20Abi } from 'viem'
import { useConfig, useWriteContract } from 'wagmi'
import { waitForTransactionReceipt } from 'wagmi/actions'
import { useHandleError } from '../../hooks/useHandleError'
import { useMaskAllowance } from '../../hooks/useMaskAllowance'
import { usePoolStore } from '../../store/poolStore'

interface BoundaryProps extends PropsWithChildren {
  amount: bigint
  buttonProps?: ButtonProps
}
export const MaskApproveBoundary = memo(function MaskApproveBoundary({ children, amount }: BoundaryProps) {
  const allowance = useMaskAllowance()
  const insufficientAllowance = allowance.data === undefined ? true : allowance.data < amount
  const { maskTokenAddress, stakeManagerAddress } = usePoolStore()
  const { writeContractAsync, isPending } = useWriteContract()
  const handleError = useHandleError()
  const toast = useToast()
  const config = useConfig()
  const [waiting, setWaiting] = useState(false)
  if (insufficientAllowance) {
    return (
      <ScaleFade in initialScale={0.5} key="approve-button">
        <Button
          w="100%"
          colorScheme="red"
          rounded={50}
          isLoading={isPending || waiting || allowance.isPending}
          loadingText={
            waiting ? t`Waiting for transaction confirmation` : allowance.isPending ? t`Checking` : t`Unlocking`
          }
          onClick={async () => {
            try {
              const hash = await writeContractAsync({
                abi: erc20Abi,
                address: maskTokenAddress,
                functionName: 'approve',
                args: [stakeManagerAddress, amount],
              })
              setWaiting(true)
              const res = await waitForTransactionReceipt(config, {
                hash,
                confirmations: 1,
              })
              allowance.refetch()
              if (res.status === 'reverted') {
                toast({
                  status: 'error',
                  title: t`The approval transaction gets reverted!`,
                })
                throw new Error('The approval transaction gets reverted!')
              }
              res.status
            } catch (err) {
              if (handleError(err)) return
              throw err
            } finally {
              setWaiting(false)
            }
          }}
        >
          {allowance.isPending ? t`Checking` : t`Unlock MASK`}
        </Button>
      </ScaleFade>
    )
  }
  return <>{children}</>
})
