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
    title: 'Web Design & UI/UX',
    description: 'Modern, responsive websites and web applications with intuitive user experiences that drive engagement and conversions.',
    features: ['Responsive Design', 'User Research', 'Prototyping', 'Design Systems'],
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8c-.1.2-.1.5-.1.7v4.6c0 .6.4 1 1 1h2"/>
        <circle cx="7" cy="17" r="2"/>
        <path d="M9 17h6"/>
        <circle cx="17" cy="17" r="2"/>
      </svg>
    ),
    title: 'Vehicle Wraps',
    description: 'Eye-catching vehicle graphics that turn your fleet into mobile billboards. Full wraps, partial wraps, and custom designs.',
    features: ['Full Wraps', 'Partial Wraps', 'Fleet Graphics', 'Custom Design'],
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 2 12h3v9h14v-9h3L12 3z"/>
        <path d="M12 3v6"/>
        <path d="m8 7 4-4 4 4"/>
      </svg>
    ),
    title: 'Brand Identity',
    description: 'Distinctive logos and comprehensive brand systems that communicate your values and resonate with your audience.',
    features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Brand Strategy'],
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
        <path d="M18 14h-8"/>
        <path d="M15 18h-5"/>
        <path d="M10 6h8v4h-8V6Z"/>
      </svg>
    ),
    title: 'Print Marketing',
    description: 'High-impact print materials from business cards to trade show displays. Designs that make a lasting impression.',
    features: ['Brochures', 'Business Cards', 'Trade Show Graphics', 'Large Format'],
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-background-secondary">
      <Container>
        <FadeInOnScroll className="text-center mb-16">
          <h2 className="section-heading">
            What I <span className="gradient-accent">Offer</span>
          </h2>
          <p className="section-subheading mt-4 mx-auto">
            Comprehensive design services to elevate your brand across digital and physical touchpoints.
          </p>
        </FadeInOnScroll>

        <StaggeredReveal
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
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
