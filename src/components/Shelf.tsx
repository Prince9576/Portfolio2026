import { useGLTF } from "@react-three/drei";
import { memo } from "react";

const Shelf = memo(function Shelf(props: any) {
  const { nodes, materials } = useGLTF("/models/Shelf.glb") as any;
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.45}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <group position={[0.302, -0.282, 5.363]} scale={0.294}>
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
          </group>
        </group>
      </group>
      <group
        position={[0.058, 1.639, -0.945]}
        rotation={[-1.571, 0.002, 1.603]}
        scale={0.462}
      >
        <mesh
          geometry={nodes.Object_2.geometry}
          material={materials["nrt_eye.png.001_nrt_eye.png"]}
        />
        <mesh
          geometry={nodes.Object_3.geometry}
          material={materials["nrt_tex01.png_nrt_tex01.png"]}
        />
        <mesh
          geometry={nodes.Object_4.geometry}
          material={materials["nrt_tex02.png_nrt_tex02.png"]}
        />
        <mesh
          geometry={nodes.Object_5.geometry}
          material={materials["nrta_tex2.png_nrt_tex02.png"]}
        />
      </group>
      <group
        position={[0.034, 1.448, 0.084]}
        rotation={[-Math.PI, 1.504, -Math.PI]}
        scale={0.222}
      >
        <mesh
          geometry={nodes.Sphere001.geometry}
          material={materials["Material.002"]}
        />
        <mesh
          geometry={nodes.Sphere001_1.geometry}
          material={materials["Material.001"]}
        />
      </group>
      <group
        position={[0.05, 2.777, 0.121]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[-0.491, -0.05, -0.318]}
      >
        <mesh
          geometry={nodes.Cube006.geometry}
          material={materials["Material.003"]}
        />
        <mesh
          geometry={nodes.Cube006_1.geometry}
          material={materials.Neon_bike}
        />
      </group>
      <group
        position={[0.05, 1.573, 0.121]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[-0.491, -0.05, -0.318]}
      >
        <mesh
          geometry={nodes.Cube005.geometry}
          material={materials["Material.003"]}
        />
        <mesh
          geometry={nodes.Cube005_1.geometry}
          material={materials.Neon_edge_3}
        />
      </group>
      <group
        position={[0.05, 2.175, -0.942]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[-0.491, -0.05, -0.318]}
      >
        <mesh
          geometry={nodes.Cube004.geometry}
          material={materials["Material.003"]}
        />
        <mesh
          geometry={nodes.Cube004_1.geometry}
          material={materials.Neon_edge_2}
        />
      </group>
    </group>
  );
});

Shelf.displayName = "Shelf";

export default Shelf;

useGLTF.preload("/models/Shelf.glb", true);
