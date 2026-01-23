
import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react';
import * as THREE from 'three';

export default function Workspace() {
    const { scene } = useGLTF('/Models/gaming_raw5.glb') as any;
    const position = [-0.72, -2, 0];
    const rotation = [-0.35, -1.07, -0.04];
    const scale = 1.05;

    useEffect(() => {
        // Traverse all meshes in the model and enable shadows
        scene.traverse((child: any) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }, [scene]);

    return (
        <group>
            <primitive object={scene} position={position} rotation={rotation} scale={scale} />
        </group>
    )
}

useGLTF.preload('/Models/wrokspace.glb')

