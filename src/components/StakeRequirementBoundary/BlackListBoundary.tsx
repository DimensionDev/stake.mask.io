import { Button, ButtonProps, Icon, Link, ScaleFade, Text } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import { skipToken, useQuery } from '@tanstack/react-query'
import { omit } from 'lodash-es'
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
export const BlackListBoundary = memo(function BlackListBoundary({ children }: BoundaryProps) {
  const account = useAccount()

  const enabled = !!account.address && !!account.chainId
  const { data: inBlackList } = useQuery({
    queryKey: ['address-security', account.address, account.chainId],
    enabled,
    queryFn: enabled
      ? async () => {
          const url = urlcat(FIREFLY_API_ROOT, '/v1/mask_stake/address_security', {
            address: account.address,
            chain_id: account.chainId,
          })
          return fetchJSON<AddressSecurityResponse>(url)
        }
      : skipToken,
    select(data) {
      const values = Object.values(omit(data.data, ['contract_address', 'data_source', 'is_black_ip'])) as string[]
      return values.some((x) => +x)
    },
  })

  if (inBlackList) {
    return (
      <ScaleFade in initialScale={0.5} key="black-list-button">
        <Button
          w="100%"
          rounded={50}
          isDisabled
          className="purple-gradient-button"
          rightIcon={
            <Tooltip
              closeDelay={2000}
              label={
                <Text>
                  <Trans>
                    Blacklist is powered by{' '}
                    <Link href="https://gopluslabs.io/" target="_blank" textDecoration="underline">
                      Go+
                    </Link>
                  </Trans>
                </Text>
              }
              shouldWrapChildren
            >
              <Icon as={QuestionSVG} w="initial" h="initial" />
            </Tooltip>
          }
        >
          {t`Your wallet address is on the blacklist`}
        </Button>
      </ScaleFade>
    )
  }

  return <>{children}</>
})
