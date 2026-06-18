import { motion } from 'framer-motion'
import { Container } from '../layout/Container'
import { Button } from '../ui/Button'

export function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/*
       * Static blurred background. Previously used animated motion.div orbs
       * with blur-[100px] and infinite position/scale loops. Framer Motion
       * keeps those animations running even when the section is scrolled
       * out of view, which kept the GPU repainting massive blurred areas
       * every frame and caused page-wide scroll lag. Static divs give the
       * same look at zero ongoing cost.
       */}
      <div className="absolute inset-0">
        {/* Atmospheric background image */}
        <img
          src="/images/sections/hero-atmosphere.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.15]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary/90 to-background" />

        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-500/10 blur-[100px]" />

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <Container className="relative z-10 pt-24 md:pt-0">
        <div className="max-w-5xl mx-auto text-center">
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass border border-border mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-foreground-muted">
              Open to senior product roles and select client work
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground"
          >
            Senior Product
            <br />
            <span className="gradient-accent">Designer + Engineer</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 text-lg md:text-xl text-foreground-muted max-w-3xl mx-auto"
          >
            I design SaaS products and ship the code that runs them.
            Five AI-native products built and prototyped end to end in the last
            two years. UX research and brand systems through React, TypeScript,
            and production deploys.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" onClick={() => scrollToSection('#work')}>
              See the Work
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
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Button>
            <Button variant="secondary" size="lg" onClick={() => scrollToSection('#process')}>
              How I Work
            </Button>
            <Button variant="secondary" size="lg" onClick={() => scrollToSection('#contact')}>
              Get in Touch
            </Button>
          </motion.div>

          {/* Stats bar (no year counts) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              { value: '5', label: 'AI-Native SaaS Products' },
              { value: 'Design', sub: '+ Engineering', label: 'Built end to end' },
              { value: 'Pre-Launch', label: 'Heading into closed beta' },
              { value: 'Remote', sub: '/ Colorado', label: 'Available now' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center px-4 py-4 rounded-xl bg-glass border border-border"
              >
                <div className="font-display text-xl md:text-2xl font-bold text-foreground">
                  {stat.value}
                  {stat.sub && (
                    <span className="block text-sm md:text-base font-medium text-foreground-muted mt-0.5">
                      {stat.sub}
                    </span>
                  )}
                </div>
                <div className="text-xs text-foreground-subtle mt-2">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>

      {/*
       * Scroll indicator using CSS animate-bounce instead of an infinite
       * Framer Motion loop. CSS keyframe animations are GPU-composited and
       * cheap; the previous JS-driven motion.div looped forever and added
       * to the scroll-jank.
       */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-foreground-subtle flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 rounded-full bg-foreground-muted" />
        </div>
      </div>
    </section>
  )
}
