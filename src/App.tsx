import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Experience from "./components/organisms/Experience";
import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

function App() {
  return (
    // <Canvas>
    <Canvas camera={{ near: 1, far: 20000, position: [0, 2000, 0] }}>
      <Experience />
    </Canvas>
  );
}

export default App;
