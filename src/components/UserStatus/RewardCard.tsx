import { Box, Button, HStack, Image, Stack, Text } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { ActionCard, ActionCardProps } from './ActionCard'

import { mainnet } from 'viem/chains'

interface Props extends ActionCardProps {}
console.log({ mainnet })

export function RewardCard(props: Props) {
  return (
    <ActionCard display="flex" flexDir="column" {...props}>
      <Stack alignItems="center" flexGrow={1}>
        <HStack alignItems="center" my="auto" flexGrow={1}>
          <Box width={12} height={12} pos="relative">
            <Image
              src={new URL('../../assets/mask-logo.svg', import.meta.url).href}
              rounded="50%"
              width={12}
              height={12}
            />
            <Image
              src={new URL('../../assets/mask-logo.svg', import.meta.url).href}
              rounded="50%"
              pos="absolute"
              right={-1}
              bottom={0}
              width={4}
              height={4}
              border="1px solid"
              borderColor="neutrals.6"
            />
          </Box>
          <Stack ml="10px">
            <Text fontSize={24} fontWeight={700} lineHeight="24px">
              70000.00
            </Text>
            <Text fontSize={16} fontWeight={700} lineHeight="16px">
              RSS3
            </Text>
          </Stack>
        </HStack>
        <Button
          rounded={24}
          alignSelf="stretch"
          color="neutrals.9"
          bg="gradient.purple"
          _hover={{ bg: 'gradient.purple', transform: 'scale(1.01)' }}
          _active={{ transform: 'scale(0.9)' }}
        >
          {t`Claim`}
        </Button>
      </Stack>
    </ActionCard>
  )
}