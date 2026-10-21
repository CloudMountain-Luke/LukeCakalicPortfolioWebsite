import type { CSSProperties } from 'react'

/**
 * An <img> with an optional light-theme source. Both images render and
 * CSS in index.css hides the one that doesn't match data-theme, so the
 * prerendered HTML is right before React mounts and a theme toggle swaps
 * instantly. A display:none lazy image is never fetched.
 */
export function ThemedImage({
  src,
  lightSrc,
  alt,
  className,
  style,
  loading,
}: {
  src: string
  lightSrc?: string
  alt: string
  className?: string
  style?: CSSProperties
  loading?: 'lazy' | 'eager'
}) {
  if (!lightSrc || lightSrc === src) {
    return <img src={src} alt={alt} className={className} style={style} loading={loading} />
  }
  return (
    <>
      <img src={src} alt={alt} className={`theme-dark-only ${className ?? ''}`} style={style} loading={loading} />
      <img src={lightSrc} alt={alt} className={`theme-light-only ${className ?? ''}`} style={style} loading={loading} />
    </>
  )
}
