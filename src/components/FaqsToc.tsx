import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Link,
  SlideFade,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useNavigate } from '@tanstack/react-router'
import { ComponentType, RefObject, useEffect, useMemo, useState } from 'react'

import MenuSVG from '@/assets/menu.svg?react'
import { useInViewId } from '@/hooks/useInViewId.ts'
import { sleep } from '@/utils/sleep.ts'

export interface TOCItem {
  id: string
  text: string
  children: TOCItem[]
  level: number
}

// only h2 and h3
function generateTOC(contentEl: HTMLElement) {
  const headings = contentEl?.querySelectorAll('h2, h3') ?? []
  const toc: TOCItem[] = []
  let currentLevel1: TOCItem | null = null
  let currentLevel2: TOCItem | null = null

  headings.forEach((heading) => {
    const level = parseInt(heading.tagName.charAt(1), 10)

    if (level === 2) {
      const item: TOCItem = {
        id: heading.id,
        text: heading.textContent ?? '',
        children: [],
        level: 1,
      }
      toc.push(item)
      currentLevel1 = item
      currentLevel2 = null
    } else if (level === 3 && currentLevel1) {
      const item = {
        id: heading.id,
        text: heading.textContent ?? '',
        children: [],
        level: 2,
      } as TOCItem
      currentLevel1.children.push(item)
      currentLevel2 = item
    } else if (level === 3 && currentLevel2) {
      const item = {
        id: heading.id,
        text: heading.textContent ?? '',
        level: 3,
      } as TOCItem
      currentLevel2.children.push(item)
    }
  })

  return toc
}

export const FaqsToc: ComponentType<{ contentRef: RefObject<HTMLDivElement> }> = ({ contentRef }) => {
  const [tocItems, setTOCItem] = useState<TOCItem[]>([])
  const isShowDrawer = useBreakpointValue({ base: true, md: false })
  const drawer = useDisclosure()
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.overflowX = 'initial'
    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      document.body.style.overflowX = null
    }
  }, [])

  const { inViewId } = useInViewId('#faqs-content')

  useEffect(() => {
    if (!contentRef.current) {
      return
    }
    const newTocItems = generateTOC(contentRef.current)
    setTOCItem(newTocItems)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const currentToc = useMemo(() => {
    for (const tocItem of tocItems) {
      if (tocItem.id === inViewId) {
        return [tocItem]
      }
      for (const subTocItem of tocItem.children) {
        if (subTocItem.id === inViewId) {
          return [tocItem, subTocItem]
        }
      }
    }
    return []
  }, [inViewId, tocItems])

  const content =
    tocItems.length > 0 ? (
      <Accordion defaultIndex={new Array(tocItems.length).fill(0).map((_, i) => i)} allowMultiple w="100%" top="110px">
        {tocItems.map((tocItem) => {
          const isActive = tocItem.id === inViewId || tocItem.children.some((sub) => sub.id === inViewId)
          return (
            <AccordionItem key={tocItem.id} border="none">
              <AccordionButton
                px={0}
                py={3}
                pos="relative"
                fontSize="14px"
                lineHeight="16px"
                fontWeight={700}
                style={{
                  color: isActive ? 'var(--chakra-colors-neutrals-2)' : undefined,
                }}
              >
                <Link href={`#${tocItem.id}`}>{tocItem.text}</Link>
                <AccordionIcon pos="absolute" top={3} right={0} w={4} h={4} />
              </AccordionButton>
              <AccordionPanel py={0} px={0}>
                {tocItem.children.map((sub) => {
                  const isActive2 = sub.id === inViewId
                  return (
                    <Link
                      key={sub.id}
                      href={`#${sub.id}`}
                      display="block"
                      fontSize="14px"
                      lineHeight="32px"
                      fontWeight={400}
                      px="10px"
                      rounded="4px"
                      w="100%"
                      transition="200ms"
                      _hover={{
                        textDecoration: 'none',
                        bg: 'rgba(255, 255, 255, 0.1)',
                      }}
                      style={{
                        color: isActive2 ? 'var(--chakra-colors-flow-line)' : undefined,
                        background: isActive2 ? 'rgba(255, 255, 255, 0.1)' : undefined,
                      }}
                      onClick={async (e) => {
                        if (isShowDrawer) {
                          e.preventDefault()
                          drawer.onClose()
                          await sleep(300)
                          return navigate({
                            hash: sub.id,
                          })
                        }
                      }}
                    >
                      {sub.text}
                    </Link>
                  )
                })}
              </AccordionPanel>
            </AccordionItem>
          )
        })}
      </Accordion>
    ) : null

  if (isShowDrawer) {
    const breadcrumb = currentToc[currentToc.length - 1]?.text || ''
    return (
      <>
        <Flex
          pos="fixed"
          w="100%"
          left="0"
          top="79px"
          mr="auto"
          lineHeight="6"
          fontSize="sm"
          align="center"
          mb="10px"
          px={3}
          h="56px"
          borderBottom="1px solid rgba(255, 255, 255, 0.1)"
          bg="rgba(0, 0, 0, 0.10)"
          backdropFilter="blur(10px)"
          transform="translate3d(0, 0, 0)" // use gpu to render blur
        >
          <Box as="button" w={8} h={8} zIndex={1} onClick={drawer.onOpen}>
            <Icon as={MenuSVG} boxSize={8} />
          </Box>
          <Flex align="center" ml="8px" flex={1}>
            <SlideFade in key={breadcrumb}>
              <Flex align="center">{breadcrumb}</Flex>
            </SlideFade>
          </Flex>
        </Flex>
        <Flex h="56px" mb="24px" w="100%" />

        <Drawer isOpen={drawer.isOpen} onClose={drawer.onClose} placement="left">
          <DrawerOverlay />
          <DrawerContent rounded="0" overflowY="auto">
            <Box pos="sticky" top="0" h="60px" minH="60px">
              <DrawerCloseButton
                top="0"
                right="0"
                border="none"
                py="12px"
                h="48px"
                w="48px"
                sx={{ svg: { boxSize: '16px' } }}
                color="neutrals.4"
              />
            </Box>
            <Box px={3}>{content}</Box>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

  return (
    <Box
      w="272px"
      minW="272px"
      color="neutrals.4"
      mr="32px"
      pr="32px"
      pos="sticky"
      top={{ base: '110px', lg: '80px' }}
      h="auto"
      maxH="calc(100vh - 80px)"
      mb="auto"
      overflowY="auto"
      transition="200ms"
    >
      {content}
    </Box>
  )
}
