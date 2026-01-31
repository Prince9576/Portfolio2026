
import { Text3D, useGLTF } from '@react-three/drei'
import { memo, useRef } from 'react';
import * as THREE from 'three';
import Light from './Light';
import useGuitarSpotlight from '../hooks/useGuitarSpotlight';
import Laptop from './Laptop';
import useWallFrameSpotlight from '../hooks/useWallFrameSpotlight';


const Main = memo(() => {

    /* Base */
    const { nodes, materials } = useGLTF('/Models/gaming_raw6.glb', true) as any;
    const position = [-0.72, -2, 0] as [number, number, number];
    const rotation = [-0.35, -1.07, -0.04] as [number, number, number];
    const scale = 1.05;

    /* Refs */
    const guitarRef = useRef<THREE.Mesh>(null);
    const tvScreenRef = useRef<THREE.Mesh>(null);
    const wallFrameRef = useRef<THREE.Mesh>(null);
    /* Hooks */
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
                material={materials.greey}
                position={[2.619, 0.376, 2.503]}
                rotation={[Math.PI / 2, 0, 2.51]}
                scale={0.575}
            />
            <group position={[3.497, 0.42, 1.714]} rotation={[-Math.PI, 1.127, -Math.PI]} scale={2.338}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.corona_beer_1.geometry}
                    material={materials.corona_beer}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.corona_beer_2.geometry}
                    material={materials.corona_berr_liquid}
                />
                {/* <pointLight position-y={-0.01} intensity={0.05} color="rgb(0.6, 0.5, 1.0" /> */}
            </group>
            <group position={[2.945, 0.433, 1.156]} scale={[0.459, 0.404, 0.459]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Circle014.geometry}
                    material={materials.Ceramic}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Circle014_1.geometry}
                    material={materials.pizza_dough}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Circle014_2.geometry}
                    material={materials.Pizza_00}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Circle014_3.geometry}
                    material={materials.Pizza_01}
                />
            </group>
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
                castShadow
                receiveShadow
                geometry={nodes.Circle.geometry}
                material={materials.Metal}
                position={[0.029, 0.2, 2.418]}
            />
            <group
                position={[-0.28, 3.631, -3.878]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={[1.967, 1.124, 1.124]}>
                <mesh castShadow receiveShadow geometry={nodes.Plane006.geometry} material={materials.TV} />
                <mesh
                    ref={tvScreenRef}
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane006_1.geometry}
                >
                    <meshBasicMaterial color="#1a1a1f" toneMapped={false} />
                    {/* <Html
                        className='tv-content-outer-container'
                        transform
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={0.5}
                        position={[0, 0, 0.001]}
                    >

                        <TvScreenContent />

                    </Html> */}
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane006_2.geometry}
                    material={materials.TVBacklight}
                />
            </group>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Tv_Cabinet.geometry}
                material={materials.Cabinet}
                position={[0.028, 0.411, -3.357]}
                scale={[1, 1.079, 1.083]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane012.geometry}
                    material={materials.Cabinet}
                    position={[-0.026, 0, -0.002]}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Base.geometry}
                material={materials.Bg}
                position={[-9.848, 0.006, -10.136]}
                scale={68.947}
            />
            <group
                position={[2.123, 1.236, -3.005]}
                rotation={[Math.PI, -0.873, Math.PI]}
                scale={[0.189, 0.177, 0.236]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane012_3.geometry}
                    material={materials.BookCover}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane012_4.geometry}
                    material={materials.BookPaper}
                />
            </group>
            <group
                position={[2.745, 0.841, -2.987]}
                rotation={[Math.PI / 2, 0, Math.PI / 2]}
                scale={[0.189, 0.189, 0.236]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane012_5.geometry}
                    material={materials.BookCover2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane012_6.geometry}
                    material={materials.BookPaper}
                />
            </group>
            <group
                position={[-1.84, 0.662, -3.132]}
                rotation={[0, -1.047, 0]}
                scale={[0.189, 0.189, 0.236]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane012_1.geometry}
                    material={materials.BookCover4}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane012_2.geometry}
                    material={materials.BookPaper}
                />
            </group>
            <group position={[-1.831, 0.604, -2.987]} scale={[0.189, 0.085, 0.236]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane012_3.geometry}
                    material={materials.BookCover}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane012_4.geometry}
                    material={materials.BookPaper}
                />
            </group>
            <group
                position={[-1.378, 0.685, -3.117]}
                rotation={[0.976, 1.138, -0.926]}
                scale={[0.187, 0.115, 0.226]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane012_5.geometry}
                    material={materials.BookCover2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane012_6.geometry}
                    material={materials.BookPaper}
                />
            </group>
            <group
                position={[2.398, 0.824, -2.987]}
                rotation={[Math.PI / 2, 0, 1.396]}
                scale={[0.189, 0.145, 0.219]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane012_3.geometry}
                    material={materials.BookCover}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane012_4.geometry}
                    material={materials.BookPaper}
                />
            </group>
            <group
                position={[2.571, 0.83, -2.987]}
                rotation={[Math.PI / 2, -0.262, Math.PI / 2]}
                scale={[0.189, 0.122, 0.236]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane012_7.geometry}
                    material={materials.BookCover3}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane012_8.geometry}
                    material={materials.BookPaper}
                />
            </group>
            <group
                position={[2.072, 0.605, -3.053]}
                rotation={[0, -1.152, 0]}
                scale={[0.172, 0.076, 0.185]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane012_1.geometry}
                    material={materials.BookCover4}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane012_2.geometry}
                    material={materials.BookPaper}
                />
            </group>
            <group position={[-0.754, 1.401, -0.453]} rotation={[Math.PI / 2, 0, 2.443]} scale={0.065}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube006.geometry}
                    material={materials['Mug Inner']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube006_1.geometry}
                    material={materials['Mug Outer']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.water.geometry}
                    material={materials.Water}
                    position={[0.153, -0.964, -0.036]}
                    rotation={[Math.PI / 2, 0.698, Math.PI]}
                    scale={15.302}
                />
            </group>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Dvd_Player.geometry}
                material={materials['DVD Player']}
                position={[-0.063, 0.575, -3.27]}
                rotation={[Math.PI, 0, Math.PI]}
                scale={[0.075, 0.064, 0.086]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Arch35_050_001.geometry}
                    material={materials['Soundbar Foam']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Arch35_051_001.geometry}
                    material={materials.pesdvdpeq}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Arch35_052_001.geometry}
                    material={materials.logodvd}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Arch35_053_001.geometry}
                    material={materials['DVD Player']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Arch35_054_001.geometry}
                    material={materials['DVD Player']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Arch35_056_001.geometry}
                    material={materials.pesdvdpeq}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Arch35_057_001.geometry}
                    material={materials['DVD Player']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Arch35_058_001.geometry}
                    material={materials.pesdvdpeq}
                />
            </mesh>
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
                scale={0.001}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Dirt.geometry}
                    material={materials.sand}
                    position={[-93.204, 0.044, 46.982]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Dirt02.geometry}
                    material={materials.sand}
                    position={[0, 354.445, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Leaf000.geometry}
                    material={materials['leaf.001']}
                    position={[15.854, 1016.605, 288.257]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Leaf008.geometry}
                    material={materials['leaf.001']}
                    position={[192.185, 619.194, 48.51]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Leaf009.geometry}
                    material={materials['leaf.001']}
                    position={[-208.453, 596.194, -44.549]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Leaf010.geometry}
                    material={materials['leaf.001']}
                    position={[-91.632, 511.383, 95.451]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Leaf011.geometry}
                    material={materials['leaf.001']}
                    position={[-29.973, 649.38, -231.326]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Leaf006000.geometry}
                    material={materials['leaf.001']}
                    position={[15.196, 1038.559, -352.576]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Leaf007.geometry}
                    material={materials['leaf.001']}
                    position={[347.832, 736.289, -262.987]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.leaf02000.geometry}
                    material={materials['leaf.001']}
                    position={[-34.449, 1280.297, 2.758]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.leaf03000.geometry}
                    material={materials['leaf.001']}
                    position={[367.883, 1072.772, -54.787]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.leaf05000.geometry}
                    material={materials['leaf.001']}
                    position={[-351.01, 870.815, 251.124]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.lef04000.geometry}
                    material={materials['leaf.001']}
                    position={[-462.612, 934.73, -232.387]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Moh.geometry}
                    material={materials.moh}
                    position={[-6.768, -65.677, 2.005]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.stem.geometry}
                    material={materials.stem}
                    position={[-9.674, 271.904, -13.492]}
                />
            </mesh>
            {/* <mesh
                castShadow
                receiveShadow
                geometry={nodes.Phone.geometry}
                material={materials['Phone Cover']}
                position={[0.277, 1.287, -0.158]}
                rotation={[0, -0.175, Math.PI]}
                scale={0.001}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cap1.geometry}
                    material={materials['default']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cap1_1.geometry}
                    material={materials['default']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cap1_2.geometry}
                    material={materials['default']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cap1_3.geometry}
                    material={materials['default']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cap1_4.geometry}
                    material={materials['default']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cap1_5.geometry}
                    material={materials['default']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cap1_6.geometry}
                    material={materials['default']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cap2.geometry}
                    material={materials['default']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cap2_1.geometry}
                    material={materials['default']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cap2_2.geometry}
                    material={materials['default']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cap2_3.geometry}
                    material={materials['default']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cap2_4.geometry}
                    material={materials['default']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cap2_5.geometry}
                    material={materials['default']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cap2_6.geometry}
                    material={materials['default']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Capsule.geometry}
                    material={materials['Phone Cover']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Capsule1.geometry}
                    material={materials['Phone Cover']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube005.geometry}
                    material={materials['default']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube1.geometry}
                    material={materials['Phone Display']}
                />
                <mesh castShadow receiveShadow geometry={nodes.Extrude.geometry} material={materials.Mat} />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Extrude1.geometry}
                    material={materials.Mat}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Extrude2.geometry}
                    material={materials['Mat.6']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Extrude_2.geometry}
                    material={materials['Phone Cover']}
                />
            </mesh> */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Remote.geometry}
                material={materials.Remote}
                position={[0.817, 1.22, -3.339]}
                rotation={[0, Math.PI / 9, 0]}
                scale={0.064}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Soundbar.geometry}
                material={materials['Soundbar Cover']}
                position={[-0.589, 1.719, -3.863]}
                rotation={[Math.PI / 2, 0, Math.PI / 2]}
                scale={[0.095, 2.868, 0.161]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube.geometry}
                    material={materials['Soundbar Cover']}
                    position={[0.146, 0.024, 0]}
                    scale={[0.955, 0.914, 0.955]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane022.geometry}
                    material={materials['Soundbar Foam']}
                    position={[0.558, -0.901, 0.308]}
                    scale={[10.57, 0.266, 6.22]}
                />
                <group
                    position={[1.476, -0.553, 0.04]}
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={[0, 0.007, 0.01]}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.ID10001.geometry}
                        material={materials['Soundbar Speaker']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.ID10001_1.geometry}
                        material={materials['Soundbar Speaker 2']}
                    />
                </group>
                <group
                    position={[1.476, 0.129, -0.232]}
                    rotation={[-Math.PI, 0, -Math.PI / 2]}
                    scale={[0, 0.007, 0.01]}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.ID10001.geometry}
                        material={materials['Soundbar Speaker']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.ID10001_1.geometry}
                        material={materials['Soundbar Speaker 2']}
                    />
                </group>
                <group
                    position={[1.466, 0.103, 0.033]}
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={[0, 0.005, 0.007]}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.ID10.geometry}
                        material={materials['Soundbar Speaker']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.ID10_1.geometry}
                        material={materials['Soundbar Speaker 2']}
                    />
                </group>
                <group
                    position={[1.466, -0.433, 0.033]}
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={[0, 0.005, 0.007]}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.ID10.geometry}
                        material={materials['Soundbar Speaker']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.ID10_1.geometry}
                        material={materials['Soundbar Speaker 2']}
                    />
                </group>
                <group
                    position={[1.476, -0.688, 0.04]}
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={[0, 0.007, 0.01]}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.ID10001.geometry}
                        material={materials['Soundbar Speaker']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.ID10001_1.geometry}
                        material={materials['Soundbar Speaker 2']}
                    />
                </group>
                <group
                    position={[1.476, 0.387, 0.04]}
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={[0, 0.007, 0.01]}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.ID10001.geometry}
                        material={materials['Soundbar Speaker']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.ID10001_1.geometry}
                        material={materials['Soundbar Speaker 2']}
                    />
                </group>
            </mesh>
            <group position={[0.073, 0.411, -1.08]} rotation={[Math.PI / 2, 0, 0.611]} scale={2.437}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Table.geometry}
                    material={materials['Tea Table ']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Table_1.geometry}
                    material={materials['Table Drawer']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Table_2.geometry}
                    material={materials['Drawer Holder']}
                />
                <Laptop
                    position={[0.20, -0.12, -0.42]}
                    rotation={[-1.51, 1.11, -0.05]}
                    scale={0.05}
                />
            </group>
            <group position={[-4, 3.668, -1.763]}
                rotation={[1.571, 0, -Math.PI / 2]}>
                <Light lights={wallFrameSpotlight} />
                <mesh
                    ref={wallFrameRef}
                    castShadow
                    receiveShadow
                    geometry={nodes.Wall_Frame.geometry}
                    material={materials['Wall Frame']}
                    scale={[3.063 - 0.32, 3.533 - 0.32, 3.533 - 0.32]}
                />
            </group>

            <group position={[-4, 4.968, 3.5]}
            >
                <Text3D
                    font="/fonts/neon.typeface.json"
                    size={0.35}
                    height={0.05}          // thickness (IMPORTANT)
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.01}
                    bevelSize={0.005}
                    bevelSegments={5}
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
                    height={0.01}          // thickness (IMPORTANT)
                    curveSegments={6}
                    bevelEnabled
                    bevelThickness={0.01}
                    bevelSize={0.005}
                    bevelSegments={5}
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

            <group position={[-0.091, 1.397, -0.37]} rotation={[-0.258, 0.254, 0.066]} scale={0.502}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane004.geometry}
                    material={materials.joystick}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane004_1.geometry}
                    material={materials.JoystickLights}
                />
            </group>
            <group position={[-0.682, 0.543, -0.399]} rotation={[-2.884, 0.254, 3.076]} scale={0.502}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane004.geometry}
                    material={materials.joystick}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane004_1.geometry}
                    material={materials.JoystickLights}
                />
            </group>
            <group position={[-0.051, 1.29, -3.343]} scale={0.375}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube002.geometry}
                    material={materials.PS4Top}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube002_1.geometry}
                    material={materials.PS4Font}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.PS4_Base.geometry}
                    material={materials.PS4Bottom}
                    position={[0, -0.113, 0.042]}
                />
            </group>
        </group>
    )
});

Main.displayName = 'Main';

useGLTF.preload('/Models/gaming_raw6.glb');

export default Main;