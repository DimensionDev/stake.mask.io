import { t } from '@lingui/macro'
import { useCallback, useState } from 'react'
import { useAccount, useChainId, useConfig, useSwitchChain, useWriteContract } from 'wagmi'
import { waitForTransactionReceipt } from 'wagmi/actions'
import { rewardABI } from '../../abis/reward'
import { resolveTxLink } from '../../helpers/resolveTxLink'
import { useToast } from '../../hooks/useToast'
import { useUserInfo } from '../../hooks/useUserInfo'
import { usePoolStore } from '../../store/poolStore'
import { UserInfo } from '../../types/api'
import { TxToastDescription } from '../TxToastDescription'
import { queryClient } from '../../configs/queryClient'
import { produce } from 'immer'
import { resultModal } from '../../modals/ResultModal'
import { formatNumber } from '../../helpers/formatNumber'
import { TransactionExecutionError, UserRejectedRequestError } from 'viem'
import { useHandleError } from '../../hooks/useHandleError'

interface ClaimRewardOptions {
  defaultSymbol?: string
}

export function useClaimReward(
  reward: UserInfo['reward_pool'][number] | undefined,
  { defaultSymbol }: ClaimRewardOptions,
) {
  const config = useConfig()
  const account = useAccount()
  const currentChainId = useChainId()
  const toast = useToast({ title: t`Claim` })
  const { chainId, poolId, rewardAddress } = usePoolStore()
  const { data: userInfo, isLoading: loadingUserInfo } = useUserInfo()
  const { switchChainAsync, isPending: switchingChain } = useSwitchChain()
  const { writeContractAsync, isPending: claiming } = useWriteContract()
  const [waiting, setWaiting] = useState(false)

  const handleError = useHandleError()

  const tokenSymbol = reward?.name?.toUpperCase() || defaultSymbol

  const claimReward = useCallback(async () => {
    if (!reward || !userInfo || !rewardAddress) return
    const rewardPool = userInfo.reward_pool.find((x) => x.reward_pool_id === reward?.reward_pool_id)
    if (!rewardPool) {
      toast({
        status: 'error',
        title: t`No matched pool found.`,
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
        abi: rewardABI,
        address: rewardAddress,
        functionName: 'claim',
        args: [reward.reward_pool_id, BigInt(reward.big_amount), rewardPool.proof],
      })
      const txLink = resolveTxLink(chainId, hash)
      toast({
        status: 'loading',
        description: <TxToastDescription link={txLink} text={t`Transaction submitted!`} />,
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
        throw new Error('The approval transaction gets reverted!')
      } else {
        toast({
          status: 'success',
          description: (
            <TxToastDescription
              link={txLink}
              text={t`Successfully claimed ${tokenSymbol?.toUpperCase()} Tokens.`}
              color="primary.4"
            />
          ),
        })
        if (account.address && poolId) clearReward(account.address, poolId)
        await resultModal.show({
          title: t`Claim`,
          message: t`Claim Successfully`,
          description: t`You have successfully claimed ${formatNumber(+reward.amount, 4)} ${tokenSymbol}.`,
        })
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
    }
  }, [
    account.address,
    chainId,
    config,
    currentChainId,
    handleError,
    poolId,
    reward,
    rewardAddress,
    switchChainAsync,
    toast,
    tokenSymbol,
    userInfo,
    writeContractAsync,
  ])

  return [
    {
      loadingUserInfo,
      switchingChain,
      claiming,
      waiting,
    },
    claimReward,
  ] as const
}

function clearReward(address: string, rewardPoolId: number) {
  queryClient.setQueriesData<UserInfo>({ queryKey: ['user-info', address] }, (info) => {
    if (!info?.reward_pool) return info
    return produce(info, (draft) => {
      const rewardPool = draft.reward_pool.find((x) => x.reward_pool_id === rewardPoolId)
      if (rewardPool) {
        rewardPool.amount = '0'
        rewardPool.big_amount = '0'
      }
    })
  })
}
