"use client";

import React, { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function AmbientLiquidOrbs() {
  const groupRef = useRef<THREE.Group>(null!);

  const orbs = useMemo(() => [
    { pos: [-3, 1.5, -2], size: 0.85, speed: 0.25, color: "#E2E8DE" },
    { pos: [3.5, -1, -3], size: 1.1, speed: 0.18, color: "#FFFFFF" },
    { pos: [-2, -2, -2.5], size: 0.65, speed: 0.32, color: "#FEF3C7" },
    { pos: [2.2, 2.2, -3.5], size: 0.95, speed: 0.2, color: "#A7F3D0" },
    { pos: [0, -2.5, -1.8], size: 0.5, speed: 0.35, color: "#E2E8DE" },
  ], []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const orb = orbs[i];
        if (orb) {
          child.position.y = orb.pos[1] + Math.sin(time * orb.speed + i) * 0.45;
          child.position.x = orb.pos[0] + Math.cos(time * orb.speed * 0.8 + i) * 0.35;
          child.rotation.x = time * 0.1;
          child.rotation.y = time * 0.15;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.pos as [number, number, number]} scale={orb.size}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshStandardMaterial
            color={orb.color}
            roughness={0.15}
            metalness={0.1}
            transparent
            opacity={0.35}
          />
        </mesh>
      ))}
    </group>
  );
}

interface LiquidGlassBackgroundProps {
  intensity?: "subtle" | "medium" | "vibrant";
  className?: string;
}

export default function LiquidGlassBackground({
  intensity = "subtle",
  className = "absolute inset-0 pointer-events-none overflow-hidden",
}: LiquidGlassBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const opacityClass =
    intensity === "subtle" ? "opacity-35" : intensity === "medium" ? "opacity-55" : "opacity-80";

  return (
    <div className={`${className} ${opacityClass}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={1}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 4]} intensity={1.5} color="#FEF3C7" />
        <directionalLight position={[-5, -4, -2]} intensity={1.2} color="#22C55E" />
        <Suspense fallback={null}>
          <AmbientLiquidOrbs />
        </Suspense>
      </Canvas>
    </div>
  );
}
