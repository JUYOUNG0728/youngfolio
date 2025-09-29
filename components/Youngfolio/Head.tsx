"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import useScreenWidth from "@/utils/useScreenWidth";

export default function Head({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const screenWidth = useScreenWidth();

  const initThree = (container: HTMLDivElement) => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    let model: THREE.Group;

    loader.load("/models/head.glb", (gltf) => {
      model = gltf.scene;

      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.material = new THREE.MeshBasicMaterial({
            color: 0x454545,
            wireframe: true,
          });
        }
      });

      model.scale.set(0.35, 0.35, 0.35);
      model.position.y = -1.1;
      model.rotation.y = -1.5;
      scene.add(model);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      if (model) {
        model.rotation.y += 0.003;
      }
      renderer.render(scene, camera);
    };

    animate();

    return {
      dispose: () => {
        renderer.dispose();
        container.innerHTML = "";
      },
    };
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const threeInstance = initThree(containerRef.current);

    return () => {
      threeInstance.dispose();
    };
  }, [screenWidth]);
}
