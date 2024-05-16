import type { FC } from 'react'
import {
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  Icon,
  VStack,
} from '@chakra-ui/react'
import LogoSVG from '../../assets/logo-2.svg?react'
import { t } from '@lingui/macro'

export const Footer: FC = () => {
  return (
    <Flex direction="column" bg="neutrals.9" w="100%" mt="auto">
      <Center w="100%" borderTop="1px solid" borderTopColor="neutrals.6">
        <Grid
          templateColumns="repeat(4, 1fr)"
          px={9}
          py={12}
          w="100%"
          maxW="1440px"
        >
          <VStack align="start" spacing={8}>
            <Icon as={LogoSVG} w="164px" h="auto" />
            <Heading
              color="neutrals.2"
              letterSpacing="-0.24px"
              lineHeight="32px"
              fontWeight={400}
              fontSize="24px"
            >
              Your Portal To The New, Open Internet.
            </Heading>
          </VStack>
        </Grid>
      </Center>
      <Center borderTop="1px solid" borderTopColor="neutrals.6" w="100%">
        <Flex py={8} px={6} w="100%" maxW="1440px">
          <Box
            color="neutrals.4"
            fontSize="12px"
            fontWeight={400}
            lineHeight="150%"
          >{t`Since 2019 to Now ｜ Mask.io`}</Box>
        </Flex>
      </Center>
    </Flex>
  )
}
