import {
  Center,
  Divider,
  Flex,
  FlexProps,
  Icon,
  Tab,
  TabList,
  Tabs,
} from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { FC } from 'react'
import LogoSVG from '../../assets/logo.svg?react'

export interface NavProps extends FlexProps {}

export const Nav: FC<NavProps> = ({ ...props }) => {
  return (
    <Center
      w="100%"
      h="80px"
      bg="rgba(0, 0, 0, 0.10)"
      backdropFilter="blur(10px)"
      transform="translate3d(0, 0, 0)" // use gpu to render blur
      {...props}
    >
      <Flex p={5} align="center" w="100%" h="inherit" maxW="1440px">
        <Icon as={LogoSVG} w="164px" h="auto" />
        <Divider
          orientation="vertical"
          borderLeft="1px solid rgba(255, 255, 255, 0.1)"
          ml="8"
          mr="6"
        />
        <Tabs variant="nav">
          <TabList>
            <Tab>{t`Stake`}</Tab>
            <Tab>{t`FAQs`}</Tab>
            <Tab>{t`About`}</Tab>
          </TabList>
        </Tabs>
        <Center ml="auto">
          <ConnectButton />
        </Center>
      </Flex>
    </Center>
  )
}
