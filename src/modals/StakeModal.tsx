import { InfoIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  List,
  ListItem,
  ModalProps,
  ScaleFade,
  Skeleton,
  Spinner,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Link } from '@tanstack/react-router'
import { useLayoutEffect, useMemo, useState } from 'react'
import { parseUnits } from 'viem'
import { useAccount, useBalance, useToken } from 'wagmi'

import { StakeRequirementBoundary } from '@/components/StakeRequirementBoundary/index.tsx'
import { StepIcon } from '@/components/StepIcon'
import { TextOverflowTooltip } from '@/components/TextOverflowTooltip'
import { TokenIcon } from '@/components/TokenIcon'
import { Tooltip } from '@/components/Tooltip.tsx'
import { TwitterAvatar } from '@/components/TwitterAvatar.tsx'
import { ZERO } from '@/constants/misc.ts'
import { formatNumber } from '@/helpers/formatNumber'
import { formatSeconds } from '@/helpers/formatSeconds.ts'
import { refetchInfos } from '@/helpers/refetchInfos'
import { useLinkTwitter } from '@/hooks/useLinkTwitter'
import { useMaskAllowance } from '@/hooks/useMaskAllowance.ts'
import { usePoolInfo } from '@/hooks/usePoolInfo'
import { useStake } from '@/hooks/useStake'
import { useUserInfo } from '@/hooks/useUserInfo.ts'
import { BaseModal } from '@/modals/BaseModal'
import { profileModal } from '@/modals/ProfileModal.tsx'
import { createUITaskManager } from '@/modals/UITaskManager.tsx'
import { verifyModal } from '@/modals/VerifyModal.tsx'
import { usePoolStore } from '@/store/poolStore'

export function StakeModal(props: ModalProps) {
  const account = useAccount()
  const { openConnectModal } = useConnectModal()
  const { data: pool } = usePoolInfo()
  const { chainId, maskTokenAddress } = usePoolStore()
  const [rawAmount, setRawAmount] = useState('')
  const balance = useBalance({ chainId, address: account.address, token: maskTokenAddress })
  const allowance = useMaskAllowance()
  const maskToken = useToken({ chainId, address: maskTokenAddress })
  const [{ loading: linkingTwitter }, linkTwitter] = useLinkTwitter()
  const { data: userInfo, isLoading: isLoadingUserInfo } = useUserInfo()
  const linkedTwitter = !!userInfo?.twitter_id
  const isHiddenTokenName = useBreakpointValue({ base: true, md: false, lg: false, sm: true })

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

  const [{ updating, waiting, isSwitchingChain, isStaking }, stakeMutation] = useStake()

  const loading = allowance.isLoading || isStaking || waiting || updating || isSwitchingChain
  const disabled = allowance.isLoading || amount === ZERO
  return (
    <BaseModal
      title={t`Stake`}
      width={572}
      {...props}
      onCloseComplete={() => {
        refetchInfos()
      }}
    >
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
            <TwitterAvatar size={12} src={userInfo.twitter_image} flexShrink={0} />
            <TextOverflowTooltip label={userInfo.twitter_display_name}>
              <Text
                fontSize={14}
                fontWeight={700}
                color="neutrals.1"
                ml={6}
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                {userInfo.twitter_display_name}
              </Text>
            </TextOverflowTooltip>
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
          p={3}
          display="flex"
          _focusWithin={{
            borderColor: 'neutrals.3',
          }}
        >
          <Flex bg="rgba(255,255,255,0.03)" px={3} py={2} rounded={999} fontWeight="bold" alignItems="center">
            <TokenIcon flexShrink={0} />
            {isHiddenTokenName ? null : (
              <Stack ml={4}>
                <Text fontSize={20} lineHeight="20px">
                  MASK
                </Text>
                <Text fontSize={16} lineHeight="16px">
                  Ethereum
                </Text>
              </Stack>
            )}
          </Flex>
          <Flex flexDir="column" flexGrow={1}>
            <Text fontSize={16} color="neutrals.4" alignItems="center" textAlign="right" alignSelf="flex-end">
              <Trans>
                Balance:{' '}
                {balance.isPending ? (
                  <Skeleton as="span" ml={2} height="16px" width="20px" />
                ) : balance.isError ? (
                  <Tooltip label={balance.error.message} shouldWrapChildren>
                    <InfoIcon width={5} height={5} color="danger" onClick={() => balance.refetch()} />
                  </Tooltip>
                ) : (
                  formatNumber(+balance.data.formatted, 4)
                )}
              </Trans>
            </Text>
            <InputGroup alignItems="center" pos="relative" alignSelf="flex-end">
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
              <InputRightAddon p={0} bg="transparent" border="none">
                <VStack alignItems="flex-end">
                  <Button
                    size="xs"
                    fontSize="14px"
                    border="none"
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
          </Flex>
        </Box>
        <VStack spacing="10px" mt="10px" alignItems="stretch" fontSize={16} color="neutrals.4">
          <HStack justifyContent="space-between">
            <Text>{t`Unstake MASK Time`}</Text>
            {pool?.end_time ? (
              <Text color="secondary.3">
                {/* cspell:ignore UTCZ */}
                {formatSeconds(pool.end_time, 'HH:mm D/MM/YYYY (UTCZ)').replace(/00:00\)$/, '0)')}
              </Text>
            ) : (
              <Skeleton height="16px" width="100px" />
            )}
          </HStack>
          <HStack justifyContent="space-between">
            <Text>{t`APR`}</Text>
            {pool?.apr !== undefined ? (
              <Tooltip label={`${formatNumber(pool.apr, 18)}%`} hasArrow placement="top" shouldWrapChildren>
                <Text>{pool.apr > 10000 ? '>10,000%' : `${formatNumber(Math.min(pool.apr, 10000), 2)}%`}</Text>
              </Tooltip>
            ) : (
              <Skeleton height="16px" width="100px" />
            )}
          </HStack>
          <HStack justifyContent="space-between">
            <Text>{t`Share of Pool`}</Text>
            {share !== undefined ? (
              <Tooltip label={`${formatNumber(share * 100, 4)}%`} hasArrow placement="top" shouldWrapChildren>
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
              {pool?.amount !== undefined ? (
                <Tooltip label={formatNumber(+pool.amount)} hasArrow placement="top" shouldWrapChildren>
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
              <Link to="/faqs" target="_blank" hash="staking-guidelines" style={{ textDecoration: 'underline' }}>
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
                loadingText={waiting ? t`Waiting for transaction confirmation` : updating ? 'Updating' : ''}
                w="100%"
                className="purple-gradient-button"
                rounded={50}
                isDisabled={disabled}
                onClick={async () => {
                  await stakeMutation.mutateAsync({
                    amount,
                    rawAmount,
                  })
                  setRawAmount('')
                  balance.refetch()
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
