import { Canvas } from "@react-three/fiber"
import * as THREE from 'three';
import useTheme from "../hooks/useTheme";
import { lazy, Suspense, useRef, useState, useEffect } from "react";
import EscapeButton from "./EscapeButton";
import LoadingScreen from "./LoadingScreen";

const Wrapper = () => {
    const css3DContainerRef = useRef<HTMLDivElement>(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [showStartButton, setShowStartButton] = useState(false);
    const [sceneLoaded, setSceneLoaded] = useState(false);

    const { colors } = useTheme();

    useEffect(() => {
        const handleZoomChanged = (e: Event) => {
            const customEvent = e as CustomEvent<{ isZoomed: boolean }>;
            setIsZoomed(customEvent.detail.isZoomed);
        };

        window.addEventListener('navigationZoomChanged', handleZoomChanged);
        return () => window.removeEventListener('navigationZoomChanged', handleZoomChanged);
    }, []);

    useEffect(() => {
        const handleSceneLoaded = () => {
            setShowStartButton(true);
        };

        window.addEventListener('sceneLoaded', handleSceneLoaded);
        return () => window.removeEventListener('sceneLoaded', handleSceneLoaded);
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <div
                ref={css3DContainerRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
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
                    antialias: false,
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