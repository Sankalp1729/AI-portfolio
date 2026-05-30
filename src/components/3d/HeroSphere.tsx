"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { Group } from "three";

type HeroSphereMeshProps = {
  isMobile: boolean;
  isFrozen: boolean;
};

function HeroSphereMesh({ isMobile, isFrozen }: HeroSphereMeshProps) {
  const groupRef = useRef<Group>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    const clock = state.clock.elapsedTime;

    if (!groupRef.current) {
      return;
    }

    if (isFrozen) {
      groupRef.current.rotation.y *= 0.98;
      groupRef.current.rotation.x *= 0.98;
      groupRef.current.position.x *= 0.92;
      groupRef.current.position.y *= 0.92;
      return;
    }

    groupRef.current.rotation.y += 0.003;
    groupRef.current.position.y = Math.sin(clock * 0.5) * 0.3;

    if (!isMobile) {
      // Subtle parallax opposite to cursor direction.
      groupRef.current.position.x = -pointer.x * 0.2;
    } else {
      groupRef.current.position.x = 0;
    }
  });

  return (
    <group ref={groupRef}>
      <pointLight position={[5, 5, 5]} intensity={2} color="#3b82f6" />
      <pointLight position={[-5, -3, -5]} intensity={1} color="#7c3aed" />
      <mesh>
        <icosahedronGeometry args={[1, 3]} />
        <meshStandardMaterial
          color="#0a0a1a"
          emissive="#1e40af"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      <mesh scale={1.02}>
        <icosahedronGeometry args={[1, 3]} />
        <meshBasicMaterial
          color="#3b82f6"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}

export default function HeroSphere() {
  const [isMobile, setIsMobile] = useState(false);
  const [pixelRatio, setPixelRatio] = useState(1);
  const [isFrozen, setIsFrozen] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
      setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };
    checkViewport();

    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const sphereSize = isMobile ? 280 : 420;

  const handlePointerDown = () => {
    setIsFrozen((current) => !current);
  };

  return (
    <div
      className="mx-auto"
      style={{ width: sphereSize, height: sphereSize, maxWidth: "100%" }}
      onPointerDown={handlePointerDown}
    >
      <Canvas
        className="h-full w-full"
        camera={{ position: [0, 0, 3], fov: 50 }}
        dpr={pixelRatio}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.1} />
        <HeroSphereMesh isMobile={isMobile} isFrozen={isFrozen} />
      </Canvas>
    </div>
  );
}
