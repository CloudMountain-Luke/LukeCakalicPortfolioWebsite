import { useState, useMemo, useEffect, useRef, useCallback, lazy, Suspense } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container } from '../layout/Container'
import { FadeInOnScroll } from '../shared/ScrollAnimations'
import { portfolioItems, categories, type PortfolioItem, type Category, type ImageDisplay } from '../../data/portfolio'

const Gallery3D = lazy(() => import('./Gallery3D').then(m => ({ default: m.Gallery3D })))

function getImageClasses(item: PortfolioItem): string {
  switch (item.imageDisplay) {
    case 'cover-top':
      return 'object-cover object-top'
    case 'contain':
      return 'object-contain p-4'
    default:
      return 'object-cover'
  }
}

function getImageBg(item: PortfolioItem): string {
  if (item.imageDisplay !== 'contain') return ''
  // Logos designed for light backgrounds get a white card so dark text
  // and subtitles stay readable.
  if (item.lightCardBg) return 'bg-white'
  return 'bg-background-tertiary'
}

function getTileAspect(display?: ImageDisplay): string {
  // Cover-top tiles show only the header band of website screenshots.
  // Contain tiles keep a more square ratio so logos display well.
  return display === 'cover-top' ? 'aspect-[16/9]' : 'aspect-[4/3]'
}

const categoryLabels: Record<Category | 'all', string> = {
  all: 'All Work',
  'saas-products': 'SaaS Products',
  'web-design': 'Web / UI/UX',
  'brand-identity': 'Brand Identity',
}

const statusLabels: Record<NonNullable<NonNullable<PortfolioItem['caseStudy']>['status']>, string> = {
  'pre-launch': 'Pre-Launch',
  'closed-beta': 'Closed Beta',
  'live': 'Live',
  'shipped': 'Shipped',
}

/**
 * Static "gallery preview" shown when the user toggles to 3D Gallery view
 * BUT has not yet committed to activating the WebGL scene. Mounting the
 * real Gallery3D component immediately kicks Three.js into a 60fps
 * useFrame loop, which slows the rest of the page even before the user
 * enters pointer-lock. This poster is pure CSS — perspective transforms
 * over real portfolio thumbnails — so it costs nothing to render. A second
 * explicit click on the "Enter the 3D Gallery" CTA mounts Gallery3D.
 */
