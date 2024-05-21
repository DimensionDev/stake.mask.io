import { createFileRoute } from '@tanstack/react-router'
import Markdown from 'markdown-to-jsx'
import { Box, Center, Flex } from '@chakra-ui/react'
import { useRef } from 'react'
import { FaqsToc } from '../components/FaqsToc.tsx'
import content from '../assets/faqs.md'

const FaqsPage = () => {
  const contentElRef = useRef<HTMLDivElement>(null)

  return (
    <Center w="100%" pt={{ base: '110px', md: '80px' }} px={{ base: '24px', xl: '48px' }} transition="200ms">
      <Flex
        w="100%"
        maxW="maxW"
        pt={{ base: 0, md: '64px' }}
        position="relative"
        direction={{ base: 'column', md: 'row' }}
      >
        <FaqsToc contentRef={contentElRef} />
        <Box
          ref={contentElRef}
          w="100%"
          color="neutrals.4"
          fontSize="16px"
          lineHeight="150%"
          sx={{
            'h1, h2, h3, h4, h5, h6': {
              mb: '32px',
              fontWeight: 700,
            },
            'p, ul, ol': {
              mb: '32px',
            },
            h1: {
              fontSize: '32px',
            },
            h2: {
              fontSize: '24px',
            },
            h3: {
              fontSize: '20px',
            },
            'ul, ol': {
              pl: '32px',
              img: {
                w: '16px',
                h: '16px',
                display: 'inline-block',
                mr: 1,
                transform: 'translateY(15%)',
              },
            },
            a: {
              textDecor: 'underline',
            },
          }}
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
