import {
  Box,
  BoxProps,
  Button,
  Flex,
  Grid,
  HStack,
  Heading,
  Icon,
  Skeleton,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Trans, t } from '@lingui/macro'
import { FC } from 'react'
import MaskLogoSVG from '../../assets/mask-logo.svg?react'
import No1SVG from '../../assets/no-1.svg?react'
import PlusSVG from '../../assets/plus.svg?react'
import QuestionSVG from '../../assets/question.svg?react'
import RightArrow from '../../assets/right-arrow.svg?react'
import Rss3EthSVG from '../../assets/rss3-eth.svg?react'
import TonEthSVG from '../../assets/ton-eth.svg?react'
import { formatNumber } from '../../helpers/formatNumber.ts'
import { formatSeconds } from '../../helpers/formatSeconds.ts'
import { usePoolInfo } from '../../hooks/usePoolInfo.ts'
import { stakeModal } from '../../modals/index.tsx'
import { ActivityStatusTag } from './ActivityStatusTag.tsx'
import { Tooltip } from '../Tooltip.tsx'

export interface StakeMaskStatusCardProps extends BoxProps {}

export const StakeMaskStatusCard: FC<StakeMaskStatusCardProps> = ({ ...props }) => {
  const { data: pool, isLoading } = usePoolInfo()
  const rewardTokens = pool ? Object.values(pool.reward_pool) : []
  const rss3 = rewardTokens.find((x) => x.name === 'rss3')
  const ton = rewardTokens.find((x) => x.name === 'ton')
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
            {t`Stake Mask`}
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
            <Trans>
              Time
              {isLoading || !pool ? (
                <Skeleton width="100px" height="16px" ml={1} />
              ) : (
                `${formatSeconds(pool?.start_time, 'M.DD YYYY')}~${formatSeconds(pool.end_time, 'M.DD YYYY')}`
              )}
            </Trans>
            <Tooltip label={t`Staked MASK can be unstake after the campaign ends.`} placement="top" hasArrow>
              <Box as="span" w="6" h="6" ml="10px">
                <Icon as={QuestionSVG} w="initial" h="initial" />
              </Box>
            </Tooltip>
          </Flex>
        </Flex>
        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }}
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
          >
            <Stack
              flexDirection={{ base: 'column', md: 'row' }}
              spacing={3}
              align="center"
              h={{ base: 'auto', md: '56px' }}
            >
              <HStack spacing={1}>
                <Icon as={Rss3EthSVG} w="12" h="12" />
                <VStack spacing={0} color="neutrals.8" align="start">
                  {rss3 ? (
                    <Box fontSize="24px" lineHeight="32px" fontWeight={700}>
                      {formatNumber(+rss3.amount)}
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
                <Icon as={TonEthSVG} w="12" h="12" />
                <VStack spacing={0} color="neutrals.8" align="start">
                  {ton ? (
                    <Box fontSize="24px" lineHeight="32px" fontWeight={700}>
                      {formatNumber(+ton.amount)}
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
            p={6}
            spacing={6}
          >
            {pool?.apr ? (
              <Tooltip label={`${formatNumber(+pool.apr * 100, 18)}%`} hasArrow placement="top">
                <Box
                  h="56px"
                  fontSize="32px"
                  lineHeight="56px"
                  fontWeight={600}
                  color="neutrals.8"
                  letterSpacing="-0.32px"
                >
                  {formatNumber(+pool.apr * 110, 2)}%
                </Box>
              </Tooltip>
            ) : (
              <Skeleton h="56px" width="100px" fontSize="32px"></Skeleton>
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
            p={6}
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
              {pool?.amount ? (
                <Tooltip label={formatNumber(+pool.amount)} hasArrow placement="top">
                  <Text>{formatNumber(+pool.amount)}</Text>
                </Tooltip>
              ) : (
                <Skeleton height="32px" width="100px" />
              )}
              <Icon as={MaskLogoSVG} w="9" h="9" ml="1" />
            </Flex>
            <Box fontSize="16px" fontWeight={700} lineHeight="150%" color="neutrals.6">
              {t`Total MASK Staked`}
            </Box>
          </VStack>
        </Grid>
        <Text fontSize="14px" lineHeight="22px" fontWeight={700} color="neutrals.9">
          {t`This is the first phase of the MASK staking event. You will be able to retrieve your staked Mask tokens and reward tokens only after the event concludes.`}
        </Text>
        <Box display="flex" justifyContent="center" width="100%">
          <Button
            bg="neutrals.9"
            width="auto"
            flexGrow={0}
            _hover={{ transform: 'scale(1.01)' }}
            _active={{ transform: 'scale(0.9)' }}
            rounded={24}
            leftIcon={<Icon as={MaskLogoSVG} width={6} height={6} />}
            rightIcon={<Icon as={RightArrow} width={6} height={6} />}
            onClick={() => {
              stakeModal.show()
            }}
          >
            {t`Stake Mask Now`}
          </Button>
        </Box>
      </VStack>
    </Box>
  )
}
