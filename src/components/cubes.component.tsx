import { memo } from "react";
import { useStore } from "../hooks/useStore";
import { Cube } from "./cube.component";

export const Cubes = () => {
  const [cubes] = useStore((state) => [state.cubes]);

  return cubes.map(
    ({
      key,
      position,
      texture,
    }: {
      key: any;
      position: [number, number, number];
      texture: string;
    }) => {
      return <Cube key={key} position={position} texture={texture} />;
    }
  );
};

export default memo(Cubes);
