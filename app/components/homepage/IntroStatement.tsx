"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function IntroStatement() {
  return (
    <section className="py-24 sm:py-32 bg-[#FAFAF8] text-[#121316] border-b border-[#E8E8E3] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3F3EE] border border-[#E2E2DC] text-xs font-mono text-[#52525B]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            <span className="uppercase tracking-wider font-semibold">The Origin Thesis</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#121316] leading-[1.12]">
            UNDERSTAND MORE.
            <br />
            <span className="text-amber-700">THINK BETTER.</span>
            <br />
            BECOME MORE CAPABLE.
          </h2>

          <p className="text-lg sm:text-xl text-[#52525B] font-normal leading-relaxed max-w-2xl mx-auto pt-2">
            Most education begins by handing you predetermined answers. Origin begins with the question—teaching you how to deconstruct problems, recognize invisible trade-offs, and make high-conviction decisions in the real world.
          </p>

          <div className="pt-4 flex items-center justify-center gap-4">
            <Link
              href="/courses/economic-principles"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#121316] hover:text-amber-700 border-b-2 border-[#121316] hover:border-amber-700 pb-1 transition-all"
            >
              <span>See how practical learning works</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
