import React from "react";
import { useBox } from "@react-three/cannon";
export const Cube = ({ position, texture }: any) => {
  const [ref]: any = useBox(() => ({
    type: "Static",
    position: position,
  }));
  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial attach="material" />
    </mesh>
  );
};
