import { Html } from '@react-three/drei'
import { memo, useCallback, useRef } from "react";
import TvScreenContent from './TvScreenContent';
import useOutline from '../hooks/useOutline';
import * as THREE from 'three';
import useNavigation from '../hooks/useNavigation';
import { useNavigationContext } from '../context/NavigationContext';
import { TV_CAMERA_VIEW, TV_CAMERA_VIEW_PORTRAIT } from '../constants';
import useMobilePortrait from '../hooks/useMobilePortrait';

const Tv = memo(({ nodes, materials }: { nodes: any, materials: any }) => {
    const tvScreenRef = useRef<THREE.Mesh>(null);
    const tvGroupRef = useRef<THREE.Group>(null);
    const { flyToPosition } = useNavigation();
    const { isZoomed } = useNavigationContext();
    const isMobilePortrait = useMobilePortrait();

    const { on3DPointerOver, on3DPointerOut, onHtmlMouseEnter, onHtmlMouseLeave } = useOutline(tvGroupRef);

    const handleClick = useCallback(() => {
        if (isZoomed) return;

        const cameraView = isMobilePortrait ? TV_CAMERA_VIEW_PORTRAIT : TV_CAMERA_VIEW;

        flyToPosition(
            cameraView.position,
            cameraView.target,
            cameraView.rotation,
            1
        );
    }, [flyToPosition, isZoomed, isMobilePortrait]);

    return (<group
        position={[-0.28, 3.631, -3.878]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[1.967, 1.124, 1.124]}
        ref={tvGroupRef}
        onPointerOver={on3DPointerOver}
        onPointerOut={on3DPointerOut}
        onClick={handleClick}
    >
        <mesh geometry={nodes.Plane006.geometry} material={materials.TV} />
        <mesh
            ref={tvScreenRef}
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
            geometry={nodes.Plane006_2.geometry}
            material={materials.TVBacklight}
        />
    </group>)
});

Tv.displayName = 'Tv';

export default Tv;
