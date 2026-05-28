import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// hydrateRoot (not createRoot) adopts the prerendered DOM produced by
// vite-prerender-plugin (see src/prerender.tsx). Avoids the brief
// teardown-and-rebuild flicker that createRoot would cause when finding
// existing children, and keeps crawler-visible HTML in lockstep with
// what users see post-hydration.
hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <App />
  </StrictMode>,
)
