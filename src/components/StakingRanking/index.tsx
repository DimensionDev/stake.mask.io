import { FC } from 'react'
import { Box, Flex, Heading, VStack, Image } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { RankingAvatar } from './RankingAvatar.tsx'
import LeftGlowImage from '../../assets/left-glow.webp'
import RightGlowImage from '../../assets/right-glow.webp'

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
        <Flex w="100%" wrap="wrap" justify="center" gap="64px">
          <RankingAvatar src="" name="Jaydon Saris" tag="20.09K PTS" size={80} isCrown mx="auto" />
          <Flex justify="center" w="100%" gap="64px">
            <RankingAvatar src="" name="Jaydon Saris" tag="20.09K PTS" size={64} />
            <RankingAvatar src="" name="Jaydon Saris" tag="20.09K PTS" size={64} />
          </Flex>
          {Array.from(new Array(26), (_, i) => {
            return <RankingAvatar key={i} src="" name="Jaydon Saris" tag="20.09K PTS" size={64} />
          })}
        </Flex>
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
