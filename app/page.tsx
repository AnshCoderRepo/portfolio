import Experience from "./components/experienc"
import Footer from "./components/footer"
import Hero from "./components/hero"
import Navbar from "./components/navbar"
import Projects from "./components/projects"
import Reviews from "./components/reviews"
export default function Home() {
  return (
    <div className="w-full bg-black h-[100vh] text-white">
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <Reviews />
      <Footer/>
      <h1>My app</h1>
    </div>
  );
}
