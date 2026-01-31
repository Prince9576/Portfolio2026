import { Canvas } from "@react-three/fiber"
import * as THREE from 'three';
import useTheme from "../hooks/useTheme";
import { lazy, Suspense, useRef, useState, useEffect } from "react";
import { Perf } from "r3f-perf";
import EscapeButton from "./EscapeButton";
// import { useCSS3DRenderer } from "../hooks/use3DCSSRenderer";

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
    const [isZoomed, setIsZoomed] = useState(false);

    const { colors } = useTheme();

    // Listen for zoom changes from Canvas
    useEffect(() => {
        const handleZoomChanged = (e: Event) => {
            const customEvent = e as CustomEvent<{ isZoomed: boolean }>;
            setIsZoomed(customEvent.detail.isZoomed);
        };

        window.addEventListener('navigationZoomChanged', handleZoomChanged);
        return () => window.removeEventListener('navigationZoomChanged', handleZoomChanged);
    }, []);
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
                {/* <Perf style={{ zIndex: 100000000 }} position="top-left" /> */}
                <Suspense fallback={<></>}>
                    <LazyScene />
                </Suspense>
            </Canvas>
            <EscapeButton isVisible={isZoomed} />
        </div>
    )
}

const LazyScene = lazy(() => import('./Scene'));

export default Wrapper;