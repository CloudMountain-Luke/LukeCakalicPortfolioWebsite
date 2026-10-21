import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties } from 'react'

const LogoModelCanvas = lazy(() => import('./LogoModelCanvas'))

/**
 * A 3D logo the visitor can spin with a mouse or finger. Shows the flat
 * poster until the tile scrolls near the viewport, then loads three.js and
 * the GLB. The prerendered HTML and any device without WebGL keep the
 * poster.
 *
 * The tile sits inside a card <Link>: a tap still opens the project, but a
 * drag that turned the logo swallows the click so the page doesn't change.
 */
export function LogoModel3D({
  src,
  poster,
  alt,
  posterClassName,
  posterStyle,
}: {
  src: string
  poster: string
  alt: string
  posterClassName?: string
  posterStyle?: CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)
  const [inView, setInView] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [webgl, setWebgl] = useState(true)
  const down = useRef<{ x: number; y: number } | null>(null)
  const dragged = useRef(false)

  useEffect(() => {
    const c = document.createElement('canvas')
    setWebgl(!!(c.getContext('webgl2') || c.getContext('webgl')))
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) {
      setNear(true)
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting)
        if (e.isIntersecting) setNear(true)
      },
      { rootMargin: '200px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const live = near && webgl

  return (
    <div
      ref={ref}
      className="absolute inset-0 flex items-center justify-center"
      onPointerDown={(e) => {
        down.current = { x: e.clientX, y: e.clientY }
        dragged.current = false
      }}
      onPointerMove={(e) => {
        if (down.current && Math.hypot(e.clientX - down.current.x, e.clientY - down.current.y) > 6) {
          dragged.current = true
        }
      }}
      onClickCapture={(e) => {
        if (dragged.current) {
          e.preventDefault()
          e.stopPropagation()
          dragged.current = false
        }
        down.current = null
      }}
    >
      <img
        src={poster}
        alt={alt}
        className={`${posterClassName ?? ''} transition-opacity duration-500 ${loaded ? 'opacity-0' : 'opacity-100'}`}
        style={posterStyle}
        loading="lazy"
      />
      {live && (
        <Suspense fallback={null}>
          <LogoModelCanvas src={src} active={inView} onLoaded={() => setLoaded(true)} />
        </Suspense>
      )}
      {live && (
        <span className="pointer-events-none absolute bottom-3 left-3 px-2 py-1 rounded-full bg-black/50 text-white/80 text-[11px] tracking-wide">
          Drag to turn
        </span>
      )}
    </div>
  )
}
