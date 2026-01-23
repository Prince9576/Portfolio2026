import { Canvas } from "@react-three/fiber"
import * as THREE from 'three';
import useTheme from "../hooks/useTheme";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { lazy, Suspense } from "react";

const Wrapper = () => {
    const { colors } = useTheme();

    return (
        <Canvas
            className='r3f'
            shadows={{
                enabled: true,
                type: THREE.PCFSoftShadowMap,
            }}
            gl={{
                antialias: true,
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 0.5,
                outputColorSpace: THREE.SRGBColorSpace,
            }}
            camera={{
                position: [0, 5, 10],
                near: 0.1,
                far: 10000,
                fov: 50,
            }}
            style={{ backgroundColor: colors.common.black }}
            dpr={[1, 2]}
            performance={{ min: 0.5 }}
        >
            <Suspense fallback={<></>}>
                <LazyScene />
            </Suspense>
            <EffectComposer autoClear={false} multisampling={0}>
                <Bloom
                    intensity={0.1}
                    luminanceThreshold={0.85}
                    luminanceSmoothing={0.1}
                />

            </EffectComposer>
        </Canvas>
    )
}

const LazyScene = lazy(() => import('./Scene'));

export default Wrapper;