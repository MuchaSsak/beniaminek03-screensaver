import { useMemo, useRef, useState } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useFBX } from "@react-three/drei";
import { GPUComputationRenderer } from "three/examples/jsm/Addons.js";
import * as THREE from "three";

import ParticlesShaderMaterial from "@/shaders/gpgpu/particlesShaderMaterial";
import gpgpuParticlesFragmentShader from "@/shaders/gpgpu/particles";
import useSetFlowFieldUniforms from "@/hooks/useSetFlowFieldUniforms";

extend({ ParticlesShaderMaterial });

const hueShiftTargetAddition = -0.5;
const flowFieldInfluenceTargetAddition = 0.3;
const flowFieldSpeedTargetAddition = 0.4;
const flowFieldLiftIntensityTargetAddition = 2;
const flowFieldStrengthTargetAddition = 0.5;
const flowFieldDecayTimeTargetAddition = 0.3;

function FlowFieldModel({ scrollProgress }: { scrollProgress: number }) {
  const { gl } = useThree();

  /**
   * Imperative way of creating a geometry because we need the count of vertices immediately
   * Could use a useRef, however it's undefined at first and then I have to put the rest of the variables in a hook like useThree
   * They are obviously block scoped so I'd need to lift them up with useState or let variables, in which case I think it's just straight up cleaner and easier to do it this way
   * The THREE.Mesh and others accept the properties `geometry` and `material` for a reason after all 😉
   */
  const base = useFBX("/models/footballers.fbx");
  const baseGeometry = (base.children[0] as THREE.Mesh).geometry;
  const baseGeometryVerticesCount = baseGeometry.attributes.position.count;
  const baseShaderMaterialRef = useRef<THREE.ShaderMaterial>(null);

  const particlesUvArray = useMemo(
    () => new Float32Array(baseGeometryVerticesCount * 2),
    []
  );
  const particlesSizesArray = useMemo(
    () => new Float32Array(baseGeometryVerticesCount),
    []
  );
  const particlesGeometry = useMemo(() => new THREE.BufferGeometry(), []);

  /**
   * Setting the resolution of the FBO texture
   * We want the square root of total particles/vertices of the mesh and round (ceil) it up
   * These values can then be used for the amount of rows and columns
   * For instance, say we have 10 particles in total
   * √10 = 3.1622 ---> 4
   * So the size provided in the GPUComputationRenderer will be 4x4 (16 pixels)
   * We get 6 leftover pixels which will not be used but that's totally fine in terms of performance
   * It's the simpliest and most convenient way of doing this without much drawbacks
   */
  const fboSize = Math.ceil(Math.sqrt(baseGeometryVerticesCount));

  // Has initialized render logic state to make the useThree hook run only once
  const [hasInitialized, setHasInitialized] = useState(false);

  // Create GPU Computation Renderer
  const gpuComputationRenderer = useMemo(
    () => new GPUComputationRenderer(fboSize, fboSize, gl),
    []
  );

  // Base/initial particles texture
  const baseParticlesTexture = useMemo(() => {
    const texture = gpuComputationRenderer.createTexture();
    const textureData = texture.image.data as Uint8Array;

    // Populate the initial particles texture with actual positions of the particles instead of default 0s
    for (let i = 0; i < baseGeometryVerticesCount; i++) {
      // Strides
      const i3 = i * 3;
      const i4 = i * 4;

      // RGBA <-- XYZ
      const positions = baseGeometry.attributes.position.array;
      textureData[i4 + 0] = positions[i3 + 0];
      textureData[i4 + 1] = positions[i3 + 1];
      textureData[i4 + 2] = positions[i3 + 2];
      textureData[i4 + 3] = Math.random(); // Alpha channel is used for particle decay
    }

    return texture;
  }, []);

  // Particles variable
  const particlesVariable = useMemo(() => {
    const variable = gpuComputationRenderer.addVariable(
      "uParticles",
      gpgpuParticlesFragmentShader,
      baseParticlesTexture
    );

    variable.material.uniforms.uBaseParticlesTexture = new THREE.Uniform(
      baseParticlesTexture
    );

    return variable;
  }, []);

  // Set particles variable uniforms
  const {
    uniforms: {
      uSize,
      uFlowFieldInfluence,
      uFlowFieldSpeed,
      uFlowFieldLiftIntensity,
      uFlowFieldStrength,
      uFlowFieldDecayTime,
    },
    updateUniforms,
  } = useSetFlowFieldUniforms(particlesVariable);

  useThree(() => {
    if (hasInitialized) return;

    // Populate the initial particles uv array with coordinates
    for (let y = 0; y < fboSize; y++) {
      for (let x = 0; x < fboSize; x++) {
        const i = y * fboSize + x;
        const i2 = i * 2;

        const uvX = (x + 0.5) / fboSize;
        const uvY = (y + 0.5) / fboSize;

        particlesUvArray[i2 + 0] = uvX;
        particlesUvArray[i2 + 1] = uvY;

        // Populate particles sizes array randomly
        particlesSizesArray[i] = Math.random();
      }
    }

    // Tell the initially empty particles buffer geometry how many vertices it's going to render
    particlesGeometry.setDrawRange(0, baseGeometryVerticesCount);
    // Pass the attributes to the base vertex shader
    particlesGeometry.setAttribute(
      "aParticlesUv",
      new THREE.BufferAttribute(particlesUvArray, 2)
    );
    particlesGeometry.setAttribute("aColor", baseGeometry.attributes.color);
    particlesGeometry.setAttribute(
      "aSize",
      new THREE.BufferAttribute(particlesSizesArray, 1)
    );

    // Update particles variable by setting it as a dependency to the computation renderer
    gpuComputationRenderer.setVariableDependencies(particlesVariable, [
      particlesVariable,
    ]);

    // Init computation renderer
    gpuComputationRenderer.init();

    setHasInitialized(true);
  });

  useFrame((_, delta) => {
    // Update particles shader uniforms
    updateUniforms(delta);

    // Recompute on each frame
    gpuComputationRenderer.compute();

    // Set the FBO texture
    if (!baseShaderMaterialRef.current) return;
    baseShaderMaterialRef.current.uniforms.uParticlesTexture.value =
      gpuComputationRenderer.getCurrentRenderTarget(particlesVariable).texture;

    // Scroll animations
    baseShaderMaterialRef.current.uniforms.uHueShift.value =
      hueShiftTargetAddition * scrollProgress;

    particlesVariable.material.uniforms.uFlowFieldInfluence.value =
      uFlowFieldInfluence + flowFieldInfluenceTargetAddition * scrollProgress;

    particlesVariable.material.uniforms.uFlowFieldSpeed.value =
      uFlowFieldSpeed + flowFieldSpeedTargetAddition * scrollProgress;

    particlesVariable.material.uniforms.uFlowFieldLiftIntensity.value =
      uFlowFieldLiftIntensity +
      flowFieldLiftIntensityTargetAddition * scrollProgress;

    particlesVariable.material.uniforms.uFlowFieldStrength.value =
      uFlowFieldStrength + flowFieldStrengthTargetAddition * scrollProgress;

    particlesVariable.material.uniforms.uFlowFieldDecayTime.value =
      uFlowFieldDecayTime + flowFieldDecayTimeTargetAddition * scrollProgress;
  });

  return (
    <points geometry={particlesGeometry} rotation-y={Math.PI * 0.5}>
      {/* @ts-expect-error This element has been extended */}
      <particlesShaderMaterial ref={baseShaderMaterialRef} uSize={uSize} />
    </points>
  );
}

export default FlowFieldModel;
