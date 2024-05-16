import { Box, BoxProps, Button, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { ActionCard } from './ActionCard'
import { t } from '@lingui/macro'

import MaskLogo from '../../assets/mask-logo.svg?react'
import Question from '../../assets/question.svg?react'
import { Tooltip } from '../Tooltip.tsx'

export function StakedMask(props: BoxProps) {
  return (
    <ActionCard title={t`Stake Mask`} {...props}>
      <Stack alignItems="center">
        <Text fontSize={48} lineHeight="56px" fontWeight={700}>
          2.343
        </Text>
        <HStack alignItems="center" my="auto">
          <Text>2.343</Text>
          <Tooltip label={t`1 staked MASK will generate 1 point per hour.`} placement="top" hasArrow>
            <Box as="span" w={6} h={6}>
              <Icon as={Question} w="initial" h="initial" />
            </Box>
          </Tooltip>
        </HStack>
        <Button
          rounded={24}
          mt="auto"
          alignSelf="stretch"
          bg="gradient.purple"
          color="neutrals.9"
          _hover={{ bg: 'gradient.purple', transform: 'scale(1.01)' }}
          _active={{ transform: 'scale(0.9)' }}
          leftIcon={<Icon as={MaskLogo} width={6} height={6} />}
        >
          {t`Stake Mask`}
        </Button>
      </Stack>
    </ActionCard>
  )
}
