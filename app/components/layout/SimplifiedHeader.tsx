"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, BookOpen, ArrowRight, ChevronDown, Zap } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { useUser } from "../../contexts/UserContext";
import { simplifiedCourses } from "../../data/simplified-courses";

export default function SimplifiedHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { cartCount, mounted } = useCart();
  const { getOwnedCourses } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);

  const ownedCount = mounted ? getOwnedCourses().length : 0;
  const coreCourse = simplifiedCourses[0];
  const otherCourses = simplifiedCourses.slice(1);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCoursesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { href: "/events", label: "Live Events" },
    { href: "/#learning-companions", label: "Books" },
    { href: "/community", label: "Community" },
    { href: "/store", label: "Store" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      if (pathname === "/") {
        e.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", `#${targetId}`);
        }
      }
    }
    setMobileMenuOpen(false);
    setCoursesDropdownOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#8A948B]/55 backdrop-blur-2xl border-b border-white/20 py-3.5 shadow-lg shadow-black/10"
          : "bg-[#8A948B]/70 backdrop-blur-xl border-b border-white/10 py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
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
              <span className="text-[9px] text-white/80 font-mono tracking-widest uppercase mt-0.5 font-bold">Thinking Platform</span>
            </div>
          </Link>

          {/* Desktop Navigation Links with Dot Separators */}
          <nav className="hidden lg:flex items-center gap-2 2xl:gap-3 text-[10.5px] 2xl:text-[11.5px] font-mono uppercase tracking-tight 2xl:tracking-normal text-white/90">
            {/* Courses Interactive Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setCoursesDropdownOpen(true)}
              onMouseLeave={() => setCoursesDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setCoursesDropdownOpen(!coursesDropdownOpen)}
                className="hover:text-white transition-colors font-medium flex items-center gap-1 cursor-pointer hover:underline underline-offset-4 decoration-white/40 whitespace-nowrap"
              >
                <span>COURSES</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${coursesDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              {coursesDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 w-84 sm:w-92 z-50">
                  <div className="bg-white/75 backdrop-blur-2xl border border-white/60 shadow-2xl shadow-black/15 rounded-2xl p-4 text-left normal-case tracking-normal ring-1 ring-inset ring-white/40">
                    {/* Core Foundation Flagship Box */}
                    <div className="mb-3 pb-3 border-b border-black/10">
                      <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-amber-700 uppercase tracking-wider mb-1.5">
                        <Zap className="w-3 h-3" />
                        <span>CORE FOUNDATION · START HERE</span>
                      </div>
                      <Link
                        href={`/courses/${coreCourse.id}`}
                        onClick={() => setCoursesDropdownOpen(false)}
                        className="group block p-2.5 rounded-xl bg-black/5 hover:bg-black/10 border border-black/10 hover:border-amber-600/40 transition-all"
                      >
                        <div className="text-xs font-bold text-[#172217] group-hover:text-amber-700 transition-colors flex items-center justify-between">
                          <span>{coreCourse.title.split(":")[0]}</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-amber-600" />
                        </div>
                        <div className="text-[10px] text-[#3A4D3E] font-sans mt-0.5 leading-snug line-clamp-1">
                          {coreCourse.title.split(":")[1] || coreCourse.description}
                        </div>
                      </Link>
                    </div>

                    {/* Applied Disciplines */}
                    <div className="space-y-1">
                      <div className="text-[9px] font-mono text-[#1C3B34]/50 uppercase tracking-wider px-2 mb-1">
                        APPLIED DISCIPLINES
                      </div>
                      {otherCourses.map((c) => (
                        <Link
                          key={c.id}
                          href={`/courses/${c.id}`}
                          onClick={() => setCoursesDropdownOpen(false)}
                          className="block px-2.5 py-1.5 rounded-lg hover:bg-black/8 transition-colors text-[#2C3B2E] hover:text-[#1C3B34] text-[11px] font-sans"
                        >
                          <span className="font-semibold">{c.title.split(":")[0]}</span>
                        </Link>
                      ))}
                    </div>

                    {/* Bottom Links */}
                    <div className="mt-3 pt-2.5 border-t border-black/10 flex items-center justify-between font-mono text-[9.5px]">
                      <Link
                        href="/#origin-curriculum"
                        onClick={(e) => handleNavClick(e, "/#origin-curriculum")}
                        className="text-amber-700 hover:text-[#1C3B34] flex items-center gap-1 transition-colors font-bold"
                      >
                        <span>VIEW ALL 6 FOUNDATIONS</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                      <Link
                        href="/courses"
                        onClick={() => setCoursesDropdownOpen(false)}
                        className="text-[#3A4D3E]/70 hover:text-[#1C3B34] transition-colors font-bold"
                      >
                        CATALOG
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <span className="text-white/30 select-none text-[8px]">•</span>

            {navLinks.map((link, idx) => (
              <React.Fragment key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="hover:text-white transition-colors font-medium hover:underline underline-offset-4 decoration-white/40 whitespace-nowrap"
                >
                  {link.label}
                </Link>
                {idx < navLinks.length - 1 && (
                  <span className="text-white/30 select-none text-[8px]">•</span>
                )}
              </React.Fragment>
            ))}

            <div className="h-3.5 w-px bg-white/20 mx-1" />

            {/* My Purchases Link */}
            <Link
              href="/purchases"
              className={`flex items-center gap-1 text-[10.5px] 2xl:text-[11.5px] font-mono uppercase tracking-tight transition-all px-2.5 py-1.5 rounded-lg whitespace-nowrap ${
                pathname === "/purchases"
                  ? "bg-white text-[#1C3B34] font-bold shadow-sm"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              <BookOpen className="w-3 h-3 shrink-0" />
              <span>Purchases</span>
              {mounted && ownedCount > 0 && (
                <span className="px-1 py-0.2 bg-[#1C3B34] text-white text-[8px] font-bold rounded-full font-mono">
                  {ownedCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative text-white/90 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
              title="View Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-[#1C3B34] text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center font-mono shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Primary Header CTA */}
            <Link
              href="/courses/economic-principles"
              className="px-3 2xl:px-4 py-2 rounded-xl bg-[#E2E8DE] text-[#1C3B34] text-[10.5px] 2xl:text-[11.5px] font-mono font-bold hover:bg-white transition-all shadow-md flex items-center gap-1 cursor-pointer ml-0.5 whitespace-nowrap"
            >
              <span>START CORE FOUNDATION</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </nav>

          {/* Tablet & Mobile Right Actions */}
          <div className="flex items-center gap-3 lg:hidden">
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
          <div className="lg:hidden mt-4 p-6 rounded-3xl bg-[#8A948B] border border-white/20 shadow-2xl space-y-4 animate-fadeIn">
            {/* Core Foundation Highlight Card */}
            <div className="p-4 rounded-2xl bg-[#18261E] border border-white/20 text-white space-y-1.5 shadow-md">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-300 uppercase font-bold tracking-wider">
                <Zap className="w-3 h-3" />
                <span>CORE FOUNDATION · START HERE</span>
              </div>
              <Link
                href="/courses/economic-principles"
                onClick={() => setMobileMenuOpen(false)}
                className="block font-bold text-sm hover:text-amber-300 transition-colors"
              >
                Economic Principles: Understanding Money, Choice, Value &amp; Opportunity
              </Link>
            </div>

            <div className="space-y-1">
              <Link
                href="/#origin-curriculum"
                onClick={(e) => handleNavClick(e, "/#origin-curriculum")}
                className="block py-2.5 px-3 rounded-xl text-sm font-mono uppercase tracking-wider text-white hover:bg-white/10 transition-colors font-bold"
              >
                All 6 Courses &amp; Curriculum
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
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
