import { FC } from 'react'
import { BoxProps, Heading, VStack } from '@chakra-ui/react'
import { t } from '@lingui/macro'

export interface StakeMaskStatusCardProps extends BoxProps {}

export const StakeMaskStatusCard: FC<StakeMaskStatusCardProps> = ({
  ...props
}) => {
  return (
    <VStack
      spacing={6}
      p={6}
      bg="gradient.purple"
      maxW="1244px"
      w="full"
      rounded="24px"
      {...props}
    >
      <Heading
        fontSize="48px"
        fontWeight={700}
        lineHeight="56px"
        letterSpacing="-0.96px"
      >
        {t`Stake Mask`}
      </Heading>
    </VStack>
  )
}
