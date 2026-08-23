import Link from "next/link";
import Image from "next/image";

export default function SimplifiedFooter() {
  return (
    <footer className="bg-gradient-to-b from-[#7F897F] via-[#747E74] to-[#636C63] border-t border-white/15 py-16 px-4 text-white relative overflow-hidden selection:bg-white selection:text-[#8A948B]">
      {/* Subtle radial dot grid pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:36px_36px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-1 space-y-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 128 128"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shadow-sm"
                >
                  <rect width="128" height="128" rx="30" fill="#22C55E" />
                  <circle
                    cx="64"
                    cy="64"
                    r="34"
                    stroke="#FFFFFF"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-white leading-none tracking-tight">ORIGIN</span>
                <span className="text-[9px] text-amber-300 font-mono tracking-widest uppercase mt-0.5 font-bold">Thinking Platform</span>
              </div>
            </div>
            <p className="text-white/80 text-xs leading-relaxed font-light">
              Practical education for becoming. Build the person behind the success. Powered by <strong className="text-white font-semibold">The Becoming Institute</strong>.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-xs font-mono uppercase tracking-wider font-bold mb-4">Navigation</h3>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#origin-challenge" className="text-white/80 hover:text-white transition-colors">
                  The ₦20,000 Challenge
                </Link>
              </li>
              <li>
                <Link href="/#origin-curriculum" className="text-white/80 hover:text-white transition-colors">
                  Foundations
                </Link>
              </li>
              <li>
                <Link href="/#origin-challenges" className="text-white/80 hover:text-white transition-colors">
                  Challenges Arena
                </Link>
              </li>
              <li>
                <Link href="/#learning-companions" className="text-white/80 hover:text-white transition-colors">
                  Learning Companions
                </Link>
              </li>
              <li>
                <Link href="/#start-here" className="text-white/80 hover:text-white transition-colors">
                  Start Here Pathfinder
                </Link>
              </li>
              <li>
                <Link href="/#for-audiences" className="text-white/80 hover:text-white transition-colors">
                  Audience Pathways
                </Link>
              </li>
              <li>
                <Link href="/#origin-standard" className="text-white/80 hover:text-white transition-colors">
                  The Origin Standard
                </Link>
              </li>
              <li>
                <Link href="/planner" className="text-white/80 hover:text-white transition-colors">
                  Life Planner
                </Link>
              </li>
              <li>
                <Link href="/store" className="text-white/80 hover:text-white transition-colors">
                  Store & Companions
                </Link>
              </li>
            </ul>
          </div>

          {/* Foundations */}
          <div>
            <h3 className="text-white text-xs font-mono uppercase tracking-wider font-bold mb-4">Origin Foundations</h3>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <Link href="/courses/economic-principles" className="text-amber-300 hover:text-amber-200 transition-colors font-bold">
                  ★ Economic Principles (Flagship)
                </Link>
              </li>
              <li>
                <Link href="/courses/decision-making" className="text-white/80 hover:text-white transition-colors">
                  Decision Making
                </Link>
              </li>
              <li>
                <Link href="/courses/problem-solving" className="text-white/80 hover:text-white transition-colors">
                  Problem Solving
                </Link>
              </li>
              <li>
                <Link href="/courses/communication" className="text-white/80 hover:text-white transition-colors">
                  Communication Mastery
                </Link>
              </li>
              <li>
                <Link href="/courses/self-image" className="text-white/80 hover:text-white transition-colors">
                  Strengthening Self-Image
                </Link>
              </li>
              <li>
                <Link href="/courses/personal-adaptability" className="text-white/80 hover:text-white transition-colors">
                  Personal Adaptability
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h3 className="text-white text-xs font-mono uppercase tracking-wider font-bold mb-4">Trust & Policies</h3>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <Link href="/privacy" className="text-white/80 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/80 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-white/80 hover:text-white transition-colors">
                  Refund & Payment Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
                  Support & Inquiries
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/15 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/70 font-mono gap-4">
          <p>© {new Date().getFullYear()} Origin by The Becoming Institute. All rights reserved.</p>
          <p>School starts with the answer. Origin starts with the question.</p>
        </div>
      </div>
    </footer>
  );
}
