import { useMemo } from "react";
import type { LightConfig } from "../components/Light";

const useGuitarSpotlight = (guitarRef: any) => {
  const guitarSpotlight: LightConfig[] = useMemo(
    () => [
      {
        type: "spotLight",
        position: [-3.3, 0.1, -2.6] as [number, number, number],
        rotation: [Math.PI / 3, 0, 0] as [number, number, number],
        intensity: 15,
        color: "#c684ff",
        angle: 0.5,
        penumbra: 0.8,
        distance: 8,
        decay: 2,
        castShadow: true,
        targetRef: guitarRef,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return guitarSpotlight;
};

export default useGuitarSpotlight;
