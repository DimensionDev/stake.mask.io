import { Box, Center, Divider, Flex, Icon, useBreakpointValue, useDisclosure, type FlexProps } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { Link } from '@tanstack/react-router'
import { FC, useMemo } from 'react'
import LogoSVG from '../../assets/logo.svg?react'
import { useUserInfo } from '../../hooks/useUserInfo.ts'
import { ConnectButton } from '../ConnectButton.tsx'
import { TwitterAvatar } from '../TwitterAvatar.tsx'
import { DesktopMenu } from './DesktopMenu.tsx'
import { MenuButton } from './MenuButton.tsx'
import { MobileMenu } from './MobileMenu.tsx'
import { profileModal } from '../../modals/ProfileModal.tsx'

export interface NavProps extends FlexProps {}

export const Nav: FC<NavProps> = ({ ...props }) => {
  const isHiddenTabs = useBreakpointValue({ base: true, lg: false })
  const { data: user } = useUserInfo()
  const mobileMenu = useDisclosure()
  const menus = useMemo(
    () => [
      {
        label: t`Stake`,
        path: '/',
      },
      {
        label: t`FAQs`,
        path: '/faqs',
      },
      {
        label: t`About`,
        path: '/about',
      },
    ],
    [],
  )

  return (
    <Center
      w="100%"
      h={{ base: '107px', lg: '80px' }}
      borderBottom={{ base: 'none', lg: '1px solid rgba(255, 255, 255, 0.1)' }}
      pos="relative"
      {...props}
    >
      <Flex p={5} align="center" w="100%" h="inherit" maxW="1440px" pos="relative" zIndex={30}>
        <Link to="/">
          <Icon as={LogoSVG} w="164px" h="auto" />
        </Link>
        {!isHiddenTabs ? (
          <>
            <Divider orientation="vertical" borderLeft="1px solid rgba(255, 255, 255, 0.1)" ml="8" mr="6" />
            <DesktopMenu menus={menus} />
            <Center ml="auto">
              {user?.twitter_id ? (
                <TwitterAvatar
                  src={user.twitter_image}
                  cursor="pointer"
                  size="40px"
                  mr="4px"
                  variant="dark"
                  onClick={() => {
                    profileModal.show()
                  }}
                />
              ) : null}
              <ConnectButton />
            </Center>
          </>
        ) : (
          <>
            <MenuButton isOpen={mobileMenu.isOpen} onClick={mobileMenu.onToggle} zIndex={50} />
          </>
        )}
      </Flex>
      <Box
        pos="absolute"
        w="100%"
        h="100%"
        bg="rgba(0, 0, 0, 0.10)"
        backdropFilter="blur(10px)"
        transform="translate3d(0, 0, 0)" // use gpu to render blur
        top="0"
        left="0"
        zIndex={0}
        transition="300ms"
        willChange="height"
        style={{
          height: mobileMenu.isOpen ? '100vh' : undefined,
          background: mobileMenu.isOpen ? 'rgba(0, 0, 0, 0.80)' : undefined,
        }}
      />
      <MobileMenu isOpen={isHiddenTabs && mobileMenu.isOpen} onClose={mobileMenu.onClose} menus={menus} />
    </Center>
  )
}
