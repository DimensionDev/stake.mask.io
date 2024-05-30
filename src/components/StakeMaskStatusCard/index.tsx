import {
  Box,
  BoxProps,
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Skeleton,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { ComponentType, useEffect } from 'react'
import { useAccount } from 'wagmi'

import MaskLogoSVG from '@/assets/mask-logo.svg?react'
import No1SVG from '@/assets/no-1.svg?react'
import PlusSVG from '@/assets/plus.svg?react'
import QuestionSVG from '@/assets/question.svg?react'
import RightArrow from '@/assets/right-arrow.svg?react'
import { ActivityStatusTag } from '@/components/StakeMaskStatusCard/ActivityStatusTag.tsx'
import { TokenIcon } from '@/components/TokenIcon'
import { Tooltip } from '@/components/Tooltip.tsx'
import { formatMarketCap } from '@/helpers/formatMarketCap.ts'
import { formatNumber } from '@/helpers/formatNumber.ts'
import { formatSeconds } from '@/helpers/formatSeconds.ts'
import { usePoolInfo } from '@/hooks/usePoolInfo.ts'
import { usePoolState } from '@/hooks/usePoolState.ts'
import { stakeModal } from '@/modals/StakeModal.tsx'

export interface StakeMaskStatusCardProps extends BoxProps {}

export const StakeMaskStatusCard: ComponentType<StakeMaskStatusCardProps> = ({ ...props }) => {
  const account = useAccount()
  const { data: pool, isLoading } = usePoolInfo()
  const rewardTokens = pool ? Object.values(pool.reward_pool) : []
  const rss3 = rewardTokens.find((x) => x.name === 'rss3')
  const ton = rewardTokens.find((x) => x.name === 'ton')
  const { openConnectModal } = useConnectModal()

  const { isEnded } = usePoolState(pool)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const stake = params.get('stake')
    if (!stake) return
    const abort = new AbortController()
    stakeModal.show(undefined, abort.signal)
    history.replaceState(history.state, '', '/')
    return () => {
      abort.abort()
    }
  }, [])

  return (
    <Box
      maxW="maxW"
      w="100%"
      pos="relative"
      _before={{
        content: "' '",
        display: 'block',
        pos: 'absolute',
        bottom: '0',
        left: '0',
        w: '100%',
        h: '52px',
        clipPath: 'polygon(100% 0,98% 100%, 2% 100%, 0 0)',
        bg: 'linear-gradient(0deg, rgba(185, 174, 251, 0.00) 0%, rgba(166, 151, 255, 0.83) 65%)',
        transform: 'translateY(65%)',
      }}
      {...props}
    >
      <VStack spacing={6} p={6} bg="gradient.purple" w="full" rounded="24px" align="start" pos="relative" zIndex={1}>
        <ActivityStatusTag pos="absolute" top={{ base: 2, md: 6 }} right={{ base: 2, md: 6 }} />
        <Flex direction={{ lg: 'row', base: 'column' }} justify="space-between" w="full">
          <Heading
            fontSize={{ base: '32px', md: '48px' }}
            fontWeight={700}
            lineHeight={{ base: '40px', md: '56px' }}
            letterSpacing={{ base: '-0.32px', md: '-0.96px' }}
            color="neutrals.9"
            pos="relative"
            pr="52px"
            mr="auto"
          >
            {t`Stake MASK`}
            <Icon
              w="42px"
              h="22px"
              as={No1SVG}
              pos="absolute"
              top={{ base: 'unset', md: 0 }}
              bottom={{ md: 'unset', base: 0 }}
              right="0"
            />
          </Heading>
          <Flex
            mt={{ base: '10px', lg: 'auto' }}
            color="black"
            fontSize={{ base: '16px', md: '20px' }}
            fontWeight={700}
            lineHeight={{ base: 6, lg: '140%' }}
            align="center"
          >
            <Center mr="10px">
              <Trans>
                Time{' '}
                {isLoading || !pool ? (
                  <Skeleton width="100px" height="16px" ml={1} />
                ) : (
                  `${formatSeconds(pool?.start_time, 'M.DD YYYY')}~${formatSeconds(pool.end_time, 'M.DD YYYY')}`
                )}
              </Trans>
            </Center>
            <Tooltip
              label={t`Staked MASK can be unstake after the campaign ends.`}
              placement="top"
              hasArrow
              shouldWrapChildren
            >
              <Center as="span" w="6" h="6" cursor="pointer">
                <Icon as={QuestionSVG} w="initial" h="initial" />
              </Center>
            </Tooltip>
          </Flex>
        </Flex>
        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
          gap={6}
          w="100%"
          px={{ base: 0, lg: 6 }}
          color="neutrals.8"
        >
          <VStack
            className="gradient-border card"
            bg="rgba(255, 255, 255, 0.1)"
            h={{ base: 'auto', md: '152px' }}
            shadow="card"
            backdropFilter="blur(10px)"
            p={6}
            spacing={6}
            gridColumn={{ base: '1/2', md: '1/3', lg: '1/2' }}
            minW={{ base: 'none', md: 'none', lg: '404px' }}
          >
            <Stack
              flexDirection={{ base: 'column', md: 'row' }}
              spacing={3}
              align="center"
              h={{ base: 'auto', md: '56px' }}
            >
              <HStack spacing={1}>
                <TokenIcon src={new URL('../../assets/rss3.svg', import.meta.url).href} />
                <VStack spacing={0} color="neutrals.8" align="start">
                  {rss3 ? (
                    <Box fontSize="24px" lineHeight="32px" fontWeight={700}>
                      {formatNumber(+rss3.amount, 0)}
                    </Box>
                  ) : (
                    <Skeleton height="24px" width="80px" my="4px" />
                  )}
                  <Box fontSize="16px" lineHeight="24px" fontWeight={700}>
                    RSS3
                  </Box>
                </VStack>
              </HStack>
              <Icon as={PlusSVG} w="6" h="6" />
              <HStack spacing={1}>
                <TokenIcon src={new URL('../../assets/ton.svg', import.meta.url).href} />
                <VStack spacing={0} color="neutrals.8" align="start">
                  {ton ? (
                    <Box fontSize="24px" lineHeight="32px" fontWeight={700}>
                      {formatNumber(+ton.amount, 0)}
                    </Box>
                  ) : (
                    <Skeleton height="24px" width="80px" my="4px" />
                  )}

                  <Box fontSize="16px" lineHeight="24px" fontWeight={700}>
                    TON
                  </Box>
                </VStack>
              </HStack>
            </Stack>
            <Box fontSize="16px" fontWeight={700} lineHeight="150%" color="neutrals.6">
              {t`Total Rewards`}
            </Box>
          </VStack>
          <VStack
            className="gradient-border card"
            bg="rgba(255, 255, 255, 0.1)"
            h="152px"
            shadow="card"
            backdropFilter="blur(10px)"
            py={6}
            spacing={6}
          >
            {pool?.apr !== undefined ? (
              <Tooltip label={`${formatNumber(pool.apr, 18)}%`} hasArrow placement="top" shouldWrapChildren>
                <Box
                  h="56px"
                  fontSize="32px"
                  lineHeight="56px"
                  fontWeight={600}
                  color="neutrals.8"
                  letterSpacing="-0.32px"
                >
                  {pool.apr > 10000 ? '>10,000%' : `${formatNumber(Math.min(pool.apr, 10000), 2)}%`}
                </Box>
              </Tooltip>
            ) : (
              <Skeleton h="32px" my="12px" width="100px" fontSize="32px" />
            )}
            <Box fontSize="16px" fontWeight={700} lineHeight="150%" color="neutrals.6">
              {t`APR`}
            </Box>
          </VStack>
          <VStack
            className="gradient-border card"
            bg="rgba(255, 255, 255, 0.1)"
            h="152px"
            shadow="card"
            backdropFilter="blur(10px)"
            py={6}
            spacing={6}
          >
            <Flex
              align="center"
              h="56px"
              fontSize="32px"
              lineHeight="56px"
              fontWeight={600}
              color="neutrals.8"
              letterSpacing="-0.32px"
            >
              {pool?.amount !== undefined ? (
                <Tooltip label={formatNumber(+pool.amount)} hasArrow placement="top" shouldWrapChildren>
                  <Text>{formatMarketCap(+pool.amount)}</Text>
                </Tooltip>
              ) : (
                <Skeleton height="32px" width="100px" />
              )}
              <Icon as={MaskLogoSVG} w="9" h="9" ml="1" />
            </Flex>
            <Box fontSize="16px" fontWeight={700} lineHeight="150%" color="neutrals.6" whiteSpace="nowrap">
              {t`Total MASK Staked`}
            </Box>
          </VStack>
        </Grid>
        <Text fontSize="14px" lineHeight="22px" fontWeight={700} color="neutrals.9">
          {t`This is the first phase of the MASK staking event. You will be able to retrieve your staked MASK tokens and reward tokens only after the event concludes.`}
        </Text>
        <Box display="flex" justifyContent="center" width="100%">
          <Button
            bg="neutrals.9"
            width="auto"
            flexGrow={0}
            isDisabled={isEnded}
            _hover={{ transform: 'scale(1.01)' }}
            _active={{ transform: 'scale(0.9)' }}
            rounded={24}
            leftIcon={<Icon as={MaskLogoSVG} width={6} height={6} />}
            rightIcon={<Icon as={RightArrow} width={6} height={6} />}
            onClick={() => {
              if (!account.isConnected) {
                openConnectModal?.()
                return
              }
              stakeModal.show()
            }}
          >
            {account.isConnected ? t`Stake MASK Now` : t`Connect to stake`}
          </Button>
        </Box>
      </VStack>
    </Box>
  )
}
