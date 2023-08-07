import { useBox } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard";
import { useStore } from "../hooks/useStore";

const JUMP_FORCE = 4;
const SPEED = 4;

export const Player = () => {
  const { moveBackward, moveForward, moveRight, moveLeft, jump } =
    useKeyboard();

  const setPlayer = useStore((state) => state.setPlayer);
  const player = useStore((state) => state.player);

  const { camera } = useThree();
  const [ref, api]: any = useBox(() => ({
    mass: 9.81,
    type: "Dynamic",
    position: player.position,
    args: [0.5, 2, 0.5],
    rotation: [0, 0, 0],
    angularFactor: [0, 1, 0],
  }));

  const vel = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v: any) => (vel.current = v));
  }, [api.velocity]);

  const pos = useRef([0, 30, 0]);
  useEffect(() => {
    api.position.subscribe((p: any) => {
      player.position = p;
      return (pos.current = p);
    });
  }, [api.position]);

  // always have the box be upright without stuttering
  useEffect(() => {
    api.rotation.subscribe((r: any) => {
      api.rotation.set(0, r[1], 0);
    });

    return () => {
      api.rotation.set(0, 0, 0);
    };
  }, [api.rotation]);

  useFrame(() => {
    // always position the camera behind the player and have it so the player is always in the center of the screen
    camera.position.copy(
      new Vector3(pos.current[0] + 4, pos.current[1] + 4, pos.current[2])
    );

    const cameraRotation = new Vector3(
      camera.rotation.x,
      camera.rotation.y,
      camera.rotation.z
    );

    api.rotation.set(0, cameraRotation.y, 0);

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
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, vel.current[1], direction.z);

    if (jump && Math.abs(vel.current[1]) < 0.2) {
      api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2]);
    }
  });

  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach={"geometry"} args={[0.5, 2, 0.5]} />
      <meshStandardMaterial attach={"material"} color="hotpink" />
    </mesh>
  );
};
