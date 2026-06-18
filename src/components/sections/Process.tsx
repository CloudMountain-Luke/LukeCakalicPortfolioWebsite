import { Container } from '../layout/Container'
import { FadeInOnScroll, StaggeredReveal } from '../shared/ScrollAnimations'

const stages = [
  {
    number: '01',
    title: 'Discover',
    description:
      'Research the user, the market, and the constraints. Audit what exists. Document the brief in a single page everyone signs off on.',
  },
  {
    number: '02',
    title: 'Define',
    description:
      'Sharp problem statement. Success metrics tied to outcomes, not vanity. Scope boundaries with what is in and what is out, written down.',
  },
  {
    number: '03',
    title: 'Design',
    description:
      'Wireframes, design system, prototypes. Test the riskiest assumption first. Validate with real users before pixel polish.',
  },
  {
    number: '04',
    title: 'Build',
    description:
      'Production code, production files. Versioned, reviewed, tested, integrated. Spec-driven with preflight checks before anything ships.',
  },
  {
    number: '05',
    title: 'Ship',
    description:
      'Staged release with monitoring and rollback ready. Real users in the loop early. Communication channel open while the dust settles.',
  },
  {
    number: '06',
    title: 'Refine',
    description:
      'Feedback, instrumentation, iteration. The next version is informed by the last. No project ends, it transitions to maintenance with a clean handoff.',
  },
]

export function Process() {
  return (
    <section id="process" className="py-24 md:py-32 bg-background-secondary">
      <Container>
        <FadeInOnScroll className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-accent text-sm font-medium uppercase tracking-wider">
            How I Work
          </span>
          <h2 className="section-heading mt-4">
            Production-grade process
            <br />
            <span className="gradient-accent">for digital products</span>
          </h2>
          <p className="section-subheading mt-6 mx-auto">
            Predictable outcomes, not creative gambles. Every project moves
            through the same six stages, with clear deliverables and
            acceptance criteria at each checkpoint. You know what you're
            getting before it ships — and so do I.
          </p>
        </FadeInOnScroll>

        {/* Process workspace banner */}
        <FadeInOnScroll delay={0.15} className="mb-12">
          <div className="relative w-full aspect-[21/6] rounded-2xl overflow-hidden group">
            <img
              src="/images/sections/process-workspace.jpg"
              alt="Organized design workspace"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-secondary via-background-secondary/40 to-background-secondary/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-background-secondary/60 via-transparent to-background-secondary/60" />
          </div>
        </FadeInOnScroll>

        <StaggeredReveal
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.08}
        >
          {stages.map((stage) => (
            <div
              key={stage.number}
              className="group relative p-8 rounded-2xl bg-glass border border-border hover:border-border-hover transition-all duration-300"
            >
              <div className="absolute top-6 right-6 font-display text-5xl font-bold text-foreground/[0.05] group-hover:text-accent/20 transition-colors duration-500">
                {stage.number}
              </div>
              <div className="relative">
                <div className="text-accent text-xs font-medium uppercase tracking-widest mb-2">
                  Stage {stage.number}
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  {stage.title}
                </h3>
                <p className="text-foreground-muted leading-relaxed">
                  {stage.description}
                </p>
              </div>
            </div>
          ))}
        </StaggeredReveal>

        <FadeInOnScroll delay={0.4} className="mt-16 max-w-3xl mx-auto">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-accent/[0.08] to-purple-500/[0.05] border border-accent/20">
            <p className="text-foreground-muted text-center leading-relaxed">
              <span className="text-foreground font-medium">Why this matters.</span>{' '}
              Hiring a designer is supposed to be the start of certainty about
              your product, not the start of guesswork. The process above means
              you know what you are getting at every checkpoint, and so do I.
              Clients see fewer surprises. Engineers get specs they can build
              from. Stakeholders see progress in artifacts, not in meetings.
            </p>
          </div>
        </FadeInOnScroll>
      </Container>
    </section>
  )
}
