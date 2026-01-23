import { PresentationControls, Environment } from "@react-three/drei";
import Workspace from "./Workspace";
import { useControls } from "leva";

const Scene = () => {
    // const { position, rotation, scale } = useControls('Workspace', {
    //     position: {
    //         value: [-0.81, -2.75, 0],
    //         step: 0.01,
    //         label: 'Position'
    //     },
    //     rotation: {
    //         value: [-.34, .64, 0.65],
    //         step: 0.001,
    //         label: 'Rotation'
    //     },
    //     scale: {
    //         value: 1,
    //         min: 0.1,
    //         max: 10,
    //         step: 0.1,
    //         label: 'Scale'
    //     }
    // });
    return (
        <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
            snap
        >
            <Environment preset="night" />
            <ambientLight intensity={1.2} />
            <directionalLight
                position={[5, 8, 5]}
                intensity={1.5}
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-camera-near={0.5}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />
            <directionalLight position={[-5, 5, -5]} intensity={0.8} />
            <spotLight
                position={[0, 10, 0]}
                intensity={0.8}
                angle={0.6}
                penumbra={1}
                castShadow
            />

            <Workspace />
        </PresentationControls >
    )
}

export default Scene;