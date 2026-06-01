"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Edges, Text3D } from "@react-three/drei";
import * as THREE from "three";

// ─── Edge lines for the outer box ────────────────────────────────────────────
function BoxEdges({
  size,
  color,
  opacity = 1,
}: {
  size: number;
  color: string;
  opacity?: number;
}) {
  const geo = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(size, size, size)),
    [size]
  );
  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </lineSegments>
  );
}

// ─── Solid 3-D "FD" block ─────────────────────────────────────────────────────
function FDText() {
  return (
    <Center position={[0, 0, 0]}>
      <Text3D
        font="/fonts/helvetiker_bold.typeface.json"
        size={1.0}
        height={0.4}
        curveSegments={10}
        bevelEnabled
        bevelThickness={0.025}
        bevelSize={0.012}
        bevelSegments={4}
        letterSpacing={0.05}
      >
        FD
        {/* Solid orange block — no transparency */}
        <meshStandardMaterial
          color="#f97316"
          roughness={0.15}
          metalness={0.08}
          emissive="#f97316"
          emissiveIntensity={0.28}
        />
        {/* Darker orange edge lines for definition */}
        <Edges threshold={15} color="#c2410c" />
      </Text3D>
    </Center>
  );
}

// ─── Animated scene ───────────────────────────────────────────────────────────
function Scene() {
  const mouseGroupRef = useRef<THREE.Group>(null!);
  const spinGroupRef  = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (mouseGroupRef.current) {
      // Gentle float
      mouseGroupRef.current.position.y = Math.sin(t * 0.55) * 0.18;
      // Mouse tilt
      mouseGroupRef.current.rotation.x +=
        (-state.pointer.y * 0.22 - mouseGroupRef.current.rotation.x) * 0.04;
      mouseGroupRef.current.rotation.z +=
        (state.pointer.x * 0.08 - mouseGroupRef.current.rotation.z) * 0.04;
    }

    if (spinGroupRef.current) {
      spinGroupRef.current.rotation.y += delta * 0.26;
      spinGroupRef.current.rotation.x += delta * 0.08;
    }
  });

  return (
    <group ref={mouseGroupRef}>
      {/* Orange glow lights */}
      <pointLight position={[4, 4, 4]}    intensity={6} color="#f97316" />
      <pointLight position={[-4, -3, -4]} intensity={2} color="#f97316" />
      <pointLight position={[0, 0, 5]}    intensity={1} color="#ffffff" />

      <group ref={spinGroupRef}>
        {/* ── Outer cube wireframe ── */}
        <mesh>
          <boxGeometry args={[2.4, 2.4, 2.4]} />
          <meshStandardMaterial
            color="#111111"
            transparent
            opacity={0.18}
            side={THREE.DoubleSide}
          />
        </mesh>
        <BoxEdges size={2.4} color="#f97316" opacity={0.9} />

        {/* ── Solid FD block — spins with the cube ── */}
        <Suspense fallback={null}>
          <FDText />
        </Suspense>
      </group>
    </group>
  );
}

// ─── Canvas wrapper ───────────────────────────────────────────────────────────
export default function HeroCube() {
  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 6], fov: 42 }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.06} />
      <Scene />
    </Canvas>
  );
}
