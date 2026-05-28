import { Link } from 'react-router-dom'
import { Container } from '../components/layout/Container'

export function NotFoundPage() {
  return (
    <section className="min-h-[70vh] flex items-center pt-24 md:pt-32 pb-24">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-accent font-medium tracking-widest uppercase text-sm">
            404
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">
            That project doesn&apos;t exist <span className="gradient-accent">here</span>
          </h1>
          <p className="mt-6 text-foreground-muted text-lg">
            The page you tried to reach isn&apos;t in the portfolio (or moved
            since you bookmarked it). The full work index is one click away.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/#work"
              className="px-5 py-2.5 rounded-full bg-accent text-white font-medium shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all"
            >
              Browse the Work
            </Link>
            <Link
              to="/"
              className="px-5 py-2.5 rounded-full bg-glass border border-border text-foreground-muted hover:text-foreground hover:border-border-hover transition-all"
            >
              Back home
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
