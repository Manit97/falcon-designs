"use client";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const OUTER = 10000;
const INNER = 2400;

function Scene() {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const lerpRot = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Outer diffuse cloud
  const outerPos = useMemo(() => {
    const a = new Float32Array(OUTER * 3);
    for (let i = 0; i < OUTER; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3.8 + Math.random() * 9.5;
      a[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      a[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.62;
      a[i * 3 + 2] = r * Math.cos(phi) * 0.38;
    }
    return a;
  }, []);

  // Inner sphere surface
  const innerPos = useMemo(() => {
    const a = new Float32Array(INNER * 3);
    for (let i = 0; i < INNER; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3.0 + Math.random() * 0.25;
      a[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      a[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      a[i * 3 + 2] = r * Math.cos(phi);
    }
    return a;
  }, []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    lerpRot.current.x += (mouse.current.y * 0.28 - lerpRot.current.x) * 0.05;
    lerpRot.current.y += (mouse.current.x * 0.44 - lerpRot.current.y) * 0.05;
    group.current.rotation.y = lerpRot.current.y + t * 0.055;
    group.current.rotation.x = lerpRot.current.x + Math.sin(t * 0.2) * 0.1;
    group.current.rotation.z = Math.cos(t * 0.14) * 0.04;
  });

  return (
    <group ref={group}>
      {/* Outer diffuse cloud */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[outerPos, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.038} color="#0000ee" transparent opacity={0.25} sizeAttenuation />
      </points>

      {/* Dense sphere surface */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[innerPos, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#0000ee" transparent opacity={0.65} sizeAttenuation />
      </points>

      {/* Wireframe shell */}
      <mesh>
        <sphereGeometry args={[3.05, 40, 40]} />
        <meshBasicMaterial color="#0000ee" wireframe transparent opacity={0.055} />
      </mesh>

      {/* Secondary outer wireframe */}
      <mesh>
        <icosahedronGeometry args={[5.5, 1]} />
        <meshBasicMaterial color="#0000ee" wireframe transparent opacity={0.025} />
      </mesh>

      {/* Core glow */}
      <mesh>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial color="#0000ee" transparent opacity={0.9} />
      </mesh>

      {/* Halo ring */}
      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[3.05, 0.012, 8, 80]} />
        <meshBasicMaterial color="#0000ee" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 14], fov: 52 }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      gl={{ antialias: true, alpha: true }}
    >
      <fog attach="fog" args={["#ffffff", 15, 36]} />
      <Scene />
    </Canvas>
  );
}
