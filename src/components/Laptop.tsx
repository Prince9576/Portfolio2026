import { memo, useCallback, useRef, type JSX } from "react";
import { Html, useGLTF } from "@react-three/drei";
import WorkEx from "./WorkEx";
import useOutline from "../hooks/useOutline";
import * as THREE from "three";
import { useNavigationContext } from "../context/NavigationContext";
import { LAPTOP_CAMERA_VIEW, LAPTOP_CAMERA_VIEW_PORTRAIT } from "../constants";
import useNavigation from "../hooks/useNavigation";
import useMobilePortrait from "../hooks/useMobilePortrait";

const Laptop = memo((props: JSX.IntrinsicElements["group"]) => {
  const { isZoomed } = useNavigationContext();
  const { nodes, materials } = useGLTF("/models/mac-draco.glb", true) as any;
  const groupRef = useRef<THREE.Group>(null);
  const {
    on3DPointerOver,
    on3DPointerOut,
    onHtmlMouseEnter,
    onHtmlMouseLeave,
  } = useOutline(groupRef);
  const { flyToPosition } = useNavigation();
  const isMobilePortrait = useMobilePortrait();

  const handleClick = useCallback(() => {
    if (isZoomed) return;

    const cameraView = isMobilePortrait
      ? LAPTOP_CAMERA_VIEW_PORTRAIT
      : LAPTOP_CAMERA_VIEW;

    flyToPosition(
      cameraView.position,
      cameraView.target,
      cameraView.rotation,
      1,
    );
  }, [flyToPosition, isZoomed, isMobilePortrait]);

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
          <mesh
            material={materials.aluminium}
            geometry={nodes["Cube008"].geometry}
          />
          <mesh
            material={materials["matte.001"]}
            geometry={nodes["Cube008_1"].geometry}
          />
          <mesh geometry={nodes["Cube008_2"].geometry}>
            <Html
              className="laptop-content"
              rotation-x={-Math.PI / 2}
              position={[0, 0.05, -0.09]}
              transform
              occlude="blending"
            >
              <div
                onClick={handleClick}
                className="laptop-wrapper"
                onMouseEnter={onHtmlMouseEnter}
                onMouseLeave={onHtmlMouseLeave}
              >
                <WorkEx />
              </div>
            </Html>
          </mesh>
        </group>
      </group>
      <mesh
        material={materials.keys}
        geometry={nodes.keyboard.geometry}
        position={[1.79, 0, 3.45]}
      />
      <group position={[0, -0.1, 3.39]}>
        <mesh
          castShadow
          receiveShadow
          material={materials.aluminium}
          geometry={nodes["Cube002"].geometry}
        />
        <mesh
          castShadow
          receiveShadow
          material={materials.trackpad}
          geometry={nodes["Cube002_1"].geometry}
        />
      </group>
      <mesh
        material={materials.touchbar}
        geometry={nodes.touchbar.geometry}
        position={[0, -0.03, 1.2]}
      />
    </group>
  );
});

Laptop.displayName = "Laptop";

useGLTF.preload("/models/mac-draco.glb", true);

export default Laptop;
