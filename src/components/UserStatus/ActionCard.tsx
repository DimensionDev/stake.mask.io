import { Box, BoxProps, Text } from '@chakra-ui/react'

export interface ActionCardProps extends BoxProps {
  title: string
}

export function ActionCard({ title, ...props }: ActionCardProps) {
  return (
    <Box
      p={4}
      rounded={16}
      blur="35px"
      transform="translate3d(0, 0, 0)"
      border="1px solid"
      borderColor="neutrals.6"
      boxShadow="0px 5px 10px 0px rgba(0, 0, 0, 0.10), 0px 15px 30px 0px rgba(0, 0, 0, 0.10), 0px 20px 40px 0px rgba(0, 0, 0, 0.15)"
      backdropFilter="blur(10px)"
      pos="relative"
      _after={{
        content: '""',
        bg: 'conic-gradient(from 90deg at 40.63% 50.41%, rgba(242, 98, 181, 0.00) 125.17920970916748deg, rgba(95, 197, 255, 0.70) 193.4119462966919deg, rgba(255, 172, 137, 0.70) 216.0206937789917deg, rgba(129, 85, 255, 0.70) 236.0708713531494deg, rgba(120, 157, 255, 0.70) 259.95326042175293deg, rgba(159, 115, 241, 0.00) 311.0780096054077deg)',
        pos: 'absolute',
        rounded: 16,
        pointerEvents: 'none',
        transform: 'translate3d(0, 0, 0)',
        filter: 'blur(35px)',
        top: 0,
        left: 0,
        bottom: 0,
        aspectRatio: '1/1',
      }}
      {...props}
    >
      <Text lineHeight="140%" fontSize="20px" fontWeight="bold">
        {title}
      </Text>
      {props.children}
    </Box>
  )
}
