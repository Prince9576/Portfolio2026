import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import useAudioManager, { AudioType } from "./useAudioManager";
import { useCallback, useEffect } from "react";
import { useNavigationContext } from "../context/NavigationContext.tsx";
import * as THREE from 'three';

const useNavigation = () => {
    const { camera, controls } = useThree();
    const orbitControls = controls as OrbitControlsImpl;
    const { play, cleanup } = useAudioManager(AudioType.ZOOM_IN);
    const { setIsZoomed, originalCameraPosition, originalCameraTarget, originalCameraRotation } = useNavigationContext();

    useEffect(() => {
        return cleanup;
    }, [cleanup]);

    const moveCamera = useCallback((x: number, y: number, z: number, duration: number) => {
        gsap.to(camera.position, {
            x,
            y,
            z,
            duration,
            ease: "sine.out",
        });
    }, [camera]);

    const rotateCamera = useCallback((x: number, y: number, z: number, w: number, duration: number) => {
        gsap.to(camera.quaternion, {
            x,
            y,
            z,
            w,
            duration,
            ease: "sine.out",
        });
    }, [camera]);

    const changeTarget = useCallback((x: number, y: number, z: number, duration: number) => {
        if (orbitControls) {
            gsap.to(orbitControls.target, {
                x,
                y,
                z,
                duration,
                ease: "sine.out",
            });
        }
    }, [orbitControls]);

    const flyToPosition = useCallback((
        targetPosition: { x: number, y: number, z: number },
        targetLookAt: { x: number, y: number, z: number },
        targetRotation: { w: number, x: number, y: number, z: number },
        duration: number = 1
    ) => {
        setIsZoomed(true);
        play();
        orbitControls.enabled = false;
        orbitControls.enableDamping = false;

        const quat = new THREE.Quaternion(targetRotation.x, targetRotation.y, targetRotation.z, targetRotation.w);
        quat.normalize();

        moveCamera(targetPosition.x, targetPosition.y, targetPosition.z, duration);
        rotateCamera(quat.x, quat.y, quat.z, quat.w, duration);
        changeTarget(targetLookAt.x, targetLookAt.y, targetLookAt.z, duration);
    }, [setIsZoomed, play, orbitControls, moveCamera, rotateCamera, changeTarget]);

    const flyBackToOriginalPosition = useCallback((duration: number = 1) => {
        setIsZoomed(false);
        play();
        orbitControls.enabled = true;
        orbitControls.enableDamping = true;
        moveCamera(originalCameraPosition.x, originalCameraPosition.y, originalCameraPosition.z, duration);
        changeTarget(originalCameraTarget.x, originalCameraTarget.y, originalCameraTarget.z, duration);
        rotateCamera(originalCameraRotation.x, originalCameraRotation.y, originalCameraRotation.z, originalCameraRotation.w, duration);
    }, [setIsZoomed, play, orbitControls, moveCamera, changeTarget, rotateCamera, originalCameraPosition, originalCameraTarget, originalCameraRotation]);

    return {
        flyToPosition,
        flyBackToOriginalPosition,
        moveCamera,
        rotateCamera,
        changeTarget,
    };
}

export default useNavigation;
