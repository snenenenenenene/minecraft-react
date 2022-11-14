import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";

function App() {
  return (
    <div className="w-screen h-screen">
      <Canvas>
        <Sky sunPosition={[100, 100, 100]} />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
}

export default App;
