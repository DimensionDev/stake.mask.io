import { Button, ButtonProps, ScaleFade } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { memo, PropsWithChildren, useState } from 'react'
import { erc20Abi, TransactionExecutionError, UserRejectedRequestError } from 'viem'
import { useConfig, useWriteContract } from 'wagmi'
import { waitForTransactionReceipt } from 'wagmi/actions'

import { TxToastDescription } from '@/components/TxToastDescription'
import { resolveTxLink } from '@/helpers/resolveTxLink'
import { useHandleError } from '@/hooks/useHandleError'
import { useMaskAllowance } from '@/hooks/useMaskAllowance'
import { useToast } from '@/hooks/useToast'
import { usePoolStore } from '@/store/poolStore'

interface BoundaryProps extends PropsWithChildren {
  amount: bigint
  buttonProps?: ButtonProps
}
export const MaskApproveBoundary = memo(function MaskApproveBoundary({ children, amount }: BoundaryProps) {
  const allowance = useMaskAllowance()
  const insufficientAllowance = allowance.data === undefined ? true : allowance.data < amount
  const { chainId, maskTokenAddress, stakeManagerAddress } = usePoolStore()
  const { writeContractAsync, isPending } = useWriteContract()
  const handleError = useHandleError()
  const toast = useToast({ title: t`Unlock MASK` })
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
              toast({
                status: 'loading',
                description: t`Confirm this transaction in your wallet.`,
              })
              const hash = await writeContractAsync({
                abi: erc20Abi,
                address: maskTokenAddress,
                functionName: 'approve',
                args: [stakeManagerAddress, amount],
              })
              const txLink = resolveTxLink(chainId, hash)
              setWaiting(true)
              const receipt = await waitForTransactionReceipt(config, {
                hash,
                confirmations: 1,
              })
              allowance.refetch()
              if (receipt.status === 'reverted') {
                toast({
                  status: 'error',
                  description: <TxToastDescription link={txLink} text={t`Transaction failed.`} />,
                })
                throw new Error('The approval transaction gets reverted!')
              }
              receipt.status
            } catch (err) {
              const cause = err instanceof TransactionExecutionError ? err.cause : err
              if (cause instanceof UserRejectedRequestError) {
                toast({
                  status: 'error',
                  description: t`Your wallet cancelled the transaction.`,
                })
                return
              } else if (handleError(err)) return
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
