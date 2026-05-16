import Experience from "./components/experienc"
import Footer from "./components/footer"
import Hero from "./components/hero"
import Navbar from "./components/navbar"
import Projects from "./components/projects"
import Reviews from "./components/reviews"

export default function Home() {
  return (
    <div className="w-full bg-black min-h-screen text-white">
      <Hero>
        <Navbar />
      </Hero>
      <Experience />
      <Projects />
      <Reviews />
      <Footer/>
    </div>
  );
}
