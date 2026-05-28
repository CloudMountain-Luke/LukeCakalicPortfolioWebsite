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

            {/* Mobile theme toggle + menu button */}
            <div className="md:hidden flex items-center gap-1">
              <ThemeToggle />
              <button
                className="p-2 text-foreground"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden bg-background/95 backdrop-blur-lg border-b border-border"
          >
            <Container>
              <div className="py-4 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.hash}
                    hash={link.hash}
                    isHome={isHome}
                    className="py-3 text-left text-foreground-muted hover:text-foreground transition-colors font-medium block"
                  >
                    {link.label}
                  </NavLink>
                ))}
                <ContactCTA isHome={isHome} className="mt-2 w-full" />
              </div>
            </Container>
          </motion.div>
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
