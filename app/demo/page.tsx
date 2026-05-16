import Hero from "../components/hero";
import Navbar from "../components/navbar";

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-black p-4 md:p-8">
      <Hero>
        <Navbar />
      </Hero>
    </main>
  );
}
