import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'lcw:theme'

function readStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null
  try {
    const v = window.localStorage.getItem(STORAGE_KEY)
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    return null
  }
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  const stored = readStoredTheme()
  if (stored) return stored
  if (window.matchMedia?.('(prefers-color-scheme: light)').matches) return 'light'
  return 'dark'
}

/**
 * Theme state with three sources of truth (in priority order):
 *   1. User pick — persisted to localStorage by setTheme/toggle.
 *   2. System preference — `prefers-color-scheme: light/dark`, honored on
 *      load AND when it changes live (only when no user pick exists).
 *   3. Default — dark.
 *
 * The pre-hydration script in index.html applies the correct
 * `data-theme` attribute BEFORE React mounts so there's no flash of the
 * wrong theme. This hook just keeps that attribute in sync afterwards.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)

  // Sync the attribute + persistence on every theme change.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Storage may be disabled (private browsing); attribute still applies.
    }
  }, [theme])

  // Live `prefers-color-scheme` updates — only honor when the user hasn't
  // made an explicit pick yet. Once they click the toggle, their choice
  // wins until they clear it.
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: light)')
    if (!mq) return
    const handler = (e: MediaQueryListEvent) => {
      if (readStoredTheme()) return
      setThemeState(e.matches ? 'light' : 'dark')
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const setTheme = useCallback((next: Theme) => setThemeState(next), [])
  const toggle = useCallback(() => setThemeState(t => (t === 'dark' ? 'light' : 'dark')), [])

  return { theme, setTheme, toggle }
}
