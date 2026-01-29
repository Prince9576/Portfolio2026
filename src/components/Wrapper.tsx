import { Canvas } from "@react-three/fiber"
import * as THREE from 'three';
import useTheme from "../hooks/useTheme";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { lazy, Suspense, useRef } from "react";
// import { useCSS3DRenderer } from "../hooks/use3DCSSRenderer";
import { Perf } from "r3f-perf";

// Component to render CSS3D on each frame
// Commented out since CSS3D is not currently being used
// function CSS3DRenderer({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
//     const { css3DScene, css3DRenderer } = useCSS3DRenderer(containerRef);
//     const { camera } = useThree();

//     useFrame(() => {
//         if (css3DRenderer && css3DScene && camera) {
//             css3DRenderer.render(css3DScene, camera);
//         }
//     });

//     return null;
// }




const Wrapper = () => {
    const css3DContainerRef = useRef<HTMLDivElement>(null);

    const { colors } = useTheme();
    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            {/* CSS3D Container - rendered ABOVE WebGL canvas */}
            <div
                ref={css3DContainerRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none', // Allow clicks to pass through to WebGL
                    zIndex: 1
                }}
            />
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
                    position: [0, 7.5, 10],
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
                {/* <CSS3DRenderer containerRef={css3DContainerRef} /> */}
                <Perf position="top-left" />
                <EffectComposer autoClear={false} multisampling={0}>
                    <Bloom
                        intensity={0.1}
                        luminanceThreshold={0.85}
                        luminanceSmoothing={0.1}
                    />

                </EffectComposer>
            </Canvas>
        </div>
    )
}

const LazyScene = lazy(() => import('./Scene'));

export default Wrapper;