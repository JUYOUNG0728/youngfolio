"use client";

import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Environment } from "@react-three/drei";

export default function Index() {
  return (
    <Canvas shadows>
      <Model />
      <ambientLight intensity={6} />
      <directionalLight intensity={1.5} position={[0, 5, 5]} castShadow />
      <Environment preset="city" />
    </Canvas>
  );
}
