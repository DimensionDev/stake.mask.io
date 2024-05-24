import { Center, Flex, Heading, Text } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { createFileRoute } from '@tanstack/react-router'
import { ComponentType } from 'react'

import { HeaderImage } from '@/components/HeaderImage'

const About: ComponentType = () => {
  return (
    <>
      <HeaderImage />
      <Center w="100%" px={{ base: '24px', md: '48px' }} transition="200ms">
        <Flex direction="column" w="100%" maxW="maxW">
          <Heading
            color="neutrals.1"
            fontSize="40px"
            fontWeight={700}
            lineHeight="120%"
            letterSpacing="-0.4px"
            textAlign="center"
          >{t`About MASK Stake`}</Heading>
          <Text
            color="neutrals.1"
            fontSize="16px"
            fontWeight={400}
            lineHeight="150%"
            mt={{ base: '24px', md: '88px' }}
            mb="72px"
            bg="rgba(255, 255, 255, 0.03)"
            rounded="12px"
            p={6}
          >
            {t`MASK Stake is a staking project designed specifically for long-term holders of the MASK token. By staking MASK tokens on the MASK Stake platform, users can earn rewards from collaborating projects.`}
            <br />
            {t`MASK Stake provides a stable income opportunity for MASK token holders while contributing to the growth of the MASK ecosystem. Whether you are an individual investor or an institutional investor, MASK Stake offers a secure and reliable staking platform to maximize the returns on your MASK tokens.`}
          </Text>
        </Flex>
      </Center>
    </>
  )
}

export const Route = createFileRoute('/about')({
  component: () => <About />,
})
