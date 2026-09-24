"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { LiquidGlassOrb } from "./LiquidGlassOrb";
import { Sparkles, Eye, RotateCw, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LiquidGlassHeroProps {
  sanctuaryImage?: string;
}

export default function LiquidGlassHero({
  sanctuaryImage = "/origin_3d_hero_sanctuary.jpg",
}: LiquidGlassHeroProps) {
  const [mounted, setMounted] = useState(false);
  const [activeMode, setActiveMode] = useState<"hybrid" | "glass" | "sanctuary">("hybrid");
  const [glassColor, setGlassColor] = useState<"pure" | "emerald" | "amber">("pure");

  useEffect(() => {
    setMounted(true);
  }, []);

  const colorConfig = {
    pure: { glass: "#FFFFFF", core: "#FDE68A" },
    emerald: { glass: "#E2E8DE", core: "#34D399" },
    amber: { glass: "#FEF3C7", core: "#F59E0B" },
  };

  return (
    <div className="relative w-full max-w-lg lg:max-w-xl aspect-[16/11] rounded-[2.5rem] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)] border border-white/30 group liquid-glass select-none">
      
      {/* Background Layer: Sanctuary Architectural Sanctuary */}
      <AnimatePresence>
        {(activeMode === "hybrid" || activeMode === "sanctuary") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: activeMode === "hybrid" ? 0.85 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image
              src={sanctuaryImage}
              alt="Origin Sanctuary Architecture"
              fill
              priority
              className="object-cover object-center transform group-hover:scale-105 transition-transform duration-1000"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {activeMode === "hybrid" && (
              <div className="absolute inset-0 bg-gradient-to-t from-[#172217]/85 via-[#1C3B34]/35 to-transparent backdrop-blur-[2px]" />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Liquid Glass Canvas Layer */}
      {(activeMode === "hybrid" || activeMode === "glass") && (
        <div className="absolute inset-0 z-10">
          {mounted ? (
            <Canvas
              camera={{ position: [0, 0, 4.6], fov: 45 }}
              dpr={[1, 1.8]}
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            >
              <ambientLight intensity={0.9} color="#E2E8DE" />
              <directionalLight position={[6, 8, 4]} intensity={2.0} color="#FEF3C7" />
              <directionalLight position={[-6, -4, -3]} intensity={1.5} color="#22C55E" />
              <directionalLight position={[0, -5, 3]} intensity={0.8} color="#FFFFFF" />
              <Suspense fallback={null}>
                <LiquidGlassOrb
                  scale={activeMode === "glass" ? 1.45 : 1.25}
                  color={colorConfig[glassColor].glass}
                  coreColor={colorConfig[glassColor].core}
                  wireframeCore={true}
                />
              </Suspense>
            </Canvas>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-black/10 backdrop-blur-md">
              <div className="w-8 h-8 rounded-full border-2 border-white/40 border-t-white animate-spin" />
            </div>
          )}
        </div>
      )}

      {/* Top Floating Glass Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="px-3 py-1 rounded-full bg-black/35 backdrop-blur-xl border border-white/25 flex items-center gap-1.5 shadow-lg">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9.5px] font-mono uppercase tracking-wider text-white font-bold">
            LIQUID GLASS · 3D REFRACTION
          </span>
        </div>
      </div>

      {/* Top Right View Mode Switcher */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-black/40 backdrop-blur-xl p-1 rounded-2xl border border-white/20 shadow-lg">
        <button
          type="button"
          onClick={() => setActiveMode("hybrid")}
          className={`px-2.5 py-1 rounded-xl text-[9px] font-mono font-bold uppercase transition-all ${
            activeMode === "hybrid"
              ? "bg-white text-[#1C3B34] shadow-sm"
              : "text-white/70 hover:text-white"
          }`}
          title="Overlay 3D Liquid Glass with Architecture"
        >
          HYBRID
        </button>
        <button
          type="button"
          onClick={() => setActiveMode("glass")}
          className={`px-2.5 py-1 rounded-xl text-[9px] font-mono font-bold uppercase transition-all ${
            activeMode === "glass"
              ? "bg-white text-[#1C3B34] shadow-sm"
              : "text-white/70 hover:text-white"
          }`}
          title="Pure 3D Liquid Glass View"
        >
          GLASS
        </button>
        <button
          type="button"
          onClick={() => setActiveMode("sanctuary")}
          className={`px-2.5 py-1 rounded-xl text-[9px] font-mono font-bold uppercase transition-all ${
            activeMode === "sanctuary"
              ? "bg-white text-[#1C3B34] shadow-sm"
              : "text-white/70 hover:text-white"
          }`}
          title="Sanctuary Architecture"
        >
          SANCTUARY
        </button>
      </div>

      {/* Bottom Floating Interactive Toolbar */}
      <div className="absolute bottom-4 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
        {/* Pointer hint */}
        <div className="px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-xl border border-white/20 text-[9.5px] font-mono text-white/80 flex items-center gap-1.5 shadow-md">
          <RotateCw className="w-3 h-3 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Move cursor to ripple glass</span>
        </div>

        {/* Color Palette Tint Switcher */}
        {activeMode !== "sanctuary" && (
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xl p-1.5 rounded-2xl border border-white/20 pointer-events-auto shadow-md">
            {(["pure", "emerald", "amber"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setGlassColor(t)}
                className={`w-4 h-4 rounded-full transition-transform border ${
                  glassColor === t ? "scale-125 border-white shadow-sm" : "border-white/30 opacity-70 hover:opacity-100"
                } ${
                  t === "pure" ? "bg-white" : t === "emerald" ? "bg-emerald-400" : "bg-amber-400"
                }`}
                title={`Set ${t} glass tone`}
                aria-label={`Set ${t} glass tone`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Subtle Specular Top Reflection Edge */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
    </div>
  );
}
