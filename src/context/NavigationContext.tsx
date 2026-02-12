import { createContext, useContext, useState, type ReactNode } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useEffect, useRef } from "react";

type NavigationContextType = {
    isZoomed: boolean;
    originalCameraPosition: { x: number, y: number, z: number };
    originalCameraTarget: { x: number, y: number, z: number };
    originalCameraRotation: { x: number, y: number, z: number, w: number };
    setIsZoomed: (isZoomed: boolean) => void;
    setOriginalCameraPosition: (originalCameraPosition: { x: number, y: number, z: number }) => void;
    setOriginalCameraTarget: (originalCameraTarget: { x: number, y: number, z: number }) => void;
    setOriginalCameraRotation: (originalCameraRotation: { x: number, y: number, z: number, w: number }) => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export default NavigationContext;

export const useNavigationContext = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigationContext must be used within a NavigationProvider');
    }
    return context;
}

type NavigationProviderProps = {
    children: ReactNode;
}

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
    const { camera, controls } = useThree();
    const orbitControls = controls as OrbitControlsImpl;
    const hasInitialized = useRef(false);

    const [isZoomed, setIsZoomed] = useState(false);
    const [originalCameraPosition, setOriginalCameraPosition] = useState({ x: 0, y: 0, z: 0 });
    const [originalCameraTarget, setOriginalCameraTarget] = useState({ x: 0, y: 0, z: 0 });
    const [originalCameraRotation, setOriginalCameraRotation] = useState({ x: 0, y: 0, z: 0, w: 1 });

    useEffect(() => {
        if (hasInitialized.current) return;

        const timer = setTimeout(() => {
            if (camera && !hasInitialized.current) {
                setOriginalCameraPosition({
                    x: camera.position.x,
                    y: camera.position.y,
                    z: camera.position.z
                });
                setOriginalCameraRotation({
                    x: camera.quaternion.x,
                    y: camera.quaternion.y,
                    z: camera.quaternion.z,
                    w: camera.quaternion.w
                });

                if (orbitControls?.target) {
                    setOriginalCameraTarget({
                        x: orbitControls.target.x,
                        y: orbitControls.target.y,
                        z: orbitControls.target.z
                    });
                }
                hasInitialized.current = true;
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [camera, orbitControls]);

    return (
        <NavigationContext.Provider value={{
            isZoomed,
            originalCameraPosition,
            originalCameraTarget,
            originalCameraRotation,
            setIsZoomed,
            setOriginalCameraPosition,
            setOriginalCameraTarget,
            setOriginalCameraRotation,
        }}>
            {children}
        </NavigationContext.Provider>
    );
}
