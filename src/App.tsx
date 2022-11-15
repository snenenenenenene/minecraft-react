import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { Ground } from "./components/ground.component";
import { Physics } from "@react-three/cannon";
import { Player } from "./components/player.component";
import { FPV } from "./components/FPV.component";
import { Cubes } from "./components/cubes.component";

function App() {
  return (
    <div className="w-screen h-screen">
      <Canvas>
        <Sky sunPosition={[100, 100, 100]} />
        <ambientLight intensity={0.5} />
        <FPV />
        <Physics>
          <Player />
          <Cubes />
          <Ground />
        </Physics>
      </Canvas>
      <div className="absolute z-4 justify-center items-center top-1/2 left-1/2 transform translate-x-1/2 translate-y-1/2 text-4xl">
        +
      </div>
    </div>
  );
}

export default App;
