"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { Mesh } from "three";

function SphereContent() {
  const meshRef = useRef<Mesh>(null);
  const wireRef = useRef<Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.08;
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.25;
      // Mouse parallax
      meshRef.current.position.x += (mouse.x * 0.4 - meshRef.current.position.x) * 0.05;
    }
    if (wireRef.current && meshRef.current) {
      wireRef.current.rotation.y = meshRef.current.rotation.y;
      wireRef.current.rotation.x = meshRef.current.rotation.x;
      wireRef.current.position.copy(meshRef.current.position);
    }
  });

  return (
    <>
      <ambientLight intensity={0.08} />
      <pointLight position={[5, 5, 5]} color="#3B82F6" intensity={2.5} />
      <pointLight position={[-5, -3, -4]} color="#7C3AED" intensity={1.2} />
      <pointLight position={[0, 8, 2]} color="#60A5FA" intensity={0.8} />

      {/* Inner solid sphere */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.4, 3]} />
        <meshStandardMaterial
          color="#060618"
          emissive="#1e3a8a"
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>

      {/* Outer wireframe */}
      <mesh ref={wireRef} scale={1.025}>
        <icosahedronGeometry args={[1.4, 3]} />
        <meshBasicMaterial
          color="#3B82F6"
          wireframe={true}
          transparent={true}
          opacity={0.12}
        />
      </mesh>
    </>
  );
}

export default function HeroSphere() {
  const [pixelRatio, setPixelRatio] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  }, []);

  if (!mounted) {
    return (
      <div
        className="h-full w-full rounded-[32px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_50%)]"
        aria-hidden
      />
    );
  }

  return (
    <div
      className="mx-auto w-full aspect-square max-w-[280px] md:max-w-[480px]"
      style={{
        maxWidth: "480px",
        aspectRatio: "1/1",
      }}
    >
      <Canvas
        className="h-full w-full"
        camera={{ position: [0, 0, 4], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
        dpr={pixelRatio}
        style={{ background: "transparent" }}
      >
        <SphereContent />
      </Canvas>
    </div>
  );
}
