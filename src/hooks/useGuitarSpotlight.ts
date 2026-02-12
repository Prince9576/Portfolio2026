import { useMemo } from "react";
import type { LightConfig } from "../components/Light";
import * as THREE from "three";

const useGuitarSpotlight = (guitarRef: React.RefObject<THREE.Mesh | null>) => {
    const guitarSpotlight: LightConfig[] = useMemo(() => [{
        type: 'spotLight',
        position: [-3.3, 0.1, -2.6] as [number, number, number],
        rotation: [Math.PI / 3, 0, 0] as [number, number, number],
        intensity: 15,
        color: '#c684ff',
        angle: 0.5,
        penumbra: 0.8,
        distance: 8,
        decay: 2,
        castShadow: true,
        targetRef: guitarRef
    }], []);

    return guitarSpotlight;
}

export default useGuitarSpotlight;