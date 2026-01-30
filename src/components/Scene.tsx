import { OrbitControls, Environment, BakeShadows } from "@react-three/drei";
import Workspace from "./Workspace";
import { memo } from "react";
import Light from "./Light";
import useFrustumCulling from "../hooks/useFrustumCulling";
import useSceneLights from "../hooks/useSceneLights";
import PostProcess from "./PostProcess";

const Scene = memo(() => {
    // Enable frustum culling for performance
    useFrustumCulling();

    const lights = useSceneLights();

    return (
        <PostProcess>
            {/* Dark background like Blender */}
            <color attach="background" args={['#0a0f1e']} />
            <fog attach="fog" args={['#0a0f1e', 10, 30]} />

            {/* Reduced environment for subtle reflections only */}
            <Environment preset="night" environmentIntensity={0.1} />

            {/* All lights configured */}
            <Light lights={lights} showHelpers={false} />

            <Workspace />

            {/* Bake shadows after scene loads for better performance */}
            <BakeShadows />

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
        </PostProcess>
    )
});

Scene.displayName = 'Scene';

export default Scene;