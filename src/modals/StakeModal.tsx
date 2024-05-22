import { InfoIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  List,
  ListItem,
  ModalProps,
  ScaleFade,
  Skeleton,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Trans, t } from '@lingui/macro'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Link } from '@tanstack/react-router'
import { useLayoutEffect, useMemo, useState } from 'react'
import { TransactionExecutionError, UserRejectedRequestError, parseUnits } from 'viem'
import { useAccount, useBalance, useChainId, useConfig, useToken, useWriteContract } from 'wagmi'
import { waitForTransactionReceipt } from 'wagmi/actions'
import { StakeManagerABI } from '../abis/stakeManager.ts'
import { StakeRequirementBoundary } from '../components/StakeRequirementBoundary/index.tsx'
import { StepIcon } from '../components/StepIcon'
import { TokenIcon } from '../components/TokenIcon'
import { Tooltip } from '../components/Tooltip.tsx'
import { TwitterAvatar } from '../components/TwitterAvatar.tsx'
import { ZERO } from '../constants/misc.ts'
import { formatNumber } from '../helpers/formatNumber'
import { formatSeconds } from '../helpers/formatSeconds.ts'
import { useHandleError } from '../hooks/useHandleError.ts'
import { useLinkTwitter } from '../hooks/useLinkTwitter'
import { useMaskAllowance } from '../hooks/useMaskAllowance.ts'
import { usePoolInfo } from '../hooks/usePoolInfo'
import { useToast } from '../hooks/useToast.tsx'
import { useUserInfo } from '../hooks/useUserInfo.ts'
import { usePoolStore } from '../store/poolStore'
import { BaseModal } from './BaseModal'
import { profileModal } from './ProfileModal.tsx'
import { resultModal } from './ResultModal.tsx'
import { createUITaskManager } from './UITaskManager.tsx'
import { verifyModal } from './VerifyModal.tsx'
import { resolveTxLink } from '../helpers/resolveTxLink.ts'
import { TxToastDescription } from '../components/TxToastDescription.tsx'

