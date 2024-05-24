import { sentryVitePlugin } from '@sentry/vite-plugin'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import svgr from 'vite-plugin-svgr'
import { VitePluginRadar } from 'vite-plugin-radar'

function createURL(pathToFile: string) {
  return new URL(pathToFile, import.meta.url).pathname
}

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
    VitePluginRadar({
      analytics: process.env.GOOGLE_ANALYTICS_ID
        ? {
            id: process.env.GOOGLE_ANALYTICS_ID,
          }
        : undefined,
      gtm: process.env.GOOGLE_TAG_MANAGER_ID
        ? [
            {
              id: process.env.GOOGLE_TAG_MANAGER_ID,
            },
          ]
        : undefined,
    }),
  ],

  resolve: {
    alias: {
      '@': createURL('./src'),
    },
  },

  build: {
    sourcemap: true,
  },
})
