import Hero from "./components/hero";
import { CountdownBanner } from "./components/the-future-arrives-soon-cta";
import RadarSection from "./components/radar-section";
import FolderSection from "./components/folder-section";
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





