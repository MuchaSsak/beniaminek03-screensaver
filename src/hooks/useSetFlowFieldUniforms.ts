import type { Variable } from "three/examples/jsm/Addons.js";
import { useControls } from "leva";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

function useSetFlowFieldUniforms(particlesVariable: Variable) {
  const { clock } = useThree();

  // Debug UI controls
  const controls = useControls("GPGPU Flow Field Particles", {
    uSize: {
      min: 0.01,
      value: 0.075,
      max: 1,
      step: 0.001,
    },
    uFlowFieldSpeed: {
      min: 0,
      value: 0.2,
      max: 1,
      step: 0.001,
    },
    uFlowFieldInfluence: {
      min: -1,
      value: 0.2,
      max: 1,
      step: 0.001,
    },
    uFlowFieldStrength: {
      min: 0,
      value: 0.76,
      max: 10,
      step: 0.001,
    },
    uFlowFieldFrequency: {
      min: 0,
      value: 0.7,
      max: 1,
      step: 0.001,
    },
    uFlowFieldInfluenceFrequency: {
      min: 0,
      value: 0.75,
      max: 1,
      step: 0.001,
    },
    uFlowFieldLiftIntensity: {
      min: 0,
      value: 1.5,
      max: 3,
      step: 0.001,
    },
    uFlowFieldLiftInfluencedIntensity: {
      min: 0,
      value: 0.57,
      max: 3,
      step: 0.001,
    },
    uFlowFieldDecayTime: {
      min: 0,
      value: 0.3,
      max: 2,
      step: 0.001,
    },
  });

  const uniforms = {
    // Non-tweakable
    uTime: clock.elapsedTime,
    uDeltaTime: clock.getDelta(),
    // Tweakable
    ...controls,
  };

  // Set the uniforms in the material
  for (const [key, value] of Object.entries(uniforms)) {
    particlesVariable.material.uniforms[key] = new THREE.Uniform(value);
  }

  function updateUniforms(deltaTime: number) {
    particlesVariable.material.uniforms.uTime.value = clock.elapsedTime;
    particlesVariable.material.uniforms.uDeltaTime.value = deltaTime;
  }

  return { uniforms, updateUniforms };
}

export default useSetFlowFieldUniforms;
