import { createFileRoute } from '@tanstack/react-router'
import {
  AspectRatio,
  Flex,
  Heading,
  Image,
  VStack,
  Text,
} from '@chakra-ui/react'
import HomeTopImage from '../assets/home-top.webp'
import { StakeMaskStatusCard } from '../components/StakeMaskStatusCard'
import { UserStatus } from '../components/UserStatus'

function Index() {
  return (
    <Flex direction="column" w="100%" pos="relative" align="center">
      <AspectRatio ratio={1440 / 520} w="full">
        <Image
          src={HomeTopImage}
          w="100%"
          h="100%"
          objectFit="cover"
          userSelect="none"
          draggable={false}
        />
      </AspectRatio>
      <VStack
        mt="-5vw"
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
            Stake $MASK for Rewards
          </Heading>
          <Text
            bg="linear-gradient(90deg, rgba(255, 255, 255, 0.50) 0.43%, #FFF 46.33%, rgba(255, 255, 255, 0.50) 98.54%)"
            bgClip="text"
            color="transparent"
            fontSize="20px"
            lineHeight="150%"
            fontWeight="500"
          >
            This website is specifically created for Mask investors and
            believers, where you can stake $Mask to earn token rewards!
          </Text>
        </VStack>
        <StakeMaskStatusCard />
        <UserStatus />
      </VStack>
    </Flex>
  )
}

export const Route = createFileRoute('/')({
  component: Index,
})
