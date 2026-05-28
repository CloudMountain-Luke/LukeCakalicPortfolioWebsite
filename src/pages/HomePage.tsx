import { Hero, Services, Process, FeaturedWork, Portfolio, About, Contact } from '../components/sections'

/**
 * The original homepage section stack, extracted from App.tsx unchanged
 * when routing was introduced. `/` renders this; `/work/<slug>` renders
 * CaseStudyPage. Header + Footer wrap both inside App.tsx.
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <FeaturedWork />
      <Portfolio />
      <About />
      <Contact />
    </>
  )
}
