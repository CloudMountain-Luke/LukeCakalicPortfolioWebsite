import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '../components/layout/Container'
import { FadeInOnScroll } from '../components/shared/ScrollAnimations'
import {
  portfolioItems,
  type PortfolioItem,
  type Category,
} from '../data/portfolio'
import { NotFoundPage } from './NotFoundPage'

const categoryLabels: Record<Category, string> = {
  'saas-products': 'SaaS Products',
  'web-design': 'Web / UI/UX',
  'brand-identity': 'Brand Identity',
}

const statusLabels: Record<
  NonNullable<NonNullable<PortfolioItem['caseStudy']>['status']>,
  string
> = {
  'pre-launch': 'Pre-Launch',
  'closed-beta': 'Closed Beta',
  live: 'Live',
  shipped: 'Shipped',
}

/**
 * Per-project case-study page rendered at /work/<slug>. Lifts the
 * Problem/Approach/Process/Outcomes JSX and image carousel UX that used
 * to live in the Portfolio modal — now a real, indexable, shareable
 * page. Adaptive layout: items with `caseStudy` data get the full
 * narrative; items without get a leaner "Project Card" view.
 */
export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const item = portfolioItems.find((p) => p.id === slug)

  // Found ourselves at /work/foo-that-doesnt-exist
  if (!item) return <NotFoundPage />

  // Build prev/next item references in catalog order so the bottom-of-page
  // pager lets a visitor browse without going back to the index.
  const idx = portfolioItems.findIndex((p) => p.id === item.id)
  const prevItem = idx > 0 ? portfolioItems[idx - 1] : null
  const nextItem =
    idx < portfolioItems.length - 1 ? portfolioItems[idx + 1] : null

  return (
    <article className="pt-24 md:pt-32 pb-24">
      <Container size="md">
        {/* Top breadcrumb: back to /#work */}
        <FadeInOnScroll>
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors text-sm group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:-translate-x-0.5 transition-transform"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Work
          </Link>
        </FadeInOnScroll>

        {/* Header block: category + status, title, description, client/year */}
        <FadeInOnScroll className="mt-6">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-accent text-sm font-medium uppercase tracking-wider">
              {categoryLabels[item.category]}
            </span>
            {item.caseStudy?.status && (
              <span className="px-3 py-1 rounded-full text-xs uppercase tracking-wider bg-accent/10 text-accent border border-accent/20">
                {statusLabels[item.caseStudy.status]}
              </span>
            )}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 leading-tight">
            {item.title}
          </h1>
          <p className="mt-5 text-foreground-muted text-lg md:text-xl leading-relaxed">
            {item.description}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5 text-sm text-foreground-subtle">
            <span>
              Client: <span className="text-foreground-muted">{item.client}</span>
            </span>
            {item.year && (
              <span>
                Year: <span className="text-foreground-muted">{item.year}</span>
              </span>
            )}
          </div>
          {item.services && (
            <div className="flex flex-wrap gap-2 mt-5">
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
        </FadeInOnScroll>

        {/* Hero image (or carousel if there are multiple) */}
        <FadeInOnScroll className="mt-10">
          <CaseStudyImages item={item} />
        </FadeInOnScroll>

        {/* Full case-study body (only for items with caseStudy data) */}
        {item.caseStudy && (
          <div className="mt-12 space-y-10">
            <FadeInOnScroll>
              <CaseStudyBlock heading="Problem" body={item.caseStudy.problem} />
            </FadeInOnScroll>
            <FadeInOnScroll>
              <CaseStudyBlock heading="Approach" body={item.caseStudy.approach} />
            </FadeInOnScroll>
            <FadeInOnScroll>
              <section>
                <h2 className="font-display text-xs uppercase tracking-widest text-foreground-subtle mb-3">
                  Process
                </h2>
                <ul className="space-y-2">
                  {item.caseStudy.process.map((step, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-foreground-muted leading-relaxed"
                    >
                      <span className="text-accent flex-shrink-0 mt-1.5">●</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </FadeInOnScroll>
            <FadeInOnScroll>
              <CaseStudyBlock heading="Outcomes" body={item.caseStudy.outcomes} />
            </FadeInOnScroll>
          </div>
        )}

        {/* No-case-study fallback: gentle CTA to reach out. */}
        {!item.caseStudy && (
          <FadeInOnScroll className="mt-12 p-6 rounded-2xl bg-glass border border-border">
            <p className="text-foreground-muted leading-relaxed">
              Full case-study writeup pending. Want the story behind this
              project — the brief, the constraints, the design system,
              the production trade-offs?
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 text-accent font-medium mt-3 hover:gap-3 transition-all"
            >
              Reach out and I&apos;ll walk you through it
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </FadeInOnScroll>
        )}

        {/* CTA footer */}
        <FadeInOnScroll className="mt-16 pt-10 border-t border-border">
          <div className="text-center">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Have a project in mind?
            </h3>
            <p className="mt-3 text-foreground-muted">
              Open to senior product roles and select client work.
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-accent text-white font-medium shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all hover:scale-105"
            >
              Get in Touch
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </FadeInOnScroll>

        {/* Prev / Next case-study pager */}
        {(prevItem || nextItem) && (
          <FadeInOnScroll className="mt-16 pt-8 border-t border-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevItem ? (
                <Link
                  to={`/work/${prevItem.id}`}
                  className="group p-5 rounded-2xl border border-border bg-glass hover:border-border-hover transition-all text-left"
                >
                  <p className="text-xs uppercase tracking-widest text-foreground-subtle">
                    ← Previous
                  </p>
                  <p className="font-display font-semibold text-foreground mt-1 group-hover:text-accent transition-colors">
                    {prevItem.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
              {nextItem ? (
                <Link
                  to={`/work/${nextItem.id}`}
                  className="group p-5 rounded-2xl border border-border bg-glass hover:border-border-hover transition-all text-right sm:text-right"
                >
                  <p className="text-xs uppercase tracking-widest text-foreground-subtle">
                    Next →
                  </p>
                  <p className="font-display font-semibold text-foreground mt-1 group-hover:text-accent transition-colors">
                    {nextItem.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </FadeInOnScroll>
        )}
      </Container>
    </article>
  )
}

// ---- Helpers (inline; only used by this page) ----

function CaseStudyBlock({ heading, body }: { heading: string; body: string }) {
  return (
    <section>
      <h2 className="font-display text-xs uppercase tracking-widest text-foreground-subtle mb-3">
        {heading}
      </h2>
      <p className="text-foreground-muted leading-relaxed">{body}</p>
    </section>
  )
}

/**
 * Hero image + (optional) prev/next carousel for multi-image items.
 * Mirrors the UX of the old modal's image nav so the maxxgreen-technologies
 * 3-image set still feels right.
 */
function CaseStudyImages({ item }: { item: PortfolioItem }) {
  const [index, setIndex] = useState(0)
  const multi = item.images.length > 1
  const bgCard = item.imageDisplay === 'contain'
  const lightCard = bgCard && item.lightCardBg
  const containerBg = lightCard
    ? 'bg-white'
    : bgCard
      ? 'bg-background-tertiary'
      : 'bg-background-secondary'

  const goPrev = () =>
    setIndex((i) => (i === 0 ? item.images.length - 1 : i - 1))
  const goNext = () =>
    setIndex((i) => (i === item.images.length - 1 ? 0 : i + 1))

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border border-border ${containerBg} ${
        item.imageMaxWidth ? 'flex items-center justify-center py-8' : ''
      }`}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={item.images[index]}
          alt={item.title}
          className={
            item.imageMaxWidth
              ? 'h-auto object-contain'
              : item.imageDisplay === 'contain'
                ? 'w-full max-h-[70vh] object-contain p-4'
                : 'w-full h-auto object-cover'
          }
          style={item.imageMaxWidth ? { maxWidth: item.imageMaxWidth } : undefined}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      </AnimatePresence>

      {multi && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
            {index + 1} / {item.images.length}
          </div>
        </>
      )}
    </div>
  )
}
