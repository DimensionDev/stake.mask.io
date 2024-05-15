import type { FC, ReactNode } from 'react'
import { Box, BoxProps, Center, Flex, keyframes, List } from '@chakra-ui/react'
import { useLockBodyScroll } from 'react-use'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Link, useLocation } from '@tanstack/react-router'

export interface MobileMenuProps extends BoxProps {
  isOpen?: boolean
  onClose: () => void
  menus: { label: ReactNode; path: string }[]
}

const showListItem = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

const showMenuButton = keyframes`
    0% {
        opacity: 0;
        transform: translateY(20%);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`

export const MobileMenu: FC<MobileMenuProps> = ({
  isOpen = false,
  onClose,
  menus,
}) => {
  useLockBodyScroll(isOpen)
  const { pathname } = useLocation()

  return (
    <>
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
          height: isOpen ? '100vh' : undefined,
          background: isOpen ? 'rgba(0, 0, 0, 0.80)' : undefined,
        }}
      />
      {isOpen ? (
        <Flex
          pos="fixed"
          top="0"
          left="0"
          w="100%"
          h="100%"
          direction="column"
          pt="171px"
          zIndex={20}
        >
          <List
            fontSize="24px"
            fontWeight={700}
            lineHeight="32px"
            sx={{
              li: {
                '> a': {
                  py: 4,
                  px: 8,
                  display: 'block',
                  cursor: 'pointer',
                },
                animation: `${showListItem} 500ms forwards`,
                transformOrigin: 'left center',
                transform: 'translateY(-20%)',
                opacity: 0,
                pos: 'relative',
                color: 'neutrals.4',
                '&[data-active="true"]': {
                  color: 'neutrals.2',
                  _before: {
                    content: '" "',
                    bg: 'gradient.purple',
                    pos: 'absolute',
                    top: 0,
                    left: 0,
                    width: '2px',
                    height: '100%',
                  },
                },
              },
            }}
          >
            {menus.map((menu, index) => {
              return (
                <li
                  key={index}
                  style={{
                    animationDelay: `${index * 200}ms`,
                  }}
                  data-active={pathname === menu.path}
                >
                  <Link to={menu.path} onClick={onClose}>
                    {menu.label}
                  </Link>
                </li>
              )
            })}
          </List>

          <Center
            w="100%"
            mt="auto"
            pb="44px"
            animation={`${showMenuButton} 500ms forwards`}
            transform="translateY(20%)"
            opacity={0}
            sx={{ animationDelay: `${(menus.length - 1) * 200}ms` }}
            onClick={onClose}
          >
            <ConnectButton />
          </Center>
        </Flex>
      ) : null}
    </>
  )
}