import React from "react";
import { useStore } from "../hooks/useStore";
import { Cube } from "./cube.component";

export const Cubes = () => {
  const [cubes] = useStore((state) => [state.cubes]);
  return (
    <>
      {cubes?.map(({ key, position, texture }) => (
        <Cube receiveShadow key={key} position={position} texture={texture} />
      ))}
    </>
  );
};
