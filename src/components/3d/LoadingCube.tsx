import { Center, Html, useProgress } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import useSettings from "@/hooks/useSettings";

const LOADING_TEXT = {
  en: "Loading: ",
  pl: "Ładowanie: ",
};

function LoadingCube() {
  const cubeRef = useRef<THREE.Mesh>(null);
  const { progress } = useProgress();
  const { language } = useSettings();

  useFrame((_, delta) => {
    if (!cubeRef.current) return;
    cubeRef.current.rotation.y += delta;
  });

  return (
    <Center>
      <Html className="transform [transform:translate(-50%,-50%)!important] top-1/2 left-1/2">
        <h3 className="text-5xl tracking-wide font-semibold text-foreground w-max">
          {LOADING_TEXT[language]}
          <span className="text-blue-500 font-bold">
            {progress.toFixed(2)}%
          </span>
        </h3>
      </Html>

      <mesh ref={cubeRef} rotation-x={-Math.PI / 20} scale={3}>
        <boxGeometry />
        <meshBasicMaterial wireframe />
      </mesh>
    </Center>
  );
}

export default LoadingCube;
