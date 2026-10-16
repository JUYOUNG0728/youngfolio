"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const HERO_BACKGROUND = "#111111";
const CAMERA_FOV = 38;
const CAMERA_Z = 5.4;
const BACKDROP_DISTANCE = 2.6;
const ROTATION_EASING = 0.075;
const OBJECT_REVEAL_DURATION = 1.2;
const OBJECT_REVEAL_OVERSHOOT = 1.035;
const OBJECT_REVEAL_EXPAND_END = 0.76;
const OBJECT_DEPTH_RATIO = 0.135;
const OBJECT_BEVEL_RATIO = 0.032;
const GLASS_THICKNESS = 0.2;
const IDLE_CYCLE_SECONDS = 18;
const IDLE_AMPLITUDE = { x: 0.04, y: 0.14, z: 0.016 };
const BASE_ROTATION = { x: -0.12, y: 0.2, z: 0.015 };

type HeroGlassYProps = {
  heroRef: React.RefObject<HTMLElement | null>;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function easeOutQuart(value: number) {
  return 1 - Math.pow(1 - value, 4);
}

function smoothStep(value: number) {
  return value * value * (3 - 2 * value);
}

function getObjectRevealScale(progress: number) {
  if (progress < OBJECT_REVEAL_EXPAND_END) {
    return (
      easeOutQuart(clamp(progress / OBJECT_REVEAL_EXPAND_END, 0, 1)) *
      OBJECT_REVEAL_OVERSHOOT
    );
  }

  const settleProgress = clamp(
    (progress - OBJECT_REVEAL_EXPAND_END) / (1 - OBJECT_REVEAL_EXPAND_END),
    0,
    1,
  );
  return (
    OBJECT_REVEAL_OVERSHOOT +
    (1 - OBJECT_REVEAL_OVERSHOOT) * smoothStep(settleProgress)
  );
}

function createYShape() {
  const shape = new THREE.Shape();
  const width = 1680;
  const height = 2270;
  const thickness = 430;

  const points: Array<[number, number]> = [
    [0, 0],
    [thickness, 0],
    [width / 2, height * 0.4],
    [width - thickness, 0],
    [width, 0],
    [width / 2 + thickness * 0.52, height * 0.5],
    [width / 2 + thickness * 0.52, height],
    [width / 2 - thickness * 0.52, height],
    [width / 2 - thickness * 0.52, height * 0.5],
  ];

  shape.moveTo(points[0][0], -points[0][1]);
  for (let index = 1; index < points.length; index += 1) {
    shape.lineTo(points[index][0], -points[index][1]);
  }
  shape.closePath();
  return shape;
}

function createYGeometry() {
  const shape = createYShape();
  const shapeBounds = new THREE.Box2().setFromPoints(shape.getPoints(8));
  const sourceWidth = shapeBounds.max.x - shapeBounds.min.x;
  const bevel = sourceWidth * OBJECT_BEVEL_RATIO;
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: sourceWidth * OBJECT_DEPTH_RATIO,
    curveSegments: 40,
    bevelEnabled: true,
    bevelThickness: bevel * 0.9,
    bevelSize: bevel,
    bevelOffset: -bevel,
    bevelSegments: 3,
  });

  geometry.center();
  geometry.computeBoundingBox();

  const geometrySize = new THREE.Vector3();
  geometry.boundingBox?.getSize(geometrySize);
  const normalizationScale = 1 / Math.max(geometrySize.x, geometrySize.y, 1);
  geometry.scale(normalizationScale, normalizationScale, normalizationScale);
  geometry.computeBoundingBox();
  geometry.boundingBox?.getSize(geometrySize);

  return { geometry, geometrySize };
}

