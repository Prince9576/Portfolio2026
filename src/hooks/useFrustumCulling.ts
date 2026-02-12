import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

export const useFrustumCulling = () => {
  const { scene } = useThree();

  useEffect(() => {
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.frustumCulled = true;
        if (object.geometry && !object.geometry.boundingSphere) {
          object.geometry.computeBoundingSphere();
        }
      }
    });
  }, [scene]);
};

export default useFrustumCulling;
