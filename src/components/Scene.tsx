import { OrbitControls, Environment, BakeShadows } from "@react-three/drei";
import { memo, useEffect } from "react";
import React from "react";
import Light from "./Light";
import useFrustumCulling from "../hooks/useFrustumCulling";
import useSceneLights from "../hooks/useSceneLights";
import PostProcess from "./PostProcess";
import {
  NavigationProvider,
  useNavigationContext,
} from "../context/NavigationContext.tsx";
import useNavigation from "../hooks/useNavigation";
import Room from "./Room.tsx";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useThree } from "@react-three/fiber";
import useMobilePortrait from "../hooks/useMobilePortrait";

const Scene = memo(({ sceneLoaded }: { sceneLoaded: boolean }) => {
  const { controls } = useThree();
  const orbitControls = controls as OrbitControlsImpl;

  useEffect(() => {
    if (orbitControls && !sceneLoaded) {
      orbitControls.enabled = false;
      orbitControls.enableDamping = false;
    }
    if (orbitControls && sceneLoaded) {
      orbitControls.enabled = true;
      orbitControls.enableDamping = true;
    }
  }, [orbitControls, sceneLoaded]);
  return (
    <>
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.4}
        maxPolarAngle={Math.PI / 3}
        minAzimuthAngle={-0.5}
        maxAzimuthAngle={0.5}
        minDistance={4}
        maxDistance={15}
        enableZoom={true}
        enablePan={false}
      />
      <NavigationProvider>
        <SceneContent sceneLoaded={sceneLoaded} />
      </NavigationProvider>
    </>
  );
});

const SceneContent = memo(({ sceneLoaded }: { sceneLoaded: boolean }) => {
  useFrustumCulling();
  const isMobilePortrait = useMobilePortrait();

  const lights = useSceneLights();
  const { flyBackToOriginalPosition } = useNavigation();
  const { isZoomed } = useNavigationContext();

  React.useEffect(() => {
    const handleFlyBack = () => {
      if (isZoomed) {
        flyBackToOriginalPosition();
      }
    };

    window.addEventListener("flyBackToOriginal", handleFlyBack);
    return () => window.removeEventListener("flyBackToOriginal", handleFlyBack);
  }, [isZoomed, flyBackToOriginalPosition]);

  React.useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("navigationZoomChanged", { detail: { isZoomed } }),
    );
  }, [isZoomed]);

  return (
    <PostProcess>
      <color attach="background" args={["#0a0f1e"]} />
      <fog attach="fog" args={["#0a0f1e", 10, 30]} />

      <Environment preset="night" environmentIntensity={0.1} />

      <Light lights={lights} />

      <Room scale={sceneLoaded ? (isMobilePortrait ? 0.75 : 1.05) : 0} />

      {sceneLoaded && <BakeShadows />}
    </PostProcess>
  );
});

Scene.displayName = "Scene";
SceneContent.displayName = "SceneContent";

export default Scene;
