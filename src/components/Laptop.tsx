import { useCallback, useRef, useContext, useEffect } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import useNavigation from "../hooks/useNavigation";
import { LAPTOP_CAMERA_VIEW } from "../constants";
import WorkEx from "./WorkEx";
import { selectionContext } from "@react-three/postprocessing";
import * as THREE from 'three';
import { useNavigationContext } from "../context/NavigationContext";

const Laptop = (props: any) => {
    const { flyToPosition } = useNavigation();
    const { isZoomed } = useNavigationContext();
    const { nodes, materials } = useGLTF('/Models/mac-draco.glb', true) as any;
    const groupRef = useRef<THREE.Group>(null);
    const meshesRef = useRef<THREE.Object3D[]>([]);
    const is3DHoveredRef = useRef(false);
    const isHtmlHoveredRef = useRef(false);
    const selectionApi = useContext(selectionContext);
    const invalidate = useThree((state) => state.invalidate);

    // Collect meshes once on mount
    useEffect(() => {
        if (!groupRef.current) return;
        const meshes: THREE.Object3D[] = [];
        groupRef.current.traverse((obj) => {
            if ((obj as THREE.Mesh).isMesh) {
                meshes.push(obj);
            }
        });
        meshesRef.current = meshes;
    }, []);

    const handleClick = useCallback(() => {
        if (isZoomed) return;
        flyToPosition(
            LAPTOP_CAMERA_VIEW.position,
            LAPTOP_CAMERA_VIEW.target,
            LAPTOP_CAMERA_VIEW.rotation,
            1
        );
    }, [flyToPosition, isZoomed]);

    const addToSelection = useCallback(() => {
        if (!selectionApi) return;
        const meshes = meshesRef.current;
        if (meshes.length > 0) {
            selectionApi.select((prev) => {
                const newMeshes = meshes.filter(m => !prev.includes(m));
                return newMeshes.length > 0 ? [...prev, ...newMeshes] : prev;
            });
            invalidate();
        }
    }, [selectionApi, invalidate]);

    const removeFromSelection = useCallback(() => {
        if (!selectionApi) return;
        const meshes = meshesRef.current;
        if (meshes.length > 0) {
            selectionApi.select((prev) => prev.filter((m) => !meshes.includes(m)));
            invalidate();
        }
    }, [selectionApi, invalidate]);

    // 3D mesh hover handlers
    const on3DPointerOver = useCallback(() => {
        is3DHoveredRef.current = true;
        addToSelection();
    }, [addToSelection]);

    const on3DPointerOut = useCallback(() => {
        is3DHoveredRef.current = false;
        // Only remove if not hovering HTML
        if (!isHtmlHoveredRef.current) {
            removeFromSelection();
        }
    }, [removeFromSelection]);

    // HTML hover handlers
    const onHtmlMouseEnter = useCallback(() => {
        isHtmlHoveredRef.current = true;
        addToSelection();
    }, [addToSelection]);

    const onHtmlMouseLeave = useCallback(() => {
        isHtmlHoveredRef.current = false;
        // Only remove if not hovering 3D
        if (!is3DHoveredRef.current) {
            removeFromSelection();
        }
    }, [removeFromSelection]);

    return (
        <group
            ref={groupRef}
            onPointerOver={on3DPointerOver}
            onPointerOut={on3DPointerOut}
            onClick={handleClick}
            {...props}
            dispose={null}
        >
            <group rotation-x={-0.425} position={[0, -0.04, 0.41]}>
                <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
                    <mesh material={materials.aluminium} geometry={nodes['Cube008'].geometry} />
                    <mesh material={materials['matte.001']} geometry={nodes['Cube008_1'].geometry} />
                    <mesh geometry={nodes['Cube008_2'].geometry}>
                        <Html className="content" rotation-x={-Math.PI / 2} position={[0, 0.05, -0.09]} transform occlude="blending">
                            <div
                                onClick={handleClick}
                                className="wrapper"
                                onMouseEnter={onHtmlMouseEnter}
                                onMouseLeave={onHtmlMouseLeave}
                            >
                                <WorkEx />
                            </div>
                        </Html>
                    </mesh>
                </group>
            </group>
            <mesh material={materials.keys} geometry={nodes.keyboard.geometry} position={[1.79, 0, 3.45]} />
            <group position={[0, -0.1, 3.39]}>
                <mesh castShadow receiveShadow material={materials.aluminium} geometry={nodes['Cube002'].geometry} />
                <mesh castShadow receiveShadow material={materials.trackpad} geometry={nodes['Cube002_1'].geometry} />
            </group>
            <mesh material={materials.touchbar} geometry={nodes.touchbar.geometry} position={[0, -0.03, 1.2]} />
        </group>
    )
};

useGLTF.preload('/Models/mac-draco.glb');

export default Laptop;
