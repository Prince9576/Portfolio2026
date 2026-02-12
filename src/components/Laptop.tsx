import { memo, useCallback, useRef } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { LAPTOP_CAMERA_VIEW } from "../constants";
import WorkEx from "./WorkEx";
import useOutline from "../hooks/useOutline";
import * as THREE from "three";
import { useNavigationContext } from "../context/NavigationContext";
import { useControls, button } from "leva";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

const Laptop = memo((props: any) => {
  const { isZoomed, setIsZoomed } = useNavigationContext();
  const { nodes, materials } = useGLTF("/models/mac-draco.glb", true) as any;
  const groupRef = useRef<THREE.Group>(null);
  const {
    on3DPointerOver,
    on3DPointerOut,
    onHtmlMouseEnter,
    onHtmlMouseLeave,
  } = useOutline(groupRef);
  const { camera, controls } = useThree();
  const orbitControls = controls as OrbitControlsImpl;

  // const laptopCameraControls = useControls('Laptop Camera', {
  //     positionX: { value: LAPTOP_CAMERA_VIEW.position.x, min: -5, max: 5, step: 0.01, label: 'Position X' },
  //     positionY: { value: LAPTOP_CAMERA_VIEW.position.y, min: -5, max: 10, step: 0.01, label: 'Position Y' },
  //     positionZ: { value: LAPTOP_CAMERA_VIEW.position.z, min: -5, max: 5, step: 0.01, label: 'Position Z' },
  //     rotationX: { value: LAPTOP_CAMERA_VIEW.rotation.x, min: -1, max: 1, step: 0.01, label: 'Rotation X' },
  //     rotationY: { value: LAPTOP_CAMERA_VIEW.rotation.y, min: -1, max: 2, step: 0.01, label: 'Rotation Y' },
  //     rotationZ: { value: LAPTOP_CAMERA_VIEW.rotation.z, min: -1, max: 2, step: 0.01, label: 'Rotation Z' },
  //     rotationW: { value: LAPTOP_CAMERA_VIEW.rotation.w, min: -1, max: 2, step: 0.01, label: 'Rotation W' },
  //     'Log Values': button(() => {
  //         console.log('Laptop Camera Values:', {
  //             position: { x: laptopCameraControls.positionX, y: laptopCameraControls.positionY, z: laptopCameraControls.positionZ },
  //             rotation: { x: laptopCameraControls.rotationX, y: laptopCameraControls.rotationY, z: laptopCameraControls.rotationZ, w: laptopCameraControls.rotationW }
  //         });
  //     })
  // });

  // // Apply camera settings from Leva controls every frame
  // useFrame(() => {
  //     if (!isZoomed) return;

  //     camera.position.set(laptopCameraControls.positionX, laptopCameraControls.positionY, laptopCameraControls.positionZ);

  //     const quat = new THREE.Quaternion(
  //         laptopCameraControls.rotationX,
  //         laptopCameraControls.rotationY,
  //         laptopCameraControls.rotationZ,
  //         laptopCameraControls.rotationW
  //     );
  //     quat.normalize();
  //     camera.quaternion.copy(quat);
  // });

  const handleClick = useCallback(() => {
    if (isZoomed) return;

    setIsZoomed(true);
    if (orbitControls) {
      orbitControls.enabled = false;
      orbitControls.enableDamping = false;
    }
  }, [isZoomed, setIsZoomed, orbitControls]);

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
