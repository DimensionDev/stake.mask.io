import { Image, VStack, Text, Box, StackProps } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { UserInfo } from '../../types/api'

interface Props extends StackProps {
  user: UserInfo
}

export function UserTotalPoints({ user, ...props }: Props) {
  return (
    <VStack {...props}>
      <Box flexDir="row" w="100%">
        <Image
          position="absolute"
          width={100}
          height={100}
          borderRadius="50%"
          src={
            user.twitter_image ||
            new URL('../../assets/default-avatar.svg', import.meta.url).href
          }
          alt="user name"
        />
        <Text fontSize="xx-large" textAlign="right" fontWeight="bold">
          {user.twitter_display_name || 'N/A'}
        </Text>
      </Box>
      <Box
        w="100%"
        h="120px"
        boxSizing="border-box"
        flexDir="column"
        rounded={16}
        p={4}
        fontSize="xx-large"
        fontWeight="bold"
        bg="linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%), linear-gradient(261deg, #D0D0FF 3.1%, #A996F7 33.87%, #7280FE 54.26%, #D3D6FE 104.35%)"
        textAlign="right"
      >
        <Text mt="auto" ml="auto">
          {user.realtime_amount}
        </Text>
        <Text
          textTransform="uppercase"
          mt={1}
          fontWeight="400"
          fontSize="md"
          color="white"
          opacity={0.5}
        >{t`Total points`}</Text>
      </Box>
    </VStack>
  )
}
