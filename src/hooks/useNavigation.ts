import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

const useNavigation = () => {
    const { camera, controls } = useThree();
    const orbitControls = controls as OrbitControlsImpl;

    function flyToLaptop(targetPosition: { x: number, y: number, z: number }, targetLookAt: { x: number, y: number, z: number }, targetRotation: { w: number, x: number, y: number, z: number }, duration: number = 1) {
        moveCamera(targetPosition.x, targetPosition.y, targetPosition.z, duration);
        changeTarget(targetLookAt.x, targetLookAt.y, targetLookAt.z, duration);
        rotateCamera(targetRotation.x, targetRotation.y, targetRotation.z, targetRotation.w, duration);
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

    return {
        flyToLaptop,
        moveCamera,
        rotateCamera,
        changeTarget,
    };
}

export default useNavigation;