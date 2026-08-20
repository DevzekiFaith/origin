"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, BookOpen, Sparkles, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "../../contexts/CartContext";

export default function SimplifiedHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, mounted } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/#origin-curriculum", label: "Curriculum" },
    { href: "/courses/economic-principles", label: "Economic Principles", highlight: true },
    { href: "/#question-discovery", label: "Discovery" },
    { href: "/#start-here", label: "Start Here" },
    { href: "/planner", label: "Life Planner" },
    { href: "/store", label: "Books & Store" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#07080a]/90 backdrop-blur-xl border-b border-zinc-800/80 py-3 shadow-xl"
            : "bg-transparent border-b border-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-md group-hover:border-amber-400/50 transition-all">
                <Image
                  src="/origin.png"
                  alt="Origin"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-zinc-100 leading-none tracking-tight">ORIGIN</span>
                <span className="text-[9px] text-amber-400 font-mono tracking-widest uppercase mt-0.5">Thinking Platform</span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-mono uppercase tracking-wider transition-colors ${
                    link.highlight
                      ? "text-amber-300 font-semibold hover:text-amber-200"
                      : "text-zinc-400 hover:text-zinc-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="h-4 w-px bg-zinc-800" />

              {/* Cart */}
              <Link href="/cart" className="relative text-zinc-400 hover:text-zinc-100 transition-colors p-2 rounded-lg hover:bg-zinc-900">
                <ShoppingBag className="w-4 h-4" />
                {mounted && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-400 text-zinc-950 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center font-mono">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Primary Header CTA */}
              <Link
                href="/courses/economic-principles"
                className="px-5 py-2.5 rounded-xl bg-amber-400 text-zinc-950 text-xs font-mono font-bold hover:bg-amber-300 transition-all shadow-md shadow-amber-400/10 flex items-center gap-1.5 cursor-pointer"
              >
                <span>EXPLORE FLAGSHIP</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </nav>

            {/* Mobile Menu Actions */}
            <div className="flex items-center gap-3 lg:hidden">
              <Link href="/cart" className="relative text-zinc-300 p-2">
                <ShoppingBag className="w-5 h-5" />
                {mounted && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-400 text-zinc-950 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center font-mono">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-zinc-300 p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 p-5 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl space-y-4 animate-fadeIn">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 text-sm font-mono uppercase tracking-wider ${
                    link.highlight ? "text-amber-300 font-bold" : "text-zinc-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-zinc-900 flex flex-col gap-2">
                <Link
                  href="/courses/economic-principles"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-xl bg-amber-400 text-zinc-950 text-center font-mono text-xs font-bold"
                >
                  START WITH ECONOMIC PRINCIPLES
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
