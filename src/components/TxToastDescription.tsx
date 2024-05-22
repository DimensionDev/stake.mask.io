import { Icon, Link, Text, TextProps } from '@chakra-ui/react'
import LinkSVG from '../assets/link.svg?react'

interface Props extends TextProps {
  link: string
  text: string
}
export function TxToastDescription({ link, text, ...props }: Props) {
  return (
    <Text display="inline-flex" alignItems="center" fontWeight={700} {...props}>
      {text}
      <Link href={link} target="_blank" display="inline-flex" alignItems="center" ml="4px">
        <Icon as={LinkSVG} w="20px" h="20px" />
      </Link>
    </Text>
  )
}
