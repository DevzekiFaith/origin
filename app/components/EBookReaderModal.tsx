"use client";

import { useState } from "react";
import { X, BookOpen, ChevronLeft, ChevronRight, Download, CheckCircle2, Sparkles, Sun, Moon, Type, List, Bookmark, ShieldCheck, Lock, ShoppingCart } from "lucide-react";
import { getEBookContent, EBookChapter, EBookContentData } from "../data/ebook-content";
import { moneyFarmingBookData } from "../data/money-farming-content";
import { useToast } from "../contexts/ToastContext";

interface EBookReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: number;
  isPurchased?: boolean;
  initialChapterId?: number;
  onBuyNow?: () => void;
}

export default function EBookReaderModal({
  isOpen,
  onClose,
  productId = 7,
  isPurchased = false,
  initialChapterId = 0,
  onBuyNow,
}: EBookReaderModalProps) {
  const { showToast } = useToast();
  const [currentChapterIndex, setCurrentChapterIndex] = useState(initialChapterId); // 0 = Intro, 1..N = Chapters
  const [readerTheme, setReaderTheme] = useState<"dark" | "sepia" | "light">("dark");
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg" | "xl">("base");
  const [showToc, setShowToc] = useState(false);

  if (!isOpen) return null;

  const ebookData: EBookContentData = getEBookContent(productId, isPurchased);
  const totalSections = ebookData.chapters.length + 1; // Intro (0) + N Chapters

  const handlePrev = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentChapterIndex < totalSections - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
    }
  };

  const currentChapter: EBookChapter | undefined =
    currentChapterIndex > 0 && currentChapterIndex <= ebookData.chapters.length
      ? ebookData.chapters[currentChapterIndex - 1]
      : undefined;

  // Theme styling presets
  const themeStyles = {
    dark: "bg-[#080c16] text-zinc-200 border-white/10",
    sepia: "bg-[#fbf0d9] text-[#433422] border-[#e2d2b4]",
    light: "bg-white text-zinc-900 border-zinc-200",
  };

  const fontSizeStyles = {
    sm: "text-xs sm:text-sm leading-relaxed",
    base: "text-sm sm:text-base leading-relaxed",
    lg: "text-base sm:text-lg leading-relaxed",
    xl: "text-lg sm:text-xl leading-relaxed",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden animate-fadeIn">
      {/* Modal Container */}
      <div className={`relative w-full max-w-5xl h-[92vh] rounded-3xl border shadow-2xl overflow-hidden flex flex-col transition-colors duration-300 ${themeStyles[readerTheme]}`}>
        
        {/* Top Header Navigation Bar */}
        <div className="px-4 sm:px-6 py-3 border-b border-inherit flex items-center justify-between gap-3 shrink-0 bg-black/20 backdrop-blur-md">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setShowToc(!showToc)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-current shrink-0 cursor-pointer flex items-center gap-1.5 text-xs font-bold"
              title="Table of Contents"
            >
              <List className="w-4 h-4 text-[#60a5fa]" />
              <span className="hidden sm:inline">Contents</span>
            </button>
            <div className="min-w-0">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#60a5fa] block flex items-center gap-1">
                {isPurchased || productId === 11 ? (
                  <>
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Official E-Book Reader</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 text-[#60a5fa]" />
                    <span>Free Sample Preview</span>
                  </>
                )}
              </span>
              <h2 className="text-xs sm:text-sm font-black truncate">{ebookData.title}</h2>
            </div>
          </div>

          {/* Reader Controls: Themes & Font Size */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden xs:flex items-center gap-1 bg-black/30 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setReaderTheme("dark")}
                className={`p-1.5 rounded-lg text-xs transition-all ${readerTheme === "dark" ? "bg-[#60a5fa] text-black font-bold" : "text-zinc-400 hover:text-white"}`}
                title="Dark Obsidian"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setReaderTheme("sepia")}
                className={`p-1.5 rounded-lg text-xs transition-all ${readerTheme === "sepia" ? "bg-[#e2d2b4] text-[#433422] font-bold" : "text-zinc-400 hover:text-white"}`}
                title="Warm Paper Sepia"
              >
                <BookOpen className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setReaderTheme("light")}
                className={`p-1.5 rounded-lg text-xs transition-all ${readerTheme === "light" ? "bg-zinc-200 text-black font-bold" : "text-zinc-400 hover:text-white"}`}
                title="Clean Light"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Font Size Selector */}
            <button
              onClick={() => {
                const sizes: Array<"sm" | "base" | "lg" | "xl"> = ["sm", "base", "lg", "xl"];
                const next = sizes[(sizes.indexOf(fontSize) + 1) % sizes.length];
                setFontSize(next);
              }}
              className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-xs font-bold flex items-center gap-1 cursor-pointer"
              title="Adjust Font Size"
            >
              <Type className="w-3.5 h-3.5 text-[#60a5fa]" />
              <span className="uppercase">{fontSize}</span>
            </button>

            {/* Download PDF Button (Only if owned or free) */}
            {ebookData.pdfUrl && (isPurchased || productId === 11) && (
              <a
                href={ebookData.pdfUrl}
                download
                onClick={() => showToast(`Downloading ${ebookData.title} PDF...`, "info")}
                className="p-2 bg-[#60a5fa] hover:bg-[#3b82f6] text-black font-extrabold rounded-xl transition-all shadow-md flex items-center gap-1 text-xs cursor-pointer"
                title="Download Full PDF"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">PDF</span>
              </a>
            )}

            {/* Buy Now Button if in Sample Mode */}
            {!isPurchased && productId !== 11 && onBuyNow && (
              <button
                onClick={() => {
                  onClose();
                  onBuyNow();
                }}
                className="px-3 py-1.5 bg-[#60a5fa] hover:bg-[#3b82f6] text-black font-extrabold rounded-xl transition-all shadow-md flex items-center gap-1 text-xs cursor-pointer"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Buy Full E-Book</span>
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 bg-black/60 hover:bg-red-500 text-white rounded-xl transition-all border border-white/10 cursor-pointer"
              title="Close Reader"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Reader View Body */}
        <div className="relative flex-1 flex overflow-hidden">
          
          {/* Table of Contents Drawer */}
          {showToc && (
            <div className="absolute inset-y-0 left-0 z-20 w-72 sm:w-80 bg-[#070b14]/95 backdrop-blur-xl border-r border-white/10 p-4 overflow-y-auto animate-fadeIn text-white space-y-3 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#60a5fa] flex items-center gap-2">
                  <Bookmark className="w-4 h-4" />
                  <span>Table of Contents</span>
                </h3>
                <button onClick={() => setShowToc(false)} className="text-zinc-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1 text-xs">
                <button
                  onClick={() => { setCurrentChapterIndex(0); setShowToc(false); }}
                  className={`w-full text-left p-2.5 rounded-xl font-bold transition-all flex items-center justify-between ${currentChapterIndex === 0 ? "bg-[#60a5fa] text-black" : "hover:bg-white/10 text-zinc-300"}`}
                >
                  <span>00. {ebookData.introduction.title}</span>
                  <span className="text-[10px] uppercase opacity-75">Sample</span>
                </button>

                {ebookData.chapters.map((ch, idx) => (
                  <button
                    key={ch.id}
                    onClick={() => { setCurrentChapterIndex(idx + 1); setShowToc(false); }}
                    className={`w-full text-left p-2.5 rounded-xl font-bold transition-all flex items-center justify-between gap-2 ${currentChapterIndex === idx + 1 ? "bg-[#60a5fa] text-black" : "hover:bg-white/10 text-zinc-300"}`}
                  >
                    <span className="truncate">
                      {ch.id.toString().padStart(2, '0')}. {ch.title.replace(/^Chapter \d+:?\s*/i, '').replace(/^Pillar \d+:?\s*/i, '').replace(/^Q\d+:?\s*/i, '')}
                    </span>
                    {ch.isLocked ? (
                      <span title="Locked Sample Chapter"><Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" /></span>
                    ) : (
                      <span className="text-[10px] uppercase opacity-75 shrink-0">Sample</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Reading Scroll Container */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-10 space-y-8 max-w-4xl mx-auto">
            
            {/* Section 0: Introduction */}
            {currentChapterIndex === 0 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-2 border-b border-inherit pb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#60a5fa]/20 border border-[#60a5fa]/40 rounded-full text-xs font-black text-[#60a5fa] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>INTRODUCTION</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-black tracking-tight">{ebookData.introduction.title}</h1>
                  <h2 className="text-lg sm:text-xl font-bold text-[#60a5fa]">{ebookData.introduction.subtitle}</h2>
                </div>

                {ebookData.tagline && (
                  <div className="p-4 bg-black/20 rounded-2xl border border-inherit space-y-2 italic text-xs sm:text-sm">
                    <p className="font-semibold text-[#60a5fa]">&ldquo;{ebookData.tagline}&rdquo;</p>
                  </div>
                )}

                <div className={`space-y-4 font-serif ${fontSizeStyles[fontSize]}`}>
                  {ebookData.introduction.content.map((p, idx) => (
                    <p key={idx} className="leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Chapters View */}
            {currentChapter && (
              <div className="space-y-6 animate-fadeIn">
                {/* Chapter Header */}
                <div className="space-y-2 border-b border-inherit pb-6">
                  <div className="flex items-center justify-between text-xs font-bold opacity-75">
                    <span className="uppercase text-[#60a5fa]">CHAPTER {currentChapter.id} OF {ebookData.chapters.length}</span>
                    {currentChapter.isLocked && (
                      <span className="flex items-center gap-1 text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                        <Lock className="w-3 h-3" /> Sample Preview Locked
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-black tracking-tight">{currentChapter.title}</h1>
                  {currentChapter.subtitle && (
                    <h2 className="text-lg sm:text-xl font-bold text-[#60a5fa]">{currentChapter.subtitle}</h2>
                  )}
                </div>

                {/* If Locked -> Show Paywall Card */}
                {currentChapter.isLocked ? (
                  <div className="p-8 sm:p-12 bg-gradient-to-br from-[#0e1629] to-[#152347] border border-[#60a5fa]/30 rounded-3xl space-y-6 text-center shadow-2xl my-8">
                    <div className="w-16 h-16 bg-[#60a5fa]/20 border border-[#60a5fa]/40 text-[#60a5fa] rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <Lock className="w-8 h-8" />
                    </div>
                    <div className="space-y-2 max-w-lg mx-auto">
                      <h3 className="text-xl sm:text-2xl font-black text-white">Full Chapter Available in Complete E-Book</h3>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                        You are currently reading the free sample preview of <span className="font-bold text-white">&ldquo;{ebookData.title}&rdquo;</span>. Unlock the full manuscript to get access to all chapters, reflection exercises, and instant PDF downloads!
                      </p>
                    </div>

                    {onBuyNow && (
                      <button
                        onClick={() => {
                          onClose();
                          onBuyNow();
                        }}
                        className="px-8 py-4 bg-[#60a5fa] hover:bg-[#3b82f6] text-black font-extrabold rounded-full transition-all text-sm sm:text-base shadow-xl shadow-blue-500/20 hover:scale-105 cursor-pointer inline-flex items-center gap-2"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>Unlock Full E-Book & Download PDF</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    {/* Principle Callout Box */}
                    {currentChapter.principle && (
                      <div className="p-4 sm:p-5 bg-[#60a5fa]/10 border-l-4 border-[#60a5fa] rounded-r-2xl space-y-1">
                        <span className="text-[10px] font-black uppercase text-[#60a5fa] tracking-wider block">CORE PRINCIPLE</span>
                        <p className="text-xs sm:text-sm font-bold leading-relaxed">{currentChapter.principle}</p>
                      </div>
                    )}

                    {/* Key Takeaways */}
                    {currentChapter.keyTakeaways && currentChapter.keyTakeaways.length > 0 && (
                      <div className="p-4 bg-black/20 rounded-2xl border border-inherit space-y-2">
                        <h4 className="text-xs font-black uppercase tracking-wider text-[#60a5fa] flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-[#60a5fa]" />
                          <span>Key Takeaways</span>
                        </h4>
                        <ul className="space-y-1.5 text-xs sm:text-sm">
                          {currentChapter.keyTakeaways.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#60a5fa]">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Manuscript Paragraphs */}
                    <div className={`space-y-4 font-serif ${fontSizeStyles[fontSize]}`}>
                      {currentChapter.content.map((paragraph, idx) => (
                        <p key={idx} className="leading-relaxed">{paragraph}</p>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Pagination Controls */}
        <div className="px-4 sm:px-6 py-3 border-t border-inherit flex items-center justify-between shrink-0 bg-black/20 backdrop-blur-md text-xs font-bold">
          <button
            onClick={handlePrev}
            disabled={currentChapterIndex === 0}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-zinc-400">
            Section {currentChapterIndex + 1} of {totalSections}
          </span>

          <button
            onClick={handleNext}
            disabled={currentChapterIndex === totalSections - 1}
            className="px-4 py-2 bg-[#60a5fa] hover:bg-[#3b82f6] text-black disabled:opacity-30 rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-md"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
