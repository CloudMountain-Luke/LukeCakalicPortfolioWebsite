import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedDialog } from '../ui/Dialog'

interface GalleryImage {
  src: string
  alt: string
  title?: string
}

interface GalleryProps {
  images: GalleryImage[]
  className?: string
}

export function Gallery({ images, className = '' }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const openLightbox = useCallback((index: number) => {
    setSelectedIndex(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null)
  }, [])

  const goToPrevious = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1)
    }
  }, [selectedIndex, images.length])

  const goToNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1)
    }
  }, [selectedIndex, images.length])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
      if (e.key === 'Escape') closeLightbox()
    },
    [goToPrevious, goToNext, closeLightbox]
  )

  return (
    <div className={className}>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <motion.button
            key={index}
            className="relative aspect-[4/3] overflow-hidden rounded-xl group focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
            onClick={() => openLightbox(index)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {image.title && (
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-medium text-sm">{image.title}</p>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatedDialog
        open={selectedIndex !== null}
        onOpenChange={(open) => !open && closeLightbox()}
      >
        <div
          className="relative w-full h-full flex items-center justify-center p-4"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {selectedIndex !== null && (
            <>
              {/* Navigation buttons */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors focus:outline-none"
                aria-label="Previous image"
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
                  className="text-white"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedIndex}
                  src={images[selectedIndex].src}
                  alt={images[selectedIndex].alt}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>

              <button
                onClick={goToNext}
                className="absolute right-4 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors focus:outline-none"
                aria-label="Next image"
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
                  className="text-white"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white text-sm">
                {selectedIndex + 1} / {images.length}
              </div>

              {/* Title */}
              {images[selectedIndex].title && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white font-medium">
                  {images[selectedIndex].title}
                </div>
              )}
            </>
          )}
        </div>
      </AnimatedDialog>
    </div>
  )
}
