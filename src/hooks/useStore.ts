import create from "zustand";
import React from "react";
import { nanoid } from "nanoid";

export type TCube = {
  key: string;
  position: [number, number, number];
  texture: string;
};
export const useStore = create((set: any) => ({
  texture: "dirt",
  cubes: [{ key: nanoid, position: [1, 1, 1], texture: "dirt" }],
  addCube: (x: number, y: number, z: number) =>
    set((prev: any) => ({
      cubes: [
        ...prev.cubes,
        { key: nanoid, position: [x, y, z], texture: prev.texture },
      ],
    })),
  setTexture: (texture: any) => set({ texture }),
  removeCube: (id: any): void =>
    set((state: any) => ({
      cubes: state.cubes.filter((cube: any) => cube.id !== id),
    })),
  saveWorld: () => {},
  resetWorld: () => {},
  loadWorld: () => {},
}));
