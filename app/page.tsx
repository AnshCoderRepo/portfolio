import Hero from "@/components/sections/hero";
import { CountdownBanner } from "@/components/sections/the-future-arrives-soon-cta";
import RadarSection from "@/components/sections/radar-section";
import FolderSection from "@/components/sections/folder-section";
import ClippedVideoTab from "@/components/ui/clipped-video-tab";

export default function Home() {
  return (
    <div className="w-full bg-black min-h-screen text-white">
      <Hero />
      <RadarSection />
      <FolderSection />
      <ClippedVideoTab />
      <CountdownBanner />
    </div>
  );
}





