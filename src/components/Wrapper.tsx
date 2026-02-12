import { Canvas } from "@react-three/fiber"
import * as THREE from 'three';
import useTheme from "../hooks/useTheme";
import { lazy, Suspense, useRef, useState, useEffect } from "react";
// import { Perf } from "r3f-perf";
import EscapeButton from "./EscapeButton";
import { Html, useProgress } from "@react-three/drei";




// Loading screen component with progress tracking
const LoadingScreen = ({ showStartButton, onStartClick }: { showStartButton: boolean; onStartClick: () => void }) => {
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

    return (
        <mesh
            position={[0, -2, 7]}
            rotation={[-0.3, 0, 0]}
            scale={[2, 2.5, 1]}
            raycast={() => null}
        >
            <planeGeometry args={[20, 20]} />
            <meshBasicMaterial
                color="#0A1944"
            />
            <Html
                transform
                occlude="raycast"
                position={[0, 2.6, 0.1]}
                rotation={[-0.7, 0, 0]}
                scale={0.2}
            >
                {!showStartButton && <span className="loader"></span>}
                {showStartButton && <button className="start-button" onClick={onStartClick}>Start</button>}
            </Html>
        </mesh>
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
                <Suspense fallback={<></>}>
                    <LazyScene sceneLoaded={sceneLoaded} />
                </Suspense>

                {!sceneLoaded && <LoadingScreen
                    showStartButton={showStartButton}
                    onStartClick={() => {
                        setSceneLoaded(true);
                        window.dispatchEvent(new CustomEvent('sceneLoaded'));
                    }}
                />}

            </Canvas>
            <EscapeButton isVisible={isZoomed} />
        </div>
    )
}

const LazyScene = lazy(() => import('./Scene'));

export default Wrapper;