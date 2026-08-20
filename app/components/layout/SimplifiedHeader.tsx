"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, BookOpen, Sparkles, ArrowRight, UserCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "../../contexts/CartContext";
import { useUser } from "../../contexts/UserContext";

export default function SimplifiedHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, mounted } = useCart();
  const { currentUser, getOwnedCourses } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);

  const ownedCount = mounted ? getOwnedCourses().length : 0;

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
            ? "bg-[#07080a]/95 backdrop-blur-xl border-b border-zinc-800/90 py-3 shadow-2xl"
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
                <span className="text-xl font-extrabold text-zinc-100 leading-none tracking-tight">ORIGIN</span>
                <span className="text-[9px] text-amber-400 font-mono tracking-widest uppercase mt-0.5 font-bold">Thinking Platform</span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-mono uppercase tracking-wider transition-colors ${
                    link.highlight
                      ? "text-amber-300 font-bold hover:text-amber-200"
                      : "text-zinc-300 hover:text-white font-medium"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="h-4 w-px bg-zinc-800" />

              {/* My Purchases Link (Restored with active indicator) */}
              <Link
                href="/purchases"
                className={`flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider transition-colors px-3 py-1.5 rounded-lg ${
                  pathname === "/purchases"
                    ? "bg-zinc-800 text-amber-300 font-bold border border-zinc-700"
                    : "text-zinc-300 hover:text-white hover:bg-zinc-900/80"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>My Purchases</span>
                {mounted && ownedCount > 0 && (
                  <span className="px-1.5 py-0.2 bg-amber-400 text-zinc-950 text-[9px] font-bold rounded-full font-mono">
                    {ownedCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative text-zinc-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-zinc-900"
                title="View Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                {mounted && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-400 text-zinc-950 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center font-mono shadow-sm">
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

            {/* Tablet & Mobile Right Actions */}
            <div className="flex items-center gap-3 xl:hidden">
              {/* Mobile My Purchases Quick Icon */}
              <Link
                href="/purchases"
                className={`relative text-xs font-mono p-2 rounded-lg transition-colors flex items-center gap-1 ${
                  pathname === "/purchases" ? "text-amber-300 bg-zinc-900" : "text-zinc-300 hover:text-white"
                }`}
                title="My Purchases"
              >
                <BookOpen className="w-5 h-5 text-amber-400" />
                {mounted && ownedCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-400 text-zinc-950 text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center font-mono">
                    {ownedCount}
                  </span>
                )}
              </Link>

              {/* Mobile Cart Quick Icon */}
              <Link href="/cart" className="relative text-zinc-300 p-2" title="Cart">
                <ShoppingBag className="w-5 h-5" />
                {mounted && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-400 text-zinc-950 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center font-mono">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-zinc-200 p-2 rounded-xl bg-zinc-900 border border-zinc-800 cursor-pointer hover:bg-zinc-800 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer (Responsive, Full-Featured) */}
          {mobileMenuOpen && (
            <div className="xl:hidden mt-4 p-6 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl space-y-4 animate-fadeIn">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2.5 px-3 rounded-xl text-sm font-mono uppercase tracking-wider transition-colors ${
                      link.highlight
                        ? "text-amber-300 font-bold bg-amber-500/10"
                        : "text-zinc-300 hover:text-white hover:bg-zinc-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Account & Purchases Section in Mobile Menu */}
              <div className="pt-4 border-t border-zinc-900 space-y-2">
                <Link
                  href="/purchases"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-colors ${
                    pathname === "/purchases"
                      ? "bg-zinc-900 border-amber-500/40 text-amber-300 font-bold"
                      : "bg-zinc-900/60 border-zinc-800/80 text-zinc-200 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-mono font-bold uppercase tracking-wider">My Purchases & Access</span>
                  </div>
                  {mounted && (
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300">
                      {ownedCount} owned
                    </span>
                  )}
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 text-zinc-200 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-mono font-bold uppercase tracking-wider">Cart</span>
                  </div>
                  {mounted && (
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                      {cartCount} items
                    </span>
                  )}
                </Link>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Link
                  href="/courses/economic-principles"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3.5 rounded-xl bg-amber-400 text-zinc-950 text-center font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20"
                >
                  <span>START WITH ECONOMIC PRINCIPLES</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
