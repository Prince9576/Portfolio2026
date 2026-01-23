
import { useGLTF } from '@react-three/drei'

export default function Workspace(props: any) {
    const { scene } = useGLTF('/Models/gaming_raw3.glb') as any;
    const position = [-0.72, -2, 0];
    const rotation = [-0.35, -1.07, -0.04];
    const scale = 1.05;
    return (
        <group>
            <primitive object={scene} position={position} rotation={rotation} scale={scale} />
        </group>
    )
}

useGLTF.preload('/Models/wrokspace.glb')

