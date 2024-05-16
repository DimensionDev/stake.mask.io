import { Box, BoxProps, Button, HStack, Icon, Stack } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { ActionCard } from './ActionCard'

import { useAccount, useReadContract } from 'wagmi'
import { StakeManagerABI } from '../../abis/stakeManager.ts'
import MaskLogo from '../../assets/mask-logo.svg?react'
import Question from '../../assets/question.svg?react'
import { formatNumber } from '../../helpers/formatNumber.ts'
import { useUserInfo } from '../../hooks/useUserInfo.ts'
import { ProgressiveText } from '../ProgressiveText.tsx'
import { Tooltip } from '../Tooltip.tsx'
import { stakeModal } from '../../modals/index.tsx'

export function StakedMask(props: BoxProps) {
  const account = useAccount()
  const { data: userInfo, isLoading: loadingUserInfo } = useUserInfo()
  const { isLoading, data: chainData } = useReadContract({
    abi: StakeManagerABI,
    functionName: 'userInfos',
    address: import.meta.env.STAKE_MANAGER_CONTRACT_ADDRESS,
    args: account.address ? [account.address] : undefined,
  })
  return (
    <ActionCard title={t`Stake Mask`} {...props}>
      <Stack alignItems="center">
        <ProgressiveText
          loading={isLoading && loadingUserInfo}
          fontSize={48}
          lineHeight="56px"
          fontWeight={700}
          skeletonWidth="100px"
          skeletonHeight="56px"
        >
          {chainData ? chainData[0].toLocaleString() : formatNumber(userInfo?.amount)}
        </ProgressiveText>
        <HStack alignItems="center" my="auto">
          <ProgressiveText
            loading={loadingUserInfo}
            skeletonWidth="50px"
          >{t`+${userInfo?.score_per_hour} Points/h`}</ProgressiveText>
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
