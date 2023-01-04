import { useMemo } from "react";
import { dirtTexture, groundTexture } from "../assets/blocks/textures";
import { Cube } from "./cube.component";
import { perlin3D } from "../utils/noise";
import simplex, { createNoise3D } from "simplex-noise";
import alea from "alea";
//https://www.youtube.com/watch?v=U9q-jM3-Phc&t=1s

export const Ground = () => {
  const seed = alea("hello");

  const noise = createNoise3D(seed);

  const voxelArray: any = [];
  const VOXEL_SIZE = 1;
  const SPACING = VOXEL_SIZE + 0.01;
  const PLANET_RADIUS = 50;
  const WORLD_HEIGHT = 10;
  const zoom = 20;

  for (let x = -PLANET_RADIUS; x < PLANET_RADIUS; x++) {
    for (let y = -WORLD_HEIGHT; y < WORLD_HEIGHT; y++) {
      for (let z = -PLANET_RADIUS; z < PLANET_RADIUS; z++) {
        let w = noise(x / zoom, y / zoom, z / zoom);
        // let isInsidePLanet =
        //   Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) <= PLANET_RADIUS;

        if (w > 0.1) {
          voxelArray.push([x + SPACING, y + SPACING, z + SPACING]);
        }
      }
    }
  }

  return (
    <>
      {voxelArray.map((voxel: any, i: number) => (
        <Cube key={i} position={voxel} texture={dirtTexture} />
      ))}
    </>
  );
};
