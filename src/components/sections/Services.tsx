import { Container } from '../layout/Container'
import { Card, CardContent } from '../ui/Card'
import { FadeInOnScroll, StaggeredReveal } from '../shared/ScrollAnimations'

const services = [
  {
    image: '/images/sections/service-ui-design.jpg',
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
    image: '/images/sections/service-brand-identity.jpg',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2z"/>
        <path d="M2 20c0-4 4-7 10-7s10 3 10 7"/>
      </svg>
    ),
    title: 'Brand Identity for Digital Products',
    description:
      'Logo, type, color, and component-level brand systems that hold up across product surfaces, marketing, and growth. Built to scale across sub-brands.',
    features: ['Logo Design', 'Brand Systems', 'Visual Identity', 'Brand Strategy', 'Design Tokens'],
  },
  {
    image: '/images/sections/service-ai-engineering.jpg',
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
  {
    image: '/images/sections/service-print-collateral.jpg',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
        <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/>
        <rect x="6" y="14" width="12" height="8" rx="1"/>
      </svg>
    ),
    title: 'Print & Collateral',
    description:
      'Trade show booths, event signage, packaging, business cards, and large-format displays. Brand built for the physical world — consistent from screen to banner to booth.',
    features: ['Trade Show Booths', 'Event Signage', 'Packaging', 'Business Cards', 'Large-Format Print'],
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
            Three disciplines, <span className="gradient-accent">one focused pipeline</span>
          </h2>
          <p className="section-subheading mt-4 mx-auto">
            Design, brand, and engineering — run by one person, on the same process.
          </p>
        </FadeInOnScroll>

        <StaggeredReveal
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          staggerDelay={0.1}
        >
          {services.map((service) => (
            <Card key={service.title} glow className="group h-full">
              <CardContent className="p-0 h-full flex flex-col">
                {/* Service image */}
                <div className="relative aspect-video overflow-hidden rounded-t-xl">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                </div>
                <div className="p-5 md:p-6 pt-4 md:pt-5 flex flex-col flex-grow">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    {service.icon}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mt-6">
                    {service.title}
                  </h3>
                  <p className="text-foreground-muted mt-3 text-sm md:text-base flex-grow">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-0.5 text-xs rounded-full bg-glass border border-border text-foreground-muted"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </StaggeredReveal>
      </Container>
    </section>
  )
}

