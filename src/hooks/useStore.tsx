import { nanoid } from "nanoid";
import create from "zustand";

export type TCube = {
  key?: string;
  position: [number, number, number];
  texture: string;
};

const getLocalStorage = (key: string) =>
  JSON.parse(window.localStorage?.getItem(key) || "[]");
const setLocalStorage = (key: string, value: any) =>
  window.localStorage.setItem(key, JSON.stringify(value));

export const generateWorld = (): TCube[] => {
  const voxelArray: TCube[] = [];
  const VOXEL_SIZE = 1;
  const SPACING = VOXEL_SIZE + 0.01;
  const PLANET_RADIUS = 10;
  const WORLD_HEIGHT = 1;

  for (let x = -PLANET_RADIUS; x < PLANET_RADIUS; x++) {
    for (let y = -WORLD_HEIGHT; y < WORLD_HEIGHT; y++) {
      for (let z = -PLANET_RADIUS; z < PLANET_RADIUS; z++) {
        let isInsidePLanet =
          Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) <=
          Math.pow(PLANET_RADIUS, 2);

        if (isInsidePLanet) {
          voxelArray.push({
            key: `${x} ${y} ${z}`,
            position: [x + SPACING, y + SPACING, z + SPACING],
            texture: "dirt",
          });
        }
      }
    }
  }

  console.log(voxelArray);

  return voxelArray;
};

export const useStore = create((set: any) => ({
  texture: "wood",
  cubes: getLocalStorage("cubes") || [...generateWorld()],
  addCube: (x: number, y: number, z: number) =>
    set((prev: any) => ({
      cubes: [
        ...prev.cubes,
        { key: nanoid, position: [x, y, z], texture: prev.texture },
      ],
    })),
  removeCube: ({ x, y, z }: { x: number; y: number; z: number }) => {
    set((prev: any) => ({
      cubes: prev.cubes.filter((cube: any) => {
        const [X, Y, Z] = cube.position;
        return X !== x || Y !== y || Z !== z;
      }),
    }));
  },
  setTexture: (texture: string) => {
    set(() => ({
      texture,
    }));
  },
  saveWorld: () => {
    set((prev: any) => {
      setLocalStorage("cubes", prev.cubes);
    });
  },
  resetWorld: () => {
    set(() => ({
      cubes: [...generateWorld()],
    }));
  },
}));
