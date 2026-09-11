import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type Variant = "hero" | "header" | "ambient";

const AMBER = "#f0a83c";
const EMBER = "#e2703a";

function Shape({
  position,
  scale,
  geometry,
  color,
  spin,
}: {
  position: [number, number, number];
  scale: number;
  geometry: "ico" | "torus" | "box" | "octa";
  color: string;
  spin: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    if (!ref.current) return;
    ref.current.rotation.x += dt * spin * 0.4;
    ref.current.rotation.y += dt * spin * 0.6;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        {geometry === "ico" && <icosahedronGeometry args={[1, 0]} />}
        {geometry === "octa" && <octahedronGeometry args={[1, 0]} />}
        {geometry === "torus" && <torusGeometry args={[0.85, 0.3, 32, 64]} />}
        {geometry === "box" && <boxGeometry args={[1.3, 1.3, 1.3]} />}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.35}
          metalness={0.75}
          roughness={0.25}
          flatShading
        />
      </mesh>
    </Float>
  );
}

function Rig({ strength }: { strength: number }) {
  const { camera, pointer } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    target.set(pointer.x * strength, pointer.y * strength * 0.6, camera.position.z);
    const k = 1 - Math.exp(-3 * dt);
    camera.position.x += (target.x - camera.position.x) * k;
    camera.position.y += (target.y - camera.position.y) * k;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function FloatingScene({ variant = "header" }: { variant?: Variant }) {
  const hero = variant === "hero";
  const ambient = variant === "ambient";

  if (ambient) {
    return (
      <Canvas
        className="pointer-events-none"
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 14], fov: 50 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[6, 8, 6]} intensity={1.2} color={AMBER} />
        <pointLight position={[-8, -4, 3]} intensity={40} color={EMBER} />
        <pointLight position={[9, 5, -2]} intensity={25} color="#ffb45e" />

        <Environment resolution={64}>
          <Lightformer intensity={2} position={[0, 5, 2]} scale={[12, 8, 1]} color="#ffd9a0" />
          <Lightformer
            intensity={1.2}
            color={EMBER}
            position={[-6, 1, -1]}
            rotation-y={Math.PI / 2}
            scale={[18, 2, 1]}
          />
          <Lightformer
            intensity={0.9}
            color="#8899bb"
            position={[6, -2, 1]}
            rotation-y={-Math.PI / 2}
            scale={[18, 2, 1]}
          />
        </Environment>

        <Shape position={[-7.5, 3, -4]} scale={1.4} geometry="ico" color={AMBER} spin={0.35} />
        <Shape position={[7.8, -2.5, -5]} scale={1.6} geometry="torus" color={EMBER} spin={0.25} />
        <Shape position={[6.5, 4, -6]} scale={1} geometry="octa" color={AMBER} spin={0.5} />
        <Shape position={[-7, -4, -5]} scale={0.9} geometry="box" color={EMBER} spin={0.4} />
        <Shape position={[0.5, -5, -7]} scale={1.1} geometry="octa" color={EMBER} spin={0.3} />

        <Rig strength={0.8} />
      </Canvas>
    );
  }

  return (
    <Canvas
      className="pointer-events-none"
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, hero ? 9 : 10.5], fov: 45 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[6, 8, 6]} intensity={1.4} color={AMBER} />
      <pointLight position={[-6, -3, 4]} intensity={30} color={EMBER} />

      <Environment resolution={64}>
        <Lightformer intensity={2.4} position={[0, 5, 2]} scale={[12, 8, 1]} color="#ffd9a0" />
        <Lightformer
          intensity={1.4}
          color={EMBER}
          position={[-6, 1, -1]}
          rotation-y={Math.PI / 2}
          scale={[18, 2, 1]}
        />
        <Lightformer
          intensity={1}
          color="#8899bb"
          position={[6, -2, 1]}
          rotation-y={-Math.PI / 2}
          scale={[18, 2, 1]}
        />
      </Environment>

      <group position={hero ? [0, 0, 0] : [2.4, 0.6, -2.5]}>
        <Shape position={[-4.2, 1.4, 0]} scale={hero ? 1.15 : 0.9} geometry="ico" color={AMBER} spin={0.5} />
        <Shape position={[4.4, -1, -1]} scale={hero ? 1.25 : 1} geometry="torus" color={EMBER} spin={0.35} />
        <Shape position={[2.6, 2.2, -2]} scale={hero ? 0.85 : 0.7} geometry="octa" color={AMBER} spin={0.7} />
        <Shape position={[-2.6, -2.1, -1.5]} scale={hero ? 0.8 : 0.65} geometry="box" color={EMBER} spin={0.45} />

      </group>

      <Rig strength={hero ? 1.1 : 0.7} />
    </Canvas>
  );
}
