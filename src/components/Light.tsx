import { useRef, useEffect } from "react";
import { useControls } from "leva";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

interface LightConfig {
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
}

interface LightProps {
    lights: LightConfig[];
    showHelpers?: boolean;
}

const LightComponent = ({ light, index, showHelpers }: { light: LightConfig; index: number; showHelpers: boolean }) => {
    const lightRef = useRef<any>(null);

    switch (light.type) {
        case 'ambientLight': {
            const { intensity } = useControls(`Ambient Light ${index}`, {
                intensity: {
                    value: light.intensity || 0.25,
                    min: 0,
                    max: 5,
                    step: 0.1,
                    label: 'Intensity'
                }
            }, { collapsed: !showHelpers });

            return <ambientLight intensity={intensity} />;
        }

        case 'rectAreaLight': {
            const { position, rotation, color, power, size } = useControls(`RectArea Light ${index}`, {
                position: {
                    value: light.position || [0, 0, 0],
                    step: 0.5,
                    label: 'Position'
                },
                rotation: {
                    value: light.rotation || [0, 0, 0],
                    step: 0.1,
                    label: 'Rotation'
                },
                color: {
                    value: light.color || '#ffffff',
                    label: 'Color'
                },
                power: {
                    value: light.power || 10,
                    min: 0,
                    max: 100,
                    step: 1,
                    label: 'Power'
                },
                size: {
                    value: light.size || 4,
                    min: 0.1,
                    max: 20,
                    step: 0.1,
                    label: 'Size'
                }
            }, { collapsed: !showHelpers });

            // Make the light look at the center
            useEffect(() => {
                if (lightRef.current) {
                    lightRef.current.lookAt(0, 0, 0);
                }
            }, [position]);

            return (
                <group position={position as [number, number, number]}>
                    <rectAreaLight
                        ref={lightRef}
                        rotation={rotation as [number, number, number]}
                        color={color}
                        intensity={power}
                        width={size}
                        height={size}
                    />
                    {showHelpers && lightRef.current && (
                        <primitive object={new RectAreaLightHelper(lightRef.current)} />
                    )}
                </group>
            );
        }

        case 'directionalLight': {
            const { position, intensity, color } = useControls(`Directional Light ${index}`, {
                position: {
                    value: light.position || [5, 5, 5],
                    step: 0.5,
                    label: 'Position'
                },
                intensity: {
                    value: light.intensity || 1,
                    min: 0,
                    max: 5,
                    step: 0.1,
                    label: 'Intensity'
                },
                color: {
                    value: light.color || '#ffffff',
                    label: 'Color'
                }
            }, { collapsed: !showHelpers });

            return (
                <>
                    <directionalLight
                        ref={lightRef}
                        position={position as [number, number, number]}
                        intensity={intensity}
                        color={color}
                        castShadow={light.castShadow}
                        shadow-mapSize={[2048, 2048]}
                        shadow-camera-near={0.5}
                        shadow-camera-far={50}
                        shadow-camera-left={-10}
                        shadow-camera-right={10}
                        shadow-camera-top={10}
                        shadow-camera-bottom={-10}
                    />
                    {showHelpers && lightRef.current && (
                        <directionalLightHelper args={[lightRef.current, 2]} />
                    )}
                </>
            );
        }

        case 'spotLight': {
            const { position, intensity, color, angle } = useControls(`Spot Light ${index}`, {
                position: {
                    value: light.position || [0, 10, 0],
                    step: 0.5,
                    label: 'Position'
                },
                intensity: {
                    value: light.intensity || 1,
                    min: 0,
                    max: 5,
                    step: 0.1,
                    label: 'Intensity'
                },
                color: {
                    value: light.color || '#ffffff',
                    label: 'Color'
                },
                angle: {
                    value: 0.6,
                    min: 0,
                    max: Math.PI / 2,
                    step: 0.1,
                    label: 'Angle'
                }
            }, { collapsed: !showHelpers });

            return (
                <>
                    <spotLight
                        ref={lightRef}
                        position={position as [number, number, number]}
                        intensity={intensity}
                        color={color}
                        angle={angle}
                        penumbra={1}
                        castShadow={light.castShadow}
                    />
                    {showHelpers && lightRef.current && (
                        <spotLightHelper args={[lightRef.current]} />
                    )}
                </>
            );
        }

        case 'pointLight': {
            const { position, intensity, color, distance } = useControls(`Point Light ${index}`, {
                position: {
                    value: light.position || [0, 5, 0],
                    step: 0.5,
                    label: 'Position'
                },
                intensity: {
                    value: light.intensity || 1,
                    min: 0,
                    max: 5,
                    step: 0.1,
                    label: 'Intensity'
                },
                color: {
                    value: light.color || '#ffffff',
                    label: 'Color'
                },
                distance: {
                    value: 10,
                    min: 0,
                    max: 100,
                    step: 1,
                    label: 'Distance'
                }
            }, { collapsed: !showHelpers });

            return (
                <>
                    <pointLight
                        ref={lightRef}
                        position={position as [number, number, number]}
                        intensity={intensity}
                        color={color}
                        distance={distance}
                        castShadow={light.castShadow}
                    />
                    {showHelpers && lightRef.current && (
                        <pointLightHelper args={[lightRef.current, 1]} />
                    )}
                </>
            );
        }

        default:
            console.warn(`Unknown light type: ${light.type}`);
            return null;
    }
};

const Light = ({ lights, showHelpers = false }: LightProps) => {
    return (
        <>
            {lights.map((light, index) => (
                <LightComponent
                    key={`${light.type}-${index}`}
                    light={light}
                    index={index}
                    showHelpers={showHelpers}
                />
            ))}
        </>
    );
};

export default Light;