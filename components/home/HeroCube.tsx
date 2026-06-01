"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── Edge lines via EdgesGeometry (guaranteed cross-platform) ────────────────
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

// ─── The animated scene ───────────────────────────────────────────────────────
function Scene() {
  const mouseGroupRef = useRef<THREE.Group>(null!); // mouse tilt
  const spinGroupRef  = useRef<THREE.Group>(null!); // auto-spin
  const innerMeshRef  = useRef<THREE.Group>(null!); // inner counter-spin

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Gentle float on Y
    if (mouseGroupRef.current) {
      mouseGroupRef.current.position.y = Math.sin(t * 0.55) * 0.18;

      // Tilt toward pointer (lerp)
      mouseGroupRef.current.rotation.x +=
        (-state.pointer.y * 0.22 - mouseGroupRef.current.rotation.x) * 0.04;
      mouseGroupRef.current.rotation.z +=
        (state.pointer.x * 0.08 - mouseGroupRef.current.rotation.z) * 0.04;
    }

    // Continuous Y-spin on outer
    if (spinGroupRef.current) {
      spinGroupRef.current.rotation.y += delta * 0.26;
      spinGroupRef.current.rotation.x += delta * 0.08;
    }

    // Inner cube counter-spins
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.y -= delta * 0.52;
      innerMeshRef.current.rotation.x += delta * 0.28;
    }
  });

  return (
    <group ref={mouseGroupRef}>
      {/* Orange glow lights */}
      <pointLight position={[4, 4, 4]}   intensity={6}  color="#f97316" />
      <pointLight position={[-4, -3, -4]} intensity={2}  color="#f97316" />
      <pointLight position={[0, 0, 5]}    intensity={1}  color="#ffffff" />

      <group ref={spinGroupRef}>
        {/* ── Outer cube ── */}
        <mesh>
          <boxGeometry args={[2.4, 2.4, 2.4]} />
          {/* Dark transparent faces — visible only where lit by orange lights */}
          <meshStandardMaterial
            color="#111111"
            transparent
            opacity={0.18}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Outer edges — orange wireframe */}
        <BoxEdges size={2.4} color="#f97316" opacity={0.9} />

        {/* ── Inner counter-spinning cube ── */}
        <group ref={innerMeshRef}>
          <mesh>
            <boxGeometry args={[1.05, 1.05, 1.05]} />
            <meshStandardMaterial
              color="#f97316"
              transparent
              opacity={0.07}
              emissive="#f97316"
              emissiveIntensity={0.4}
            />
          </mesh>
          {/* Inner edges — lighter orange */}
          <BoxEdges size={1.05} color="#fb923c" opacity={0.75} />
        </group>
      </group>
    </group>
  );
}

// ─── Exported canvas wrapper ──────────────────────────────────────────────────
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
