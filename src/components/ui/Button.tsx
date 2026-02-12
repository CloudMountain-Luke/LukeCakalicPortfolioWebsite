import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none',
          {
            // Variants
            'bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/25 hover:shadow-accent/40': variant === 'primary',
            'bg-glass hover:bg-glass-hover border border-border hover:border-border-hover text-foreground': variant === 'secondary',
            'bg-transparent hover:bg-glass text-foreground-muted hover:text-foreground': variant === 'ghost',
            'border border-border hover:border-accent text-foreground hover:text-accent bg-transparent': variant === 'outline',
            // Sizes
            'text-sm px-4 py-2 gap-1.5': size === 'sm',
            'text-base px-6 py-3 gap-2': size === 'md',
            'text-lg px-8 py-4 gap-2.5': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
