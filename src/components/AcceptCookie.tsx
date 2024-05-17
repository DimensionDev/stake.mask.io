import { FC, memo, useState } from 'react'
import { Box, Fade, HStack, Icon, Link, Stack } from '@chakra-ui/react'
import CloseCircle from '../assets/close-circle.svg?react'
import Heart from '../assets/heart.svg?react'
import { t } from '@lingui/macro'
import { GradientButton } from './GradientButton.tsx'
import { cookiePolicyModal } from '../modals'
import { useLocalStorage } from 'react-use'

export const AcceptCookie: FC = memo(() => {
  const [isAcceptedCookie, setIsAcceptedCookie] = useLocalStorage('is-accepted-cookie', false)
  const [isClosed, setIsClosed] = useState(false)

  return (
    <Fade in={!isAcceptedCookie && !isClosed}>
      <HStack
        color="neutrals.4"
        fontSize="12px"
        fontWeight={400}
        lineHeight="150%"
        pos="fixed"
        bottom="40px"
        right={{ base: '50%', md: '70px' }}
        transform={{ base: 'translateX(50%)', md: 'none' }}
        zIndex={2}
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          bg="neutrals.8"
          rounded={{ base: '12px', md: '100px' }}
          py={2}
          px={4}
          spacing={6}
          w={{ base: '250px', md: 'auto' }}
          align="center"
        >
          <Box>
            {t`We use our own cookies.`}
            <Link
              fontWeight={700}
              ml={1}
              color="neutrals.2"
              onClick={() => cookiePolicyModal.show()}
            >{t`Learn more`}</Link>
          </Box>
          <GradientButton
            leftIcon={<Icon as={Heart} w={4} h={4} />}
            onClick={() => setIsAcceptedCookie(true)}
          >{t`Accept cookies`}</GradientButton>
        </Stack>
        <Box as="button" w={6} h={6} onClick={() => setIsClosed(true)}>
          <Icon as={CloseCircle} w={6} h={6} />
        </Box>
      </HStack>
    </Fade>
  )
})