function createGlassEnvironment(renderer: THREE.WebGLRenderer) {
  const environmentWidth = 64;
  const environmentHeight = 256;
  const environmentData = new Uint16Array(
    environmentWidth * environmentHeight * 4,
  );
  const environmentStrips = [
    { center: 0.09, width: 0.075, intensity: 44 },
    { center: 0.26, width: 0.028, intensity: 26 },
    { center: 0.42, width: 0.016, intensity: 17 },
    { center: 0.64, width: 0.038, intensity: 10 },
    { center: 0.9, width: 0.075, intensity: 4 },
  ];

  const getEnvironmentLuminance = (value: number) => {
    let luminance = 0.16;
    for (const strip of environmentStrips) {
      const distance = Math.abs(value - strip.center) / strip.width;
      if (distance < 1)
        luminance += strip.intensity * (1 - distance * distance);
    }
    return luminance;
  };

  for (let y = 0; y < environmentHeight; y += 1) {
    const luminance = getEnvironmentLuminance(1 - y / (environmentHeight - 1));
    for (let x = 0; x < environmentWidth; x += 1) {
      const dataIndex = (y * environmentWidth + x) * 4;
      const halfFloatLuminance = THREE.DataUtils.toHalfFloat(luminance);
      environmentData[dataIndex] = halfFloatLuminance;
      environmentData[dataIndex + 1] = halfFloatLuminance;
      environmentData[dataIndex + 2] = halfFloatLuminance;
      environmentData[dataIndex + 3] = THREE.DataUtils.toHalfFloat(1);
    }
  }

  const environmentTexture = new THREE.DataTexture(
    environmentData,
    environmentWidth,
    environmentHeight,
    THREE.RGBAFormat,
    THREE.HalfFloatType,
  );
  environmentTexture.mapping = THREE.EquirectangularReflectionMapping;
  environmentTexture.colorSpace = THREE.LinearSRGBColorSpace;
  environmentTexture.minFilter = THREE.LinearFilter;
  environmentTexture.magFilter = THREE.LinearFilter;
  environmentTexture.needsUpdate = true;

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const environmentRenderTarget =
    pmremGenerator.fromEquirectangular(environmentTexture);
  pmremGenerator.dispose();
  environmentTexture.dispose();

  return environmentRenderTarget;
}

function getFittedScale(
  camera: THREE.PerspectiveCamera,
  geometrySize: THREE.Vector3,
  width: number,
) {
  const visibleHeight =
    2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
  const visibleWidth = visibleHeight * camera.aspect;
  const objectAspect = geometrySize.x / Math.max(geometrySize.y, 0.001);
  const mobile = width <= 560;
  const tablet = width <= 959;
  const widthRatio = mobile ? 0.84 : tablet ? 0.72 : 0.49;
  const heightRatio = mobile ? 0.45 : tablet ? 0.59 : 0.69;

  return (
    Math.min(
      visibleWidth * widthRatio,
      visibleHeight * heightRatio * objectAspect,
    ) / Math.max(geometrySize.x, 0.001)
  );
}

