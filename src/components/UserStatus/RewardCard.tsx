import { Box, Button, HStack, Stack } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { ActionCard, ActionCardProps } from './ActionCard'

import { formatNumber } from '../../helpers/formatNumber'
import { PoolInfo } from '../../types/api'
import { ProgressiveText } from '../ProgressiveText'
import { TokenIcon } from '../TokenIcon'

interface Props extends ActionCardProps {
  reward?: PoolInfo['reward_pool'][string]
}

export function RewardCard({ reward, ...props }: Props) {
  return (
    <ActionCard display="flex" flexDir="column" {...props}>
      <Stack alignItems="center" flexGrow={1}>
        <HStack alignItems="center" my="auto" flexGrow={1}>
          <Box width={12} height={12} pos="relative">
            <TokenIcon />
          </Box>
          <Stack ml="10px">
            <ProgressiveText
              loading={!reward}
              fontSize={24}
              fontWeight={700}
              lineHeight="24px"
              skeletonHeight="24px"
              skeletonWidth="50px"
            >
              {formatNumber(reward?.amount ? +reward.amount : 0)}
            </ProgressiveText>
            <ProgressiveText
              fontSize={16}
              loading={!reward}
              fontWeight={700}
              lineHeight="16px"
              textTransform="uppercase"
              skeletonWidth="30px"
            >
              {reward?.name}
            </ProgressiveText>
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
