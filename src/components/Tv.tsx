import { Html } from '@react-three/drei'
import { useCallback, useRef } from "react";
import TvScreenContent from './TvScreenContent';
import useOutline from '../hooks/useOutline';
import * as THREE from 'three';
import useNavigation from '../hooks/useNavigation';
import { useNavigationContext } from '../context/NavigationContext';
import { TV_CAMERA_VIEW } from '../constants';
// import { useControls } from 'leva';
// import { useThree, useFrame } from '@react-three/fiber';
// import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

const Tv = ({ nodes, materials }: { nodes: any, materials: any }) => {
    const tvScreenRef = useRef<THREE.Mesh>(null);
    const tvGroupRef = useRef<THREE.Group>(null);
    const { flyToPosition } = useNavigation();
    const { isZoomed } = useNavigationContext();
    // const { camera, controls } = useThree();
    // const orbitControls = controls as OrbitControlsImpl;

    const { on3DPointerOver, on3DPointerOut, onHtmlMouseEnter, onHtmlMouseLeave } = useOutline(tvGroupRef);

    // Leva controls for fine-tuning camera position (commented out after finding values)
    // const { posX, posY, posZ, targetX, targetY, targetZ, rotX, rotY, rotZ, rotW } = useControls('TV Camera', {
    //     posX: { value: TV_CAMERA_VIEW.position.x, min: -10, max: 10, step: 0.1 },
    //     posY: { value: TV_CAMERA_VIEW.position.y, min: -10, max: 10, step: 0.1 },
    //     posZ: { value: TV_CAMERA_VIEW.position.z, min: -10, max: 10, step: 0.1 },
    //     targetX: { value: TV_CAMERA_VIEW.target.x, min: -10, max: 10, step: 0.1 },
    //     targetY: { value: TV_CAMERA_VIEW.target.y, min: -10, max: 10, step: 0.1 },
    //     targetZ: { value: TV_CAMERA_VIEW.target.z, min: -10, max: 10, step: 0.1 },
    //     rotX: { value: TV_CAMERA_VIEW.rotation.x, min: -1, max: 1, step: 0.01 },
    //     rotY: { value: TV_CAMERA_VIEW.rotation.y, min: -1, max: 1, step: 0.01 },
    //     rotZ: { value: TV_CAMERA_VIEW.rotation.z, min: -1, max: 1, step: 0.01 },
    //     rotW: { value: TV_CAMERA_VIEW.rotation.w, min: -1, max: 1, step: 0.01 },
    // });

    // Live-update camera and orbit target when sliders change
    // useFrame(() => {
    //     camera.position.set(posX, posY, posZ);
    //     if (orbitControls) {
    //         orbitControls.target.set(targetX, targetY, targetZ);
    //         orbitControls.update();
    //     }
    //     // Set rotation after orbit controls update to override it
    //     const quat = new THREE.Quaternion(rotX, rotY, rotZ, rotW);
    //     quat.normalize();
    //     camera.quaternion.copy(quat);
    // });

    const handleClick = useCallback(() => {
        if (isZoomed) return;
        flyToPosition(
            TV_CAMERA_VIEW.position,
            TV_CAMERA_VIEW.target,
            TV_CAMERA_VIEW.rotation,
            1
        );
    }, [flyToPosition, isZoomed]);

    return (<group
        position={[-0.28, 3.631, -3.878]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[1.967, 1.124, 1.124]}
        ref={tvGroupRef}
        onPointerOver={on3DPointerOver}
        onPointerOut={on3DPointerOut}
        onClick={handleClick}
    >
        <mesh castShadow receiveShadow geometry={nodes.Plane006.geometry} material={materials.TV} />
        <mesh
            ref={tvScreenRef}
            castShadow
            receiveShadow
            geometry={nodes.Plane006_1.geometry}
        >
            <meshBasicMaterial color="#1a1a1f" toneMapped={false} />
            <Html className="tv-content" rotation-x={-Math.PI / 2} position={[0.155, 0.19, -0.025]} transform occlude="blending" scale={0.2}>
                <div
                    className="tv-wrapper"
                    onClick={handleClick}
                    onMouseEnter={onHtmlMouseEnter}
                    onMouseLeave={onHtmlMouseLeave}
                >
                    <TvScreenContent />
                </div>
            </Html>
        </mesh>
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane006_2.geometry}
            material={materials.TVBacklight}
        />
    </group>)
}

export default Tv;
