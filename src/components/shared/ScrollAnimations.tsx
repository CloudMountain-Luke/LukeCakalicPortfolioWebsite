import { motion, useInView, type Variants } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface FadeInOnScrollProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  once?: boolean
}

export function FadeInOnScroll({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  distance = 30,
  once = true,
}: FadeInOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '200px' })

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance }
      case 'down':
        return { y: -distance }
      case 'left':
        return { x: distance }
      case 'right':
        return { x: -distance }
      case 'none':
      default:
        return {}
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...getInitialPosition() }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...getInitialPosition() }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggeredRevealProps {
  children: ReactNode[]
  className?: string
  childClassName?: string
  staggerDelay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
  once?: boolean
}

export function StaggeredReveal({
  children,
  className,
  childClassName,
  staggerDelay = 0.1,
  duration = 0.5,
  direction = 'up',
  distance = 30,
  once = true,
}: StaggeredRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '200px' })

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance }
      case 'down':
        return { y: -distance }
      case 'left':
        return { x: distance }
      case 'right':
        return { x: -distance }
      default:
        return { y: distance }
    }
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, ...getInitialPosition() },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, ease: 'easeOut' },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={itemVariants} className={childClassName}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

interface SlideRevealProps {
  children: ReactNode
  className?: string
  direction?: 'left' | 'right'
  delay?: number
  duration?: number
  once?: boolean
}

export function SlideReveal({
  children,
  className,
  direction = 'left',
  delay = 0,
  duration = 0.6,
  once = true,
}: SlideRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-100px' })

  return (
    <div ref={ref} className={`overflow-hidden ${className || ''}`}>
      <motion.div
        initial={{ x: direction === 'left' ? '-100%' : '100%' }}
        animate={isInView ? { x: 0 } : { x: direction === 'left' ? '-100%' : '100%' }}
        transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

interface ScaleOnScrollProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  initialScale?: number
  once?: boolean
}

export function ScaleOnScroll({
  children,
  className,
  delay = 0,
  duration = 0.5,
  initialScale = 0.9,
  once = true,
}: ScaleOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '200px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: initialScale }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: initialScale }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
