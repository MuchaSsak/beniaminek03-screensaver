import { Suspense } from "react";
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Glitch,
  Vignette,
} from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";
import { useControls } from "leva";
import { Perf } from "r3f-perf";

import LoadingCube from "@/components/3d/LoadingCube";
import FlowFieldModel from "@/components/3d/gpgpuFlowFieldParticles/FlowFieldModel";
import CameraControls from "@/components/3d/gpgpuFlowFieldParticles/CameraControls";
import useSettings from "@/hooks/useSettings";

function FlowFieldCanvas({ scrollProgress }: { scrollProgress: number }) {
  const { clearColor } = useControls("GL Renderer", {
    clearColor: "#162052",
  });
  const { graphics } = useSettings();

  return (
    <Canvas
      className="fixed! left-0 top-0"
      camera={{
        fov: 45,
        near: 0.1,
        far: 100,
        position: [10, 3, 10],
      }}
    >
      {/* Controls */}
      <CameraControls />

      {/* Lighting */}
      <ambientLight intensity={1} />

      {/* Performance monitor */}
      {window.location.hash === "#debug" && <Perf position="top-left" />}

      {/* Post processing */}
      {graphics === "high" && (
        <EffectComposer>
          <Vignette darkness={scrollProgress * 0.5} />
          <ChromaticAberration
            offset={[0.0015 * scrollProgress, 0.0015 * scrollProgress]}
          />
          <Glitch
            delay={new THREE.Vector2(1.5, 3.5)}
            duration={
              new THREE.Vector2(0.2 * scrollProgress, 0.5 * scrollProgress)
            }
            strength={
              new THREE.Vector2(0.1 * scrollProgress, 0.2 * scrollProgress)
            }
            mode={GlitchMode.SPORADIC}
            active={scrollProgress > 0.3}
            ratio={0.85}
          />
          <Bloom
            intensity={0.75}
            luminanceThreshold={0.5}
            luminanceSmoothing={0.025}
          />
        </EffectComposer>
      )}

      {/* Environment */}
      <Environment
        background
        resolution={512}
        files="/environments/stadium.hdr"
        backgroundIntensity={1 - scrollProgress * 0.3}
      />

      {/* Clear color */}
      <color attach="background" args={[clearColor]} />

      {/* Model */}
      <Suspense fallback={<LoadingCube />}>
        <FlowFieldModel scrollProgress={scrollProgress} />
      </Suspense>
    </Canvas>
  );
}

export default FlowFieldCanvas;
