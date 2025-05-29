import hueShift from "@/shaders/includes/hueShift";

const gpgpuFragmentShader = /*glsl*/ `
${hueShift}

uniform float uHueShift;

varying vec3 vColor;

void main() {
   float distanceToCenter = length(gl_PointCoord - 0.5);
   if (distanceToCenter > 0.5) discard;

   vec3 shiftedColor = hueShift(vColor, uHueShift);
   
   gl_FragColor = vec4(shiftedColor, 1.0);
   #include <tonemapping_fragment>
   #include <colorspace_fragment>
}
`;

export default gpgpuFragmentShader;
