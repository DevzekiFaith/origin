import Link from "next/link";
import Image from "next/image";

export default function SimplifiedFooter() {
  return (
    <footer className="bg-[#090a0d] border-t border-zinc-900 py-16 px-4 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <Image
                  src="/origin.png"
                  alt="Origin Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-zinc-100 leading-none tracking-tight">ORIGIN</span>
                <span className="text-[9px] text-amber-400 font-mono tracking-widest uppercase mt-0.5">Thinking Platform</span>
              </div>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Practical education for becoming. Build the person behind the success. Powered by <strong>The Becoming Institute</strong>.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-zinc-100 text-xs font-mono uppercase tracking-wider font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#origin-curriculum" className="text-zinc-400 hover:text-white transition-colors">
                  Curriculum
                </Link>
              </li>
              <li>
                <Link href="/#question-discovery" className="text-zinc-400 hover:text-white transition-colors">
                  Discovery Matrix
                </Link>
              </li>
              <li>
                <Link href="/#start-here" className="text-zinc-400 hover:text-white transition-colors">
                  Start Here Pathfinder
                </Link>
              </li>
              <li>
                <Link href="/planner" className="text-zinc-400 hover:text-white transition-colors">
                  Life Planner
                </Link>
              </li>
              <li>
                <Link href="/store" className="text-zinc-400 hover:text-white transition-colors">
                  The Becoming Store
                </Link>
              </li>
            </ul>
          </div>

          {/* Foundations */}
          <div>
            <h3 className="text-zinc-100 text-xs font-mono uppercase tracking-wider font-semibold mb-4">Origin Foundations</h3>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <Link href="/courses/economic-principles" className="text-amber-400 hover:text-amber-300 transition-colors font-semibold">
                  ★ Economic Principles (Flagship)
                </Link>
              </li>
              <li>
                <Link href="/courses/decision-making" className="text-zinc-400 hover:text-white transition-colors">
                  Decision Making
                </Link>
              </li>
              <li>
                <Link href="/courses/problem-solving" className="text-zinc-400 hover:text-white transition-colors">
                  Problem Solving
                </Link>
              </li>
              <li>
                <Link href="/courses/communication" className="text-zinc-400 hover:text-white transition-colors">
                  Communication Mastery
                </Link>
              </li>
              <li>
                <Link href="/courses/self-image" className="text-zinc-400 hover:text-white transition-colors">
                  Strengthening Self-Image
                </Link>
              </li>
              <li>
                <Link href="/courses/personal-adaptability" className="text-zinc-400 hover:text-white transition-colors">
                  Personal Adaptability
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h3 className="text-zinc-100 text-xs font-mono uppercase tracking-wider font-semibold mb-4">Trust & Policies</h3>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <Link href="/privacy" className="text-zinc-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-zinc-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-zinc-400 hover:text-white transition-colors">
                  Refund & Payment Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors">
                  Support & Inquiries
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-mono gap-4">
          <p>© {new Date().getFullYear()} Origin by The Becoming Institute. All rights reserved.</p>
          <p>School starts with the answer. Origin starts with the question.</p>
        </div>
      </div>
    </footer>
  );
}
