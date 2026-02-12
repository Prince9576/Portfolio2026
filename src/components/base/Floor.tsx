import { DoubleSide } from "three";
import useTheme from "../../hooks/useTheme";

const Floor = () => {
  const { colors } = useTheme();
  return (
    <mesh receiveShadow castShadow rotation-x={-Math.PI / 2} position-y={-1}>
      <planeGeometry args={[25, 25]} />
      <meshStandardMaterial
        wireframe
        color={colors.common.white}
        side={DoubleSide}
        emissive="#00ffff"
        emissiveIntensity={2}
      />
    </mesh>
  );
};

export default Floor;
