import { sentryVitePlugin } from '@sentry/vite-plugin'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      plugins: [['@lingui/swc-plugin', {}]],
    }),
    TanStackRouterVite(),
    svgr({
      include: '**/*.svg?react',
    }),
    {
      name: 'markdown-to-string-loader',
      transform(code, id) {
        if (/\.md$/.test(id)) {
          return `export default \`${code}\``
        }
      },
    },
    sentryVitePlugin({
      org: 'dimension',
      project: 'stake-mask-io',
      url: 'https://sentry.firefly.land',
    }),
  ],

  build: {
    sourcemap: true,
  },
})