function HeroScene({ heroRef }: HeroGlassYProps) {
  const { gl, scene, camera, size } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const backdropRef = useRef<THREE.Mesh>(null);
  const backdropMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const currentRotation = useRef({ ...BASE_ROTATION });
  const targetRotation = useRef({ ...BASE_ROTATION });
  const objectRevealProgress = useRef(1);
  const mobileIdleElapsedSeconds = useRef(0);
  const fittedScale = useRef(1);
  const geometrySizeRef = useRef(new THREE.Vector3(1, 1, 1));
  const backdropCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const backdropTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const lastBackdropSize = useRef({ width: 0, height: 0 });

  const { geometry, geometrySize } = useMemo(() => createYGeometry(), []);
  geometrySizeRef.current = geometrySize;

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#ffffff"),
        metalness: 0,
        reflectivity: 1,
        iridescence: 0.22,
        iridescenceIOR: 1.22,
        iridescenceThicknessRange: [200, 380],
        transmission: 1,
        roughness: 0.02,
        thickness: GLASS_THICKNESS,
        ior: 1.5,
        clearcoat: 0.25,
        clearcoatRoughness: 0.02,
        attenuationColor: new THREE.Color("#ffffff"),
        attenuationDistance: 1e4,
        envMapIntensity: 1.45,
        specularIntensity: 1,
      }),
    [],
  );

  useEffect(() => {
    const environmentRenderTarget = createGlassEnvironment(gl);
    scene.environment = environmentRenderTarget.texture;
    scene.background = null;

    const canvas = document.createElement("canvas");
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    backdropCanvasRef.current = canvas;
    backdropTextureRef.current = texture;
    if (backdropMaterialRef.current) {
      backdropMaterialRef.current.map = texture;
      backdropMaterialRef.current.needsUpdate = true;
    }

    return () => {
      scene.environment = null;
      environmentRenderTarget.dispose();
      texture.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, gl, material, scene]);

  useEffect(() => {
    const persp = camera as THREE.PerspectiveCamera;
    persp.fov = CAMERA_FOV;
    persp.position.set(0, 0, CAMERA_Z);
    persp.near = 0.1;
    persp.far = 60;
    persp.aspect = size.width / Math.max(size.height, 1);
    persp.updateProjectionMatrix();
    fittedScale.current = getFittedScale(
      persp,
      geometrySizeRef.current,
      size.width,
    );

    const distance = persp.position.z + BACKDROP_DISTANCE;
    const visibleHeight =
      2 * Math.tan(THREE.MathUtils.degToRad(persp.fov / 2)) * distance;
    backdropRef.current?.scale.set(
      visibleHeight * persp.aspect,
      visibleHeight,
      1,
    );
  }, [camera, size.height, size.width]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    const handlePointerMove = (event: PointerEvent) => {
      const hero = heroRef.current;
      if (!hero || reducedMotion.matches || !finePointer.matches) return;

      const bounds = hero.getBoundingClientRect();
      const inside =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;

      if (!inside) {
        targetRotation.current = { ...BASE_ROTATION };
        return;
      }

      const normalizedX = clamp(
        ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
        -1,
        1,
      );
      const normalizedY = clamp(
        ((event.clientY - bounds.top) / bounds.height) * 2 - 1,
        -1,
        1,
      );
      targetRotation.current = {
        x: BASE_ROTATION.x - normalizedY * 0.46,
        y: BASE_ROTATION.y + normalizedX * 0.56,
        z: BASE_ROTATION.z - normalizedX * 0.04,
      };
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [heroRef]);

  const syncBackdrop = () => {
    const hero = heroRef.current;
    const canvas = backdropCanvasRef.current;
    const texture = backdropTextureRef.current;
    if (!hero || !canvas || !texture) return;

    const canvasBounds = hero.getBoundingClientRect();
    if (canvasBounds.width <= 0 || canvasBounds.height <= 0) return;

    const requestedScale = Math.min(window.devicePixelRatio || 1, 1.25);
    const textureScale = Math.min(
      requestedScale,
      2048 / canvasBounds.width,
      2048 / canvasBounds.height,
    );
    const textureWidth = Math.max(
      1,
      Math.round(canvasBounds.width * textureScale),
    );
    const textureHeight = Math.max(
      1,
      Math.round(canvasBounds.height * textureScale),
    );

    if (
      lastBackdropSize.current.width !== textureWidth ||
      lastBackdropSize.current.height !== textureHeight
    ) {
      lastBackdropSize.current = { width: textureWidth, height: textureHeight };
      canvas.width = textureWidth;
      canvas.height = textureHeight;
    }

    const context = canvas.getContext("2d");
    if (!context) return;

    context.fillStyle = HERO_BACKGROUND;
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (canvasBounds.width >= 769) {
      const lines = hero.querySelectorAll<HTMLElement>("[data-hero-refract]");
      context.save();
      context.scale(textureScale, textureScale);
      lines.forEach((line) => {
        const textElement = line.querySelector<HTMLElement>(
          "[data-hero-refract-text]",
        );
        if (!textElement) return;
        const styles = window.getComputedStyle(textElement);
        if (
          styles.display === "none" ||
          styles.visibility === "hidden" ||
          Number.parseFloat(styles.opacity || "1") <= 0
        ) {
          return;
        }

        const text = (textElement.textContent ?? "").trim();
        const lineBounds = line.getBoundingClientRect();
        if (
          !text ||
          lineBounds.width <= 0 ||
          lineBounds.right <= canvasBounds.left ||
          lineBounds.left >= canvasBounds.right
        ) {
          return;
        }

        const isRightAligned =
          styles.textAlign === "right" || styles.textAlign === "end";
        const relativeLeft = lineBounds.left - canvasBounds.left;
        const relativeRight = lineBounds.right - canvasBounds.left;
        const drawX = isRightAligned ? relativeRight : relativeLeft;
        const drawY = lineBounds.top - canvasBounds.top + lineBounds.height / 2;

        context.save();
        context.fillStyle = "#ffffff";
        context.font = [
          styles.fontStyle,
          styles.fontWeight,
          styles.fontSize,
          styles.fontFamily,
        ]
          .filter(Boolean)
          .join(" ");
        context.textAlign = isRightAligned ? "right" : "left";
        context.textBaseline = "middle";
        context.fillText(text, drawX, drawY);
        context.restore();
      });
      context.restore();
    }

    texture.needsUpdate = true;
  };

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const deltaSeconds = Math.min(Math.max(state.clock.getDelta(), 0), 0.05);

    if (reducedMotion) {
      currentRotation.current = { ...BASE_ROTATION };
      objectRevealProgress.current = 1;
    } else {
      objectRevealProgress.current = clamp(
        objectRevealProgress.current + deltaSeconds / OBJECT_REVEAL_DURATION,
        0,
        1,
      );
    }

    const mobileIdleActive =
      !finePointer && !reducedMotion && objectRevealProgress.current >= 1;
    if (mobileIdleActive) mobileIdleElapsedSeconds.current += deltaSeconds;

    const desiredRotation = mobileIdleActive
      ? {
          x:
            BASE_ROTATION.x +
            Math.sin(
              (mobileIdleElapsedSeconds.current / IDLE_CYCLE_SECONDS) *
                Math.PI *
                2,
            ) *
              IDLE_AMPLITUDE.x,
          y:
            BASE_ROTATION.y +
            Math.cos(
              (mobileIdleElapsedSeconds.current / IDLE_CYCLE_SECONDS) *
                Math.PI *
                2,
            ) *
              IDLE_AMPLITUDE.y,
          z:
            BASE_ROTATION.z +
            Math.sin(
              (mobileIdleElapsedSeconds.current / IDLE_CYCLE_SECONDS) *
                Math.PI *
                4,
            ) *
              IDLE_AMPLITUDE.z,
        }
      : targetRotation.current;

    if (!reducedMotion) {
      currentRotation.current.x +=
        (desiredRotation.x - currentRotation.current.x) * ROTATION_EASING;
      currentRotation.current.y +=
        (desiredRotation.y - currentRotation.current.y) * ROTATION_EASING;
      currentRotation.current.z +=
        (desiredRotation.z - currentRotation.current.z) * ROTATION_EASING;
    }

    const revealScale = getObjectRevealScale(objectRevealProgress.current);
    const revealEase = easeOutCubic(objectRevealProgress.current);
    const revealTilt = reducedMotion ? 0 : 1 - revealEase;

    group.scale.setScalar(fittedScale.current * revealScale);
    group.rotation.set(
      currentRotation.current.x + revealTilt * 0.075,
      currentRotation.current.y - revealTilt * 0.14,
      currentRotation.current.z + revealTilt * 0.03,
    );
    group.position.z = reducedMotion ? 0 : revealTilt * -0.18;

    if (state.clock.elapsedTime < 2 || state.clock.elapsedTime % 0.4 < 0.02) {
      syncBackdrop();
    }
  });

  return (
    <>
      <mesh
        ref={backdropRef}
        position={[0, 0, -BACKDROP_DISTANCE]}
        onBeforeRender={(renderer) => {
          const isTransmissionPass = renderer.getRenderTarget() !== null;
          if (backdropMaterialRef.current) {
            backdropMaterialRef.current.colorWrite = isTransmissionPass;
            backdropMaterialRef.current.depthWrite = isTransmissionPass;
          }
        }}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          ref={backdropMaterialRef}
          toneMapped={false}
          map={backdropTextureRef.current ?? undefined}
        />
      </mesh>
      <group ref={groupRef}>
        <mesh geometry={geometry} material={material} />
      </group>
    </>
  );
}

export default function HeroGlassY({ heroRef }: HeroGlassYProps) {
  return (
    <Canvas
      className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      camera={{
        fov: CAMERA_FOV,
        position: [0, 0, CAMERA_Z],
        near: 0.1,
        far: 60,
      }}
      dpr={[1, 1.25]}
      style={{ background: "transparent" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.2;
        gl.setClearColor(0, 0);
      }}
    >
      <HeroScene heroRef={heroRef} />
    </Canvas>
  );
}
