"use client";

import AnimatedSection from "../components/ui/AnimatedSection";
import Link from "next/link";
import { BookOpen, Zap, RotateCcw, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0f1724] text-white pb-24">
      {/* Top Gradient */}
      <div className="relative pt-24 pb-8 px-6 sm:px-10 bg-gradient-to-b from-[#0b1220] to-[#0f1724]">
        <div className="flex flex-col md:flex-row items-end gap-6 max-w-7xl mx-auto relative z-10">
          <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-none bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] shadow-2xl flex items-center justify-center flex-shrink-0 border border-white/5">
            <BookOpen size={80} strokeWidth={1.5} className="text-white" />
          </div>
          <div className="flex-1 pb-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-bold tracking-wider uppercase text-[#60a5fa]">Our Story</span>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black mb-6 tracking-tighter truncate">
              About Origin
            </h1>
            <div className="flex items-center gap-4 text-sm font-medium text-[#9aa4b2]">
              <span>Formation Platform</span>
              <span className="w-1 h-1 rounded-full bg-gray-500"></span>
              <span>10,000+ Learners</span>
              <span className="w-1 h-1 rounded-full bg-gray-500"></span>
              <span>Since 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 sm:px-10 py-6 max-w-7xl mx-auto flex items-center gap-6 border-b border-[#282828]">
        <Link href="/#courses">
          <button className="w-14 h-14 rounded-full bg-[#60a5fa] flex items-center justify-center text-black hover:scale-105 transition-transform shadow-lg">
            <svg className="w-7 h-7 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z" /></svg>
          </button>
        </Link>
        <button className="p-2 text-gray-400 hover:text-white transition-colors">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
        <button className="p-2 text-gray-400 hover:text-white transition-colors">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </button>
      </div>

      {/* About Content */}
      <section className="px-6 sm:px-10 py-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <AnimatedSection>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-[#9aa4b2] text-lg leading-relaxed">
                   We empower individuals aged 10 to 45 with practical life and professional skills. Origin is a formation platform — rooted in the idea that growth is intentional, staged, and always pointing higher. No fluff. No theory for theory&apos;s sake. Just structured formation that works.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">What We Do</h2>
                 <p className="text-[#9aa4b2] text-lg leading-relaxed mb-6">
                   Origin offers structured courses in capital development, persuasion, decision-making, teamwork, and more. Each program follows our formation method:
                </p>
                <ul className="space-y-4">
                  {[
                    { label: "Learn", icon: <BookOpen className="w-5 h-5 text-[#60a5fa]" />, desc: "Deep dive into core formation content" },
                    { label: "Practice", icon: <Zap className="w-5 h-5 text-[#60a5fa]" />, desc: "Active exercises to build muscle memory" },
                    { label: "Reflect", icon: <RotateCcw className="w-5 h-5 text-[#60a5fa]" />, desc: "Internalize lessons through guided reflection" },
                    { label: "Apply", icon: <Target className="w-5 h-5 text-[#60a5fa]" />, desc: "Real-world application in your daily life" },
                  ].map((stage, i) => (
                    <li key={i} className="flex items-center gap-4 group bg-[#0b1220] p-4 rounded-md hover:bg-[#0f1724] transition-colors">
                      <div className="w-10 h-10 rounded-full bg-[#60a5fa]/10 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
                        {stage.icon}
                      </div>
                      <p className="text-[#9aa4b2]"><strong className="text-white">{stage.label}</strong> - {stage.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Who We Serve</h2>
                <p className="text-[#b3b3b3] text-lg leading-relaxed">
                  Whether you’re a student finding your feet, a professional leveling up, or someone stubbornly committed to growth — Origin was built for you. Our age-inclusive formation means everyone, everywhere, can grow.
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Sidebar: The Origin Learning Architecture */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white mb-4">The Origin Standard</h2>
            <div className="bg-[#181818] p-6 rounded-2xl border border-[#282828] space-y-6">
              <div>
                <div className="text-amber-400 text-xs font-mono uppercase tracking-wider mb-1 font-bold">METHODOLOGY</div>
                <div className="text-lg font-bold text-white">Think → Choose → Discover → Apply</div>
                <p className="text-xs text-[#9aa4b2] mt-1">Every module begins with an inquiry before revealing principles.</p>
              </div>
              <div className="border-t border-[#282828] pt-4">
                <div className="text-amber-400 text-xs font-mono uppercase tracking-wider mb-1 font-bold">ACCESS MODEL</div>
                <div className="text-lg font-bold text-white">Lifetime Unrestricted</div>
                <p className="text-xs text-[#9aa4b2] mt-1">One-time enrollment with permanent access to future updates.</p>
              </div>
              <div className="border-t border-[#282828] pt-4">
                <div className="text-amber-400 text-xs font-mono uppercase tracking-wider mb-1 font-bold">FORMAT</div>
                <div className="text-lg font-bold text-white">Interactive Missions & Reading Companions</div>
                <p className="text-xs text-[#9aa4b2] mt-1">Practical decision scenarios and downloadable companion workbooks.</p>
              </div>
            </div>
            
            <div className="bg-[#181818] p-6 rounded-2xl border border-[#282828] text-center space-y-3">
               <h3 className="text-white font-bold">Ready to think differently?</h3>
               <p className="text-[#9aa4b2] text-xs leading-relaxed">Experience our inquiry-first learning architecture today.</p>
               <Link href="/#origin-curriculum" className="block w-full py-3 bg-amber-400 text-zinc-950 rounded-xl font-bold text-xs font-mono hover:bg-amber-300 transition-colors shadow-sm">
                 Explore Curriculum
               </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

