import { Container } from '../layout/Container'
import { FadeInOnScroll } from '../shared/ScrollAnimations'

const tools = [
  'Figma',
  'Adobe XD',
  'Photoshop',
  'Illustrator',
  'React',
  'TypeScript',
  'Vite',
  'Tailwind',
  'Three.js',
  'Supabase',
  'Stripe',
  'Cloudflare',
  'Replicate',
  'fal.ai',
  'Anthropic',
  'OpenAI',
]

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual */}
          <FadeInOnScroll direction="left">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />

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
                      Senior Product Designer + Engineer
                    </p>
                    <p className="text-foreground-subtle text-sm mt-1">
                      Colorado Springs, CO
                    </p>
                  </div>
                </div>

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
                  I'm Luke. I design SaaS products and ship the code that runs
                  them. I work the seam between product design and engineering,
                  where most teams need two people to do what I do alone.
                </p>
                <p>
                  Owned <span className="text-foreground">Cloud Mountain Graphics</span>{' '}
                  for over a decade, working with clients across green tech,
                  aerospace parts, telecom supply, manufacturing, and home
                  inspection. Held formal UX/UI Designer roles at scaled
                  software companies, designing customer portals and
                  onboarding flows in Agile teams. Specifics on LinkedIn.
                </p>
                <p>
                  The last two years I have been heads-down building
                  AI-native SaaS products inside CMG R&D. Three featured here:{' '}
                  <span className="text-foreground">Portal747</span> (an AI
                  build pipeline),{' '}
                  <span className="text-foreground">Upscale Forge</span> (a
                  creative suite), and{' '}
                  <span className="text-foreground">GoInspect.ai</span> (a
                  vertical SaaS for home inspectors heading into closed beta).
                  All built and prototyped to launch readiness, with others
                  rolling out as their respective branding lands.
                </p>
                <p>
                  An earlier career in production work taught me that
                  acceptance criteria and preflight checks are what separate
                  "the project shipped" from "the project shipped twice."
                </p>
                <p className="text-foreground">
                  What I am looking for next: a senior product design or
                  design engineering role at a company shipping AI-native
                  products, where production discipline gets put to work on a
                  team that values it. Remote preferred. On-site or hybrid in
                  the Colorado Front Range works too.
                </p>
              </div>
            </FadeInOnScroll>

            {/* Tools (plain flex-wrap, no per-item stagger to avoid layout breakage) */}
            <FadeInOnScroll direction="right" delay={0.3}>
              <h3 className="font-display text-xl font-semibold text-foreground mt-10 mb-6">
                Stack & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-4 py-2 rounded-full bg-glass border border-border text-foreground-muted hover:border-accent hover:text-accent transition-colors"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </Container>
    </section>
  )
}