function GalleryPoster({
  items,
  onActivate,
}: {
  items: PortfolioItem[]
  onActivate: () => void
}) {
  // Six frames split across two walls. Closest-to-camera first; depth
  // increases as the frame recedes toward the vanishing point.
  const leftItems = items.slice(0, 3)
  const rightItems = items.slice(3, 6)

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0a15] select-none">
      {/* Hallway floor (bottom triangle, dark purple) + ceiling (top triangle, near-black). */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#1a1a2e] via-[#252540] to-[#0a0a15]"
        style={{ clipPath: 'polygon(0 0, 100% 0, 62% 100%, 38% 100%)' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#1e1e32] via-[#252540] to-[#0a0a15]"
        style={{ clipPath: 'polygon(38% 0, 62% 0, 100% 100%, 0 100%)' }}
      />

      {/* Vanishing-point violet glow — matches the cyberpunk Gallery3D palette. */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-violet-600/25 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-violet-400/40 blur-2xl" />

      {/* Left-wall frames in perspective. */}
      {leftItems.map((item, i) => {
        const size = 140 - i * 26
        return (
          <div
            key={`L-${item.id}`}
            className="absolute rounded-sm bg-cover bg-center ring-1 ring-violet-400/40 shadow-[0_0_40px_rgba(99,102,241,0.35)]"
            style={{
              left: `${8 + i * 8}%`,
              top: `${42 - i * 1}%`,
              width: `${size}px`,
              height: `${size * 0.72}px`,
              backgroundImage: `url(${item.images[0]})`,
              transform: 'perspective(500px) rotateY(32deg)',
              transformOrigin: 'right center',
              opacity: 1 - i * 0.18,
            }}
            aria-hidden="true"
          />
        )
      })}

      {/* Right-wall frames mirrored. */}
      {rightItems.map((item, i) => {
        const size = 140 - i * 26
        return (
          <div
            key={`R-${item.id}`}
            className="absolute rounded-sm bg-cover bg-center ring-1 ring-violet-400/40 shadow-[0_0_40px_rgba(99,102,241,0.35)]"
            style={{
              right: `${8 + i * 8}%`,
              top: `${42 - i * 1}%`,
              width: `${size}px`,
              height: `${size * 0.72}px`,
              backgroundImage: `url(${item.images[0]})`,
              transform: 'perspective(500px) rotateY(-32deg)',
              transformOrigin: 'left center',
              opacity: 1 - i * 0.18,
            }}
            aria-hidden="true"
          />
        )
      })}

      {/* Activation CTA. Anchored low so the section header above and the
          hallway perspective below remain readable. */}
      <div className="absolute inset-x-0 bottom-0 pb-20 flex flex-col items-center pointer-events-none">
        <button
          onClick={onActivate}
          className="group pointer-events-auto inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-accent text-white font-medium shadow-2xl shadow-accent/40 hover:shadow-accent/60 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent/30"
          aria-label="Activate interactive 3D gallery"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:translate-x-1 transition-transform"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
          Enter the 3D Gallery
        </button>
        <p className="mt-3 text-white/60 text-sm pointer-events-none">
          WASD to walk · Mouse to look · Click a frame for the case study
        </p>
        <p className="mt-1 text-white/35 text-xs pointer-events-none">
          Preview — interactive scene loads on tap
        </p>
      </div>
    </div>
  )
}

export function Portfolio() {
  // Default to grid view: lighter on the browser, 3D Canvas only mounts when toggled.
  const [viewMode, setViewMode] = useState<'gallery' | 'grid'>('grid')
  // Two-stage gating: viewMode === 'gallery' shows the static poster.
  // galleryActivated === true is the only state that mounts Three.js.
  // Resets to false whenever we leave the gallery section (toggle to grid,
  // Esc key, or scroll out of view via IntersectionObserver below).
  const [galleryActivated, setGalleryActivated] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all')
  const sectionRef = useRef<HTMLElement>(null)
  const navigate = useNavigate()

  // Featured items to render as "frames on the wall" in the poster. Mirrors
  // Gallery3D's own filter (featured-only) so the preview matches what the
  // 3D scene will actually show.
  const posterItems = useMemo(
    () => portfolioItems.filter((i) => i.featured).slice(0, 6),
    [],
  )

  // Switching from gallery → grid also unmounts the active 3D scene so
  // the GPU isn't left running in the background.
  const switchViewMode = useCallback((mode: 'gallery' | 'grid') => {
    if (mode === 'grid') setGalleryActivated(false)
    setViewMode(mode)
  }, [])

  // Esc deactivates Gallery3D when the user is NOT in pointer-lock (pointer
  // lock has its own Esc handling inside Gallery3D). The keydown handler
  // checks for document.pointerLockElement === null before acting.
  useEffect(() => {
    if (!galleryActivated) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (typeof document !== 'undefined' && document.pointerLockElement) return
      setGalleryActivated(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [galleryActivated])

  // Auto-deactivate when the section scrolls out of view. Keeps the GPU
  // idle when the user has moved on to the rest of the page. Re-entering
  // the section shows the poster again, requiring a fresh activation.
  useEffect(() => {
    if (!galleryActivated || !sectionRef.current) return
    const node = sectionRef.current
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry.isIntersecting) setGalleryActivated(false)
      },
      { threshold: 0 },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [galleryActivated])

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return portfolioItems
    return portfolioItems.filter((item) => item.category === selectedCategory)
  }, [selectedCategory])

  return (
    <section
      ref={sectionRef}
      id="work"
      className={viewMode === 'gallery' ? '' : 'py-24 md:py-32 bg-background-secondary'}
    >
      {viewMode === 'gallery' && (
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 z-10 pt-6 pb-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none">
            <Container>
              <div className="text-center pointer-events-auto">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                  My <span className="gradient-accent">Portfolio</span>
                </h2>
                <p className="text-white/60 text-sm mt-2 max-w-xl mx-auto">
                  Explore the work in an immersive 3D gallery, or switch to grid view.
                </p>
                <div className="flex justify-center gap-2 mt-4">
                  <button
                    onClick={() => switchViewMode('gallery')}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-accent text-white shadow-lg shadow-accent/25 flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3v18"/>
                      <path d="M3 12h18"/>
                      <path d="m3.6 9.4 1.4-1.4"/>
                      <path d="m3.6 14.6 1.4 1.4"/>
                      <path d="M20.4 9.4 19 8"/>
                      <path d="m20.4 14.6-1.4 1.4"/>
                    </svg>
                    3D Gallery
                  </button>
                  <button
                    onClick={() => switchViewMode('grid')}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="7" height="7" x="3" y="3" rx="1"/>
                      <rect width="7" height="7" x="14" y="3" rx="1"/>
                      <rect width="7" height="7" x="14" y="14" rx="1"/>
                      <rect width="7" height="7" x="3" y="14" rx="1"/>
                    </svg>
                    Grid View
                  </button>
                </div>
              </div>
            </Container>
          </div>

          {galleryActivated ? (
            <>
              <Suspense fallback={
                <div className="w-full h-screen bg-background-tertiary flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-foreground-muted">Loading 3D Gallery...</p>
                  </div>
                </div>
              }>
                {/*
                  Clicking a frame in 3D used to open the modal. Now it
                  navigates to the dedicated case-study page. Gallery3D
                  already releases pointer-lock inside its onClick handler
                  before firing onSelectItem (Gallery3D.tsx ~line 529), so
                  the navigation happens with the cursor unlocked.
                */}
                <Gallery3D onSelectItem={(item) => navigate(`/work/${item.id}`)} />
              </Suspense>
              <button
                onClick={() => setGalleryActivated(false)}
                className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-sm border border-white/20 hover:bg-black/80 transition-colors"
                aria-label="Exit 3D gallery"
              >
                Exit Gallery
              </button>
            </>
          ) : (
            <GalleryPoster
              items={posterItems}
              onActivate={() => setGalleryActivated(true)}
            />
          )}
        </div>
      )}

      {viewMode === 'grid' && (
        <Container>
          <FadeInOnScroll className="text-center mb-12">
            <h2 className="section-heading">
              My <span className="gradient-accent">Portfolio</span>
            </h2>
            <p className="section-subheading mt-4 mx-auto">
              Three SaaS products and a decade of client work. Click any tile for the case study.
            </p>

            <div className="flex justify-center gap-2 mt-6">
              <button
                onClick={() => switchViewMode('gallery')}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 bg-glass border border-border text-foreground-muted hover:border-border-hover hover:text-foreground"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v18"/>
                  <path d="M3 12h18"/>
                  <path d="m3.6 9.4 1.4-1.4"/>
                  <path d="m3.6 14.6 1.4 1.4"/>
                  <path d="M20.4 9.4 19 8"/>
                  <path d="m20.4 14.6-1.4 1.4"/>
                </svg>
                3D Gallery
              </button>
              <button
                onClick={() => switchViewMode('grid')}
                className="px-4 py-2 rounded-full text-sm font-medium bg-accent text-white shadow-lg shadow-accent/25 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="7" height="7" x="3" y="3" rx="1"/>
                  <rect width="7" height="7" x="14" y="3" rx="1"/>
                  <rect width="7" height="7" x="14" y="14" rx="1"/>
                  <rect width="7" height="7" x="3" y="14" rx="1"/>
                </svg>
                Grid View
              </button>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.1} className="flex flex-wrap justify-center gap-2 mb-12">
            {(['all', ...categories] as const).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-accent text-white shadow-lg shadow-accent/25'
                    : 'bg-glass border border-border text-foreground-muted hover:border-border-hover hover:text-foreground'
                }`}
              >
                {categoryLabels[category]}
              </button>
            ))}
          </FadeInOnScroll>

          {/*
           * Plain grid: no `layout` prop, no AnimatePresence. Filter
           * changes mount/unmount items without FLIP animations. Tiles
           * are now real <Link>s — they render as <a href="/work/...">
           * which the prerender plugin's link-discovery walks at build
           * time to enumerate routes to snapshot.
           */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="animate-fade-in-up">
                  <Link
                    to={`/work/${item.id}`}
                    className="group block w-full text-left rounded-2xl overflow-hidden border border-border bg-glass hover:border-border-hover transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <div className={`relative ${getTileAspect(item.imageDisplay)} overflow-hidden ${getImageBg(item)} ${item.imageMaxWidth ? 'flex items-center justify-center' : ''}`}>
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className={
                          item.imageMaxWidth
                            ? 'h-auto object-contain transition-transform duration-500 group-hover:scale-105'
                            : `w-full h-full ${getImageClasses(item)} transition-transform duration-500 group-hover:scale-105`
                        }
                        style={item.imageMaxWidth ? { maxWidth: item.imageMaxWidth } : undefined}
                        loading="lazy"
                      />
                      {item.caseStudy?.status && (
                        <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-accent/90 backdrop-blur-sm text-white text-xs font-medium">
                          {statusLabels[item.caseStudy.status]}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-accent text-xs font-medium uppercase tracking-wider">
                          {categoryLabels[item.category]}
                        </span>
                        <h3 className="text-white font-semibold mt-1">{item.title}</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-display font-semibold text-foreground group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-foreground-muted text-sm mt-1">{item.client}</p>
                      <p className="text-accent text-xs mt-2 font-medium">
                        {item.caseStudy ? 'Read case study →' : 'View project →'}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-foreground-muted">No projects found in this category.</p>
            </div>
          )}
        </Container>
      )}
    </section>
  )
}
