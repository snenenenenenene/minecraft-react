import { nanoid } from "nanoid";
import create from "zustand";

export type TCube = {
  key: string;
  position: [number, number, number];
  texture: string;
};

const getLocalStorage = (key: string) =>
  JSON.parse(window.localStorage?.getItem(key) || "[]");
const setLocalStorage = (key: string, value: any) =>
  window.localStorage.setItem(key, JSON.stringify(value));

export const useStore = create((set: any) => ({
  texture: "wood",
  cubes: getLocalStorage("cubes") || [],
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
      cubes: [],
    }));
  },
}));
