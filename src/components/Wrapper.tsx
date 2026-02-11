import { Canvas, useThree } from "@react-three/fiber"
import * as THREE from 'three';
import useTheme from "../hooks/useTheme";
import { lazy, Suspense, useRef, useState, useEffect } from "react";
// import { Perf } from "r3f-perf";
import EscapeButton from "./EscapeButton";
import { Html, Hud } from "@react-three/drei";
import { useControls } from 'leva';
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




// Loading screen component with Leva controls
const LoadingScreen = ({ showStartButton, onStartClick }: { showStartButton: boolean; onStartClick: () => void }) => {
    const {
        meshPosition,
        meshRotation,
        meshScale,
        htmlPosition,
        htmlRotation
    } = useControls('Loading Screen', {
        meshPosition: {
            value: [0, -2, 7],
            step: 0.1
        },
        meshRotation: {
            value: [-0.3, 0, 0],
            step: 0.1
        },
        meshScale: {
            value: [2, 2.5, 1],
            step: 0.1
        },
        htmlPosition: {
            value: [0, 2.6, 0.1],
            step: 0.1
        },
        htmlRotation: {
            value: [-0.7, 0, 0],
            step: 0.1
        }
    });

    return (
        <Hud renderPriority={100000000}> <mesh
            position={meshPosition}
            rotation={meshRotation}
            scale={meshScale}
        >
            <planeGeometry args={[20, 20]} />
            <meshBasicMaterial side={THREE.DoubleSide} color="#0A1944" />
            <Html
                transform
                occlude="raycast"
                position={htmlPosition}
                rotation={htmlRotation}
                scale={0.2}
            >
                {!showStartButton && <span className="loader"></span>}
                {showStartButton && <button className="start-button" onClick={onStartClick}>Start</button>}
            </Html>
        </mesh></Hud>
    );
};

const Wrapper = () => {
    const css3DContainerRef = useRef<HTMLDivElement>(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [showStartButton, setShowStartButton] = useState(false);
    const [sceneLoaded, setSceneLoaded] = useState(false);

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

    // Listen for scene loaded event
    useEffect(() => {
        const handleSceneLoaded = () => {
            setShowStartButton(true);
        };

        window.addEventListener('sceneLoaded', handleSceneLoaded);
        return () => window.removeEventListener('sceneLoaded', handleSceneLoaded);
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
                    antialias: false, // Handled by EffectComposer multisampling
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 0.5,
                    outputColorSpace: THREE.SRGBColorSpace,
                    powerPreference: 'high-performance',
                }}
                camera={{
                    position: [0, 7.5, 10],
                    near: 0.1,
                    far: 100,
                    fov: 50,
                }}
                style={{ backgroundColor: colors.common.black }}
                dpr={[1, 2]}
                performance={{ min: 0.5 }}
            >
                {/* <Perf style={{ zIndex: 100000000 }} position="top-left" /> */}
                {!sceneLoaded && <LoadingScreen
                    showStartButton={showStartButton}
                    onStartClick={() => {
                        setSceneLoaded(true);
                        window.dispatchEvent(new CustomEvent('sceneLoaded'));
                    }}
                />}

                <Suspense fallback={<></>}>
                    <LazyScene sceneLoaded={sceneLoaded} />
                </Suspense>

            </Canvas>
            <EscapeButton isVisible={isZoomed} />
        </div>
    )
}

const LazyScene = lazy(() => import('./Scene'));

export default Wrapper;