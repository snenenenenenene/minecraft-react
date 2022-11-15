import { useCallback, useEffect, useState } from "react";

function actionByKey(key: any): any {
  const keyActionMap: any = {
    KeyW: "moveForward",
    KeyS: "moveBackward",
    KeyA: "moveLeft",
    KeyD: "moveRight",
    Space: "jump",
    Digit1: "dirt",
    Digit2: "grass",
    Digit3: "glass",
    Digit4: "wood",
    Digit5: "log",
  };

  return keyActionMap[key];
}

export const useKeyboard = () => {
  const [actions, setActions] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    texture1: false,
    texture2: false,
    texture3: false,
    texture4: false,
  });

  const handleKeyDown = useCallback((e: any) => {
    const action = actionByKey(e.code);
    if (action) {
      setActions((prev) => {
        return { ...prev, [action]: true };
      });
    }
  }, []);

  const handleKeyUp = useCallback((e: any) => {
    const action = actionByKey(e.code);
    if (action) {
      setActions((prev) => {
        return { ...prev, [action]: false };
      });
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return actions;
};
