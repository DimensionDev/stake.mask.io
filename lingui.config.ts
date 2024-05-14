import type { LinguiConfig } from '@lingui/conf'

const config: LinguiConfig = {
  locales: ['en'],
  compileNamespace: 'ts',
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}',
      include: ['src'],
      exclude: ['src/locales/**'],
    },
  ],
  formatOptions: {
    origins: true,
    lineNumbers: false,
  },
}

export default config
