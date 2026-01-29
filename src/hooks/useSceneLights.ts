import { useMemo } from "react";
import type { LightConfig } from "../components/Light";

/**
 * Custom hook for main scene lighting
 * Just a refactor - exact same values as before
 */
const useSceneLights = () => {
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
            // Left spotlight (Purple)
            {
                type: 'spotLight',
                position: [-6.5, 2, 6.5] as [number, number, number],
                color: '#3d2860',
                intensity: 100,
                angle: 0.6,
                penumbra: 0.5,
                distance: 20,
                decay: 2,
                castShadow: false  // Disabled to save texture units
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
            // Right spotlight (Blue)
            {
                type: 'spotLight',
                position: [4, 2, 10] as [number, number, number],
                color: '#2a3d6b',
                intensity: 100,
                angle: 0.6,
                penumbra: 0.5,
                distance: 20,
                decay: 2,
                castShadow: false  // Disabled to save texture units
            },
            // Top spotlight (Light Green/Cyan)
            {
                type: 'spotLight',
                position: [0.4, 2.5, -3.8] as [number, number, number],
                color: '#2ed8ff',
                intensity: 50,
                angle: 0.5,
                penumbra: 0.5,
                distance: 15,
                decay: 2,
                castShadow: true
            },
            // Additional spotlight (Blue)
            {
                type: 'spotLight',
                position: [-14, 2, 10] as [number, number, number],
                color: '#2a3d6b',
                intensity: 500,
                angle: 0.6,
                penumbra: 0.5,
                distance: 30,
                decay: 2,
                castShadow: false
            },

        ]
    }, []);

    return lights;
};

export default useSceneLights;
