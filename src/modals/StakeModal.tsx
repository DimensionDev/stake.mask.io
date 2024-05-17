import { InfoIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  List,
  ListItem,
  ModalProps,
  Skeleton,
  Spinner,
  Stack,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { Trans, t } from '@lingui/macro'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { erc20Abi, parseUnits } from 'viem'
import { useAccount, useBalance, useToken, useWriteContract } from 'wagmi'
import { StakeManagerABI } from '../abis/stakeManager.ts'
import { StepIcon } from '../components/StepIcon'
import { TokenIcon } from '../components/TokenIcon'
import { Tooltip } from '../components/Tooltip.tsx'
import { TwitterAvatar } from '../components/TwitterAvatar.tsx'
import { formatNumber } from '../helpers/formatNumber'
import { useLinkTwitter } from '../hooks/useLinkTwitter'
import { useMaskAllowance } from '../hooks/useMaskAllowance.ts'
import { usePoolInfo } from '../hooks/usePoolInfo'
import { useUserInfo } from '../hooks/useUserInfo.ts'
import { usePoolStore } from '../store/poolStore'
import { BaseModal } from './BaseModal'
import { profileModal } from './index.tsx'
import { Link } from '@tanstack/react-router'

export function StakeModal(props: ModalProps) {
  const account = useAccount()
  const { openConnectModal } = useConnectModal()
  const { data: pool } = usePoolInfo()
  const { maskTokenAddress, stakeManagerAddress } = usePoolStore()
  const [amount, setAmount] = useState('')
  const balance = useBalance({ address: account.address, token: maskTokenAddress })
  const allowance = useMaskAllowance()
  const maskToken = useToken({ address: maskTokenAddress })
  const [{ loading }, linkTwitter] = useLinkTwitter()
  const { data: userInfo } = useUserInfo()
  const linkedTwitter = !!userInfo?.twitter_id

  const amountValue = useMemo(() => {
    if (!amount) return BigInt(0)
    const decimals = maskToken.data?.decimals || 18
    return parseUnits(amount, decimals)
  }, [amount, maskToken.data?.decimals])

  const insufficientBalance = balance.data ? balance.data.value < amountValue : false
  const disabled = insufficientBalance || allowance.isLoading

  const toast = useToast()
  const { writeContractAsync, isPending } = useWriteContract()

  return (
    <BaseModal title={t`Stake`} width={572} height={521} {...props}>
      <Box as="form" display="flex" flexDir="column" className="stake-form" flexGrow={1}>
        {!account.isConnected || !linkedTwitter ? (
          <List spacing={6}>
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
                  {loading ? <Spinner size="sm" /> : '𝕏'}
                </Button>
              )}
            </ListItem>
          </List>
        ) : null}
        {userInfo ? (
          <HStack mt={6}>
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
          className="input-box"
          border="1px solid"
          borderColor="neutrals.6"
          rounded={12}
          mt={6}
          p={4}
          _focusWithin={{
            borderColor: 'neutrals.3',
          }}
        >
          <InputGroup>
            <InputLeftAddon flexShrink={0} p={0} bg="transparent">
              <TokenIcon flexShrink={0} />
              <Stack ml={4}>
                <Text fontSize={20} lineHeight="20px">
                  Mask
                </Text>
                <Text fontSize={16} lineHeight="16px">
                  Ethereum
                </Text>
              </Stack>
            </InputLeftAddon>
            <Input
              size="lg"
              placeholder={t`Amount`}
              border="none"
              outline="none"
              fontSize="40px"
              fontFamily="input"
              fontWeight={700}
              autoFocus
              value={amount}
              max={1e18}
              onChange={(e) => {
                setAmount(e.currentTarget.value)
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
                      balance.data?.formatted
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
                      setAmount(balance.data.formatted)
                    }
                  }}
                >{t`MAX`}</Button>
              </VStack>
            </InputRightAddon>
          </InputGroup>
        </Box>
        <VStack spacing="10px" mt="10px" alignItems="stretch" fontSize={16} color="neutrals.4">
          <HStack justifyContent="space-between">
            <Text>{t`Unlock MASK Time`}</Text>
            {pool?.end_time ? (
              <Tooltip label={dayjs(pool.end_time * 1000).toISOString()} hasArrow placement="top">
                <Text color="secondary.3">{dayjs(pool.end_time * 1000).format('hh:mm d/MM/YYYY')}</Text>
              </Tooltip>
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
            {amount && pool?.amount !== undefined ? (
              <Text>{formatNumber((+amount / +pool?.amount) * 100, 2)}%</Text>
            ) : (
              <Skeleton height="16px" width="50px" />
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
              restricted regions.
              <Link to="/faqs" style={{ textDecoration: 'underline' }} onClick={props.onClose}>
                More
              </Link>
            </Trans>
          </Text>
        </VStack>
        <Button
          isLoading={allowance.isLoading || isPending}
          w="100%"
          className="purple-gradient-button"
          rounded={50}
          mt="10px"
          isDisabled={disabled}
          onClick={async () => {
            if (!maskTokenAddress || !stakeManagerAddress) {
              toast({
                status: 'error',
                title: t`Can not get determination MASK token`,
              })
              return
            }
            const insufficientAllowance = allowance.data ? allowance.data < amountValue : true
            if (insufficientAllowance) {
              await writeContractAsync({
                abi: erc20Abi,
                address: maskTokenAddress,
                functionName: 'approve',
                args: [stakeManagerAddress, amountValue],
              })
              return
            }
            await writeContractAsync({
              abi: StakeManagerABI,
              address: stakeManagerAddress,
              functionName: 'depositAndLock',
              args: [amountValue],
            })
          }}
        >
          {account.isConnected ? t`Stake` : t`Please connect first`}
        </Button>
      </Box>
    </BaseModal>
  )
}
