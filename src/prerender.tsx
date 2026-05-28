// Build-time prerender entry. vite-prerender-plugin calls this once per
// route (we only have '/') to snapshot the React tree into static HTML
// that gets injected into dist/index.html before the JS bundle ships.
//
// Real users still load main.tsx → hydrateRoot, which adopts this static
// markup in place. Crawlers receive the HTML and never need to execute JS.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import './index.css'

interface PrerenderArgs {
  ssr: true
  url: string
}

export async function prerender(_data: PrerenderArgs) {
  const html = renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  return { html }
}
