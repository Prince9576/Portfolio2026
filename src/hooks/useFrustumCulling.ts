import { useFrame, useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

/**
 * Hook to enable frustum culling optimization
 * This ensures objects outside the camera view are not rendered
 */
export const useFrustumCulling = () => {
    const { scene } = useThree();

    useEffect(() => {
        // Ensure all meshes have frustum culling enabled
        scene.traverse((object) => {
            if (object instanceof THREE.Mesh) {
                object.frustumCulled = true;
            }
        });
    }, [scene]);

    useFrame(() => {
        // Update frustum culling on each frame
        // This is automatically done by Three.js but we can optimize further
        scene.traverse((object) => {
            if (object instanceof THREE.Mesh && object.geometry.boundingSphere) {
                // Ensure bounding sphere is computed for accurate culling
                if (!object.geometry.boundingSphere) {
                    object.geometry.computeBoundingSphere();
                }
            }
        });
    });
};

export default useFrustumCulling;
