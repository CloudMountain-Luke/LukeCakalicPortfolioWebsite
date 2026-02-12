import { useState, useMemo, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '../layout/Container'
import { FadeInOnScroll } from '../shared/ScrollAnimations'
import { AnimatedDialog } from '../ui/Dialog'
import { portfolioItems, categories, type PortfolioItem, type Category, type ImageDisplay } from '../../data/portfolio'

// Lazy load 3D gallery to avoid loading Three.js upfront
const Gallery3D = lazy(() => import('./Gallery3D').then(m => ({ default: m.Gallery3D })))

function getImageClasses(display?: ImageDisplay): string {
  switch (display) {
    case 'cover-top':
      return 'object-cover object-top'
    case 'contain':
      return 'object-contain p-4'
    default:
      return 'object-cover'
  }
}

function getImageBg(display?: ImageDisplay): string {
  return display === 'contain' ? 'bg-background-tertiary' : ''
}

const categoryLabels: Record<Category | 'all', string> = {
  all: 'All Work',
  'web-design': 'Web / UI/UX',
  'vehicle-wraps': 'Vehicle Wraps',
  'brand-identity': 'Brand Identity',
  'print-marketing': 'Print Marketing',
  'specialized': 'Specialized',
}

export function Portfolio() {
  const [viewMode, setViewMode] = useState<'gallery' | 'grid'>('gallery')
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all')
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return portfolioItems
    return portfolioItems.filter((item) => item.category === selectedCategory)
  }, [selectedCategory])

  const openLightbox = (item: PortfolioItem, imageIndex: number = 0) => {
    setSelectedItem(item)
    setSelectedImageIndex(imageIndex)
  }

  const closeLightbox = () => {
    setSelectedItem(null)
    setSelectedImageIndex(0)
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedItem) return
    const newIndex =
      direction === 'prev'
        ? selectedImageIndex === 0
          ? selectedItem.images.length - 1
          : selectedImageIndex - 1
        : selectedImageIndex === selectedItem.images.length - 1
        ? 0
        : selectedImageIndex + 1
    setSelectedImageIndex(newIndex)
  }

  return (
    <section id="work" className={viewMode === 'gallery' ? '' : 'py-24 md:py-32 bg-background-secondary'}>
      {/* 3D Gallery View - Full width, no container */}
      {viewMode === 'gallery' && (
        <div className="relative">
          {/* Floating header overlay */}
          <div className="absolute top-0 left-0 right-0 z-10 pt-6 pb-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none">
            <Container>
              <div className="text-center pointer-events-auto">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                  My <span className="gradient-accent">Portfolio</span>
                </h2>
                <p className="text-white/60 text-sm mt-2 max-w-xl mx-auto">
                  Explore my work in an immersive 3D gallery
                </p>
                <div className="flex justify-center gap-2 mt-4">
                  <button
                    onClick={() => setViewMode('gallery')}
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
                    onClick={() => setViewMode('grid')}
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

          <Suspense fallback={
            <div className="w-full h-screen bg-background-tertiary flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-foreground-muted">Loading 3D Gallery...</p>
              </div>
            </div>
          }>
            <Gallery3D onSelectItem={(item) => openLightbox(item)} />
          </Suspense>
        </div>
      )}

      {/* Grid View - with Container */}
      {viewMode === 'grid' && (
        <Container>
          <FadeInOnScroll className="text-center mb-12">
            <h2 className="section-heading">
              My <span className="gradient-accent">Portfolio</span>
            </h2>
            <p className="section-subheading mt-4 mx-auto">
              Browse through my work across different categories and disciplines.
            </p>

            {/* View Mode Toggle */}
            <div className="flex justify-center gap-2 mt-6">
              <button
                onClick={() => setViewMode('gallery')}
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
                onClick={() => setViewMode('grid')}
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

          {/* Category Filter */}
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

          {/* Portfolio Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    onClick={() => openLightbox(item)}
                    className="group w-full text-left rounded-2xl overflow-hidden border border-border bg-glass hover:border-border-hover transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <div className={`relative aspect-[4/3] overflow-hidden ${getImageBg(item.imageDisplay)}`}>
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className={`w-full h-full ${getImageClasses(item.imageDisplay)} transition-transform duration-500 group-hover:scale-105`}
                        loading="lazy"
                      />
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
                    </div>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-foreground-muted">No projects found in this category.</p>
            </div>
          )}
        </Container>
      )}

      {/* Lightbox */}
      <AnimatedDialog open={selectedItem !== null} onOpenChange={() => closeLightbox()}>
        {selectedItem && (
          <div className="bg-background-secondary rounded-2xl border border-border overflow-hidden max-h-[90vh] flex flex-col">
            {/* Image */}
            <div className="relative flex-1 min-h-0">
              <div className={`relative max-h-[60vh] ${selectedItem.imageDisplay === 'cover-top' ? 'overflow-y-auto' : ''}`}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImageIndex}
                    src={selectedItem.images[selectedImageIndex]}
                    alt={selectedItem.title}
                    className={`w-full ${selectedItem.imageDisplay === 'cover-top' ? 'h-auto' : 'h-full max-h-[60vh] object-contain'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </AnimatePresence>
              </div>

              {/* Navigation */}
              {selectedItem.images.length > 1 && (
                <>
                  <button
                    onClick={() => navigateImage('prev')}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m15 18-6-6 6-6"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => navigateImage('next')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  </button>

                  {/* Image counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
                    {selectedImageIndex + 1} / {selectedItem.images.length}
                  </div>
                </>
              )}
            </div>

            {/* Info */}
            <div className="p-6 border-t border-border">
              <span className="text-accent text-sm font-medium uppercase tracking-wider">
                {categoryLabels[selectedItem.category]}
              </span>
              <h3 className="font-display text-2xl font-bold text-foreground mt-1">
                {selectedItem.title}
              </h3>
              <p className="text-foreground-muted mt-2">{selectedItem.description}</p>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-foreground-subtle">
                <span>Client: {selectedItem.client}</span>
                {selectedItem.year && <span>Year: {selectedItem.year}</span>}
              </div>
              {selectedItem.services && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedItem.services.map((service) => (
                    <span
                      key={service}
                      className="px-3 py-1 text-sm rounded-full bg-glass border border-border text-foreground-muted"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </AnimatedDialog>
    </section>
  )
}
