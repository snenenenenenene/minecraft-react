import { Physics } from "@react-three/cannon";
import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import "./App.css";
import { FPV } from "./components/FPV.component";
import { Cubes } from "./components/cubes.component";
import { Ground } from "./components/ground.component";
import { Menu } from "./components/menu.component";
import { Player } from "./components/player.component";
import { TextureSelector } from "./components/textureSelector.component";

function App() {
  const orbitControlsRef: any = useRef(null);
  // useFrame((state: any) => {
  //   if (!!orbitControlsRef.current) {
  //     const { x, y } = state.mouse;
  //     // orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadian(45));
  //     // orbitControlsRef.current.setPolarAngle((y + 1) * 90 - 30));
  //     orbitControlsRef.current.update();
  //   }
  // });
  return (
    <div className="w-screen h-screen">
      <Canvas shadows>
        <Sky sunPosition={[100, 200, 100]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[100, 200, 100]} intensity={0.5} castShadow />
        <FPV />
        {/* <OrbitControls ref={orbitControlsRef} /> */}
        <Physics>
          <Player />
          <Ground />
          <Cubes />
        </Physics>
      </Canvas>
      <div className="absolute z-4 justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl">
        +
      </div>
      <TextureSelector />
      <Menu />
    </div>
  );
}

export default App;
