import { Box, BoxProps, Button, HStack, Icon, Stack } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { ActionCard } from './ActionCard'

import { useMemo } from 'react'
import { formatUnits } from 'viem'
import { useAccount, useReadContract } from 'wagmi'
import { StakeManagerABI } from '../../abis/stakeManager.ts'
import MaskLogo from '../../assets/mask-logo.svg?react'
import Question from '../../assets/question.svg?react'
import { useUserInfo } from '../../hooks/useUserInfo.ts'
import { usePoolStore } from '../../store/poolStore.ts'
import { ProgressiveText } from '../ProgressiveText.tsx'
import { Tooltip } from '../Tooltip.tsx'
import { stakeModal } from '../../modals/StakeModal.tsx'

export function StakedMask(props: BoxProps) {
  const account = useAccount()
  const { stakeManagerAddress } = usePoolStore()
  const { data: userInfo, isLoading: loadingUserInfo } = useUserInfo()
  const { isLoading, data: chainData } = useReadContract({
    abi: StakeManagerABI,
    functionName: 'userInfos',
    address: stakeManagerAddress,
    args: account.address ? [account.address] : undefined,
  })

  const staked = useMemo(() => {
    if (chainData) {
      return formatUnits(chainData[0], 18)
    }
    return userInfo?.amount
  }, [chainData, userInfo?.amount])
  return (
    <ActionCard title={t`Stake Mask`} display="flex" flexDir="column" {...props}>
      <Stack alignItems="center">
        <ProgressiveText
          loading={isLoading && loadingUserInfo}
          fontSize={48}
          lineHeight="56px"
          fontWeight={700}
          skeletonWidth="100px"
          skeletonHeight="56px"
        >
          {staked}
        </ProgressiveText>
        <HStack alignItems="center" my="auto">
          <ProgressiveText as="div" loading={loadingUserInfo} skeletonWidth="50px">
            {t`+${userInfo?.score_per_hour} Points/h`}
          </ProgressiveText>
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
          onClick={() => {
            stakeModal.show()
          }}
        >
          {t`Stake Mask`}
        </Button>
      </Stack>
    </ActionCard>
  )
}
