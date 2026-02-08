import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import useAudioManager, { AudioType } from "./useAudioManager";
import { useEffect } from "react";
import { useNavigationContext } from "../context/NavigationContext.tsx";
import * as THREE from 'three';

const useNavigation = () => {
    const { camera, controls } = useThree();
    const orbitControls = controls as OrbitControlsImpl;
    const { play, cleanup } = useAudioManager(AudioType.ZOOM_IN);
    const { setIsZoomed, originalCameraPosition, originalCameraTarget, originalCameraRotation } = useNavigationContext();

    useEffect(() => {
        return cleanup;
    }, []);

    function flyToPosition(targetPosition: { x: number, y: number, z: number }, targetLookAt: { x: number, y: number, z: number }, targetRotation: { w: number, x: number, y: number, z: number }, duration: number = 1) {
        setIsZoomed(true);
        play();
        orbitControls.enabled = false;
        orbitControls.enableDamping = false;

        // Normalize the quaternion before animating
        const quat = new THREE.Quaternion(targetRotation.x, targetRotation.y, targetRotation.z, targetRotation.w);
        quat.normalize();

        moveCamera(targetPosition.x, targetPosition.y, targetPosition.z, duration);
        rotateCamera(quat.x, quat.y, quat.z, quat.w, duration);
        changeTarget(targetLookAt.x, targetLookAt.y, targetLookAt.z, duration);
    }

    function flyBackToOriginalPosition(duration: number = 1) {
        setIsZoomed(false);
        play();
        orbitControls.enabled = true;
        orbitControls.enableDamping = true;
        moveCamera(originalCameraPosition.x, originalCameraPosition.y, originalCameraPosition.z, duration);
        changeTarget(originalCameraTarget.x, originalCameraTarget.y, originalCameraTarget.z, duration);
        rotateCamera(originalCameraRotation.x, originalCameraRotation.y, originalCameraRotation.z, originalCameraRotation.w, duration);
    }

    function moveCamera(x: number, y: number, z: number, duration: number) {
        gsap.to(camera.position, {
            x,
            y,
            z,
            duration,
            ease: "sine.out",
        });
    }

    function rotateCamera(x: number, y: number, z: number, w: number, duration: number) {
        gsap.to(camera.quaternion, {
            x,
            y,
            z,
            w,
            duration,
            ease: "sine.out",
        });
    }

    function changeTarget(x: number, y: number, z: number, duration: number) {
        if (orbitControls) {
            gsap.to(orbitControls.target, {
                x,
                y,
                z,
                duration,
                ease: "sine.out",
            });
        }
    }

    function freezeControls() {
        if (orbitControls) {
            orbitControls.enableZoom = false;
            orbitControls.enablePan = false;
            orbitControls.enableRotate = false;
            orbitControls.enableDamping = false;
        }
    }

    function unfreezeControls() {
        if (orbitControls) {
            orbitControls.enableZoom = true;
            orbitControls.enablePan = true;
            orbitControls.enableRotate = true;
            orbitControls.enableDamping = true;
        }
    }

    return {
        flyToPosition,
        flyBackToOriginalPosition,
        moveCamera,
        rotateCamera,
        changeTarget,
    };
}

export default useNavigation;