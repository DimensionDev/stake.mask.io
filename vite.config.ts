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
  ],
})
