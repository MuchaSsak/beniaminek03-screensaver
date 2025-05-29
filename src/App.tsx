import { Leva } from "leva";

import FlowFieldCanvas from "@/components/3d/gpgpuFlowFieldParticles/FlowFieldCanvas";
import HeroHeader from "@/components/HeroHeader";
import { SmoothCursor } from "@/components/magicui/smooth-cursor.tsx";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/3d/ScrollIndicator";
import useScrollProgress from "@/hooks/useScrollProgress";
import { SettingsProvider } from "@/contexts/SettingsContext";
import SettingsButtons from "@/components/SettingsButtons";

function App() {
  const scrollProgress = useScrollProgress();

  return (
    <SettingsProvider>
      {/* Layout */}
      <SmoothCursor />

      {/* Debug UI */}
      <Leva hidden={window.location.hash !== "#debug"} collapsed />

      {/* Homepage */}
      <div className="flex flex-col justify-between min-h-screen">
        {/* Canvas */}
        <FlowFieldCanvas scrollProgress={scrollProgress} />

        {/* Header */}
        <div className="flex flex-col relative gap-8">
          <SettingsButtons />
          <HeroHeader scrollProgress={scrollProgress} />
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-6">
          <ScrollIndicator progress={scrollProgress} />
          <Footer />
        </div>
      </div>
    </SettingsProvider>
  );
}

export default App;
