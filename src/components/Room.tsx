import { Text3D, useGLTF } from "@react-three/drei";
import { memo, useRef } from "react";
import * as THREE from "three";
import Light from "./Light";
import useGuitarSpotlight from "../hooks/useGuitarSpotlight";
import Laptop from "./Laptop";
import useWallFrameSpotlight from "../hooks/useWallFrameSpotlight";
import Shelf from "./Shelf";
import Tv from "./Tv";
import Phone from "./Phone";

const Main = memo((props: { scale: number }) => {
  const { nodes, materials } = useGLTF("/models/room-draco-v2.glb", true) as any;

  const position = [-0.72, -2, 0] as [number, number, number];
  const rotation = [-0.35, -1.07, -0.04] as [number, number, number];
  const scale = props.scale;
  const guitarRef = useRef<THREE.Mesh>(null);
  const wallFrameRef = useRef<THREE.Mesh>(null);
  const guitarSpotlight = useGuitarSpotlight(guitarRef);
  const wallFrameSpotlight = useWallFrameSpotlight(wallFrameRef);

  return (
    <group position={position} rotation={rotation} scale={scale} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.sobc_legs.geometry}
        material={materials.wood_Mat}
        position={[-2.131, 0.267, 2.283]}
        scale={0.026}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.sobc_body.geometry}
        material={materials.upholstery_Mat}
        position={[-1.319, 1.337, 2.394]}
        rotation={[Math.PI, -0.048, Math.PI]}
        scale={[0.019, 0.026, 0.026]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials.PaletteMaterial001}
        position={[2.619, 0.376, 2.503]}
        rotation={[Math.PI / 2, 0, 2.51]}
        scale={0.575}
      />
      <group
        position={[3.497, 0.42, 1.714]}
        rotation={[-Math.PI, 1.127, -Math.PI]}
        scale={2.338}
      >
        <mesh
          castShadow
          geometry={nodes.corona_beer_1.geometry}
          material={materials.corona_beer}
        />
        <mesh
          castShadow
          geometry={nodes.corona_beer_2.geometry}
          material={materials.PaletteMaterial002}
        />
      </group>
      <group position={[2.945, 0.433, 1.156]} scale={[0.459, 0.404, 0.459]}>
        <mesh
          castShadow
          geometry={nodes.Circle014.geometry}
          material={materials.PaletteMaterial003}
        />
        <mesh
          castShadow
          geometry={nodes.Circle014_1.geometry}
          material={materials.PaletteMaterial004}
        />
        <mesh
          castShadow
          geometry={nodes.Circle014_2.geometry}
          material={materials.Pizza_00}
        />
      </group>
      <Phone />
      <group position={[0, 0.411, 0]} scale={4}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_1.geometry}
          material={materials.Floor}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_2.geometry}
          material={materials.PaletteMaterial005}
        />
      </group>
      <group
        position={[-0.28, 3.631, -3.878]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[1.967, 1.124, 1.124]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane006.geometry}
          material={materials.TVDisplay}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane006_1.geometry}
          material={materials.PaletteMaterial006}
        />
      </group>
      <Tv nodes={nodes} materials={materials} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tv_Cabinet.geometry}
        material={materials.Cabinet}
        position={[0.028, 0.411, -3.357]}
        scale={[1, 1.079, 1.083]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Book7.geometry}
        material={materials.BookCover3}
        position={[2.571, 0.83, -2.987]}
        rotation={[Math.PI / 2, -0.262, Math.PI / 2]}
        scale={[0.189, 0.122, 0.236]}
      />
      <group
        position={[-0.754, 1.401, -0.453]}
        rotation={[Math.PI / 2, 0, 2.443]}
        scale={0.065}
      >
        <mesh
          geometry={nodes.Cube006.geometry}
          material={materials.PaletteMaterial007}
        />
        <mesh
          geometry={nodes.Cube006_1.geometry}
          material={materials.PaletteMaterial008}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Dvd_Player.geometry}
        material={materials.PaletteMaterial009}
        position={[-0.063, 0.575, -3.27]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.075, 0.064, 0.086]}
      />
      <group>
        <mesh
          ref={guitarRef}
          castShadow
          receiveShadow
          geometry={nodes.Guitar.geometry}
          material={materials.Guitar}
          position={[-3.786, 1.824, -3.628]}
          rotation={[2.866, -0.884, -1.712]}
          scale={0.07}
        />
        <Light lights={guitarSpotlight} />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Indoor_Plant.geometry}
        material={materials.gorshok}
        position={[3.423, 0.411, -3.361]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.001}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Remote.geometry}
        material={materials.Remote}
        position={[0.817, 1.22, -3.339]}
        rotation={[0, Math.PI / 9, 0]}
        scale={0.064}
      />
      <group
        position={[0.073, 0.411, -1.08]}
        rotation={[Math.PI / 2, 0, 0.611]}
        scale={2.437}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Tea_Table.geometry}
          material={materials['Tea Table ']}
        />
        <Laptop
          position={[0.2, -0.12, -0.42]}
          rotation={[-1.51, 1.11, -0.05]}
          scale={0.05}
        />
      </group>
      <group position={[-4, 3.668, -1.763]} rotation={[1.571, 0, -Math.PI / 2]}>
        <Light lights={wallFrameSpotlight} />
        <mesh
          ref={wallFrameRef}
          castShadow
          receiveShadow
          geometry={nodes.Wall_Frame.geometry}
          material={materials["Wall Frame"]}
          scale={[3.063 - 0.32, 3.533 - 0.32, 3.533 - 0.32]}
        />
      </group>
      <Shelf scale={0.75} position={[-3.9, 1.568, 1.25]} />

      <group position={[-4, 4.968, 3.5]}>
        <Text3D
          font="/fonts/neon.typeface.json"
          size={0.35}
          height={0.05}
          curveSegments={8}
          bevelEnabled
          bevelThickness={0.01}
          bevelSize={0.005}
          bevelSegments={3}
          rotation={[0, Math.PI / 2, 0]}
        >
          Prince.Kr
          <meshStandardMaterial
            color="#e6c7ff"
            emissive="#b76cff"
            emissiveIntensity={2.2}
            toneMapped={false}
          />
        </Text3D>

        <Text3D
          font="/fonts/spark.typeface.json"
          size={0.2}
          height={0.01}
          curveSegments={4}
          bevelEnabled
          bevelThickness={0.01}
          bevelSize={0.005}
          bevelSegments={2}
          position-y={-0.45}
          position-z={-0.2}
          rotation={[0, Math.PI / 2, 0]}
        >
          SDE III | Frontend
          <meshStandardMaterial
            color="#dbe3ff"
            emissive="#7f9cff"
            emissiveIntensity={1.25}
            toneMapped={false}
          />
        </Text3D>
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.PS4_Controller.geometry}
        material={materials.PaletteMaterial011}
        position={[-0.091, 1.397, -0.37]}
        rotation={[-0.258, 0.254, 0.066]}
        scale={0.502}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Dirt.geometry}
        material={materials.sand}
        position={[3.486, 0.411, -3.236]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.001}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Leaf000.geometry}
        material={materials['leaf.001']}
        position={[3.81, 1.778, -3.382]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.001}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Moh.geometry}
        material={materials.moh}
        position={[3.426, 0.323, -3.352]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.001}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.stem.geometry}
        material={materials.stem}
        position={[3.405, 0.777, -3.348]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.001}
      />
    </group>
  )
});

Main.displayName = "Main";

useGLTF.preload("/models/room-draco-v2.glb", true);

export default Main;
