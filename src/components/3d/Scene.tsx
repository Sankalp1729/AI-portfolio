"use client";

import { Float, Grid, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useThree } from "@react-three/fiber";
import type { Mesh, PointLight } from "three";

function Sphere() {
  return (
    <Float
      speed={1.1}
      rotationIntensity={0.45}
      floatIntensity={0.8}
    >
      <mesh position={[5, -0.8, -2]}>
        <sphereGeometry args={[0.56, 48, 48]} />
        <meshPhysicalMaterial
          color="#9beffd"
          emissive="#22d3ee"
          emissiveIntensity={1.1}
          roughness={0}
          metalness={1}
          transparent
          opacity={0.38}
          clearcoat={1}
          clearcoatRoughness={0}
          transmission={0.7}
          thickness={0.95}
          ior={1.35}
        />
      </mesh>
    </Float>
  );
}

function AmbientMotion() {
  const primaryLight = useRef<PointLight>(null);
  const secondaryLight = useRef<PointLight>(null);
  const orb = useRef<Mesh>(null);
  const nodeLeft = useRef<Mesh>(null);
  const nodeRight = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (primaryLight.current) {
      primaryLight.current.position.x = 2 + Math.sin(time * 0.4) * 1.2;
      primaryLight.current.position.y = 2.2 + Math.cos(time * 0.35) * 0.4;
    }

    if (secondaryLight.current) {
      secondaryLight.current.position.x = -3 + Math.cos(time * 0.45) * 0.9;
      secondaryLight.current.position.y = -1.8 + Math.sin(time * 0.3) * 0.5;
    }

    if (orb.current) {
      orb.current.rotation.y = time * 0.08;
    }

    if (nodeLeft.current) {
      nodeLeft.current.position.y = 0.9 + Math.sin(time * 0.9) * 0.08;
    }

    if (nodeRight.current) {
      nodeRight.current.position.y = -0.7 + Math.cos(time * 0.8) * 0.08;
    }
  });

  return (
    <group>
      <pointLight ref={primaryLight} position={[1.8, 1.9, 3]} intensity={9} color="#67e8f9" />
      <pointLight ref={secondaryLight} position={[-3, -2, 2]} intensity={3.5} color="#155e75" />
      <mesh ref={orb} position={[-4.8, 1.55, -4]}>
        <sphereGeometry args={[0.24, 24, 24]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.1} />
      </mesh>
      <mesh ref={nodeLeft} position={[-1.9, 0.95, -2.5]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.32} />
      </mesh>
      <mesh ref={nodeRight} position={[2.6, -0.7, -2.2]}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial color="#a5f3fc" transparent opacity={0.28} />
      </mesh>
      <gridHelper args={[24, 24, "#164e63", "#0f172a"]} position={[0, -2.6, -4]} />
    </group>
  );
}

function CameraRig() {
  const { camera, pointer } = useThree();

  useFrame(() => {
    camera.position.x += (pointer.x * 0.5 - camera.position.x) * 0.03;
    camera.position.y += (pointer.y * 0.35 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 7, 20]} />

      <ambientLight intensity={0.42} />
      <CameraRig />
      <AmbientMotion />
      <Sparkles count={52} scale={[13, 7, 11]} size={1} speed={0.2} opacity={0.14} color="#67e8f9" />
      <Grid
        position={[0, -2.4, -4]}
        args={[24, 24]}
        cellSize={1}
        sectionSize={3}
        cellColor="#0b2c38"
        sectionColor="#071018"
        cellThickness={0.45}
        sectionThickness={0.8}
        fadeDistance={10}
        fadeStrength={1}
        infiniteGrid
      />

      <Sphere />
    </Canvas>
  );
}