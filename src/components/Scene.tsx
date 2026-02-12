import { OrbitControls, Environment, BakeShadows, useProgress } from "@react-three/drei";
import { memo, useRef, useEffect } from "react";
import React from "react";
import Light from "./Light";
import useFrustumCulling from "../hooks/useFrustumCulling";
import useSceneLights from "../hooks/useSceneLights";
import PostProcess from "./PostProcess";
import { NavigationProvider, useNavigationContext } from "../context/NavigationContext.tsx";
import useNavigation from "../hooks/useNavigation";
import Room from "./Room.tsx";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useThree } from "@react-three/fiber";

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
    }, [orbitControls, sceneLoaded])
    return (
        <>
            {/* OrbitControls must be before NavigationProvider so controls are available */}
            <OrbitControls
                makeDefault
                enableDamping
                dampingFactor={0.08}
                rotateSpeed={0.6}
                maxPolarAngle={Math.PI / 2.1}
                minDistance={4}
                maxDistance={20}
                enableZoom={false}
                enablePan={false}
            />
            <NavigationProvider>
                <SceneContent sceneLoaded={sceneLoaded} />
            </NavigationProvider>
        </>
    )
});

const SceneContent = memo(({ sceneLoaded }: { sceneLoaded: boolean }) => {
    // Enable frustum culling for performance
    useFrustumCulling();

    const lights = useSceneLights();
    const { flyBackToOriginalPosition } = useNavigation();
    const { isZoomed } = useNavigationContext();
    const { progress } = useProgress();
    const hasEmitted = useRef(false);

    // Track progress and emit event when complete
    useEffect(() => {
        if (progress === 100 && !hasEmitted.current) {
            hasEmitted.current = true;
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent('sceneLoaded'));
            }, 1500);
        }
    }, [progress]);

    // Listen for flyBack event
    React.useEffect(() => {
        const handleFlyBack = () => {
            if (isZoomed) {
                flyBackToOriginalPosition();
            }
        };

        window.addEventListener('flyBackToOriginal', handleFlyBack);
        return () => window.removeEventListener('flyBackToOriginal', handleFlyBack);
    }, [isZoomed, flyBackToOriginalPosition]);

    // Emit event when isZoomed changes to update button visibility
    React.useEffect(() => {
        window.dispatchEvent(new CustomEvent('navigationZoomChanged', { detail: { isZoomed } }));
    }, [isZoomed]);

    return (
        <PostProcess>
            {/* Dark background like Blender */}
            <color attach="background" args={['#0a0f1e']} />
            <fog attach="fog" args={['#0a0f1e', 10, 30]} />

            {/* Reduced environment for subtle reflections only */}
            <Environment preset="night" environmentIntensity={0.1} />

            {/* All lights configured */}
            <Light lights={lights} showHelpers={false} />

            <Room scale={sceneLoaded ? 1.05 : 0} />

            {/* Bake shadows after scene loads for better performance */}
            <BakeShadows />
        </PostProcess>
    )
});

Scene.displayName = 'Scene';
SceneContent.displayName = 'SceneContent';

export default Scene;