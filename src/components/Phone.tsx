import { useGLTF } from "@react-three/drei";
import { memo, useCallback, useRef } from "react";
import * as THREE from 'three';
import useOutline from '../hooks/useOutline';
import { useNavigationContext } from "../context/NavigationContext";
import useNavigation from "../hooks/useNavigation";
import { PHONE_CAMERA_VIEW } from "../constants";

const Phone = memo(() => {
    const { nodes, materials } = useGLTF('/Models/phone.glb', true) as any;
    const { flyToPosition } = useNavigation();
    const { isZoomed } = useNavigationContext();
    const phoneGroupRef = useRef<THREE.Group>(null);
    const { on3DPointerOver, on3DPointerOut } = useOutline(phoneGroupRef);

    const handleClick = useCallback(() => {
        if (isZoomed) return;
        flyToPosition(
            PHONE_CAMERA_VIEW.position,
            PHONE_CAMERA_VIEW.target,
            PHONE_CAMERA_VIEW.rotation,
            1
        );
    }, [flyToPosition, isZoomed]);
    return (
        <group position={[3.288, -1.025, 1.156]} rotation-y={0.81} dispose={null}
            ref={phoneGroupRef}
            onPointerOver={on3DPointerOver}
            onPointerOut={on3DPointerOut}
            onClick={handleClick}
        >
            <mesh
                castShadow
                geometry={nodes.Phone.geometry}
                material={materials['Phone Cover']}
                position={[0.277, 1.287, -0.158]}
                rotation={[0, -0.175, Math.PI]}
                scale={0.001}>
                <mesh
                    castShadow
                    geometry={nodes.Cap1_3.geometry}
                    material={materials['default']}
                />
                <mesh
                    castShadow
                    geometry={nodes.Cap1_4.geometry}
                    material={materials['default']}
                />
                <mesh
                    castShadow
                    geometry={nodes.Cap1_5.geometry}
                    material={materials['default']}
                />
                <mesh
                    castShadow
                    geometry={nodes.Cap1_6.geometry}
                    material={materials['default']}
                />
                <mesh
                    castShadow
                    geometry={nodes.Cube1.geometry}
                    material={materials['Phone Display']}
                />
            </mesh>
            <mesh
                castShadow
                geometry={nodes.Plane.geometry}
                material={materials['Material.002']}
                position={[0.479, 1.50, -0.563]}
                rotation={[0, -0.177, 0]}
                scale={0.0471}
            />
            <mesh
                castShadow
                geometry={nodes.Plane001.geometry}
                material={materials.Material}
                position={[0.455, 1.50, -0.425]}
                rotation={[0, -0.177, 0]}
                scale={0.044}
            />
            <mesh
                castShadow
                geometry={nodes.Plane002.geometry}
                material={materials.github}
                position={[0.435, 1.50, -0.3]}
                rotation={[0, -0.177, 0]}
                scale={0.038}
            />
        </group>
    )
});

Phone.displayName = 'Phone';

export default Phone;

useGLTF.preload('/Models/phone.glb', true);