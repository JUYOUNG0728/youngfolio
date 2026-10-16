"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const HERO_BACKGROUND = "#000000";
const CAMERA_FOV = 38;
const CAMERA_Z = 5.4;
const BACKDROP_DISTANCE = 2.6;
const ROTATION_EASING = 0.075;
const OBJECT_REVEAL_DURATION = 1.2;
const OBJECT_REVEAL_OVERSHOOT = 1.035;
const OBJECT_REVEAL_EXPAND_END = 0.76;
const GLASS_THICKNESS = 0.55;
const IDLE_CYCLE_SECONDS = 18;
const BLOB_RADIUS = 0.5;
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

const BLOB_VERTEX_GLSL = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(
    i.z+vec4(0.0,i1.z,i2.z,1.0))
    +i.y+vec4(0.0,i1.y,i2.y,1.0))
    +i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

float blobHeight(vec3 n, float t){
  float spin=t*0.14;
  float cs=cos(spin);
  float sn=sin(spin);
  vec3 spun=normalize(vec3(cs*n.x+sn*n.z,n.y,-sn*n.x+cs*n.z));
  vec3 warp=vec3(
    snoise(spun*0.82+vec3(t*0.18,0.35,0.0)),
    snoise(spun*0.82+vec3(2.1,t*0.14,0.55)),
    snoise(spun*0.82+vec3(0.3,2.7,t*0.12))
  );
  vec3 p=spun*0.8+warp*0.34;
 float large = snoise(p + vec3(t*0.13, t*0.08, -t*0.1));
float mid = snoise(p * 1.2 + vec3(-t*0.1, t*0.06, t*0.04));

return large * 0.05 + mid * 0.004;
}

vec3 blobPoint(vec3 samplePoint, float t){
  float radius=max(length(samplePoint),1e-4);
  vec3 n=samplePoint/radius;
  return n*(radius+blobHeight(n,t));
}

vec3 blobNormal(vec3 samplePoint, float t){
  vec3 n=normalize(samplePoint);
  vec3 helper=abs(n.y)>0.98?vec3(1.0,0.0,0.0):vec3(0.0,1.0,0.0);
  vec3 tangent=normalize(cross(helper,n));
  vec3 bitangent=cross(n,tangent);
  float eps=0.018;
  vec3 p0=blobPoint(n,t);
  vec3 p1=blobPoint(normalize(n+tangent*eps),t);
  vec3 p2=blobPoint(normalize(n+bitangent*eps),t);
  return normalize(cross(p1-p0,p2-p0));
}
`;

function createBlobGeometry() {
  const geometry = new THREE.SphereGeometry(BLOB_RADIUS, 192, 144);
  geometry.computeBoundingBox();

  const geometrySize = new THREE.Vector3();
  geometry.boundingBox?.getSize(geometrySize);
  geometrySize.multiplyScalar(1.14);

  return { geometry, geometrySize };
}

function createGlassEnvironment(renderer: THREE.WebGLRenderer) {
  const environmentWidth = 128;
  const environmentHeight = 128;
  const environmentData = new Uint16Array(
    environmentWidth * environmentHeight * 4,
  );
  const environmentLights = [
    { u: 0.18, v: 0.22, su: 0.11, sv: 0.16, intensity: 14 },
    { u: 0.52, v: 0.16, su: 0.08, sv: 0.12, intensity: 22 },
    { u: 0.78, v: 0.36, su: 0.07, sv: 0.18, intensity: 11 },
    { u: 0.34, v: 0.62, su: 0.16, sv: 0.07, intensity: 7 },
  ];

  const getEnvironmentLuminance = (u: number, v: number) => {
    let luminance = 0.012;
    const horizonDistance = (v - 0.46) / 0.1;
    const horizon = Math.exp(-(horizonDistance * horizonDistance));
    luminance += horizon * 3.6;
    for (const light of environmentLights) {
      let du = Math.abs(u - light.u);
      du = Math.min(du, 1 - du);
      const dx = du / light.su;
      const dy = (v - light.v) / light.sv;
      luminance += light.intensity * Math.exp(-(dx * dx + dy * dy) * 2.4);
    }
    return luminance;
  };

  for (let y = 0; y < environmentHeight; y += 1) {
    const v = y / (environmentHeight - 1);
    for (let x = 0; x < environmentWidth; x += 1) {
      const luminance = getEnvironmentLuminance(x / (environmentWidth - 1), v);
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

  const { geometry, geometrySize } = useMemo(() => createBlobGeometry(), []);
  geometrySizeRef.current = geometrySize;
  const blobUniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  const material = useMemo(() => {
    const glass = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#ffffff"),
      metalness: 0,
      roughness: 0.35,
      transmission: 1,
      thickness: GLASS_THICKNESS,
      ior: 1.5,
      clearcoat: 0.1,
      clearcoatRoughness: 0.08,
      attenuationColor: new THREE.Color("#ffffff"),
      attenuationDistance: 1e6,
      envMapIntensity: 1.15,
      specularIntensity: 1,
      transparent: true,
      opacity: 0.8,
    });

    glass.customProgramCacheKey = () => "hero-liquid-blob-v4";
    glass.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = blobUniforms.uTime;
      shader.vertexShader = shader.vertexShader
        .replace(
          "#include <common>",
          `#include <common>\n${BLOB_VERTEX_GLSL}\nuniform float uTime;\n`,
        )
        .replace(
          "#include <beginnormal_vertex>",
          `vec3 objectNormal = blobNormal(position, uTime);\n#ifdef USE_TANGENT\n\tvec3 objectTangent = vec3( tangent.xyz );\n#endif`,
        )
        .replace(
          "#include <begin_vertex>",
          "vec3 transformed = blobPoint(position, uTime);",
        );
    };

    return glass;
  }, [blobUniforms]);

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
    blobUniforms.uTime.value = reducedMotion ? 1.15 : state.clock.elapsedTime;

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
      <directionalLight position={[4.2, 3.4, 6]} intensity={0.9} />
      <directionalLight position={[-4.5, -1.2, 3.5]} intensity={0.22} />
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
