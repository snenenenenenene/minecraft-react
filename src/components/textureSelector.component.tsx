import { useEffect } from "react";
import {
  dirtImg,
  glassImg,
  grassImg,
  logImg,
  woodImg,
} from "../assets/blocks/images";
import { useKeyboard } from "../hooks/useKeyboard";
import { useStore } from "../hooks/useStore";

const images = {
  dirt: dirtImg,
  grass: grassImg,
  glass: glassImg,
  wood: woodImg,
  log: logImg,
};

export const TextureSelector = () => {
  const [activeTexture, setTexture] = useStore((state) => [
    state.texture,
    state.setTexture,
  ]);
  const { dirt, grass, glass, wood, log } = useKeyboard();

  useEffect(() => {
    const textures = {
      dirt,
      grass,
      glass,
      wood,
      log,
    };
    const pressedTexture = Object.entries(textures).find(([k, v]) => v);
    if (pressedTexture) {
      setTexture(pressedTexture[0]);
    }
  }, [setTexture, dirt, grass, glass, wood, log]);

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-500 p-1  h-[4rem] gap-x-4 flex">
      {Object.entries(images).map(([k, src]) => {
        return (
          <button
            className="border-0 p-0"
            onClick={() => {
              setTexture(k);
            }}
          >
            <img
              key={k}
              src={src}
              alt={k}
              className={`border-4 flex w-full h-full object-fill ${
                k === activeTexture ? " border-gray-500" : "border-gray-700"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};
