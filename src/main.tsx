import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'

// hydrateRoot (not createRoot) adopts the prerendered DOM produced by
// vite-prerender-plugin (see src/prerender.tsx). BrowserRouter is the
// client-side router counterpart to StaticRouter used during SSR.
hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
