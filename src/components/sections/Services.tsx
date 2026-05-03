import { Container } from '../layout/Container'
import { Card, CardContent } from '../ui/Card'
import { FadeInOnScroll, StaggeredReveal } from '../shared/ScrollAnimations'

const services = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2"/>
        <path d="M3 9h18"/>
        <path d="M9 21V9"/>
      </svg>
    ),
    title: 'Web Design + UI/UX',
    description:
      'Marketing sites, dashboards, and customer portals built around the work the user actually has to do. Research, IA, wireframes, hi-fi design, responsive build.',
    features: ['User Research', 'Information Architecture', 'Prototyping', 'Design Systems', 'Responsive Build'],
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 2 12h3v9h14v-9h3L12 3z"/>
        <path d="M12 3v6"/>
        <path d="m8 7 4-4 4 4"/>
      </svg>
    ),
    title: 'Brand Identity for Digital Products',
    description:
      'Logo, type, color, and component-level brand systems that hold up across product surfaces, marketing, and growth. Built to scale across sub-brands.',
    features: ['Logo Design', 'Brand Systems', 'Visual Identity', 'Brand Strategy', 'Design Tokens'],
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 2 7l10 5 10-5-10-5Z"/>
        <path d="m2 17 10 5 10-5"/>
        <path d="m2 12 10 5 10-5"/>
      </svg>
    ),
    title: 'AI-Native Product Engineering',
    description:
      'End-to-end SaaS builds with React, TypeScript, Supabase, and AI provider routing. Stripe checkout, edge functions, agent orchestration. The pipeline that ships my own products is the same one I bring to client work.',
    features: ['React + TypeScript', 'Supabase / Edge Functions', 'Stripe Integration', 'AI Agent Systems', 'Production Deploys'],
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32">
      <Container>
        <FadeInOnScroll className="text-center mb-16">
          <span className="text-accent text-sm font-medium uppercase tracking-wider">
            What I Do
          </span>
          <h2 className="section-heading mt-4">
            Three things, <span className="gradient-accent">all in service of shipping</span>
          </h2>
          <p className="section-subheading mt-4 mx-auto">
            Design, brand, and engineering, run by one person, on the same process.
          </p>
        </FadeInOnScroll>

        <StaggeredReveal
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          staggerDelay={0.1}
        >
          {services.map((service) => (
            <Card key={service.title} glow className="group">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mt-6">
                  {service.title}
                </h3>
                <p className="text-foreground-muted mt-3">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 text-sm rounded-full bg-glass border border-border text-foreground-muted"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </StaggeredReveal>
      </Container>
    </section>
  )
}
