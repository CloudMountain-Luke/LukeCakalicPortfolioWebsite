import { Container } from '../layout/Container'
import { FadeInOnScroll, StaggeredReveal } from '../shared/ScrollAnimations'

const tools = [
  'Adobe Photoshop',
  'Adobe Illustrator',
  'Adobe InDesign',
  'Adobe XD',
  'Figma',
  'After Effects',
  'Premiere Pro',
  'Lightroom',
]

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image / Visual */}
          <FadeInOnScroll direction="left">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />

              {/* Main content area - can be replaced with a photo */}
              <div className="relative aspect-square rounded-2xl border border-border bg-gradient-to-br from-background-secondary to-background-tertiary overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center mb-6">
                      <span className="font-display text-5xl font-bold text-white">LC</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      Luke Cakalic
                    </h3>
                    <p className="text-foreground-muted mt-2">
                      Designer & Creative Professional
                    </p>
                  </div>
                </div>

                {/* Grid pattern overlay */}
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                  }}
                />
              </div>
            </div>
          </FadeInOnScroll>

          {/* Content */}
          <div>
            <FadeInOnScroll direction="right">
              <h2 className="section-heading">
                About <span className="gradient-accent">Me</span>
              </h2>
              <div className="mt-6 space-y-4 text-foreground-muted">
                <p>
                  With over 15 years of experience in design, I've had the privilege of working
                  with businesses of all sizes—from startups to established enterprises—helping
                  them create visual identities and digital experiences that truly resonate.
                </p>
                <p>
                  Based in Colorado Springs, I specialize in web design, UI/UX, vehicle wraps,
                  and comprehensive brand identity packages. My approach combines creativity with
                  strategic thinking to deliver designs that not only look great but also achieve
                  real business results.
                </p>
                <p>
                  When I'm not designing, you'll find me exploring the Colorado outdoors or
                  staying up to date with the latest design trends and technologies.
                </p>
              </div>
            </FadeInOnScroll>

            {/* Tools */}
            <FadeInOnScroll direction="right" delay={0.3}>
              <h3 className="font-display text-xl font-semibold text-foreground mt-10 mb-6">
                Tools & Software
              </h3>
              <StaggeredReveal
                className="flex flex-wrap gap-2"
                staggerDelay={0.05}
              >
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-4 py-2 rounded-full bg-glass border border-border text-foreground-muted hover:border-accent hover:text-accent transition-colors"
                  >
                    {tool}
                  </span>
                ))}
              </StaggeredReveal>
            </FadeInOnScroll>
          </div>
        </div>
      </Container>
    </section>
  )
}
