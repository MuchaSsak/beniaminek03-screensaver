/**
 * This fragment shader is used to paint the FBO texture
 * RGB values of each pixel will correspond to the XYZ position coordinates of the point/particle of the geometry in the Three.js scene
 */

import simplexNoise4d from "@/shaders/includes/simplexNoise4d";

const particlesFragmentShader = /*glsl*/ `
// Includes imports
${simplexNoise4d}

uniform float uTime;
uniform float uDeltaTime;
uniform sampler2D uBaseParticlesTexture;
uniform float uFlowFieldSpeed;
uniform float uFlowFieldInfluence;
uniform float uFlowFieldStrength;
uniform float uFlowFieldFrequency;
uniform float uFlowFieldInfluenceFrequency;
uniform float uFlowFieldLiftIntensity;
uniform float uFlowFieldLiftInfluencedIntensity;
uniform float uFlowFieldDecayTime;
uniform vec3 uMousePosition;

void main() {
   float time = uTime * uFlowFieldSpeed;
   vec2 uv = gl_FragCoord.xy / resolution.xy;
   vec4 particle = texture(uParticles, uv);
   vec4 initialParticle = texture(uBaseParticlesTexture, uv);
   
   // Dead
   if (particle.a >= 1.0) {
      particle.a = mod(particle.a, 1.0);
      particle.xyz = initialParticle.xyz;
   } 
   // Alive
   else {
      // Strength
      float strength = simplexNoise4d(vec4(
         initialParticle.xyz * uFlowFieldInfluenceFrequency, time + 1.0
      ));
      float influence = (uFlowFieldInfluence - 0.5) * (-2.0);
      strength = smoothstep(influence, 1.0, strength);

      // Global direction
      particle.y += uFlowFieldLiftIntensity * (0.001);
      particle.y += uFlowFieldLiftInfluencedIntensity * (strength * 0.025);

      // Flow field
      vec3 flowField = vec3(
         simplexNoise4d(vec4(particle.xyz * uFlowFieldFrequency + 0.0, time)),
         simplexNoise4d(vec4(particle.xyz * uFlowFieldFrequency + 1.0, time)),
         simplexNoise4d(vec4(particle.xyz * uFlowFieldFrequency + 2.0, time))
      );
      flowField = normalize(flowField);
      particle.xyz += flowField * uDeltaTime * strength * uFlowFieldStrength;

      // Decay
      particle.a += uDeltaTime * uFlowFieldDecayTime;
   }

   gl_FragColor = particle;
}
`;

export default particlesFragmentShader;
