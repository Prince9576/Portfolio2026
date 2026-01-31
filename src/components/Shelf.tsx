import { useGLTF } from '@react-three/drei'

function Shelf(props: any) {
    const { nodes, materials } = useGLTF('/Models/Shelf.glb') as any;
    return (
        <group {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]} scale={0.45}>
                <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                    <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                        <group position={[0.302, -0.282, 5.363]} scale={0.294}>
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Side_Panel_Panels_0_1.geometry}
                                material={materials.Panels}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Side_Panel_Panels_0_2.geometry}
                                material={materials.Mesh}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Side_Panel_Panels_0_3.geometry}
                                material={materials.Engine}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Side_Panel_Panels_0_4.geometry}
                                material={materials.Decal}
                            />
                        </group>
                    </group>
                </group>
            </group>
            <group position={[0.058, 1.639, -0.945]} rotation={[-1.571, 0.002, 1.603]} scale={0.462}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_2.geometry}
                    material={materials['nrt_eye.png.001_nrt_eye.png']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_3.geometry}
                    material={materials['nrt_tex01.png_nrt_tex01.png']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_4.geometry}
                    material={materials['nrt_tex02.png_nrt_tex02.png']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_5.geometry}
                    material={materials['nrta_tex2.png_nrt_tex02.png']}
                />
            </group>
            <group position={[0.034, 1.448, 0.084]} rotation={[-Math.PI, 1.504, -Math.PI]} scale={0.222}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Sphere001.geometry}
                    material={materials['Material.002']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Sphere001_1.geometry}
                    material={materials['Material.001']}
                />
            </group>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Shelf1001.geometry}
                material={materials.Material}
                position={[0.05, 2.777, 0.121]}
                rotation={[-Math.PI, 0, -Math.PI]}
                scale={[-0.491, -0.05, -0.318]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Shelf2001.geometry}
                material={materials.Material}
                position={[0.05, 1.573, 0.121]}
                rotation={[-Math.PI, 0, -Math.PI]}
                scale={[-0.491, -0.05, -0.318]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Shelf3001.geometry}
                material={materials.Material}
                position={[0.05, 2.175, -0.942]}
                rotation={[-Math.PI, 0, -Math.PI]}
                scale={[-0.491, -0.05, -0.318]}
            />
        </group>
    )
}

export default Shelf;

useGLTF.preload('/Shelf.glb')