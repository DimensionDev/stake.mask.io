import { type FC, lazy, Suspense } from 'react'
import { Center, Spinner } from '@chakra-ui/react'

const Spline = lazy(() => import('@splinetool/react-spline'))

export const MaskNetworkSplice: FC = () => {
  return (
    <Center
      pos="relative"
      w="100%"
      h={{ md: '190px' }}
      bg="linear-gradient(rgba(0, 0, 0, 0), #29016c)"
      bgSize="280% 200%"
      bgPos="50% 10%"
      sx={{
        '> div': {
          maxW: '1440px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'end',
        },
        '> div > canvas': {
          width: '100% !important',
          height: 'auto !important',
        },
      }}
      onWheelCapture={(e) => e.stopPropagation()}
      onContextMenuCapture={(e) => e.preventDefault()}
    >
      <Suspense fallback={<Spinner />}>
        <Spline scene="/mask_network.splinecode" renderOnDemand />
      </Suspense>
    </Center>
  )
}
