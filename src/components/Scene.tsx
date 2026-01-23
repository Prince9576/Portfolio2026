import { PresentationControls, Environment } from "@react-three/drei";
import Workspace from "./Workspace";
import { useControls } from "leva";
import { useMemo } from "react";
import { useThree } from "@react-three/fiber";
import Light from "./Light";

const Scene = () => {
    const { camera } = useThree();

    // Debug toggle and controls
    const { showHelpers } = useControls('Debug', {
        showHelpers: {
            value: false,
            label: 'Show Helpers'
        }
    });

    const lights = useMemo(() => {
        return [
            // Left rect area light (Purple)
            {
                type: 'rectAreaLight',
                position: [-6.5, 2, 6.5] as [number, number, number],
                rotation: [0, 0, 0] as [number, number, number],
                color: '#A26BFF',
                power: 35,
                size: 3
            },
            // Right rect area light (Blue)
            {
                type: 'rectAreaLight',
                position: [4, 2, 10] as [number, number, number],
                rotation: [0, 0, 0] as [number, number, number],
                color: '#87A0FF',
                power: 25,
                size: 3
            },
            // Top rect area light (White/Blue)
            {
                type: 'rectAreaLight',
                position: [-0.5, 2.5, -1.5] as [number, number, number],
                rotation: [0, -3.6, -3.2] as [number, number, number],
                color: '#2dfff3',
                power: 18,
                size: 2
            },
            // Back rect area light (Blue accent)
            // {
            //     type: 'rectAreaLight',
            //     position: [0, 1, -3] as [number, number, number],
            //     color: '#6B9FFF',
            //     power: 15,
            //     size: 4
            // },
        ]
    }, [])

    return (
        <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
            snap
        >
            {/* Dark background like Blender */}
            <color attach="background" args={['#0a0f1e']} />
            <fog attach="fog" args={['#0a0f1e', 10, 30]} />

            {/* Reduced environment for subtle reflections only */}
            <Environment preset="night" environmentIntensity={0.1} />

            {/* Camera Helper */}
            {showHelpers && <cameraHelper args={[camera]} />}

            {/* Lights */}
            <Light lights={lights} showHelpers={showHelpers} />

            <Workspace />
        </PresentationControls >
    )
}

export default Scene;