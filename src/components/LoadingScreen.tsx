import { useRef, useEffect } from "react";
import { useProgress } from "@react-three/drei";
import { Html } from "@react-three/drei";

const LoadingScreen = ({ showStartButton, onStartClick }: { showStartButton: boolean; onStartClick: () => void }) => {
    const { progress } = useProgress();
    const hasEmitted = useRef(false);

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

export default LoadingScreen;