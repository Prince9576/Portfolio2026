import { useMemo } from "react";
import type { LightConfig } from "../components/Light";

const useWallFrameSpotlight = (
  frameRef: any,
) => {
  const wallFrameSpotlight: LightConfig[] = useMemo(
    () => [
      {
        type: "spotLight",
        position: [0, 0.2, -1.8] as [number, number, number],
        rotation: [0, 0, 0] as [number, number, number],
        intensity: 20,
        color: "#ffffff",
        angle: 0.6,
        penumbra: 0.4,
        distance: 5,
        decay: 1.9,
        castShadow: false,
        targetRef: frameRef,
      },
    ],
    [frameRef],
  );

  return wallFrameSpotlight;
};

export default useWallFrameSpotlight;
