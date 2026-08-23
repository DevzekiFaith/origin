"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, BookOpen, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "../../contexts/CartContext";
import { useUser } from "../../contexts/UserContext";

export default function SimplifiedHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, mounted } = useCart();
  const { getOwnedCourses } = useUser();
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
    { href: "/courses/economic-principles", label: "Economic Principles" },
    { href: "/#origin-moment", label: "Discovery" },
    { href: "/#start-here", label: "Start Here" },
    { href: "/planner", label: "Life Planner" },
    { href: "/store", label: "Store" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#8A948B]/90 backdrop-blur-xl border-b border-white/15 py-3.5 shadow-md"
          : "bg-[#8A948B] border-b border-white/10 py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shadow-sm group-hover:border-white/40 transition-all backdrop-blur-md">
              <Image
                src="/origin.png"
                alt="Origin"
                fill
                className="object-cover p-1"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-white leading-none tracking-tight">ORIGIN</span>
              <span className="text-[9px] text-white/80 font-mono tracking-widest uppercase mt-0.5 font-bold">Thinking Platform</span>
            </div>
          </Link>

          {/* Desktop Navigation Links with Dot Separators matching reference nav */}
          <nav className="hidden xl:flex items-center gap-4 text-xs font-mono uppercase tracking-wider text-white/90">
            {navLinks.map((link, idx) => (
              <React.Fragment key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-white transition-colors font-medium hover:underline underline-offset-4 decoration-white/40"
                >
                  {link.label}
                </Link>
                {idx < navLinks.length - 1 && (
                  <span className="text-white/40 select-none">•</span>
                )}
              </React.Fragment>
            ))}

            <div className="h-4 w-px bg-white/20 mx-2" />

            {/* My Purchases Link */}
            <Link
              href="/purchases"
              className={`flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider transition-all px-3 py-1.5 rounded-lg ${
                pathname === "/purchases"
                  ? "bg-white text-[#1C3B34] font-bold shadow-sm"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>My Purchases</span>
              {mounted && ownedCount > 0 && (
                <span className="px-1.5 py-0.2 bg-[#1C3B34] text-white text-[9px] font-bold rounded-full font-mono">
                  {ownedCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative text-white/90 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
              title="View Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-[#1C3B34] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center font-mono shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Primary Header CTA */}
            <Link
              href="/courses/economic-principles"
              className="px-5 py-2.5 rounded-xl bg-[#E2E8DE] text-[#1C3B34] text-xs font-mono font-bold hover:bg-white transition-all shadow-md flex items-center gap-1.5 cursor-pointer ml-1"
            >
              <span>EXPLORE FLAGSHIP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </nav>

          {/* Tablet & Mobile Right Actions */}
          <div className="flex items-center gap-3 xl:hidden">
            <Link
              href="/purchases"
              className="relative text-xs font-mono p-2 rounded-lg text-white hover:bg-white/10"
              title="My Purchases"
            >
              <BookOpen className="w-5 h-5" />
              {mounted && ownedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-[#1C3B34] text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center font-mono">
                  {ownedCount}
                </span>
              )}
            </Link>

            <Link href="/cart" className="relative text-white p-2" title="Cart">
              <ShoppingBag className="w-5 h-5" />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-[#1C3B34] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center font-mono">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 rounded-xl bg-white/10 border border-white/20 cursor-pointer hover:bg-white/20 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-4 p-6 rounded-3xl bg-[#8A948B] border border-white/20 shadow-2xl space-y-4 animate-fadeIn">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 px-3 rounded-xl text-sm font-mono uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-white/20 space-y-2">
              <Link
                href="/purchases"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white/10 border border-white/20 text-white"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm font-mono font-bold uppercase tracking-wider">My Purchases</span>
                </div>
                {mounted && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-white text-[#1C3B34] font-bold">
                    {ownedCount} owned
                  </span>
                )}
              </Link>
            </div>

            <div className="pt-2">
              <Link
                href="/courses/economic-principles"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-xl bg-[#E2E8DE] text-[#1C3B34] text-center font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                <span>START WITH ECONOMIC PRINCIPLES</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
