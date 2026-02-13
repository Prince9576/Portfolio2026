import { memo, useRef, useEffect, useLayoutEffect } from "react";
import * as THREE from "three";

export interface LightConfig {
  type: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  intensity?: number;
  power?: number;
  exposure?: number;
  normalize?: boolean;
  shape?: string;
  size?: number;
  width?: number;
  height?: number;
  castShadow?: boolean;
  angle?: number;
  penumbra?: number;
  distance?: number;
  decay?: number;
  targetRef?: React.RefObject<THREE.Object3D> | null;
}

interface LightProps {
  lights: LightConfig[];
}

const LightComponent = memo(
  ({ light }: { light: LightConfig }) => {
    const lightRef = useRef<THREE.Light>(null);

    useLayoutEffect(() => {
      if (lightRef.current && light.targetRef && light.targetRef.current) {
        const directionalOrSpot = lightRef.current as THREE.DirectionalLight | THREE.SpotLight;
        if ('target' in directionalOrSpot) {
          directionalOrSpot.target = light.targetRef.current;
        }
      }
    }, [light.targetRef]);

    useEffect(() => {
      if (!light.targetRef) return;

      const checkTarget = () => {
        if (lightRef.current && light.targetRef?.current) {
          const directionalOrSpot = lightRef.current as THREE.DirectionalLight | THREE.SpotLight;
          if ('target' in directionalOrSpot) {
            directionalOrSpot.target = light.targetRef.current;
          }
        }
      };

      checkTarget();

      const timeouts = [
        setTimeout(checkTarget, 50),
        setTimeout(checkTarget, 100),
        setTimeout(checkTarget, 200),
      ];

      return () => timeouts.forEach(clearTimeout);
    }, [light.targetRef]);

    // Effect for rectAreaLight lookAt - must be at top level
    useEffect(() => {
      if (light.type === "rectAreaLight" && lightRef.current) {
        lightRef.current.lookAt(0, 0, 0);
      }
    }, [light.type, light.position]);

    switch (light.type) {
      case "ambientLight": {
        return <ambientLight intensity={light.intensity || 0.25} />;
      }

      case "rectAreaLight": {
        return (
          <group position={light.position as [number, number, number]}>
            <rectAreaLight
              ref={lightRef}
              rotation={light.rotation as [number, number, number]}
              color={light.color || "#ffffff"}
              intensity={light.power || 10}
              width={light.size || 4}
              height={light.size || 4}
            />
          </group>
        );
      }

      case "directionalLight": {
        return (
          <directionalLight
            ref={lightRef}
            position={light.position as [number, number, number]}
            intensity={light.intensity || 1}
            color={light.color || "#ffffff"}
            castShadow={light.castShadow}
            shadow-mapSize={[1024, 1024]}
            shadow-camera-near={0.1}
            shadow-camera-far={50}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
            shadow-bias={-0.0005}
            shadow-normalBias={0.02}
            shadow-radius={8}
          />
        );
      }

      case "spotLight": {
        return (
          <spotLight
            ref={lightRef}
            position={light.position as [number, number, number]}
            rotation={light.rotation as [number, number, number]}
            intensity={light.intensity || 1}
            color={light.color || "#ffffff"}
            angle={light.angle || 0.6}
            penumbra={light.penumbra !== undefined ? light.penumbra : 1}
            distance={light.distance || 0}
            decay={light.decay !== undefined ? light.decay : 2}
            castShadow={light.castShadow}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-bias={-0.0005}
          />
        );
      }

      case "pointLight": {
        return (
          <pointLight
            ref={lightRef}
            position={light.position as [number, number, number]}
            intensity={light.intensity || 1}
            color={light.color || "#ffffff"}
            distance={light.distance || 10}
            castShadow={light.castShadow}
          />
        );
      }

      default:
        console.warn(`Unknown light type: ${light.type}`);
        return null;
    }
  },
);

LightComponent.displayName = "LightComponent";

const Light = memo(({ lights }: LightProps) => {
  return (
    <>
      {lights.map((light, index) => (
        <LightComponent
          key={`${light.type}-${index}`}
          light={light}
        />
      ))}
    </>
  );
});

Light.displayName = "Light";

export default Light;
