import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Header, Footer } from './components/layout'
import { HomePage } from './pages/HomePage'
import { CaseStudyPage } from './pages/CaseStudyPage'
import { NotFoundPage } from './pages/NotFoundPage'

/**
 * Scroll behavior across route changes.
 *   - Path change with no hash → scroll to top (typical sub-page entry).
 *   - Hash present → smooth-scroll to that id. Retries once after a tick
 *     to cover the case where the target node mounts a frame after the
 *     route transition.
 *
 * react-router-dom v6 does NOT do this automatically for BrowserRouter
 * (ScrollRestoration is data-router-only).
 */
function useRouteScroll() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
      return
    }
    const scrollToHash = () => {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return true
      }
      return false
    }
    if (!scrollToHash()) {
      // Target may not be in the DOM on the very first tick after a route
      // change; one retry covers the common case without busy-looping.
      const t = window.setTimeout(scrollToHash, 80)
      return () => window.clearTimeout(t)
    }
  }, [pathname, hash])
}

function App() {
  useRouteScroll()
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work/:slug" element={<CaseStudyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
