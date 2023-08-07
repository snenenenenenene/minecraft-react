import { useStore } from "../hooks/useStore";
//https://www.youtube.com/watch?v=U9q-jM3-Phc&t=1s

export const Ground = () => {
  // const seed = alea("hello");

  // const noise = createNoise3D(seed);

  // for (let x = -PLANET_RADIUS; x < PLANET_RADIUS; x++) {
  //   for (let y = -WORLD_HEIGHT; y < WORLD_HEIGHT; y++) {
  //     for (let z = -PLANET_RADIUS; z < PLANET_RADIUS; z++) {
  //       let w = noise(x / zoom, y / zoom, z / zoom);
  //       // let isInsidePLanet =
  //       //   Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) <= PLANET_RADIUS;

  //       if (w > 0.1) {
  //         voxelArray.push([x + SPACING, y + SPACING, z + SPACING]);
  //       }
  //     }
  //   }
  // }

  // create a 50 wide 5 tall cube of voxels

  const voxelArray = useStore((state) => state.cubes);

  return <></>;
};
