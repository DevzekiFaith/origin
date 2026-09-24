"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface LiquidGlassOrbProps {
  interactive?: boolean;
  scale?: number;
  color?: string;
  coreColor?: string;
  wireframeCore?: boolean;
}

export function LiquidGlassOrb({
  scale = 1.3,
  color = "#E2E8DE",
  coreColor = "#FBBF24",
  wireframeCore = true,
}: LiquidGlassOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const innerCoreRef = useRef<THREE.Mesh>(null!);
  const dropletsRef = useRef<THREE.Group>(null!);
  const lightRef = useRef<THREE.PointLight>(null!);

  const { pointer } = useThree();

  // Create base sphere geometry and save original vertex positions for fluid wave distortion
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1.2, 64, 64);
    // Clone original position attribute for procedural wave math
    geo.userData = { origPos: geo.attributes.position.clone() };
    return geo;
  }, []);

  // Procedural satellite droplets data
  const droplets = useMemo(() => {
    return [
      { pos: [1.8, 0.8, -0.4], size: 0.18, speed: 0.8, phase: 0 },
      { pos: [-1.9, -0.6, 0.3], size: 0.22, speed: 1.1, phase: 1.5 },
      { pos: [0.9, -1.6, -0.6], size: 0.14, speed: 0.9, phase: 3.1 },
      { pos: [-1.1, 1.5, -0.3], size: 0.16, speed: 0.7, phase: 4.2 },
      { pos: [0.2, 1.9, 0.5], size: 0.12, speed: 1.3, phase: 2.1 },
    ];
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. Fluid undulating wave displacement on vertices
    if (meshRef.current && meshRef.current.geometry) {
      const geo = meshRef.current.geometry;
      const pos = geo.attributes.position;
      const origPos = geo.userData.origPos;

      if (pos && origPos) {
        for (let i = 0; i < pos.count; i++) {
          const ox = origPos.getX(i);
          const oy = origPos.getY(i);
          const oz = origPos.getZ(i);

          // Harmonic wave formula for natural fluid liquid glass ripples
          const wave =
            Math.sin(ox * 2.5 + time * 1.5) * 0.045 +
            Math.cos(oy * 2.2 + time * 1.8) * 0.045 +
            Math.sin(oz * 3.0 + time * 1.2) * 0.035;

          const factor = 1 + wave;
          pos.setXYZ(i, ox * factor, oy * factor, oz * factor);
        }
        pos.needsUpdate = true;
        geo.computeVertexNormals();
      }

      // Smooth mouse follow with spring lerp
      const targetRotX = pointer.y * 0.45;
      const targetRotY = pointer.x * 0.65;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.05);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY + time * 0.15, 0.05);

      // Subtle breathing float
      meshRef.current.position.y = Math.sin(time * 1.2) * 0.08;
    }

    // 2. Inner thinking core rotation
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x -= delta * 0.4;
      innerCoreRef.current.rotation.y += delta * 0.5;
      innerCoreRef.current.rotation.z += delta * 0.2;
    }

    // 3. Orbiting satellite droplets
    if (dropletsRef.current) {
      dropletsRef.current.children.forEach((child, i) => {
        const d = droplets[i];
        if (d) {
          const orbitTime = time * d.speed + d.phase;
          child.position.x = Math.cos(orbitTime) * 1.8;
          child.position.z = Math.sin(orbitTime) * 1.5;
          child.position.y = d.pos[1] + Math.sin(orbitTime * 1.5) * 0.25;
        }
      });
    }

    // 4. Subtle pulsating internal light
    if (lightRef.current) {
      lightRef.current.intensity = 1.8 + Math.sin(time * 2.5) * 0.6;
    }
  });

  return (
    <group scale={scale}>
      {/* Central Luminous Point Light inside the Glass Orb */}
      <pointLight ref={lightRef} color={coreColor} intensity={2.2} distance={5} decay={2} />

      {/* Main Outer Liquid Glass Orb */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhysicalMaterial
          transmission={0.96}
          roughness={0.07}
          ior={1.48}
          thickness={2.4}
          specularIntensity={1.4}
          specularColor={new THREE.Color("#FFFFFF")}
          clearcoat={1.0}
          clearcoatRoughness={0.04}
          color={color}
          attenuationColor="#22C55E"
          attenuationDistance={2.0}
          transparent
          opacity={1.0}
        />
      </mesh>

      {/* Inner Glowing Thinking Core */}
      <mesh ref={innerCoreRef} scale={0.48}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={coreColor}
          emissive={coreColor}
          emissiveIntensity={0.6}
          wireframe={wireframeCore}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Secondary Inner Floating Ring */}
      <mesh scale={0.72} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#FFFFFF"
          emissiveIntensity={0.4}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Orbiting Satellite Liquid Droplets */}
      <group ref={dropletsRef}>
        {droplets.map((d, idx) => (
          <mesh key={idx} position={d.pos as [number, number, number]} scale={d.size}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhysicalMaterial
              transmission={0.94}
              roughness={0.06}
              ior={1.45}
              thickness={1.5}
              color="#FFFFFF"
              specularIntensity={1.5}
              clearcoat={1.0}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
