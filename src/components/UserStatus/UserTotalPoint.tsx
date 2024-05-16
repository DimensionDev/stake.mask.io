import { Image, VStack, Text, Box, StackProps } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { UserInfo } from '../../types/api'
import { TextOverflowTooltip } from '../TextOverflowTooltip'

interface Props extends StackProps {
  user: UserInfo
}

export function UserTotalPoints({ user, ...props }: Props) {
  return (
    <VStack overflow="hidden" {...props}>
      <Box flexDir="row" w="100%" pl="100px" pos="relative">
        <Image
          position="absolute"
          left={0}
          width={100}
          height={100}
          border="2px solid"
          borderColor="gradient.purple"
          borderRadius="50%"
          objectFit="cover"
          draggable={false}
          userSelect="none"
          src={user.twitter_image}
          fallbackSrc={new URL('../../assets/default-avatar.svg', import.meta.url).href}
          alt="user name"
        />
        <TextOverflowTooltip label={user.twitter_display_name} hasArrow placement="top">
          <Text
            fontSize="xx-large"
            textAlign="right"
            fontWeight="bold"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
          >
            {user.twitter_display_name || 'N/A'}
          </Text>
        </TextOverflowTooltip>
      </Box>
      <Box
        w="100%"
        h="132px"
        mt="14px"
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