export function StakeModal(props: ModalProps) {
  const chainId = useChainId()
  const account = useAccount()
  const config = useConfig()
  const { openConnectModal } = useConnectModal()
  const { data: pool } = usePoolInfo()
  const { maskTokenAddress, stakeManagerAddress } = usePoolStore()
  const [rawAmount, setRawAmount] = useState('')
  const balance = useBalance({ address: account.address, token: maskTokenAddress })
  const allowance = useMaskAllowance()
  const maskToken = useToken({ address: maskTokenAddress })
  const [{ loading: linkingTwitter }, linkTwitter] = useLinkTwitter()
  const { data: userInfo, isLoading: isLoadingUserInfo } = useUserInfo()
  const linkedTwitter = !!userInfo?.twitter_id
  const [waiting, setWaiting] = useState(false)

  const decimals = maskToken.data?.decimals || 18
  const amount = useMemo(() => {
    if (!rawAmount) return BigInt(0)
    return parseUnits(rawAmount, decimals)
  }, [rawAmount, decimals])

  const share = useMemo(() => {
    if (!rawAmount || pool?.amount === undefined) return
    const num = +rawAmount
    const deno = num + +pool.amount
    return num / deno
  }, [rawAmount, pool?.amount])

  useLayoutEffect(() => {
    if (!account.isConnected || isLoadingUserInfo || linkedTwitter) return
    const abort = new AbortController()
    verifyModal.show(
      {
        onSign: () => {
          linkTwitter()
          abort.abort()
        },
      },
      abort.signal,
    )
    return () => {
      abort.abort()
    }
  }, [account.isConnected, isLoadingUserInfo, linkTwitter, linkedTwitter])

  const toast = useToast({ title: t`Stake` })
  const { writeContractAsync, isPending } = useWriteContract()
  const handleError = useHandleError()

  const loading = allowance.isLoading || isPending || waiting
  const disabled = allowance.isLoading || amount === ZERO
  return (
    <BaseModal title={t`Stake`} width={572} {...props}>
      <Box as="form" display="flex" flexDir="column" className="stake-form" flexGrow={1}>
        {!account.isConnected || !linkedTwitter ? (
          <List spacing={6} mb={6}>
            <ListItem display="flex">
              <StepIcon width={6} height={6} step={1} completed={account.isConnected} />
              <Text as="span" ml={3} fontSize={14} fontWeight="bold" color="neutrals.1">{t`Connect Wallet`}</Text>
              {account.isConnected ? null : (
                <Button
                  className="purple-gradient-button"
                  size="sm"
                  ml="auto"
                  fontSize={14}
                  rounded={24}
                  onClick={() => {
                    openConnectModal?.()
                  }}
                >{t`Connect Wallet`}</Button>
              )}
            </ListItem>
            <ListItem display="flex">
              <StepIcon width={6} height={6} step={2} completed={linkedTwitter} />
              <Text as="span" ml={3} fontSize={14} fontWeight="bold" color="neutrals.1" minW="130px">{t`Link 𝕏`}</Text>
              {linkedTwitter ? null : (
                <Button
                  className="purple-gradient-button"
                  ml="auto"
                  size="sm"
                  minW="130px"
                  rounded={24}
                  _hover={{ bg: 'gradient.purple' }}
                  onClick={linkTwitter}
                >
                  {linkingTwitter ? <Spinner size="sm" /> : '𝕏'}
                </Button>
              )}
            </ListItem>
          </List>
        ) : null}
        {linkedTwitter ? (
          <HStack mb={6}>
            <TwitterAvatar size={12} src={userInfo.twitter_image} />
            <Text fontSize={14} fontWeight={700} color="neutrals.1" ml={6}>
              {userInfo.twitter_display_name}
            </Text>
            <Text
              ml="auto"
              cursor="pointer"
              _hover={{ textDecoration: 'underline' }}
              onClick={() => {
                profileModal.show()
              }}
            >{t`Edit`}</Text>
          </HStack>
        ) : null}
        <Box
          className="input-box gradient-box"
          borderColor="neutrals.6"
          rounded={12}
          p={4}
          _focusWithin={{
            borderColor: 'neutrals.3',
          }}
        >
          <InputGroup alignItems="center">
            <InputLeftAddon flexShrink={0} p={0} bg="transparent">
              <Flex bg="rgba(255,255,255,0.03)" px={3} py={2} rounded={999} fontWeight="bold" alignItems="center">
                <TokenIcon flexShrink={0} />
                <Stack ml={4}>
                  <Text fontSize={20} lineHeight="20px">
                    Mask
                  </Text>
                  <Text fontSize={16} lineHeight="16px">
                    Ethereum
                  </Text>
                </Stack>
              </Flex>
            </InputLeftAddon>
            <Input
              size="lg"
              placeholder={t`Amount`}
              border="none"
              outline="none"
              fontSize="40px"
              fontFamily="input"
              type="number"
              min={0}
              fontWeight={700}
              autoFocus
              value={rawAmount}
              max={1e10}
              onChange={(e) => {
                const value = e.currentTarget.value
                setRawAmount(+value < 0 ? '0' : value)
              }}
              _focus={{ outline: 'none', border: 'none' }}
              _focusVisible={{ border: 'none', boxShadow: 'none' }}
            />
            <InputRightAddon p={0} bg="transparent">
              <VStack alignItems="flex-end">
                <Text fontSize={16} color="neutrals.4" display="inline-flex" alignItems="center">
                  <Trans>
                    Balance:{' '}
                    {balance.isPending ? (
                      <Skeleton as="span" ml={2} height="16px" width="20px" />
                    ) : balance.isError ? (
                      <Tooltip label={balance.error.message}>
                        <InfoIcon width={5} height={5} color="danger" onClick={() => balance.refetch()} />
                      </Tooltip>
                    ) : (
                      formatNumber(+balance.data.formatted, 4)
                    )}
                  </Trans>
                </Text>
                <Button
                  size="xs"
                  fontSize="14px"
                  px="8px"
                  py="6px"
                  height={26}
                  boxSizing="border-box"
                  color="neutrals.6"
                  bg="gradient.purple"
                  _hover={{ bg: 'gradient.purple' }}
                  onClick={() => {
                    if (balance.data) {
                      setRawAmount(balance.data.formatted)
                    }
                  }}
                >{t`MAX`}</Button>
              </VStack>
            </InputRightAddon>
          </InputGroup>
        </Box>
        <VStack spacing="10px" mt="10px" alignItems="stretch" fontSize={16} color="neutrals.4">
          <HStack justifyContent="space-between">
            <Text>{t`Unstake MASK Time`}</Text>
            {pool?.end_time ? (
              <Text color="secondary.3">
                {/* cspell:ignore UTCZ */}
                {formatSeconds(pool.end_time, 'hh:mm d/MM/YYYY (UTCZ)').replace(/:00\)$/, ')')}
              </Text>
            ) : (
              <Skeleton height="16px" width="100px" />
            )}
          </HStack>
          <HStack justifyContent="space-between">
            <Text>{t`APR`}</Text>
            {pool?.apr ? (
              <Tooltip label={`${formatNumber(+pool.apr * 100, 18)}%`} hasArrow placement="top">
                <Text>{formatNumber(+pool.apr * 110, 2)}%</Text>
              </Tooltip>
            ) : (
              <Skeleton height="16px" width="100px" />
            )}
          </HStack>
          <HStack justifyContent="space-between">
            <Text>{t`Share of Pool`}</Text>
            {share !== undefined ? (
              <Tooltip label={`${formatNumber(share * 100, 4)}%`} hasArrow placement="top">
                <Text>{formatNumber(share * 100, 2)}%</Text>
              </Tooltip>
            ) : (
              <Text>-</Text>
            )}
          </HStack>
          <HStack justifyContent="space-between">
            <Text>{t`Pool Liquidity`}</Text>
            <HStack>
              <TokenIcon width={4} height={4} omitChain />
              {pool?.amount ? (
                <Tooltip label={formatNumber(+pool.amount)} hasArrow placement="top">
                  <Text>{formatNumber(+pool.amount)}</Text>
                </Tooltip>
              ) : (
                <Skeleton height="16px" width="100px" />
              )}
            </HStack>
          </HStack>
          <Text color="danger" lineHeight="24px">
            <Trans>
              The staking addresses need to pass Go+ security check. Note that staking is not available in some
              restricted regions.{' '}
              <Link
                to="/faqs"
                hash="staking-guidelines"
                style={{ textDecoration: 'underline' }}
                onClick={props.onClose}
              >
                More
              </Link>
            </Trans>
          </Text>
        </VStack>
        <Box mt="10px">
          <StakeRequirementBoundary amount={amount}>
            <ScaleFade in initialScale={0.5} key="stake-button">
              <Button
                isLoading={loading}
                loadingText={waiting ? t`Waiting for transaction confirmation` : ''}
                w="100%"
                className="purple-gradient-button"
                rounded={50}
                isDisabled={disabled}
                onClick={async () => {
                  if (!maskTokenAddress || !stakeManagerAddress) {
                    toast({
                      status: 'error',
                      title: t`Can not get determination MASK token`,
                    })
                    return
                  }
                  try {
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
                      description: (
                        <TxToastDescription link={txLink} text={t`Transaction submitted!`} color="primary.4" />
                      ),
                    })
                    setWaiting(true)
                    const receipt = await waitForTransactionReceipt(config, {
                      hash,
                      confirmations: 1,
                    })
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
                      await resultModal.show({
                        title: t`Stake`,
                        message: t`Stake Successfully`,
                        description: t`You have successfully staked ${rawAmount} MASK.`,
                      })
                      props.onClose()
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
                }}
              >
                {account.isConnected ? t`Stake` : t`Please connect first`}
              </Button>
            </ScaleFade>
          </StakeRequirementBoundary>
        </Box>
      </Box>
    </BaseModal>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const { ui: stakeModalUi, controller: stakeModal } = createUITaskManager(StakeModal)
