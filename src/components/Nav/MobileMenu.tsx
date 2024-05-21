import type { FC, ReactNode } from 'react'
import { Box, type BoxProps, Flex, HStack, keyframes, List, VStack } from '@chakra-ui/react'
import { useLockBodyScroll } from 'react-use'
import { Link, useLocation } from '@tanstack/react-router'
import { ConnectButton } from '../ConnectButton.tsx'
import { t } from '@lingui/macro'
import { TwitterAvatar } from '../TwitterAvatar.tsx'
import { profileModal } from '../../modals/ProfileModal.tsx'
import { useUserInfo } from '../../hooks/useUserInfo.ts'

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

export const MobileMenu: FC<MobileMenuProps> = ({ isOpen = false, onClose, menus }) => {
  useLockBodyScroll(isOpen)
  const { pathname } = useLocation()
  const { data: user } = useUserInfo()

  if (!isOpen) return null

  return (
    <Flex pos="fixed" top="0" left="0" w="100%" h="100%" direction="column" pt="171px" zIndex={20}>
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

      <VStack
        w="100%"
        mt="auto"
        pb="44px"
        spacing={2}
        animation={`${showMenuButton} 500ms forwards`}
        transform="translateY(20%)"
        opacity={0}
        sx={{ animationDelay: `${(menus.length - 1) * 200}ms` }}
        onClick={onClose}
      >
        {user?.twitter_id ? (
          <HStack
            as="button"
            bg="neutrals.9"
            p="2px"
            spacing={3}
            w="100%"
            rounded="100px"
            maxW="270px"
            onClick={() => {
              profileModal.show()
            }}
          >
            <TwitterAvatar src={user.twitter_image} cursor="pointer" size="40px" mr="4px" variant="dark" />
            <Box color="neutrals.1" fontSize="14px" fontWeight={700} lineHeight="22px">
              {user.twitter_name}
            </Box>
          </HStack>
        ) : null}
        <ConnectButton connectText={t`Connect`} />
      </VStack>
    </Flex>
  )
}
