import { useGLTF } from "@react-three/drei";
import { memo, type JSX } from "react";


const Shelf = memo(function Shelf(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/shelf-draco-v1.glb") as any;
  return (
    <group {...props} dispose={null}>
      <group position={[0.034, 1.448, 0.084]} rotation={[-Math.PI, 1.504, -Math.PI]} scale={0.222}>
        <mesh
          geometry={nodes.Sphere001.geometry}
          material={materials['Material.002']}
        />
        <mesh
          geometry={nodes.Sphere001_1.geometry}
          material={materials.PaletteMaterial001}
        />
      </group>
      <group
        position={[0.05, 2.777, 0.121]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[-0.491, -0.05, -0.318]}>
        <mesh
          geometry={nodes.Cube006.geometry}
          material={materials.PaletteMaterial003}
        />
        <mesh
          geometry={nodes.Cube006_1.geometry}
          material={materials.PaletteMaterial002}
        />
      </group>
      <mesh
        geometry={nodes.Shelf2001.geometry}
        material={materials.PaletteMaterial004}
        position={[0.05, 1.573, 0.121]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[-0.491, -0.05, -0.318]}
      />
      <mesh
        geometry={nodes.Shelf3001.geometry}
        material={materials.PaletteMaterial005}
        position={[0.05, 2.175, -0.942]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[-0.491, -0.05, -0.318]}
      />
      <group position={[0.136, 2.412, 0.127]} rotation={[-Math.PI / 2, 0, 0]} scale={0.132}>
        <mesh
          geometry={nodes.Side_Panel_Panels_0_1.geometry}
          material={materials.Panels}
        />
        <mesh
          geometry={nodes.Side_Panel_Panels_0_2.geometry}
          material={materials.Mesh}
        />
        <mesh
          geometry={nodes.Side_Panel_Panels_0_3.geometry}
          material={materials.Engine}
        />
        <mesh
          geometry={nodes.Side_Panel_Panels_0_4.geometry}
          material={materials.Decal}
        />
      </group>
      <mesh
        geometry={nodes.Object_2.geometry}
        material={materials['nrt_eye.png.001_nrt_eye.png']}
        position={[0.058, 1.639, -0.945]}
        rotation={[-1.571, 0.002, 1.603]}
        scale={0.462}
      />
      <mesh
        geometry={nodes.Object_3.geometry}
        material={materials['nrt_tex01.png_nrt_tex01.png']}
        position={[0.058, 1.639, -0.945]}
        rotation={[-1.571, 0.002, 1.603]}
        scale={0.462}
      />
      <mesh
        geometry={nodes.Object_4.geometry}
        material={materials['nrt_tex02.png_nrt_tex02.png']}
        position={[0.058, 1.639, -0.945]}
        rotation={[-1.571, 0.002, 1.603]}
        scale={0.462}
      />
    </group>
  );
});

Shelf.displayName = "Shelf";

export default Shelf;

useGLTF.preload("/models/shelf-draco-v1.glb", true);
