import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

/**
 * Hook to enable frustum culling optimization
 * Sets frustumCulled=true and computes bounding spheres ONCE on mount.
 * Three.js handles per-frame culling natively — no need for useFrame traversal.
 */
export const useFrustumCulling = () => {
    const { scene } = useThree();

    useEffect(() => {
        scene.traverse((object) => {
            if (object instanceof THREE.Mesh) {
                object.frustumCulled = true;
                // Pre-compute bounding sphere for accurate culling
                if (object.geometry && !object.geometry.boundingSphere) {
                    object.geometry.computeBoundingSphere();
                }
            }
        });
    }, [scene]);
};

export default useFrustumCulling;
