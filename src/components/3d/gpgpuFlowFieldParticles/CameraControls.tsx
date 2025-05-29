import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const cameraRotationSpeed = 0.35;
const cameraRotationIntensity = 0.5;

const secondsForNextPerspective = 7.5;
const differentPerspectivesCount = 4;

function CameraControls() {
  useFrame(({ camera, clock, pointer }) => {
    camera.lookAt(
      new THREE.Vector3(
        0,
        0 + pointer.y * 0.2,
        0 +
          // Rotate camera slowly left to right, right to left and so on
          Math.sin(clock.elapsedTime * cameraRotationSpeed) *
            cameraRotationIntensity +
          pointer.x * 0.2
      )
    );

    // Perspective switching animation
    const timeline =
      clock.elapsedTime %
      (secondsForNextPerspective * differentPerspectivesCount + 1);

    switch (true) {
      case timeline > secondsForNextPerspective * 3: {
        camera.position.x = -10;
        camera.position.z = -Math.sin(clock.elapsedTime * 0.15) * 0.35;
        camera.position.y = Math.sin(clock.elapsedTime * 0.15) * 2;
        break;
      }

      case timeline > secondsForNextPerspective * 2: {
        camera.position.x = -3;
        camera.position.z = -5 + Math.sin(clock.elapsedTime * 0.25) * 0.5;
        camera.position.y = 7;
        break;
      }

      case timeline > secondsForNextPerspective: {
        camera.position.x = Math.sin(clock.elapsedTime * 0.15) * 0.35;
        camera.position.y = Math.sin(clock.elapsedTime * 0.15) * 0.35;
        break;
      }

      default: {
        camera.position.x = 10;
        camera.position.y = 3;
        camera.position.z = 10;
        break;
      }
    }
  });

  return null; // Use default perspective camera
}

export default CameraControls;
