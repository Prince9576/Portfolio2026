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
  const { nodes, materials } = useGLTF("/models/room.glb", true) as any;
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
        geometry={nodes.Plane.geometry}
        material={materials.greey}
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
          material={materials.corona_berr_liquid}
        />
      </group>
      <group position={[2.945, 0.433, 1.156]} scale={[0.459, 0.404, 0.459]}>
        <mesh
          castShadow
          geometry={nodes.Circle014.geometry}
          material={materials.Ceramic}
        />
        <mesh
          castShadow
          geometry={nodes.Circle014_1.geometry}
          material={materials.pizza_dough}
        />
        <mesh
          castShadow
          geometry={nodes.Circle014_2.geometry}
          material={materials.Pizza_00}
        />
        <mesh
          castShadow
          geometry={nodes.Circle014_3.geometry}
          material={materials.Pizza_01}
        />
      </group>

      <Phone />

      <group position={[0, 0.411, 0]} scale={4}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_1.geometry}
          material={materials.Wall}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_2.geometry}
          material={materials.Floor}
        />
      </group>
      <mesh
        geometry={nodes.Circle.geometry}
        material={materials.Metal}
        position={[0.029, 0.2, 2.418]}
      />
      <Tv nodes={nodes} materials={materials} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tv_Cabinet.geometry}
        material={materials.Cabinet}
        position={[0.028, 0.411, -3.357]}
        scale={[1, 1.079, 1.083]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane012.geometry}
          material={materials.Cabinet}
          position={[-0.026, 0, -0.002]}
        />
      </mesh>
      <mesh
        receiveShadow
        geometry={nodes.Base.geometry}
        material={materials.Bg}
        position={[-9.848, 0.006, -10.136]}
        scale={68.947}
      />
      <group
        position={[2.123, 1.236, -3.005]}
        rotation={[Math.PI, -0.873, Math.PI]}
        scale={[0.189, 0.177, 0.236]}
      >
        <mesh
          geometry={nodes.Plane012_3.geometry}
          material={materials.BookCover}
        />
        <mesh
          geometry={nodes.Plane012_4.geometry}
          material={materials.BookPaper}
        />
      </group>
      <group
        position={[2.745, 0.841, -2.987]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.189, 0.189, 0.236]}
      >
        <mesh
          geometry={nodes.Plane012_5.geometry}
          material={materials.BookCover2}
        />
        <mesh
          geometry={nodes.Plane012_6.geometry}
          material={materials.BookPaper}
        />
      </group>
      <group
        position={[-1.84, 0.662, -3.132]}
        rotation={[0, -1.047, 0]}
        scale={[0.189, 0.189, 0.236]}
      >
        <mesh
          geometry={nodes.Plane012_1.geometry}
          material={materials.BookCover4}
        />
        <mesh
          geometry={nodes.Plane012_2.geometry}
          material={materials.BookPaper}
        />
      </group>
      <group position={[-1.831, 0.604, -2.987]} scale={[0.189, 0.085, 0.236]}>
        <mesh
          geometry={nodes.Plane012_3.geometry}
          material={materials.BookCover}
        />
        <mesh
          geometry={nodes.Plane012_4.geometry}
          material={materials.BookPaper}
        />
      </group>
      <group
        position={[-1.378, 0.685, -3.117]}
        rotation={[0.976, 1.138, -0.926]}
        scale={[0.187, 0.115, 0.226]}
      >
        <mesh
          geometry={nodes.Plane012_5.geometry}
          material={materials.BookCover2}
        />
        <mesh
          geometry={nodes.Plane012_6.geometry}
          material={materials.BookPaper}
        />
      </group>
      <group
        position={[2.398, 0.824, -2.987]}
        rotation={[Math.PI / 2, 0, 1.396]}
        scale={[0.189, 0.145, 0.219]}
      >
        <mesh
          geometry={nodes.Plane012_3.geometry}
          material={materials.BookCover}
        />
        <mesh
          geometry={nodes.Plane012_4.geometry}
          material={materials.BookPaper}
        />
      </group>
      <group
        position={[2.571, 0.83, -2.987]}
        rotation={[Math.PI / 2, -0.262, Math.PI / 2]}
        scale={[0.189, 0.122, 0.236]}
      >
        <mesh
          geometry={nodes.Plane012_7.geometry}
          material={materials.BookCover3}
        />
        <mesh
          geometry={nodes.Plane012_8.geometry}
          material={materials.BookPaper}
        />
      </group>
      <group
        position={[2.072, 0.605, -3.053]}
        rotation={[0, -1.152, 0]}
        scale={[0.172, 0.076, 0.185]}
      >
        <mesh
          geometry={nodes.Plane012_1.geometry}
          material={materials.BookCover4}
        />
        <mesh
          geometry={nodes.Plane012_2.geometry}
          material={materials.BookPaper}
        />
      </group>
      <group
        position={[-0.754, 1.401, -0.453]}
        rotation={[Math.PI / 2, 0, 2.443]}
        scale={0.065}
      >
        <mesh
          geometry={nodes.Cube006.geometry}
          material={materials["Mug Inner"]}
        />
        <mesh
          geometry={nodes.Cube006_1.geometry}
          material={materials["Mug Outer"]}
        />
        <mesh
          geometry={nodes.water.geometry}
          material={materials.Water}
          position={[0.153, -0.964, -0.036]}
          rotation={[Math.PI / 2, 0.698, Math.PI]}
          scale={15.302}
        />
      </group>
      <group
        castShadow
        receiveShadow
        position={[-0.063, 0.975, -3.27]}
        rotation={[0, -Math.PI / 2, -Math.PI / 2]}
        scale={[1, 1, 1]}
      ></group>
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
        <Light lights={guitarSpotlight} showHelpers={false} />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Indoor_Plant.geometry}
        material={materials.gorshok}
        position={[3.423, 0.411, -3.361]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.001}
      >
        <mesh
          geometry={nodes.Dirt.geometry}
          material={materials.sand}
          position={[-93.204, 0.044, 46.982]}
        />
        <mesh
          geometry={nodes.Dirt02.geometry}
          material={materials.sand}
          position={[0, 354.445, 0]}
        />
        <mesh
          geometry={nodes.Leaf000.geometry}
          material={materials["leaf.001"]}
          position={[15.854, 1016.605, 288.257]}
        />
        <mesh
          geometry={nodes.Leaf008.geometry}
          material={materials["leaf.001"]}
          position={[192.185, 619.194, 48.51]}
        />
        <mesh
          geometry={nodes.Leaf009.geometry}
          material={materials["leaf.001"]}
          position={[-208.453, 596.194, -44.549]}
        />
        <mesh
          geometry={nodes.Leaf010.geometry}
          material={materials["leaf.001"]}
          position={[-91.632, 511.383, 95.451]}
        />
        <mesh
          geometry={nodes.Leaf011.geometry}
          material={materials["leaf.001"]}
          position={[-29.973, 649.38, -231.326]}
        />
        <mesh
          geometry={nodes.Leaf006000.geometry}
          material={materials["leaf.001"]}
          position={[15.196, 1038.559, -352.576]}
        />
        <mesh
          geometry={nodes.Leaf007.geometry}
          material={materials["leaf.001"]}
          position={[347.832, 736.289, -262.987]}
        />
        <mesh
          geometry={nodes.leaf02000.geometry}
          material={materials["leaf.001"]}
          position={[-34.449, 1280.297, 2.758]}
        />
        <mesh
          geometry={nodes.leaf03000.geometry}
          material={materials["leaf.001"]}
          position={[367.883, 1072.772, -54.787]}
        />
        <mesh
          geometry={nodes.leaf05000.geometry}
          material={materials["leaf.001"]}
          position={[-351.01, 870.815, 251.124]}
        />
        <mesh
          geometry={nodes.lef04000.geometry}
          material={materials["leaf.001"]}
          position={[-462.612, 934.73, -232.387]}
        />
        <mesh
          geometry={nodes.Moh.geometry}
          material={materials.moh}
          position={[-6.768, -65.677, 2.005]}
        />
        <mesh
          geometry={nodes.stem.geometry}
          material={materials.stem}
          position={[-9.674, 271.904, -13.492]}
        />
      </mesh>
      <mesh
        geometry={nodes.Remote.geometry}
        material={materials.Remote}
        position={[0.817, 1.22, -3.339]}
        rotation={[0, Math.PI / 9, 0]}
        scale={0.064}
      />
      <mesh
        geometry={nodes.Soundbar.geometry}
        material={materials["Soundbar Cover"]}
        position={[-0.589, 1.719, -3.863]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.095, 2.868, 0.161]}
      >
        <mesh
          geometry={nodes.Cube.geometry}
          material={materials["Soundbar Cover"]}
          position={[0.146, 0.024, 0]}
          scale={[0.955, 0.914, 0.955]}
        />
        <mesh
          geometry={nodes.Plane022.geometry}
          material={materials["Soundbar Foam"]}
          position={[0.558, -0.901, 0.308]}
          scale={[10.57, 0.266, 6.22]}
        />
        <group
          position={[1.476, -0.553, 0.04]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0, 0.007, 0.01]}
        >
          <mesh
            geometry={nodes.ID10001.geometry}
            material={materials["Soundbar Speaker"]}
          />
          <mesh
            geometry={nodes.ID10001_1.geometry}
            material={materials["Soundbar Speaker 2"]}
          />
        </group>
        <group
          position={[1.476, 0.129, -0.232]}
          rotation={[-Math.PI, 0, -Math.PI / 2]}
          scale={[0, 0.007, 0.01]}
        >
          <mesh
            geometry={nodes.ID10001.geometry}
            material={materials["Soundbar Speaker"]}
          />
          <mesh
            geometry={nodes.ID10001_1.geometry}
            material={materials["Soundbar Speaker 2"]}
          />
        </group>
        <group
          position={[1.466, 0.103, 0.033]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0, 0.005, 0.007]}
        >
          <mesh
            geometry={nodes.ID10.geometry}
            material={materials["Soundbar Speaker"]}
          />
          <mesh
            geometry={nodes.ID10_1.geometry}
            material={materials["Soundbar Speaker 2"]}
          />
        </group>
        <group
          position={[1.466, -0.433, 0.033]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0, 0.005, 0.007]}
        >
          <mesh
            geometry={nodes.ID10.geometry}
            material={materials["Soundbar Speaker"]}
          />
          <mesh
            geometry={nodes.ID10_1.geometry}
            material={materials["Soundbar Speaker 2"]}
          />
        </group>
        <group
          position={[1.476, -0.688, 0.04]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0, 0.007, 0.01]}
        >
          <mesh
            geometry={nodes.ID10001.geometry}
            material={materials["Soundbar Speaker"]}
          />
          <mesh
            geometry={nodes.ID10001_1.geometry}
            material={materials["Soundbar Speaker 2"]}
          />
        </group>
        <group
          position={[1.476, 0.387, 0.04]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0, 0.007, 0.01]}
        >
          <mesh
            geometry={nodes.ID10001.geometry}
            material={materials["Soundbar Speaker"]}
          />
          <mesh
            geometry={nodes.ID10001_1.geometry}
            material={materials["Soundbar Speaker 2"]}
          />
        </group>
      </mesh>
      <group
        position={[0.073, 0.411, -1.08]}
        rotation={[Math.PI / 2, 0, 0.611]}
        scale={2.437}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Center_Table.geometry}
          material={materials["Tea Table "]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Center_Table_1.geometry}
          material={materials["Table Drawer"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Center_Table_2.geometry}
          material={materials["Drawer Holder"]}
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

      <group
        position={[-0.091, 1.397, -0.37]}
        rotation={[-0.258, 0.254, 0.066]}
        scale={0.502}
      >
        <mesh
          geometry={nodes.Plane004.geometry}
          material={materials.joystick}
        />
        <mesh
          geometry={nodes.Plane004_1.geometry}
          material={materials.JoystickLights}
        />
      </group>
      <group
        position={[-0.682, 0.543, -0.399]}
        rotation={[-2.884, 0.254, 3.076]}
        scale={0.502}
      >
        <mesh
          geometry={nodes.Plane004.geometry}
          material={materials.joystick}
        />
        <mesh
          geometry={nodes.Plane004_1.geometry}
          material={materials.JoystickLights}
        />
      </group>
      <group position={[-0.051, 1.29, -3.343]} scale={0.375}>
        <mesh geometry={nodes.Cube002.geometry} material={materials.PS4Top} />
        <mesh
          geometry={nodes.Cube002_1.geometry}
          material={materials.PS4Font}
        />
        <mesh
          geometry={nodes.PS4_Base.geometry}
          material={materials.PS4Bottom}
          position={[0, -0.113, 0.042]}
        />
      </group>
    </group>
  );
});

Main.displayName = "Main";

useGLTF.preload("/models/room.glb", true);

export default Main;
