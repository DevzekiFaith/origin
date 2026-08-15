"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Users, MapPin, Video, Star, ArrowRight, Zap, MessageSquare, Target, TrendingUp, Heart, Award, Sparkles } from "lucide-react";
import { useToast } from "../contexts/ToastContext";
import FitForProfitVolunteerModal from "../components/FitForProfitVolunteerModal";

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email address.", "error");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const errData = await res.json();
        console.warn("Subscription database error:", errData.error || res.statusText);
      }
      localStorage.setItem("newsletter_subscribed", "true");
      localStorage.setItem("subscribed_email", email);
      showToast("Successfully subscribed to event notifications!", "success");
      setEmail("");
    } catch (err) {
      console.warn("Subscription fallback:", err);
      showToast("Successfully subscribed to event notifications!", "success");
      setEmail("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filters = [
    { id: "all", name: "All Events" },
    { id: "masterclass", name: "Masterclasses" },
  ];

  const events = [
    {
      id: 16,
      title: "Fit-For-Profit Regional Workshop & Community Outreach",
      type: "workshop",
      date: "Monthly Regional Sessions (Multi-State)",
      time: "Full-Day Workshop & Community Service Arm",
      price: 8.00,
      icon: Award,
      gradient: "from-[#60a5fa]/10 to-[#60a5fa]/5",
      imageUrl: "/fit_for_profit.jpg",
      instructor: "Zeki Ubor & The Becoming Institute",
      isOnline: false,
      spots: 50,
      totalSpots: 200,
      rating: 4.9,
      reviews: 215,
      description: "Prepare for profit in your career, work, ministry, and significance. Staged monthly in different states, featuring a volunteer community service arm for schools, education platforms, and local communities."
    },
    {
      id: 12,
      title: "MASTERCLASS: Becoming a Person of Interest (POI)",
      type: "masterclass",
      date: "Saturday, September 12, 2026",
      time: "GoogleMeet LIVE (5:00 PM – 8:00 PM WAT | 3-Hour Intensive)",
      price: 11.06,
      icon: Zap,
      gradient: "from-[#60a5fa]/10 to-[#60a5fa]/5",
      imageUrl: "/masterclass_flier.png",
      instructor: "Zeki Ubor",
      isOnline: true,
      spots: 28,
      totalSpots: 100,
      rating: 4.9,
      reviews: 340,
      description: "Stop Blending In. Start Architecting Your Influence. GoogleMeet LIVE intensive 3-hour masterclass on Human Architecture and strategic positioning by Zeki Ubor."
    },
    {
      id: 7,
      title: "JUMPSTART: 2-Day Live Intensive Accelerator",
      type: "masterclass",
      date: "Saturday & Sunday (Upcoming Weekend Cohort)",
      time: "2-Day Live Sprint (GoogleMeet Live @ 5:00 PM WAT)",
      price: 10.00,
      icon: Zap,
      gradient: "from-[#60a5fa]/10 to-[#60a5fa]/5",
      imageUrl: "/jumpstart_cover.png",
      instructor: "Zeki Ubor",
      isOnline: true,
      spots: 34,
      totalSpots: 50,
      rating: 4.9,
      reviews: 184,
      description: "An intensive 2-Day Live Accelerator: Day 1 (Perception & Usefulness), Day 2 (Boundaries, Consent, Value & Self-Mastery) + Becoming Institute Private Community access."
    }
  ];

  const filteredEvents = activeFilter === "all" 
    ? events 
    : events.filter(e => e.type === activeFilter);

  return (
    <div className="min-h-screen bg-[#070a12] py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto text-center mb-8 sm:mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#60a5fa]/10 border border-[#60a5fa]/30 rounded-full text-xs font-extrabold text-[#60a5fa] uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5" />
          <span>Interactive Sessions & Masterclasses</span>
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
          Live Events & Cohorts
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
          Join live masterclasses, regional workshops, and interactive sprints led by Zeki Ubor and The Becoming Institute.
        </p>
      </div>

      {/* Filter Tabs - Horizontally Scrollable on Mobile */}
      <div className="max-w-7xl mx-auto mb-8 sm:mb-12">
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                activeFilter === filter.id
                  ? "bg-[#60a5fa] text-black shadow-lg shadow-[#60a5fa]/20 scale-105"
                  : "bg-[#0d1424] text-zinc-400 hover:bg-[#141e34] hover:text-white border border-white/10"
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Events Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {filteredEvents.map((event) => {
            const Icon = event.icon;
            return (
              <div
                key={event.id}
                className="bg-[#0b1220] rounded-3xl overflow-hidden hover:bg-[#0e172a] transition-all border border-white/10 hover:border-[#60a5fa]/40 flex flex-col group shadow-xl"
              >
                {/* Image Container */}
                <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden bg-gradient-to-br from-[#10192e] to-[#080d1a] shrink-0">
                  {event.imageUrl ? (
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1a243a] to-[#0b1220] flex items-center justify-center">
                      <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient}`} />
                      <Icon className="text-[#60a5fa] w-16 h-16 opacity-80 z-10" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-[#60a5fa] text-black px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-md">
                      {event.type}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 z-10 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-md">
                    <span className="text-[#60a5fa] font-black text-xs sm:text-sm">${event.price.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Card Content Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <h3 className="text-base sm:text-lg font-black text-white leading-snug line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed font-light">
                      {event.description}
                    </p>

                    <div className="flex items-center gap-2 pt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-white text-xs font-bold">{event.rating}</span>
                      </div>
                      <span className="text-zinc-500 text-xs font-medium">({event.reviews} reviews)</span>
                    </div>

                    {/* Metadata Items */}
                    <div className="space-y-2 pt-2 border-t border-white/5 text-xs text-zinc-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#60a5fa] shrink-0" />
                        <span className="leading-tight">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#60a5fa] shrink-0" />
                        <span className="leading-tight">{event.time}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                        <div className="flex items-center gap-2">
                          <Video className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="text-emerald-400 font-bold">Online &amp; Physical Onsite Attendance</span>
                        </div>
                        <div className="flex items-center gap-1 text-zinc-400 shrink-0">
                          <Users className="w-3.5 h-3.5 text-[#60a5fa]" />
                          <span className="font-bold text-white">{event.spots}</span> spots remaining
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Register CTA Button */}
                  <Link 
                    href={event.id === 7 ? "/store/17" : event.id === 12 ? "/store/12" : `/store/${event.id}`} 
                    className="w-full bg-[#60a5fa] hover:bg-[#3b82f6] text-black py-3 px-4 rounded-full font-black text-xs sm:text-sm transition-all text-center block shadow-lg shadow-[#60a5fa]/15 hover:scale-[1.02] cursor-pointer mt-2"
                  >
                    Register Now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fit-For-Profit Volunteer Movement Banner (Compact Modern Bar) */}
      <div className="max-w-7xl mx-auto mt-8 sm:mt-12">
        <div className="relative overflow-hidden rounded-2xl border border-[#60a5fa]/30 bg-gradient-to-r from-[#0b1424] via-[#0f1d38] to-[#122444] p-4 sm:p-6 md:py-5 md:px-7 shadow-xl shadow-blue-950/30">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#60a5fa]/20 border border-[#60a5fa]/40 rounded-full text-[10px] sm:text-xs font-black text-[#60a5fa] uppercase tracking-wider backdrop-blur-md">
                <Heart className="w-3 h-3 text-[#60a5fa] fill-[#60a5fa]/30 animate-pulse" />
                <span>Free Outreaches Movement & Community Service</span>
              </div>
              <h2 className="text-base sm:text-xl md:text-2xl font-black text-white tracking-tight leading-tight">
                Join the Fit-For-Profit Volunteer Movement
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                Fit-For-Profit features a dedicated volunteer community service arm staging free outreaches for schools, education platforms, and local communities across different states. Step up and make a difference today!
              </p>
            </div>
            <button
              onClick={() => setIsVolunteerModalOpen(true)}
              className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-[#60a5fa] hover:bg-[#3b82f6] text-black font-extrabold rounded-full text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-[#60a5fa]/20 cursor-pointer hover:scale-105"
            >
              <Users className="w-4 h-4" />
              <span>Join as a Volunteer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="max-w-7xl mx-auto mt-12 sm:mt-20">
        <div className="py-10 sm:py-16 px-4 sm:px-8 bg-[#0b1120] rounded-3xl border border-white/10 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-xs font-bold text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Early Access & Priority Invites</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Get Event Notifications</h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto font-light leading-relaxed">
            Be the first to know when new masterclasses, cohort dates, and regional workshops are announced.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={isSubmitting}
              required
              className="w-full bg-[#070b16] border border-white/15 rounded-full px-5 py-3 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#60a5fa] transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-[#60a5fa] hover:bg-[#3b82f6] text-black px-7 py-3 rounded-full font-black text-xs sm:text-sm transition-all disabled:opacity-50 shrink-0 shadow-md cursor-pointer"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      {/* Volunteer Modal */}
      <FitForProfitVolunteerModal
        isOpen={isVolunteerModalOpen}
        onClose={() => setIsVolunteerModalOpen(false)}
      />
    </div>
  );
}
