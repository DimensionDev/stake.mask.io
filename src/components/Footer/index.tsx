import type { FC } from 'react'
import { Box, Center, Flex, Grid, Heading, Icon, VStack, Link } from '@chakra-ui/react'
import LogoSVG from '../../assets/logo-2.svg?react'
import { t } from '@lingui/macro'
import { env } from '../../constants/env.ts'
import DiscordSVG from '../../assets/social-media/discord.svg?react'
import FacebookSVG from '../../assets/social-media/facebook.svg?react'
import GithubSVG from '../../assets/social-media/github.svg?react'
import TelegramSVG from '../../assets/social-media/telegram.svg?react'
import RedditSVG from '../../assets/social-media/reddit.svg?react'
import YoutubeSVG from '../../assets/social-media/youtube.svg?react'
import MediumSVG from '../../assets/social-media/medium.svg?react'
import TwitterSVG from '../../assets/social-media/twitter.svg?react'
import { Terms } from './Terms'
import { MaskNetworkSplice } from './MaskNetworkSplice.tsx'

const SocialMedias = [
  { icon: TwitterSVG, href: env.external.TWITTER_URL },
  { icon: MediumSVG, href: env.external.MEDIUM_URL },
  { icon: TelegramSVG, href: env.external.TELEGRAM_URL },
  { icon: DiscordSVG, href: env.external.DISCORD_URL },
  { icon: FacebookSVG, href: env.external.FACEBOOK_URL },
  { icon: RedditSVG, href: env.external.REDDIT_URL },
  { icon: GithubSVG, href: env.external.GITHUB_URL },
  { icon: YoutubeSVG, href: env.external.YOUTUBE_URL },
]

export const Footer: FC = () => {
  return (
    <Flex direction="column" bg="neutrals.9" w="100%" mt="auto">
      <MaskNetworkSplice />
      {/*<AspectRatio ratio={891 / 61} w="100%">*/}
      {/*  <Image src={FooterImage} objectFit="cover" draggable={false} userSelect="none" />*/}
      {/*</AspectRatio>*/}
      <Center w="100%" borderTop="1px solid" borderTopColor="neutrals.6">
        <Grid
          templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
          px={{ base: 3, md: 6, lg: 9 }}
          py={{ base: 6, md: 12 }}
          transition="200ms"
          w="100%"
          maxW="1440px"
          gap={8}
        >
          <VStack align="start" spacing={8} gridColumn={{ base: '1/3', md: 'auto' }}>
            <Icon as={LogoSVG} w="164px" h="auto" />
            <Heading color="neutrals.2" letterSpacing="-0.24px" lineHeight="32px" fontWeight={400} fontSize="24px">
              {t`Your Portal To The New, Open Internet.`}
            </Heading>
          </VStack>
          <VStack align="start" spacing={10}>
            <Heading
              as="h5"
              fontSize="16px"
              fontWeight={700}
              lineHeight="24px"
              color="neutrals.2"
            >{`Integrations`}</Heading>
            <VStack
              as="ul"
              listStyleType="none"
              fontSize="14px"
              fontWeight={700}
              lineHeight="16px"
              color="neutrals.4"
              align="start"
              w="100%"
              spacing={6}
              sx={{ li: { w: '100%' } }}
            >
              <li>
                <Link target="_blank" href={env.external.GITHUB_URL} _hover={{ textDecoration: 'underline' }}>
                  {`Github`}
                </Link>
              </li>
            </VStack>
          </VStack>
          <VStack align="start" spacing={10}>
            <Heading as="h5" fontSize="16px" fontWeight={700} lineHeight="24px" color="neutrals.2">{`Help`}</Heading>
            <VStack
              as="ul"
              listStyleType="none"
              fontSize="14px"
              fontWeight={700}
              lineHeight="16px"
              color="neutrals.4"
              align="start"
              w="100%"
              spacing={6}
              sx={{ li: { w: '100%' } }}
            >
              <li>
                <Link target="_blank" _hover={{ textDecoration: 'underline' }}>
                  {`FAQs`}
                </Link>
              </li>
              <li>
                <Link target="_blank" _hover={{ textDecoration: 'underline' }}>
                  {`Support`}
                </Link>
              </li>
            </VStack>
          </VStack>
          <VStack align="start" spacing={10} gridColumn={{ base: '1/3', md: 'auto' }}>
            <Heading
              as="h5"
              fontSize="16px"
              fontWeight={700}
              lineHeight="24px"
              color="neutrals.2"
            >{`Contact Us`}</Heading>
            <Flex
              wrap="wrap"
              as="ul"
              listStyleType="none"
              fontSize="14px"
              fontWeight={700}
              lineHeight="16px"
              w="100%"
              gap={3}
            >
              {SocialMedias.map((media) => (
                <li>
                  <Center
                    as="a"
                    href={media.href}
                    target="_blank"
                    p={2}
                    transition="100ms"
                    _hover={{ transform: 'scale(1.1)' }}
                    _active={{ transform: 'scale(0.9)' }}
                  >
                    <Icon as={media.icon} w={6} h={6} />
                  </Center>
                </li>
              ))}
            </Flex>
          </VStack>
        </Grid>
      </Center>
      <Center borderTop="1px solid" borderTopColor="neutrals.6" w="100%">
        <Flex
          py={{ base: 3, md: 6, lg: 8 }}
          px={{ base: 3, md: 6, lg: 9 }}
          transition="200ms"
          w="100%"
          maxW="1440px"
          justify="space-between"
          direction={{ base: 'column', sm: 'row' }}
          gap={{ base: 3, sm: 0 }}
        >
          <Box
            color="neutrals.4"
            fontSize="12px"
            fontWeight={400}
            lineHeight="150%"
          >{t`Since 2019 to Now ｜ Mask.io`}</Box>
          <Terms />
        </Flex>
      </Center>
    </Flex>
  )
}
