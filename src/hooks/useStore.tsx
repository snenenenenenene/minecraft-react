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
  // const SPACING = VOXEL_SIZE + 0.01;
  const PLANET_RADIUS = 10;
  const WORLD_HEIGHT = 2;

  // add grass texture to top of planet

  for (let x = -PLANET_RADIUS; x < PLANET_RADIUS; x++) {
    for (let y = 0; y <= WORLD_HEIGHT; y++) {
      for (let z = -PLANET_RADIUS; z < PLANET_RADIUS; z++) {
        let isInsidePLanet =
          Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) <=
          Math.pow(PLANET_RADIUS, 2);

        if (y === WORLD_HEIGHT && isInsidePLanet) {
          voxelArray.push({
            key: `grass ${x} ${y} ${z}`,
            position: [x, y, z],
            texture: "grass",
          });
        } else if (isInsidePLanet) {
          voxelArray.push({
            key: `dirt ${x} ${y} ${z}`,
            position: [x, y, z],
            texture: "dirt",
          });
        }
      }
    }
  }

  return voxelArray;
};

export const useStore = create((set: any) => ({
  texture: "wood",
  player: {
    position: [0, 100, 0] as [number, number, number],
  },
  setPlayer: (position: [number, number, number]) => {
    set(() => ({
      player: {
        position,
      },
    }));
  },
  cubes: getLocalStorage("cubes") || generateWorld(),
  addCube: (x: number, y: number, z: number) =>
    set((prev: any) => {
      // check if cube is underneath player
      const [playerX, playerY, playerZ]: [number, number, number] =
        prev.player.position;
      const roundedPlayerPosition = [
        Math.round(playerX),
        Math.round(playerY),
        Math.round(playerZ),
      ];
      if (
        roundedPlayerPosition[0] === Math.round(x) &&
        (roundedPlayerPosition[1] - 1 === Math.round(y) ||
          roundedPlayerPosition[1] === Math.round(y)) &&
        roundedPlayerPosition[2] === Math.round(z)
      ) {
        return prev;
      }

      return {
        cubes: [
          ...prev.cubes,
          { key: `${x} ${y} ${z}`, position: [x, y, z], texture: prev.texture },
        ],
      };
    }),
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
      cubes: generateWorld(),
      player: {
        position: [0, 10, 0] as [number, number, number],
      },
    }));
  },
}));
