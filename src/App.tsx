import { Physics } from "@react-three/cannon";
import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import "./App.css";
import Loading from "./Loading";
import { FPV } from "./components/FPV.component";
import { Cubes } from "./components/cubes.component";
import { Ground } from "./components/ground.component";
import { Menu } from "./components/menu.component";
import { Player } from "./components/player.component";
import { TextureSelector } from "./components/textureSelector.component";

function App() {
  return (
    <div className="w-screen h-screen">
      <Suspense fallback={<Loading />}>
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
      </Suspense>
    </div>
  );
}

export default App;
