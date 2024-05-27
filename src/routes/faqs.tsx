import { Box, Center, Flex } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import Markdown from 'markdown-to-jsx'
import { useRef } from 'react'

import content from '@/assets/faqs.md'
import { FaqsToc } from '@/components/FaqsToc.tsx'
import { HeaderImage } from '@/components/HeaderImage'

function FaqsPage() {
  const contentElRef = useRef<HTMLDivElement>(null)

  return (
    <Center flexDir="column" w="100%" pt="80px" px={{ base: '24px', xl: '48px' }} transition="200ms">
      <HeaderImage w="100%" pos="fixed" top="0" left="0" onlyBg />
      <Flex
        w="100%"
        maxW="maxW"
        pt={{ base: 0, md: '64px' }}
        position="relative"
        direction={{ base: 'column', md: 'row' }}
        zIndex={1}
      >
        <FaqsToc contentRef={contentElRef} />
        <Box
          ref={contentElRef}
          id="faqs-content"
          w="100%"
          color="neutrals.4"
          fontSize="16px"
          lineHeight="150%"
          className="markdown-content"
          pb={{ base: '20vh', sm: '50vh' }}
        >
          <Markdown
            children={content}
            options={{
              enforceAtxHeadings: true,
              forceWrapper: true,
              forceBlock: true,
            }}
          />
        </Box>
      </Flex>
    </Center>
  )
}

export const Route = createFileRoute('/faqs')({
  component: () => <FaqsPage />,
})
