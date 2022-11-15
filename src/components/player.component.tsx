import { useSphere } from "@react-three/cannon";
import { Sphere } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard";

const JUMP_FORCE = 5;
const PLAYER_SPEED = 4;

export const Player = () => {
  const { camera } = useThree();
  const { moveBackward, moveForward, moveLeft, moveRight, jump } =
    useKeyboard();

  const [ref, api]: any = useSphere(() => {
    return {
      mass: 1,
      position: [0, 1, 0],
      type: "Dynamic",
    };
  });

  const vel: any = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v: any) => {
      vel.current = v;
    });
  }, [api.velocity]);

  useEffect(() => {
    api.position.subscribe((p: any) => {
      position.current = p;
    });
  }, [api.position]);

  const position = useRef([0, 0, 0]);
  useFrame(() => {
    // make camera follow player
    camera.position.copy(
      new Vector3(position.current[0], position.current[1], position.current[2])
    );

    const direction = new Vector3();

    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    );

    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    );

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(PLAYER_SPEED)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, vel.current[1], direction.z);

    if (jump && Math.abs(vel.current[1]) < 0.05) {
      api.velocity?.set(vel.current[0], 10, vel.current[2]);
    }

    // move up player by adding velocity
    // api.velocity.set(0, 1, 0);
  });
  return <mesh ref={ref}></mesh>;
};
