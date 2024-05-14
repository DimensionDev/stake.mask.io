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
import { Nav } from '../components/Nav'
import { StakeMaskStatusCard } from '../components/StakeMaskStatusCard'

function Index() {
  return (
    <Flex direction="column" w="100%" pos="relative" align="center">
      <Nav pos="absolute" top={0} left={0} zIndex={1} />
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
      <Flex
        mt="-5vw"
        px="48px"
        pb="100px"
        direction="column"
        w="100%"
        align="center"
      >
        <VStack spacing={3} zIndex={1} textAlign="center">
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
        <StakeMaskStatusCard mt="96px" />
      </Flex>
    </Flex>
  )
}

export const Route = createFileRoute('/')({
  component: Index,
})
