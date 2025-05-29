import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";

import { sizes } from "@/lib/constants";
import gpgpuVertexShader from "@/shaders/gpgpu/vertex";
import gpgpuFragmentShader from "@/shaders/gpgpu/fragment";

const ParticlesShaderMaterial = shaderMaterial(
  {
    uSize: 0.05,
    uResolution: new THREE.Vector2(
      sizes.width * sizes.pixelRatio,
      sizes.height * sizes.pixelRatio
    ),
    uParticlesTexture: null,
    uHueShift: 0,
  },
  gpgpuVertexShader,
  gpgpuFragmentShader
);

export default ParticlesShaderMaterial;
