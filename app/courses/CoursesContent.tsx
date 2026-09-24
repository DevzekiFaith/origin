"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Zap,
  Target,
  Users,
  TrendingUp,
  Heart,
  MessageSquare,
  ArrowRight,
  BookOpen,
  Award,
  Clock,
  Star,
  Plus,
  Compass,
  Sparkles,
  Layers,
  Coins
} from "lucide-react";
import { simplifiedCourses } from "../data/simplified-courses";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";
import { getCompanionProductForCourse } from "../data/course-ebook-mapping";
import { motion } from "framer-motion";

export default function CoursesContent() {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<"foundations" | "archive" | "all">("foundations");
  const [activeMobileCard, setActiveMobileCard] = useState<string | null>(null);

  const iconMap: Record<string, React.ElementType> = {
    "economic-principles": Coins,
    "problem-solving": Zap,
    "decision-making": Target,
    "team-person": Users,
    "personal-adaptability": TrendingUp,
    "self-image": Heart,
    "communication": MessageSquare,
  };

  const displayedCourses = simplifiedCourses.filter((course) => {
    if (activeTab === "foundations") return !course.isArchive;
    if (activeTab === "archive") return course.isArchive;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#949E94] via-[#8A948B] to-[#7F897F] text-white pt-28 sm:pt-36 pb-20 px-4 relative overflow-hidden selection:bg-white selection:text-[#8A948B]">
      {/* Ambient Radial & Orb Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/3 w-[650px] h-[650px] bg-white/15 blur-[180px] rounded-full"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-mono text-white mb-4 shadow-sm font-bold">
            <Compass className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span className="uppercase tracking-wider">ORIGIN FOUNDATIONS &amp; THINKING EXPERIENCES</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-white mb-4 tracking-tight leading-tight">
            Thinking Foundations
          </h1>

          <p className="text-white/85 text-base sm:text-lg font-light leading-relaxed">
            Six universal foundations designed to transform how you think, decide, communicate, and succeed.
            Experience-led mental models built for real-world impact.
          </p>

          {/* Navigation Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab("foundations")}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "foundations"
                  ? "bg-[#E2E8DE] text-[#1C3B34] shadow-lg scale-105"
                  : "bg-white/15 text-white hover:bg-white/25 border border-white/20 backdrop-blur-md"
              }`}
            >
              Core Foundations (6)
            </button>
            <button
              onClick={() => setActiveTab("archive")}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "archive"
                  ? "bg-[#E2E8DE] text-[#1C3B34] shadow-lg scale-105"
                  : "bg-white/15 text-white hover:bg-white/25 border border-white/20 backdrop-blur-md"
              }`}
            >
              Archive &amp; Extended Library (1)
            </button>
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "all"
                  ? "bg-[#E2E8DE] text-[#1C3B34] shadow-lg scale-105"
                  : "bg-white/15 text-white hover:bg-white/25 border border-white/20 backdrop-blur-md"
              }`}
            >
              All Experiences (7)
            </button>
          </div>
        </div>

        {/* Microsoft Store-Inspired Discovery Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCourses.map((course) => {
            const Icon = iconMap[course.id] || Sparkles;
            const ebook = getCompanionProductForCourse(course.id);
            const isMobileActive = activeMobileCard === course.id;

            return (
              <div
                key={course.id}
                onClick={() => setActiveMobileCard(isMobileActive ? null : course.id)}
                className={`group bg-[#E2E8DE] text-[#172217] rounded-3xl overflow-hidden hover:bg-white transition-all duration-300 border border-[#D5DDCF] hover:border-[#CCD6C6] hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer ${
                  isMobileActive ? "bg-white shadow-2xl -translate-y-1.5 ring-1 ring-[#1C3B34]/30" : ""
                }`}
              >
                <div>
                  {/* Thumbnail / Visual Header */}
                  <div className="relative h-52 overflow-hidden bg-[#141414]">
                    {course.imageUrl ? (
                      <Image
                        src={course.imageUrl}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
                        <div className={`absolute inset-0 bg-gradient-to-br ${course.bgGradient} opacity-20`} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icon className="text-white w-20 h-20 opacity-80" />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="text-[10px] font-mono font-black uppercase tracking-wider px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-white/20">
                        {course.level}
                      </span>
                      <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-mono font-bold border border-white/20">
                        <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                        <span>{course.rating}</span>
                      </div>
                    </div>

                    {/* Bottom Experience Count Overlay */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-mono font-semibold">
                      <span className="px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-md border border-white/20">
                        {course.duration}
                      </span>
                      <span className="text-zinc-300 text-[11px]">
                        {course.studentCount.toLocaleString()} thinkers
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 pb-2 space-y-3">
                    <h3 className="text-xl font-bold text-[#172217] group-hover:text-[#1C3B34] transition-colors leading-tight">
                      {course.title}
                    </h3>

                    {/* Progressively Revealed Short Description (Microsoft Store Hover Action) */}
                    <div className="transition-all duration-300">
                      <p
                        className={`text-[#4E5B4B] text-xs sm:text-sm leading-relaxed transition-all duration-300 ${
                          isMobileActive
                            ? "max-h-28 opacity-100"
                            : "line-clamp-2 opacity-85 group-hover:opacity-100 group-hover:line-clamp-none"
                        }`}
                      >
                        {course.description}
                      </p>
                    </div>

                    {/* Experiential Highlights Checklist */}
                    <div className="pt-2 border-t border-[#D5DDCF] space-y-1 text-xs text-[#3E4A3B]">
                      {course.outcomes.slice(0, 2).map((outcome, oIdx) => (
                        <div key={oIdx} className="flex items-start gap-2">
                          <span className="text-amber-700 font-mono font-bold">•</span>
                          <span className="line-clamp-1">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Row: Clear EXPLORE EXPERIENCE -> button */}
                <div className="p-6 pt-3 mt-auto">
                  <div className="flex items-center justify-between pt-4 border-t border-[#D0D9CA] mb-3">
                    <div>
                      <div className="text-[#172217] text-xs font-bold font-mono">{course.instructor}</div>
                      <div className="text-[#4E5B4B] text-[10px] font-mono">{course.instructorTitle}</div>
                    </div>

                    <Link
                      href={`/courses/${course.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1C3B34] hover:bg-[#122420] text-white text-xs font-mono font-bold tracking-wide transition-all shadow-md group-hover:shadow-lg group-hover:translate-x-0.5 shrink-0"
                    >
                      <span>EXPLORE EXPERIENCE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Store eBook companion cross-sell preserved cleanly */}
                  {ebook && (
                    <div className="bg-white text-zinc-950 p-3 rounded-2xl border border-[#CCD6C6] mt-3 flex items-center gap-3 relative shadow-xs">
                      <Link
                        href={`/store/${ebook.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="block relative w-10 h-14 bg-white border border-zinc-200 rounded-lg shadow-sm overflow-hidden flex-shrink-0"
                      >
                        {ebook.imageUrl ? (
                          <Image
                            src={ebook.imageUrl}
                            alt={ebook.name}
                            fill
                            className="object-cover p-0.5"
                            sizes="40px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-zinc-100">
                            <BookOpen className="w-5 h-5 text-zinc-400" />
                          </div>
                        )}
                      </Link>

                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5 h-14">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-black text-[#1C3B34] uppercase tracking-wider">
                            {ebook.badgeText}
                          </span>
                          <div className="flex items-center gap-0.5 text-yellow-600 text-[10px] font-bold">
                            <Star className="w-2.5 h-2.5 fill-yellow-500 text-yellow-500 stroke-none" />
                            <span>{ebook.rating}</span>
                          </div>
                        </div>
                        <h4 className="text-xs font-extrabold text-zinc-900 truncate leading-none mt-0.5">
                          {ebook.name}
                        </h4>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs font-black text-zinc-700">
                            {ebook.price > 0 ? `$${ebook.price}` : "FREE"}
                          </span>
                          <div className="flex items-center gap-2.5">
                            <Link
                              href={`/store/${ebook.id}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-[10px] font-extrabold uppercase text-zinc-500 hover:text-zinc-900 transition-colors"
                            >
                              View
                            </Link>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addToCart({
                                  id: `store-${ebook.id}`,
                                  title: ebook.name,
                                  description: ebook.description,
                                  fullDescription: ebook.description,
                                  priceUSD: ebook.price,
                                  imageUrl: ebook.imageUrl,
                                  bgGradient: ebook.gradient,
                                  icon: ebook.icon,
                                  iconColor: "text-[#1C3B34]",
                                  ageRange: "All Ages",
                                });
                                showToast(`${ebook.name} added to cart!`, "success");
                              }}
                              className="bg-[#1C3B34] hover:bg-[#122420] text-white p-1 rounded-full transition-colors flex-shrink-0 flex items-center justify-center cursor-pointer shadow-xs"
                              title="Add to Cart"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
