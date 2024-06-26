import { Center, CenterProps, Image } from '@chakra-ui/react'
import { ComponentType, lazy, Suspense } from 'react'

import KvImage from '@/assets/kv.webp'

const Spline = lazy(() => import('@splinetool/react-spline'))

export interface HeaderImageProps extends CenterProps {
  onlyBg?: boolean
}

export const HeaderImage: ComponentType<HeaderImageProps> = ({ onlyBg = false, ...props }) => {
  return (
    <Center
      pos="relative"
      w="100%"
      h="580px"
      bg="radial-gradient(closest-side, rgba(0, 0, 0, 0) 35%, rgb(82, 42, 190) 70%, rgb(120, 80, 220) 80%, rgb(170, 157, 220) 95%) 50% 10% / 280% 200%"
      bgSize="280% 200%"
      bgPos="50% 10%"
      pt="60px"
      sx={{
        '> div': {
          maxW: '1440px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
      onWheelCapture={(e) => e.stopPropagation()}
      onContextMenuCapture={(e) => e.preventDefault()}
      {...props}
    >
      {!onlyBg ? (
        <Suspense
          fallback={
            <div>
              <Image
                src={KvImage}
                minW="1440px"
                w="1440px"
                h="auto"
                pos="absolute"
                top="60px"
                left="50%"
                transform="translateX(-50%)"
              />
            </div>
          }
        >
          <Spline scene="/kv.splinecode" renderOnDemand />
        </Suspense>
      ) : null}
    </Center>
  )
}
