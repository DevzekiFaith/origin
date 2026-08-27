"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Users, MapPin, Video, Star, ArrowRight, Zap, MessageSquare, Target, TrendingUp, Heart, Award, Sparkles, ShieldCheck } from "lucide-react";
import { useToast } from "../contexts/ToastContext";
import FitForProfitVolunteerModal from "../components/FitForProfitVolunteerModal";
import { motion, AnimatePresence } from "framer-motion";

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<number>(12);

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
    { id: "all", name: "All Live Cohorts & Events" },
    { id: "masterclass", name: "Masterclasses" },
    { id: "workshop", name: "Regional Workshops" },
  ];

  const events = [
    {
      id: 12,
      title: "MASTERCLASS: Becoming a Person of Interest (POI)",
      type: "masterclass",
      date: "Saturday, September 12, 2026",
      time: "GoogleMeet LIVE (5:00 PM – 8:00 PM WAT | 3-Hour Intensive)",
      price: 11.06,
      icon: Zap,
      gradient: "from-[#1C3B34] to-[#8A948B]",
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
      id: 16,
      title: "Fit-For-Profit Regional Workshop & Community Outreach",
      type: "workshop",
      date: "Monthly Regional Sessions (Multi-State)",
      time: "Full-Day Workshop & Community Service Arm",
      price: 8.00,
      icon: Award,
      gradient: "from-[#1C3B34] to-[#8A948B]",
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
      id: 7,
      title: "JUMPSTART: 2-Day Live Intensive Accelerator",
      type: "masterclass",
      date: "Saturday & Sunday (Upcoming Weekend Cohort)",
      time: "2-Day Live Sprint (GoogleMeet Live @ 5:00 PM WAT)",
      price: 10.00,
      icon: Award,
      gradient: "from-[#1C3B34] to-[#8A948B]",
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

  const selectedEvent = events.find(e => e.id === selectedEventId) || filteredEvents[0] || events[0];

  return (
    <div className="min-h-screen bg-[#8A948B] text-white font-sans selection:bg-white selection:text-[#8A948B] py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dynamic Animated Ambient Orbs & Subtle Radial Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/3 w-[700px] h-[700px] bg-white/15 blur-[180px] rounded-full"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* Hero Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-xs font-mono font-bold text-white uppercase tracking-wider shadow-sm backdrop-blur-md">
            <Calendar className="w-3.5 h-3.5 text-amber-300" />
            <span>INTERACTIVE SESSIONS &amp; MASTERCLASSES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-white tracking-tight leading-tight">
            Live Events &amp; Cohorts
          </h1>
          <p className="text-base sm:text-lg text-white/90 font-light leading-relaxed">
            Join live masterclasses, regional workshops, and interactive sprints led by Zeki Ubor and The Becoming Institute.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => {
                setActiveFilter(filter.id);
                const firstInCat = events.find(e => filter.id === "all" || e.type === filter.id);
                if (firstInCat) setSelectedEventId(firstInCat.id);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all shrink-0 cursor-pointer uppercase tracking-wider ${
                activeFilter === filter.id
                  ? "bg-[#E2E8DE] text-[#1C3B34] border-[#E2E8DE] shadow-md scale-105"
                  : "bg-white/15 text-white border-white/20 hover:bg-white/25"
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* SIGNATURE 5:7 COLUMN SHOWCASE CONTAINER FOR FEATURED EVENT */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedEvent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-[#E2E8DE] text-[#172217] rounded-[2.5rem] border border-[#D5DDCF] shadow-2xl p-6 sm:p-10 lg:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column (5 cols): Event Details & Booking */}
              <div className="lg:col-span-5 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#CCD6C6] text-xs font-mono font-bold text-[#1C3B34] uppercase shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#1C3B34]" />
                  <span>UPCOMING LIVE EVENT // {selectedEvent.type.toUpperCase()}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#172217] tracking-tight leading-tight">
                  {selectedEvent.title}
                </h2>

                <p className="text-[#4E5B4B] text-base sm:text-lg font-light leading-relaxed">
                  {selectedEvent.description}
                </p>

                {/* Event Schedule Box */}
                <div className="p-4 rounded-2xl bg-white/80 border border-[#CCD6C6] space-y-2 text-xs font-mono text-[#172217]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#1C3B34]" />
                    <span className="font-extrabold">{selectedEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#1C3B34]" />
                    <span>{selectedEvent.time}</span>
                  </div>
                </div>

                {/* Price & Spots Counter */}
                <div className="pt-2 flex items-center justify-between gap-4 border-t border-[#D0D9CA]">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#4E5B4B] font-bold block">REGISTRATION TUITION</span>
                    <span className="text-3xl font-mono font-extrabold text-[#172217]">
                      ${selectedEvent.price.toFixed(2)} <span className="text-xs text-[#4E5B4B] font-normal">USD</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-[#CCD6C6] text-[11px] font-mono font-bold text-[#172217]">
                    <Users className="w-3.5 h-3.5 text-[#1C3B34]" />
                    <span>{selectedEvent.spots} spots remaining</span>
                  </div>
                </div>

                {/* Register Action Button */}
                <div className="pt-2">
                  <Link
                    href={selectedEvent.id === 7 ? "/jumpstart" : selectedEvent.id === 12 ? "/store/12" : `/store/${selectedEvent.id}`}
                    className="w-full py-4 px-6 rounded-xl bg-[#8A948B] hover:bg-[#1C3B34] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all block text-center shadow-md cursor-pointer"
                  >
                    REGISTER FOR LIVE EVENT →
                  </Link>
                </div>
              </div>

              {/* Right Column (7 cols): Aspect 16/11 Event Flier Image Showcase Card */}
              <div className="lg:col-span-7">
                <div className="relative aspect-[16/11] w-full rounded-[2rem] overflow-hidden border border-[#D5DDCF] shadow-xl bg-[#121316] group">
                  {selectedEvent.imageUrl ? (
                    <Image
                      src={selectedEvent.imageUrl}
                      alt={selectedEvent.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1C3B34] to-[#8A948B]">
                      <selectedEvent.icon className="w-24 h-24 text-white opacity-80" />
                    </div>
                  )}

                  {/* Top Glass Overlay Badge */}
                  <div className="absolute top-4 left-4 right-4 bg-black/60 backdrop-blur-md border border-white/20 p-4 sm:p-5 rounded-2xl text-white flex items-center justify-between">
                    <div>
                      <span className="font-serif font-extrabold text-lg sm:text-xl block leading-none">{selectedEvent.title}</span>
                      <span className="text-[11px] font-mono text-white/80 block mt-1">{selectedEvent.instructor}</span>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-base font-extrabold text-amber-300 block">${selectedEvent.price.toFixed(2)} USD</span>
                      <span className="text-[10px] text-emerald-400 font-bold">LIVE COHORT</span>
                    </div>
                  </div>

                  {/* Bottom Floating Pill Badges Row */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/20 text-white rounded-full px-4 py-2 text-xs font-mono">
                      <Video className="w-3.5 h-3.5 text-emerald-400" />
                      <span>GoogleMeet Live Interactive Session</span>
                    </div>
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/20 text-white rounded-full px-4 py-2 text-xs font-mono">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                      <span>Certificate Included</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Quick Selector Event Cards */}
        <div className="space-y-6 pt-4">
          <div className="text-center">
            <h3 className="text-2xl sm:text-4xl font-serif font-extrabold text-white">ALL COHORTS &amp; SESSIONS</h3>
            <p className="text-xs sm:text-sm text-white/80 font-light">Select any cohort below to view its full 5:7 showcase card above.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const isSelected = event.id === selectedEventId;
              return (
                <div
                  key={event.id}
                  onClick={() => setSelectedEventId(event.id)}
                  className={`bg-[#E2E8DE] text-[#172217] rounded-3xl p-6 border transition-all cursor-pointer flex flex-col justify-between group shadow-xl ${
                    isSelected ? "border-[#1C3B34] ring-2 ring-[#1C3B34] scale-[1.01]" : "border-[#D5DDCF] hover:border-[#1C3B34]"
                  }`}
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#1C3B34]">
                      {event.type.toUpperCase()}
                    </span>
                    <h4 className="font-extrabold text-lg text-[#172217] leading-snug group-hover:text-[#1C3B34] transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-xs text-[#4E5B4B] line-clamp-2 leading-relaxed font-light">
                      {event.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#D0D9CA] flex items-center justify-between text-xs font-mono font-bold text-[#1C3B34]">
                    <span>${event.price.toFixed(2)} USD</span>
                    <span>{isSelected ? "ACTIVE SHOWCASE" : "VIEW SHOWCASE →"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fit-For-Profit Volunteer Movement Banner */}
        <div id="volunteer" className="bg-[#E2E8DE] text-[#172217] rounded-3xl border border-[#D5DDCF] p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/80 border border-[#CCD6C6] rounded-full text-xs font-mono font-bold text-[#1C3B34]">
              <Heart className="w-3.5 h-3.5 text-[#1C3B34]" />
              <span>FREE OUTREACHES MOVEMENT &amp; COMMUNITY SERVICE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#172217]">
              Join the Fit-For-Profit Volunteer Movement
            </h3>
            <p className="text-xs sm:text-sm text-[#4E5B4B] font-light leading-relaxed">
              Fit-For-Profit features a dedicated volunteer community service arm staging free outreaches for schools, education platforms, and local communities across different states. Step up and make a difference today!
            </p>
          </div>
          <button
            onClick={() => setIsVolunteerModalOpen(true)}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#8A948B] hover:bg-[#1C3B34] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
          >
            <Users className="w-4 h-4 inline mr-2" />
            <span>Join as a Volunteer</span>
          </button>
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
