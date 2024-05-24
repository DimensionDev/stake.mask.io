import { Button, ButtonProps, Icon, ScaleFade } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { useQuery } from '@tanstack/react-query'
import { memo, PropsWithChildren } from 'react'
import urlcat from 'urlcat'
import { useAccount } from 'wagmi'

import QuestionSVG from '@/assets/question.svg?react'
import { Tooltip } from '@/components/Tooltip'
import { FIREFLY_API_ROOT } from '@/constants/api'
import { fetchJSON } from '@/helpers/fetchJSON'
import { AddressSecurityResponse } from '@/types/api'

interface BoundaryProps extends PropsWithChildren {
  buttonProps?: ButtonProps
}

export const RegionBoundary = memo(function RegionBoundary({ children }: BoundaryProps) {
  const account = useAccount()

  const enabled = !!account.address && !!account.chainId
  const { data: isBlocked } = useQuery({
    queryKey: ['user-region'],
    enabled,
    queryFn: () => {
      const url = urlcat(FIREFLY_API_ROOT, '/v1/mask_stake/address_security')
      return fetchJSON<AddressSecurityResponse>(url)
    },
    select: (data) => data.data.is_black_ip === '1',
  })

  if (isBlocked) {
    return (
      <ScaleFade in initialScale={0.5} key="region-button">
        <Button
          w="100%"
          rounded={50}
          isDisabled
          className="purple-gradient-button"
          rightIcon={
            <Tooltip
              closeDelay={2000}
              label={t`Staking is not available in restricted countries, including the US, Canada, China, Iran, North Korea, the Syrian Arab Republic, Netherlands, Crimea, Malaysia, Bangladesh, Bolivia and Cuba.`}
              shouldWrapChildren
            >
              <Icon as={QuestionSVG} w="initial" h="initial" />
            </Tooltip>
          }
        >
          {t`Sorry, you are in a restricted region`}
        </Button>
      </ScaleFade>
    )
  }

  return <>{children}</>
})
