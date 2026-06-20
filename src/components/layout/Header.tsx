import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from './Container'
import { ThemeToggle } from '../ui/ThemeToggle'
import { cn } from '../../lib/utils'

const navLinks = [
  { hash: '#services', label: 'Services' },
  { hash: '#work', label: 'Work' },
  { hash: '#about', label: 'About' },
  { hash: '#contact', label: 'Contact' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close the mobile menu whenever the route changes (clicking a link
  // navigates away — leaving the menu open is jarring).
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname, location.hash])

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  // From the homepage, same-page hash anchors should smooth-scroll without
  // a route change. From a sub-page (e.g. /work/portal747), they should
  // navigate to "/" first and then scroll — `useRouteScroll` in App.tsx
  // handles the post-navigation scroll-to-hash.
  const isHome = location.pathname === '/'

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-background/80 backdrop-blur-lg border-b border-border'
            : 'bg-transparent'
        )}
      >
        <Container>
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="font-display text-xl md:text-2xl font-bold text-foreground hover:text-accent transition-colors"
            >
              Cakalic<span className="text-accent">Design</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <NavLink key={link.hash} hash={link.hash} isHome={isHome}>
                  {link.label}
                </NavLink>
              ))}
              <ThemeToggle />
              <ContactCTA isHome={isHome} size="sm" />
            </div>

            {/* Mobile theme toggle + hamburger */}
            <div className="md:hidden flex items-center gap-1">
              <ThemeToggle />
              <button
                className="p-2 text-foreground"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {isMobileMenuOpen ? (
                    <>
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </>
                  ) : (
                    <>
                      <line x1="4" x2="20" y1="12" y2="12" />
                      <line x1="4" x2="20" y1="6" y2="6" />
                      <line x1="4" x2="20" y1="18" y2="18" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {/* Mobile Side Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] md:hidden"
              style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer panel — slides in from the right */}
            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-[70] flex flex-col md:hidden"
              style={{
                width: 'min(320px, 85vw)',
                background: 'var(--color-background, hsl(var(--background)))',
                borderLeft: '1px solid hsl(var(--border))',
                boxShadow: '-8px 0 40px rgba(0,0,0,0.3)',
              }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                <Link
                  to="/"
                  className="font-display text-lg font-bold text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Cakalic<span className="text-accent">Design</span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 text-foreground rounded-lg hover:bg-border/40 transition-colors"
                  aria-label="Close menu"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Nav links with stagger */}
              <nav className="flex flex-col flex-1 px-4 py-6 gap-1" aria-label="Mobile navigation">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.hash}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <NavLink
                      hash={link.hash}
                      isHome={isHome}
                      className="flex items-center text-lg font-medium px-4 py-3.5 rounded-xl transition-colors text-foreground-muted hover:text-foreground hover:bg-border/30"
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* CTA at the bottom */}
              <div className="px-6 py-6 border-t border-border">
                <ContactCTA isHome={isHome} className="w-full justify-center" />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

/**
 * Same-page anchor when we're already on the homepage (smooth in-page scroll);
 * router-aware `/#hash` link from a sub-page (App's useRouteScroll picks it up).
 */
function NavLink({
  hash,
  isHome,
  children,
  className,
}: {
  hash: string
  isHome: boolean
  children: React.ReactNode
  className?: string
}) {
  const defaultCls =
    'text-foreground-muted hover:text-foreground transition-colors font-medium'
  if (isHome) {
    // Same-page anchor: use native <a href="#section"> so the browser does
    // the smooth-scroll without a routing round-trip.
    return (
      <a href={hash} className={className ?? defaultCls}>
        {children}
      </a>
    )
  }
  return (
    <Link to={`/${hash}`} className={className ?? defaultCls}>
      {children}
    </Link>
  )
}

/**
 * "Get in Touch" CTA — styled link variant of the primary Button. Renders
 * as an in-page `<a>` on the homepage so the browser smooth-scrolls, or
 * a router `<Link>` from sub-pages so we navigate home then scroll.
 */
function ContactCTA({
  isHome,
  size = 'md',
  className,
}: {
  isHome: boolean
  size?: 'sm' | 'md'
  className?: string
}) {
  const sizeCls = size === 'sm' ? 'text-sm px-4 py-2 gap-1.5' : 'text-base px-6 py-3 gap-2'
  const base =
    'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl ' +
    'bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/25 hover:shadow-accent/40 ' +
    'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background'
  const cls = cn(base, sizeCls, className)
  if (isHome) {
    return (
      <a href="#contact" className={cls}>
        Get in Touch
      </a>
    )
  }
  return (
    <Link to="/#contact" className={cls}>
      Get in Touch
    </Link>
  )
}
