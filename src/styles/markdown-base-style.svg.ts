import { SystemStyleObject } from '@chakra-ui/react'

export const markdownBaseStyle: SystemStyleObject = {
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
}
