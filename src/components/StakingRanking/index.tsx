import { FC } from 'react'
import { Box, Flex, Heading, VStack, Image, Center, Icon } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { RankingAvatar, RankingAvatarProps } from './RankingAvatar.tsx'
import LeftGlowImage from '../../assets/left-glow.webp'
import RightGlowImage from '../../assets/right-glow.webp'
import FileSVG from '../../assets/file.svg?react'
import { usePoolStore } from '../../store/poolStore.ts'
import { useQuery } from '@tanstack/react-query'
import urlcat from 'urlcat'
import { FIREFLY_API_ROOT } from '../../constants/api.ts'
import { fetchJSON } from '../../helpers/fetchJSON.ts'
import { StakeRankItem, StakeRankResponse } from '../../types/api.ts'
import { Spinner } from '../Spinner.tsx'

export const RankingItem: FC<{ item: StakeRankItem } & Omit<RankingAvatarProps, 'tag' | 'name' | 'src'>> = ({
  item,
  ...props
}) => {
  return (
    <RankingAvatar
      src={item.twitter_image}
      name={item.twitter_name}
      tag={`${item.score} PTS`}
      boxSize="64px"
      {...props}
    />
  )
}

export const StakingRankingList: FC = () => {
  const poolStore = usePoolStore()
  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: [poolStore.poolId],
    async queryFn() {
      const url = urlcat(FIREFLY_API_ROOT, '/v1/mask_stake/rank', {
        limit: 30,
      })
      const response = await fetchJSON<StakeRankResponse>(url)
      return response.data.list
    },
    enabled: !!poolStore.poolId,
  })

  if (isLoading) {
    return (
      <Center w="100%" h="100%" flexDirection="column" color="neutrals.3">
        <Spinner boxSize={6} />
        <Box fontSize="12px" fontWeight={400} lineHeight="150%" mt={2}>{t`Loading`}</Box>
      </Center>
    )
  }

  if (error || data.length <= 0) {
    return (
      <Center w="100%" h="100%" flexDirection="column" color="neutrals.3">
        <Icon as={FileSVG} boxSize={6} />
        <Box
          fontSize="12px"
          fontWeight={400}
          lineHeight="150%"
          mt={2}
        >{t`No users have participated in staking yet.`}</Box>
      </Center>
    )
  }

  const topScorer = data[0]
  const secondScorer = data[1]
  const thirdTopScorer = data[2]
  const otherScorers = data.slice(3)

  return (
    <Flex w="100%" wrap="wrap" justify="center" gap="64px">
      <RankingItem boxSize="80px" isCrown item={topScorer} mx="auto" />
      {secondScorer && thirdTopScorer ? (
        <Flex justify="center" w="100%" gap="64px" h="64px">
          {secondScorer ? <RankingItem item={secondScorer} /> : null}
          {thirdTopScorer ? <RankingItem item={thirdTopScorer} /> : null}
        </Flex>
      ) : null}
      {otherScorers.map((scorer) => {
        return <RankingItem item={scorer} key={scorer.address} />
      })}
    </Flex>
  )
}

export const StakingRanking: FC = () => {
  return (
    <Box w="100%" maxW="maxW" pos="relative" border="1px solid" borderColor="neutrals.6" rounded="16px">
      <Image
        src={LeftGlowImage}
        w="610px"
        minW="610px"
        h="482px"
        objectFit="contain"
        top="0"
        left="0"
        pos="absolute"
        transform="translateX(-16%) translateY(-16%) scale(1.3)"
        transformOrigin="left top"
        draggable={false}
        userSelect="none"
        pointerEvents="none"
      />
      <Image
        src={RightGlowImage}
        w="280px"
        minW="280px"
        h="398px"
        objectFit="contain"
        top="0"
        right="0"
        pos="absolute"
        transform="translateX(-15%) translateY(-15%) scale(1.3)"
        transformOrigin="left top"
        draggable={false}
        userSelect="none"
        pointerEvents="none"
      />
      <VStack spacing="64px" py={4} px={6} w="100%" overflow="hidden" h="698px" pos="relative">
        <Heading fontSize="24px" fontWeight={700} lineHeight="32px" w="100%" color="neutrals.2">
          {t`Staking Ranking`}
        </Heading>
        <StakingRankingList />
        <Box
          w="100%"
          h="127px"
          bg="linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))"
          pos="absolute"
          bottom="0"
          left="0"
          roundedBottom="16px"
        />
      </VStack>
    </Box>
  )
}
