import { useTheme } from '../../hooks/useTheme'
import { cn } from '../../lib/utils'

interface ThemeToggleProps {
  className?: string
}

/**
 * Sun/moon icon button. Sits in the nav; one click swaps themes. Both
 * icons render simultaneously and cross-fade via opacity — gives the
 * toggle a tactile feel without animating layout. Falls back to a static
 * cross-fade (no rotation) when prefers-reduced-motion is set, via CSS.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggle } = useTheme()
  const nextLabel = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={nextLabel}
      title={nextLabel}
      className={cn(
        'relative inline-flex h-9 w-9 items-center justify-center rounded-full',
        'text-foreground-muted hover:text-foreground',
        'transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50',
        className
      )}
    >
      {/* Sun — shown in dark mode (signaling the next state, light). */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          'absolute transition-opacity duration-300 motion-reduce:transition-none',
          theme === 'dark' ? 'opacity-100' : 'opacity-0'
        )}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
      {/* Moon — shown in light mode (signaling the next state, dark). */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          'absolute transition-opacity duration-300 motion-reduce:transition-none',
          theme === 'light' ? 'opacity-100' : 'opacity-0'
        )}
        aria-hidden="true"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    </button>
  )
}
