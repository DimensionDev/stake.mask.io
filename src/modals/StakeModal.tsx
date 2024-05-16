import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Link,
  List,
  ListItem,
  ModalProps,
  Skeleton,
  Stack,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { Trans, t } from '@lingui/macro'
import { useAccount, useBalance } from 'wagmi'
import { StepIcon } from '../components/StepIcon'
import { TokenIcon } from '../components/TokenIcon'
import { BaseModal } from './BaseModal'
import { usePoolInfo } from '../hooks/usePoolInfo'
import dayjs from 'dayjs'
import { formatNumber } from '../helpers/formatNumber'
import { useState } from 'react'
import { usePoolStore } from '../store/poolStore'

interface Props extends ModalProps {}

export function StakeModal(props: Props) {
  const account = useAccount()
  const { data: pool } = usePoolInfo()
  const { maskTokenAddress } = usePoolStore()
  const [amount, setAmount] = useState('')
  const balance = useBalance({
    address: account.address,
    token: maskTokenAddress,
  })
  return (
    <BaseModal title={t`Stake`} width={572} height={521} {...props}>
      <Box as="form" display="flex" flexDir="column" className="stake-form" flexGrow={1}>
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
              >{t`Connect Wallet`}</Button>
            )}
          </ListItem>
          <ListItem display="flex">
            <StepIcon width={6} height={6} step={2} />
            <Text as="span" ml={3} fontSize={14} fontWeight="bold" color="neutrals.1" minW="130px">{t`Link 𝕏`}</Text>
            <Button
              className="purple-gradient-button"
              ml="auto"
              size="sm"
              minW="130px"
              rounded={24}
              _hover={{ bg: 'gradient.purple' }}
            >
              𝕏
            </Button>
          </ListItem>
        </List>
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
              placeholder={t`Stake Amount`}
              border="none"
              outline="none"
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
                      <Skeleton ml={2} display="inline-block" height="16px" width="20px" />
                    ) : (
                      balance.data?.value.toLocaleString()
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
              <Link href="/">More</Link>
            </Trans>
          </Text>
        </VStack>
        <Button w="100%" className="purple-gradient-button" rounded={50} mt="10px">{t`Please connect first`}</Button>
      </Box>
    </BaseModal>
  )
}
