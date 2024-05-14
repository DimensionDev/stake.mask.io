import { createFileRoute } from '@tanstack/react-router'
import { t } from '@lingui/macro'
import { Button, Flex } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

function Index() {
  return (
    <Flex direction="column" w="100%" maxW="500px">
      {t`Test Text`}
      <Button>{t`Test Button`}</Button>
      <ConnectButton />
    </Flex>
  )
}

export const Route = createFileRoute('/')({
  component: Index,
})
