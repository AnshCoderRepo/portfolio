import Experience from "./components/experienc"
import Footer from "./components/footer"
import Hero from "./components/hero"
import Navbar from "./components/navbar"
import Projects from "./components/projects"
import Reviews from "./components/reviews"
import { CountdownBanner } from "./components/the-future-arrives-soon-cta"
import RadarSection from "./components/radar-section"

export default function Home() {
  return (
    <div className="w-full bg-black min-h-screen text-white">
      <Hero>
        <Navbar />
      </Hero>
      <Experience />
      <Projects />
      <Reviews />
      <RadarSection />
      <CountdownBanner />
      <Footer/>
    </div>
  );
}
