import { Box, Flex, StackProps, Text, VStack } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { profileModal } from '../../modals/ProfileModal'
import { UserInfo } from '../../types/api'
import { TextOverflowTooltip } from '../TextOverflowTooltip'
import { Tooltip } from '../Tooltip'
import { TwitterAvatar } from '../TwitterAvatar'
import { formatMarketCap } from '../../helpers/formatMarketCap.ts'
import { useAccount } from 'wagmi'
import { formatEthereumAddress } from '../../helpers/formatEthereumAddress.ts'

interface Props extends StackProps {
  user: UserInfo
}

export function UserTotalPoints({ user, ...props }: Props) {
  const account = useAccount()
  return (
    <VStack overflow="hidden" {...props}>
      <Flex flexDir="row" w="100%" pl="100px" pos="relative">
        <TwitterAvatar
          size={100}
          pos="absolute"
          cursor="pointer"
          left={0}
          src={user.twitter_image}
          omitBadge
          onClick={() => {
            if (!user.twitter_id) return
            profileModal.show()
          }}
        />
        <TextOverflowTooltip
          label={user.twitter_id ? user.twitter_display_name : account.address}
          hasArrow
          placement="top"
        >
          <Text
            ml="auto"
            fontSize="xx-large"
            textAlign="right"
            fontWeight="bold"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
            cursor="pointer"
            onClick={() => {
              if (!user.twitter_id) return
              profileModal.show()
            }}
          >
            {user.twitter_id ? user.twitter_display_name || 'N/A' : formatEthereumAddress(account.address!, 4)}
          </Text>
        </TextOverflowTooltip>
      </Flex>
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
        <Tooltip label={user.realtime_score}>
          <Text as="span" mt="auto" ml="auto">
            {formatMarketCap(user.realtime_score)}
          </Text>
        </Tooltip>
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
