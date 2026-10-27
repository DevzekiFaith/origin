"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { learningTracks } from "../data/learningTracks";
import { BookOpen, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";

export default function TracksContent() {
  const searchParams = useSearchParams();
  const trackId = searchParams.get("track");

  // Get track details
  const track = trackId ? learningTracks.find((t) => t.id === trackId) : null;

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="container mx-auto px-4 sm:px-8 py-12">
        {!track ? (
          // Show all learning tracks
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-black mb-2">4 Elite Learning Tracks</h1>
              <p className="text-sm text-[#b3b3b3]">
                Mapped to Eton &amp; Harrow&apos;s world-class curriculum
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {learningTracks.filter(track => ['leadership', 'character-values', 'classical-thinking', 'university-prep'].includes(track.id)).map((t) => (
                <Link
                  key={t.id}
                  href={`/tracks?track=${t.id}`}
                  className="group p-6 rounded-xl border border-[#282828] hover:border-[#60a5fa]/30 transition-all duration-300 bg-[#181818] hover:bg-[#1e1e1e]"
                >
                  <div className="text-4xl mb-4">{t.emoji}</div>
                  <h3 className="font-bold text-white text-lg mb-2">{t.title}</h3>
                  <p className="text-xs text-[#b3b3b3] mb-4 line-clamp-2">{t.tagline}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold rounded-full px-2 py-1 bg-[#282828] text-[#60a5fa]">
                      {t.curriculum?.length || 0} experiences
                    </span>
                    <span className="text-xs text-[#b3b3b3]">{t.ageRange}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#282828]">
                    <div>
                      <p className="text-lg font-bold text-white">${t.priceUSD}</p>
                      <p className="text-xs text-[#b3b3b3]">₦{t.priceNGN?.toLocaleString()}</p>
                    </div>
                    <span className="text-xs text-[#60a5fa] font-bold">View Track</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          // Show specific track curriculum
          <div>
            <Link
              href="/tracks"
              className="inline-flex items-center gap-2 text-sm text-[#60a5fa] hover:underline mb-6"
            >
              <ArrowLeft size={16} /> Back to all tracks
            </Link>
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-6xl">{track.emoji}</div>
                <div>
                  <h1 className="text-4xl font-black mb-2">{track.title}</h1>
                  <p className="text-sm text-[#b3b3b3]">{track.tagline}</p>
                </div>
              </div>
              <p className="text-base text-[#b3b3b3] mb-6 max-w-3xl">
                {track.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-[#b3b3b3] mb-6">
                <span className="bg-[#282828] px-3 py-1 rounded-full">{track.ageRange}</span>
                <span>{track.subjects.length} subjects</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 p-4 bg-[#60a5fa]/10 rounded-xl border border-[#60a5fa]/20">
                <div>
                  <p className="text-xs text-[#b3b3b3] mb-1">One-time Purchase</p>
                  <p className="text-2xl font-bold text-[#60a5fa]">${track.priceUSD}</p>
                  <p className="text-sm text-[#b3b3b3]">₦{track.priceNGN?.toLocaleString()}</p>
                </div>
                <div className="flex-1 sm:text-right">
                  <p className="text-xs text-[#b3b3b3] mb-1">{track.curriculum?.length || 0} Experiences</p>
                  <p className="text-sm text-white font-bold mb-3">Complete Roadmap</p>
                  <Link 
                    href="/store" 
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#60a5fa] hover:bg-[#3b82f6] text-black font-extrabold text-sm rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-[#60a5fa]/20"
                  >
                    <BookOpen size={16} /> Explore Store &amp; Companions
                  </Link>
                </div>
              </div>
            </div>

            {track.id === "leadership" && (
              <div className="mb-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1C3B34] via-[#162E29] to-[#0F1E1B] border border-emerald-500/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
                <div className="space-y-2 max-w-xl relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-mono text-[11px] font-bold uppercase tracking-wider">
                    <span>✦ FLAGSHIP LEADERSHIP ARCHITECTURE</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                    Success Multiplier Program
                  </h3>
                  <p className="text-sm text-emerald-100/90 font-light leading-relaxed">
                    Master psychological safety, the trust equation, and collaborative leadership. Transform team friction into high-velocity collective momentum.
                  </p>
                  <p className="text-xs font-mono text-emerald-300/80">
                    5-Hour Live Masterclass &amp; Simulation • Virtual HD Stream &amp; Executive Studio Access
                  </p>
                </div>
                <Link
                  href="/events?event=22"
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-[#1C3B34] font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg hover:scale-105 shrink-0 cursor-pointer relative z-10"
                >
                  <span>Explore Success Multiplier</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            )}

            <div className="mb-8">
              <h2 className="text-2xl font-black mb-6">Curriculum</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {track.curriculum?.map((module, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-[#282828] bg-[#181818] flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#60a5fa]/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={16} className="text-[#60a5fa]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{module}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-black mb-6">Subjects Covered</h2>
              <div className="flex flex-wrap gap-2">
                {track.subjects.map((subject, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 rounded-full bg-[#282828] text-sm text-[#b3b3b3] border border-[#3a3a3a]"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl border border-[#D4AF37]/30 bg-[#1a1a1a]">
              <div className="flex items-start gap-3">
                <BookOpen className="text-[#D4AF37] w-5 h-5 mt-1" />
                <div>
                  <h3 className="text-sm font-bold text-[#D4AF37] mb-2">
                    Elite School Connection
                  </h3>
                  <p className="text-xs text-[#b3b3b3]">{track.etonHarrowLink}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
