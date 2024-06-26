import { Flex, Heading, Text, VStack } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { createFileRoute } from '@tanstack/react-router'

import { HeaderImage } from '@/components/HeaderImage'
import { StakeMaskStatusCard } from '@/components/StakeMaskStatusCard'
import { StakingRanking } from '@/components/StakingRanking'
import { UserStatus } from '@/components/UserStatus'

function Index() {
  return (
    <Flex direction="column" w="100%" pos="relative" align="center">
      <HeaderImage />
      <VStack
        mt="-100px"
        px={{ base: '24px', xl: '48px' }}
        transition="200ms"
        pb="100px"
        direction="column"
        w="100%"
        align="center"
        spacing="96px"
      >
        <VStack spacing={3} zIndex={1} textAlign="center" maxW="maxW">
          <Heading
            fontSize="36px"
            fontWeight="600"
            lineHeight="150%"
            bg="linear-gradient(90deg, rgba(255, 255, 255, 0.50) 0.43%, #FFF 46.33%, rgba(255, 255, 255, 0.50) 98.54%)"
            bgClip="text"
            color="transparent"
          >
            {t`Stake $MASK for Rewards`}
          </Heading>
          <Text
            bg="linear-gradient(90deg, rgba(255, 255, 255, 0.50) 0.43%, #FFF 46.33%, rgba(255, 255, 255, 0.50) 98.54%)"
            bgClip="text"
            color="transparent"
            fontSize="20px"
            lineHeight="150%"
            fontWeight="500"
          >
            {t`This website is specifically created for $MASK investors and believers, where you can stake $MASK to earn token rewards!`}
          </Text>
        </VStack>
        <StakeMaskStatusCard />
        <UserStatus />
        <StakingRanking />
      </VStack>
    </Flex>
  )
}

export const Route = createFileRoute('/')({
  component: Index,
})
