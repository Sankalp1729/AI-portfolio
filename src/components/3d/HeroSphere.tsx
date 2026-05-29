"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

function HeroSphereMesh() {
  const groupRef = useRef<Group>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y = time * 0.24;
    groupRef.current.rotation.x = Math.sin(time * 0.14) * 0.08;
    groupRef.current.position.x = -pointer.x * 0.45;
    groupRef.current.position.y =
      Math.sin(time * 1.1) * 0.14 - pointer.y * 0.22;
  });

  return (
    <group ref={groupRef}>
      <pointLight position={[2.4, 2, 3.2]} intensity={48} color="#3b82f6" />
      <pointLight position={[-2.5, -1.6, 2.2]} intensity={28} color="#8b5cf6" />
      <mesh scale={1.38}>
        <icosahedronGeometry args={[1.2, 4]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#3b82f6"
          emissiveIntensity={1.65}
          metalness={0.72}
          roughness={0.18}
        />
      </mesh>
      <mesh scale={1.42}>
        <icosahedronGeometry args={[1.2, 4]} />
        <meshStandardMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.22}
          emissive="#8b5cf6"
          emissiveIntensity={0.55}
        />
      </mesh>
    </group>
  );
}

export default function HeroSphere() {
  return (
    <Canvas
      className="h-full w-full"
      camera={{ position: [0, 0, 5.2], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.4} />
      <HeroSphereMesh />
    </Canvas>
  );
}
