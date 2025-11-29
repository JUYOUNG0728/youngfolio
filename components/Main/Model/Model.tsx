import { useGLTF } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as Three from "three";

export default function Model() {
  const { scene } = useGLTF("/models/model1.glb");
  const { viewport } = useThree();
  const modelRef = useRef<Three.Mesh>();

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group scale={viewport.width / 8}>
      <primitive
        object={scene}
        rotation={[0.2, -0.4, -0.3]}
        castShadow
        receiveShadow
        ref={modelRef}
      />
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
    </group>
  );
}
