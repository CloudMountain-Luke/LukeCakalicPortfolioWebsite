import { motion } from 'framer-motion'
import { Container } from '../layout/Container'
import { Button } from '../ui/Button'
import { FadeInOnScroll } from '../shared/ScrollAnimations'
import { portfolioItems, type PortfolioItem } from '../../data/portfolio'

// Get featured items
const featuredItems = portfolioItems.filter((item) => item.featured).slice(0, 3)

interface FeaturedCardProps {
  item: PortfolioItem
  index: number
}

function FeaturedCard({ item, index }: FeaturedCardProps) {
  const isEven = index % 2 === 0

  return (
    <FadeInOnScroll
      direction={isEven ? 'left' : 'right'}
      delay={index * 0.1}
      className="group"
    >
      <div
        className={`flex flex-col ${
          isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
        } gap-8 lg:gap-12 items-center`}
      >
        {/* Image */}
        <div className="w-full lg:w-3/5">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className={`relative rounded-2xl overflow-hidden border border-border ${item.imageDisplay === 'cover-top' ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}
          >
            <img
              src={item.images[0]}
              alt={item.title}
              loading="lazy"
              className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                item.imageDisplay === 'cover-top'
                  ? 'object-cover object-top'
                  : item.imageDisplay === 'contain'
                  ? 'object-contain p-4'
                  : 'object-cover'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="w-full lg:w-2/5">
          <span className="text-accent text-sm font-medium uppercase tracking-wider">
            {item.category.replace('-', ' ')}
          </span>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-2">
            {item.title}
          </h3>
          <p className="text-foreground-muted mt-4">{item.description}</p>

          {item.services && (
            <div className="flex flex-wrap gap-2 mt-6">
              {item.services.map((service) => (
                <span
                  key={service}
                  className="px-3 py-1 text-sm rounded-full bg-glass border border-border text-foreground-muted"
                >
                  {service}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6 text-foreground-subtle text-sm">
            Client: {item.client}
            {item.year && ` • ${item.year}`}
          </div>
        </div>
      </div>
    </FadeInOnScroll>
  )
}

export function FeaturedWork() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="py-24 md:py-32">
      <Container>
        <FadeInOnScroll className="text-center mb-16">
          <h2 className="section-heading">
            Featured <span className="gradient-accent">Work</span>
          </h2>
          <p className="section-subheading mt-4 mx-auto">
            A selection of projects that showcase the impact of thoughtful design.
          </p>
        </FadeInOnScroll>

        <div className="space-y-20 md:space-y-28">
          {featuredItems.map((item, index) => (
            <FeaturedCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <FadeInOnScroll className="text-center mt-16">
          <Button size="lg" variant="secondary" onClick={() => scrollToSection('#work')}>
            View All Work
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
        </FadeInOnScroll>
      </Container>
    </section>
  )
}
