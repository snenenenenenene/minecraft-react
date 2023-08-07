import { Cube } from "./cube.component";
//https://www.youtube.com/watch?v=U9q-jM3-Phc&t=1s

export const Ground = () => {
  // const seed = alea("hello");

  // const noise = createNoise3D(seed);

  const voxelArray: any = [];
  const VOXEL_SIZE = 1;
  const SPACING = VOXEL_SIZE + 0.01;
  const PLANET_RADIUS = 10;
  const WORLD_HEIGHT = 1;
  const zoom = 20;

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
  for (let x = -PLANET_RADIUS; x < PLANET_RADIUS; x++) {
    for (let y = -WORLD_HEIGHT; y < WORLD_HEIGHT; y++) {
      for (let z = -PLANET_RADIUS; z < PLANET_RADIUS; z++) {
        let isInsidePLanet =
          Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) <=
          Math.pow(PLANET_RADIUS, 2);

        if (isInsidePLanet) {
          voxelArray.push([x + SPACING, y + SPACING, z + SPACING]);
        }
      }
    }
  }

  return (
    <>
      {voxelArray.map((voxel: any, i: number) => (
        <Cube key={i} position={voxel} texture={"dirt"} />
      ))}
    </>
  );
};
