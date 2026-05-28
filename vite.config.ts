import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'
import { fileURLToPath } from 'node:url'

// Absolute path to the prerender entry. The plugin requires an absolute path
// (or a <script prerender> tag in index.html); fileURLToPath keeps it
// portable across machines.
const prerenderScript = fileURLToPath(
  new URL('./src/prerender.tsx', import.meta.url),
)

export default defineConfig({
  plugins: [
    react(),
    // Build-time prerender of '/' into dist/index.html so crawlers and
    // link-preview bots receive a fully-populated <body>. Single-route
    // SPA → single snapshot, no router needed.
    vitePrerenderPlugin({
      renderTarget: '#root',
      prerenderScript,
      additionalPrerenderRoutes: ['/'],
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
