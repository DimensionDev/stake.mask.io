import { FC } from 'react'
import { AspectRatio, Box, Flex, Heading, VStack } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { RankingAvatar } from './RankingAvatar.tsx'

export const StakingRanking: FC = () => {
  return (
    <Box
      w="100%"
      maxW="maxW"
      pos="relative"
      border="1px solid"
      borderColor="neutrals.6"
      rounded="16px"
    >
      <AspectRatio
        ratio={610 / 482}
        w="50%"
        minW="610px"
        bg="gradient.leftAngular"
        filter="blur(35px)"
        pos="absolute"
        top="0"
        left="0"
        transform="translate3d(0, 0, 0)"
      >
        <div />
      </AspectRatio>
      <AspectRatio
        ratio={280 / 400}
        w="22%"
        minW="280px"
        bg="gradient.rightAngular"
        filter="blur(20px)"
        pos="absolute"
        top="0"
        right="0"
        transform="translate3d(0, 0, 0)"
      >
        <div />
      </AspectRatio>
      <VStack
        spacing="64px"
        py={4}
        px={6}
        w="100%"
        overflow="hidden"
        h="698px"
        pos="relative"
      >
        <Heading
          fontSize="24px"
          fontWeight={700}
          lineHeight="32px"
          w="100%"
          color="neutrals.2"
        >
          {t`Staking Ranking`}
        </Heading>
        <Flex w="100%" wrap="wrap" justify="center" gap="64px">
          <RankingAvatar
            src=""
            name="Jaydon Saris"
            tag="20.09K PTS"
            size={80}
            isCrown
            mx="auto"
          />
          <Flex justify="center" w="100%" gap="64px">
            <RankingAvatar
              src=""
              name="Jaydon Saris"
              tag="20.09K PTS"
              size={64}
            />
            <RankingAvatar
              src=""
              name="Jaydon Saris"
              tag="20.09K PTS"
              size={64}
            />
          </Flex>
          {Array.from(new Array(26), (_, i) => {
            return (
              <RankingAvatar
                key={i}
                src=""
                name="Jaydon Saris"
                tag="20.09K PTS"
                size={64}
              />
            )
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
