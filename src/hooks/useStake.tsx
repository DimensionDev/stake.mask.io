import { t } from '@lingui/macro'
import { useMutation } from '@tanstack/react-query'
import { noop } from 'lodash-es'
import { useState } from 'react'
import { TransactionExecutionError, UserRejectedRequestError } from 'viem'
import { useChainId, useConfig, useSwitchChain, useWriteContract } from 'wagmi'
import { waitForTransactionReceipt } from 'wagmi/actions'

import { StakeManagerABI } from '@/abis/stakeManager'
import { TxToastDescription } from '@/components/TxToastDescription'
import { formatNumber } from '@/helpers/formatNumber'
import { refetchInfos } from '@/helpers/refetchInfos'
import { resolveTxLink } from '@/helpers/resolveTxLink'
import { useCheckStats } from '@/hooks/useCheckStats'
import { useHandleError } from '@/hooks/useHandleError'
import { useToast } from '@/hooks/useToast'
import { resultModal } from '@/modals/ResultModal'
import { usePoolStore } from '@/store/poolStore'
import { sleep } from '@/utils/sleep'

interface Params {
  amount: bigint
  rawAmount: string
}

export function useStake() {
  const { chainId, maskTokenAddress, stakeManagerAddress } = usePoolStore()
  const config = useConfig()
  const currentChainId = useChainId()
  const { switchChainAsync, isPending: isSwitchingChain } = useSwitchChain()
  const { writeContractAsync, isPending: isStaking } = useWriteContract()

  const [waiting, setWaiting] = useState(false)
  const [updating, setUpdating] = useState(false)

  const toast = useToast({ title: t`Stake` })
  const handleError = useHandleError()
  const checkStats = useCheckStats()

  const mutation = useMutation({
    mutationFn: async ({ amount, rawAmount }: Params) => {
      if (!maskTokenAddress || !stakeManagerAddress) {
        toast({
          status: 'error',
          title: t`Can not get determination MASK token`,
        })
        return
      }
      try {
        if (currentChainId !== chainId) {
          await switchChainAsync({ chainId })
        }
        toast({
          status: 'loading',
          description: t`Confirm this transaction in your wallet.`,
        })
        const hash = await writeContractAsync({
          abi: StakeManagerABI,
          address: stakeManagerAddress,
          functionName: 'depositAndLock',
          args: [amount],
        })
        const txLink = resolveTxLink(chainId, hash)

        toast({
          status: 'loading',
          description: <TxToastDescription link={txLink} text={t`Transaction submitted!`} color="primary.4" />,
        })
        setWaiting(true)
        const receipt = await waitForTransactionReceipt(config, {
          hash,
          confirmations: 1,
        })
        setWaiting(false)
        if (receipt.status === 'reverted') {
          toast({
            status: 'error',
            description: <TxToastDescription link={txLink} text={t`Transaction failed.`} />,
          })
          throw new Error('The transaction gets reverted!')
        } else {
          toast({
            status: 'success',
            description: <TxToastDescription link={txLink} text={t`Successfully staked MASK Tokens.`} />,
          })
          setUpdating(true)
          await Promise.allSettled([
            checkStats()
              .then(async (res) => {
                if (res && BigInt(res.height) < receipt.blockNumber) await sleep(6000)
              })
              .catch(noop)
              .finally(() => setUpdating(false)),
            resultModal.show({
              title: t`Stake`,
              message: t`Stake Successfully`,
              description: t`You have successfully staked ${formatNumber(+rawAmount, 4)} MASK.`,
            }),
          ])
          await refetchInfos()
        }
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
        setUpdating(false)
      }
    },
  })

  return [{ updating, waiting, isSwitchingChain, isStaking }, mutation] as const
}
