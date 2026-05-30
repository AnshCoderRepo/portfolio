import Hero from "@/components/sections/hero";
import Navbar from "@/components/sections/navbar";

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-black p-4 md:p-8">
      <Hero>
        <Navbar />
      </Hero>
    </main>
  );
}
