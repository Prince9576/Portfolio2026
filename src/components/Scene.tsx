import { OrbitControls, Environment, BakeShadows } from "@react-three/drei";
import { memo } from "react";
import React from "react";
import Light from "./Light";
import useFrustumCulling from "../hooks/useFrustumCulling";
import useSceneLights from "../hooks/useSceneLights";
import PostProcess from "./PostProcess";
import { NavigationProvider, useNavigationContext } from "../context/NavigationContext.tsx";
import useNavigation from "../hooks/useNavigation";
import Room from "./Room.tsx";

const Scene = memo(() => {
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
                <SceneContent />
            </NavigationProvider>
        </>
    )
});

const SceneContent = memo(() => {
    // Enable frustum culling for performance
    useFrustumCulling();

    const lights = useSceneLights();
    const { flyBackToOriginalPosition } = useNavigation();
    const { isZoomed } = useNavigationContext();

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

            <Room />

            {/* Bake shadows after scene loads for better performance */}
            <BakeShadows />
        </PostProcess>
    )
});

Scene.displayName = 'Scene';
SceneContent.displayName = 'SceneContent';

export default Scene;