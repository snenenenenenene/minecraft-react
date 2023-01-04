import { useBox } from "@react-three/cannon";
import { FrontSide, NearestFilter, RepeatWrapping } from "three";
export const Cube = ({ position, texture }: any) => {
  const [ref]: any = useBox(() => ({
    type: "Static",
    position: position,
  }));

  texture.magFilter = NearestFilter;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(2, 2);

  return (
    <mesh receiveShadow castShadow ref={ref}>
      <boxGeometry attach="geometry" />
      <meshStandardMaterial attach="material" map={texture} side={FrontSide} />
    </mesh>
  );
};
