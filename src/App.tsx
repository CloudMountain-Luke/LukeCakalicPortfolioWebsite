import { Header, Footer } from './components/layout'
import { Hero, Services, FeaturedWork, Portfolio, About, Contact } from './components/sections'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <FeaturedWork />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
