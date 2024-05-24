import { BoxProps, HStack } from '@chakra-ui/react'
import { Link, useLocation } from '@tanstack/react-router'
import { ComponentType, ReactNode, useMemo } from 'react'

import { Tabs } from '@/styles/components/Tabs.ts'

export interface DesktopMenuProps extends BoxProps {
  menus: Array<{ label: ReactNode; path: string }>
}

export const DesktopMenu: ComponentType<DesktopMenuProps> = ({ menus, ...props }) => {
  const tabStyles = useMemo(() => Tabs.variants.nav(), [])
  const { pathname } = useLocation()
  return (
    <HStack
      {...tabStyles.tablist}
      {...props}
      sx={{
        '.chakra-tabs__tab': tabStyles.tab,
        ...props.sx,
      }}
    >
      {menus.map((menu) => (
        <Link to={menu.path} key={menu.path} aria-selected={menu.path === pathname} className="chakra-tabs__tab">
          {menu.label}
        </Link>
      ))}
    </HStack>
  )
}
