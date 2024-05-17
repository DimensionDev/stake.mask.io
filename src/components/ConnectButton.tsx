import { ConnectButton as RawConnectButton } from '@rainbow-me/rainbowkit'
import { type FC, memo } from 'react'
import { GradientButton } from './GradientButton.tsx'
import { t } from '@lingui/macro'
import { Box, type BoxProps, Button, Flex, Icon, Image } from '@chakra-ui/react'
import WalletSVG from '../assets/wallet.svg?react'
import { useAccount, useConnectors } from 'wagmi'
import type { Connector } from 'wagmi'
import { useQuery } from '@tanstack/react-query'
import { formatEthereumAddress } from '../helpers/formatEthereumAddress.ts'

interface ConnectorWithRkDetails extends Connector {
  rkDetails: {
    iconUrl: () => Promise<string>
    rdns: string
  }
}

export const ConnectedWalletIcon: FC<BoxProps> = memo(({ ...props }) => {
  const connectors = useConnectors()
  const account = useAccount()

  const { data: icon } = useQuery({
    queryKey: ['connected-wallet-icon', account?.address],
    queryFn() {
      const walletId = localStorage.getItem('rk-latest-id')
      const connector = connectors.find(
        (connector) => (connector as ConnectorWithRkDetails).rkDetails.rdns === walletId,
      )
      return (connector as ConnectorWithRkDetails)?.rkDetails?.iconUrl()
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  return <Image src={icon} boxSize={9} {...props} />
})

export const ConnectButton: FC = () => {
  return (
    <RawConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated')

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <GradientButton
                    onClick={openConnectModal}
                    leftIcon={<Icon as={WalletSVG} w={4} h={4} />}
                  >{t`Connect Wallet`}</GradientButton>
                )
              }

              if (chain.unsupported) {
                return (
                  <Button px={6} colorScheme="red" rounded="full" onClick={openChainModal} type="button">
                    Wrong network
                  </Button>
                )
              }

              return (
                <Flex bg="gradient.purple" color="neutrals.8" rounded="100px" align="center" p="2px">
                  <Flex
                    as="button"
                    fontSize="14px"
                    fontWeight={700}
                    align="center"
                    onClick={openAccountModal}
                    type="button"
                  >
                    <ConnectedWalletIcon rounded="100%" bg="white" p={1} />
                    <Box as="span" ml={1} w="110px" lineHeight="20px">
                      {account.ensName ? account.ensName : formatEthereumAddress(account.address, 4)}
                    </Box>
                  </Flex>
                  <Flex
                    as="button"
                    bg="neutrals.9"
                    rounded="100px"
                    color="neutrals.2"
                    align="center"
                    px={1}
                    ml={1}
                    fontSize="14px"
                    fontWeight={700}
                    onClick={openChainModal}
                    h="36px"
                    _hover={{ transform: 'scale(1.05)' }}
                    _active={{ transform: 'scale(0.95)' }}
                    transition="200ms"
                  >
                    <Box as="span" minW="70px" textAlign="right" pl={2}>
                      {account.displayBalance ? `${account.displayBalance}` : ''}
                    </Box>
                    <Image
                      src={chain.iconUrl}
                      alt={chain.name ?? 'Chain icon'}
                      w="26px"
                      h="26px"
                      rounded="100%"
                      ml={2}
                    />
                  </Flex>
                </Flex>
              )
            })()}
          </div>
        )
      }}
    </RawConnectButton.Custom>
  )
}
