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
            // Very subtle ambient to prevent pure black shadows
            {
                type: 'ambientLight',
                intensity: 0.05
            },
            // Left rect area light (Purple)
            {
                type: 'rectAreaLight',
                position: [-6.5, 2, 6.5] as [number, number, number],
                rotation: [0, 0, 0] as [number, number, number],
                color: '#A26BFF',
                power: 20,
                size: 3
            },
            // Left subtle fill light (no shadows for performance)
            {
                type: 'directionalLight',
                position: [-6.5, 2, 6.5] as [number, number, number],
                color: '#3d2860',
                intensity: 1,
                castShadow: true
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
            // Right subtle fill light (no shadows for performance)
            {
                type: 'directionalLight',
                position: [4, 2, 10] as [number, number, number],
                color: '#2a3d6b',
                intensity: 1,
                castShadow: true
            },
            // Top rect area light (White/Blue)
            {
                type: 'rectAreaLight',
                position: [-0.5, 2.5, -1.5] as [number, number, number],
                rotation: [0, -3.6, -3.2] as [number, number, number],
                color: '#2dfff3',
                power: 5,
                size: 2
            },
            {
                type: 'directionalLight',
                position: [-14, 2, 10] as [number, number, number],
                color: '#2a3d6b',
                intensity: 5,
                castShadow: true
            },

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