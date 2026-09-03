"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Star, 
  Download, 
  ShoppingCart, 
  ShieldCheck, 
  FileText, 
  CheckCircle, 
  Lock, 
  Heart, 
  Users, 
  BookOpen, 
  Sparkles, 
  Calendar, 
  Clock, 
  MessageCircle, 
  Video, 
  Brain, 
  Zap, 
  Shield, 
  Target, 
  Award, 
  Compass, 
  CheckCircle2, 
  Check 
} from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { useToast } from "../../contexts/ToastContext";
import { useUser } from "../../contexts/UserContext";
import { getProductById, STORE_PRODUCTS } from "../../data/store-products";
import { getCourseForCompanionProduct } from "../../data/course-ebook-mapping";
import FitForProfitVolunteerModal from "../../components/FitForProfitVolunteerModal";
import EBookReaderModal from "../../components/EBookReaderModal";
import { motion } from "framer-motion";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { addToCart, cart } = useCart();
  const { showToast } = useToast();
  const { currentUser, getOwnedCourses } = useUser();
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const product = getProductById(id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#949E94] via-[#8A948B] to-[#7F897F] text-white flex flex-col items-center justify-center p-6 text-center font-mono">
        <h2 className="text-2xl font-serif font-bold mb-4">Product Not Found</h2>
        <Link href="/store" className="px-6 py-3 rounded-xl bg-[#E2E8DE] text-[#1C3B34] font-bold text-xs hover:bg-white transition-all shadow-md">
          <ArrowLeft size={16} className="inline mr-2" /> Back to Store
        </Link>
      </div>
    );
  }

  const isJumpstart = product.id === 17 || (product.category === "courses" && product.name.toLowerCase().includes("jumpstart"));
  const [selectedImage, setSelectedImage] = useState<string>(product.imageUrl || "/cover_money_farming.png");

  useEffect(() => {
    if (product?.imageUrl) {
      setSelectedImage(product.imageUrl);
    }
  }, [product?.id, product?.imageUrl]);

  // Check if this product is owned by the user
  const ownedIds = getOwnedCourses();
  const isPurchased = ownedIds.includes(`store-${product.id}`);

  // Check if item is already in the cart
  const isInCart = cart.some((item) => item.id === `store-${product.id}`);

  const handleAddToCart = () => {
    addToCart({
      id: `store-${product.id}`,
      title: product.name,
      description: product.description,
      fullDescription: product.description,
      priceUSD: product.price,
      priceNGN: isJumpstart ? 15000 : (product.priceNGN || Math.round(product.price * 1500)),
      imageUrl: isJumpstart ? "/images/covers/jumpstart_cover_v2.jpg" : selectedImage,
      bgGradient: product.gradient,
      icon: product.icon,
      iconColor: "text-[#1C3B34]",
      ageRange: "All Ages",
    });
    showToast(`${product.name} added to cart!`, "success");
  };

  const handleBuyNow = () => {
    setIsProcessing(true);
    if (!isInCart) {
      addToCart({
        id: `store-${product.id}`,
        title: product.name,
        description: product.description,
        fullDescription: product.description,
        priceUSD: product.price,
        priceNGN: isJumpstart ? 15000 : (product.priceNGN || Math.round(product.price * 1500)),
        imageUrl: isJumpstart ? "/images/covers/jumpstart_cover_v2.jpg" : selectedImage,
        bgGradient: product.gradient,
        icon: product.icon,
        iconColor: "text-[#1C3B34]",
        ageRange: "All Ages",
      });
    }
    showToast(isJumpstart ? "JUMPSTART Ticket added! Proceeding to checkout..." : "Proceeding to checkout...", "success");
    router.push("/checkout");
  };

  const connectedCourse = getCourseForCompanionProduct(product.id);

  const eventPillarsMap: Record<number, { title: string; subtitle: string; pillars: Array<{ num: string; role: string; name: string; desc: string; icon: any; shift: string }> }> = {
    7: {
      title: "The 6 Spectrum Units of Transformation",
      subtitle: "Your fundamental framework for the 2-day accelerator and subsequent 21-day daily prompts.",
      pillars: [
        {
          num: "01",
          role: "THE LENS OF REALITY",
          name: "Perception",
          desc: "Rewire your default baseline to identify leverage and high-value opportunities where others see obstacles and lack.",
          icon: Brain,
          shift: "From reacting to constraints → To detecting invisible commercial leverage."
        },
        {
          num: "02",
          role: "THE ENGINE OF IMPACT",
          name: "Usefulness",
          desc: "Transform raw gifts into deployed, high-impact market utility that the commercial marketplace cannot ignore.",
          icon: Zap,
          shift: "From unmonetized raw potential → To undeniable, deployed market utility."
        },
        {
          num: "03",
          role: "ARCHITECTURE OF PRESERVATION",
          name: "Boundaries",
          desc: "Erect impenetrable focus perimeters to protect your internal ecosystem, time, and creative energy from distraction.",
          icon: Shield,
          shift: "From porous availability → To protected sovereign focus perimeters."
        },
        {
          num: "04",
          role: "MASTERY OF AGREEMENT",
          name: "Consent",
          desc: "Absolute ownership of your 'Yes' and 'No' to eliminate misaligned commitments and energetic friction.",
          icon: Target,
          shift: "From people-pleasing defaults → To high-leverage covenant ownership."
        },
        {
          num: "05",
          role: "CURRENCY OF SIGNIFICANCE",
          name: "Value",
          desc: "Align your personal standards and output to command premium authority, high-yield results, and influence.",
          icon: Award,
          shift: "From underpriced effort → To commanded authority and premium output."
        },
        {
          num: "06",
          role: "THE ULTIMATE GOVERNANCE",
          name: "Self-Mastery",
          desc: "Master your internal emotional state to dictate and command the terms of your external reality.",
          icon: Compass,
          shift: "From emotional reactivity → To internal sovereign state governance."
        }
      ]
    },
    12: {
      title: "The 4 Core Pillars of Intentional Influence (POI)",
      subtitle: "The cognitive architecture required to transition from being overlooked to commanding high-trust gravity.",
      pillars: [
        {
          num: "01",
          role: "PSYCHOLOGICAL GRAVITY",
          name: "Human Intent",
          desc: "Deconstruct subconscious triggers and social perceptions to align your personal broadcast with high status.",
          icon: Brain,
          shift: "From seeking superficial attention → To commanding natural psychological gravity."
        },
        {
          num: "02",
          role: "VALUE RECOGNITION",
          name: "Currency of Trust",
          desc: "Position specialized skill sets into high-trust advisory leverage that commands premium market respect.",
          icon: Award,
          shift: "From competing on low price → To being chosen for undeniable authority."
        },
        {
          num: "03",
          role: "STRATEGIC POSITIONING",
          name: "Category Dominance",
          desc: "Carve out an untouchable niche by engineering a distinct personal category and clear intellectual signature.",
          icon: Target,
          shift: "From blending in with generalists → To standing out as a recognized Person of Interest."
        },
        {
          num: "04",
          role: "AGREEMENT GOVERNANCE",
          name: "Covenant Architecture",
          desc: "Master high-stakes negotiations, agreement boundaries, and high-yield strategic partnerships.",
          icon: Shield,
          shift: "From reactive concessions → To governing terms with calm sovereignty."
        }
      ]
    },
    16: {
      title: "The 4 Foundations of Fit-For-Profit Enterprise",
      subtitle: "Multi-dimensional economic frameworks designed to build profitable vocations and sustainable community outreach.",
      pillars: [
        {
          num: "01",
          role: "ECONOMIC LAWS",
          name: "Money Farming",
          desc: "Foundational economic laws governing seed, soil, capital cultivation, and sustainable wealth multiplication.",
          icon: Zap,
          shift: "From hand-to-mouth survival → To cultivated enterprise and compounding harvest."
        },
        {
          num: "02",
          role: "COMMERCIAL ALIGNMENT",
          name: "Vocational Profitability",
          desc: "Align your professional gifts and ministry for sustainable commercial return without ethical compromise.",
          icon: Award,
          shift: "From uncompensated labor → To ethically monetized excellence."
        },
        {
          num: "03",
          role: "SALES MASTERY",
          name: "High-Value Conversion",
          desc: "Master high-integrity sales psychology, value articulation, and objection neutralization.",
          icon: Target,
          shift: "From fear of selling → To serving with high-conversion commercial conviction."
        },
        {
          num: "04",
          role: "COMMUNITY IMPACT",
          name: "Fit For Profit Impact Corps",
          desc: "Mobilize Impact Corps members, build educational support platforms, and lead regional grassroots community outreaches.",
          icon: Heart,
          shift: "From isolated success → To impactful generational community uplift."
        }
      ]
    }
  };

  const eventAgendasMap: Record<number, Array<{ tag: string; title: string; desc: string; focus: string }>> = {
    7: [
      {
        tag: "DAY 1 // SATURDAY @ 5:00 PM WAT",
        title: "Wake Up. Shake Up. From Meager to Mega — Make the Shift",
        desc: "Deep-dive into Units 1 & 2 (Perception & Usefulness). Dismantling default programming of lack and fear, re-engineering your cognitive lens to spot leverage, and converting raw potential into high-impact market utility.",
        focus: "✦ Focus: Scarcity Deconstruction & Making the Shift"
      },
      {
        tag: "DAY 2 // SUNDAY @ 5:00 PM WAT",
        title: "The Architecture of Execution",
        desc: "Mastering Units 3, 4, 5 & 6 (Boundaries, Consent, Value & Self-Mastery). Erecting impenetrable focus perimeters, mastering high-leverage agreements, commanding premium worth, and achieving emotional governance.",
        focus: "✦ Focus: Perimeter Architecture & Command Authority"
      }
    ],
    12: [
      {
        tag: "SESSION 1 // 5:00 PM – 6:15 PM WAT",
        title: "The Human Architecture of Intent & Perceived Value",
        desc: "Deconstructing the hidden psychological mechanics of perceived authority, personal gravity, and why high-value positioning dictates market respect.",
        focus: "✦ Focus: Cognitive Calibration & Social Gravity"
      },
      {
        tag: "SESSION 2 // 6:30 PM – 8:00 PM WAT",
        title: "The Influence Matrix & Live Positioning Audits",
        desc: "Real-time positioning breakdowns, high-stakes agreement architectures, and converting specialized knowledge into an undeniable commercial brand.",
        focus: "✦ Focus: Value Articulation & High-Trust Influence"
      }
    ],
    16: [
      {
        tag: "MORNING SESSION // 9:00 AM – 1:00 PM",
        title: "The Economics of Vocation & Commercial Profitability",
        desc: "Aligning vocational gifts, work, and career for multi-dimensional profitability without compromising ethical or spiritual alignment.",
        focus: "✦ Focus: Money Farming & Commercial Scalability"
      },
      {
        tag: "AFTERNOON SESSION // 2:00 PM – 5:00 PM",
        title: "Community Outreach & Regional Leadership Lab",
        desc: "Hands-on community leadership, Impact Corps mobilization, and establishing sustainable educational impact initiatives in local communities.",
        focus: "✦ Focus: Social Impact & Impact Corps Execution"
      }
    ]
  };

  const eventDeliverablesMap: Record<number, Array<{
    title: string;
    format: string;
    type: string;
    desc: string;
    image: string;
    pdfUrl: string;
  }>> = {
    7: [
      {
        title: "The Human Broadcast: Environment Matrix",
        format: "PDF Framework",
        type: "Diagnostic Blueprint",
        desc: "Comprehensive diagnostic framework for mastering external environments, inputs, and information flows.",
        image: "/cover_environment_matrix.png",
        pdfUrl: "/documents/The_Human_Broadcast_Environment_Matrix.pdf"
      },
      {
        title: "Architecture of Intention Blueprint",
        format: "PDF Blueprint",
        type: "Strategic Execution Guide",
        desc: "Step-by-step master plan to organize daily cognitive focus, high-leverage priorities, and sovereign output.",
        image: "/cover_intention_blueprint.png",
        pdfUrl: "/documents/architecture_of_intention.pdf"
      },
      {
        title: "Habit Building & Routine System",
        format: "10-Page PDF Guide",
        type: "Tactical Workbook",
        desc: "Concrete blueprints to anchor the 6 spectrum units into irreversible daily cognitive rituals.",
        image: "/images/covers/course_adaptability.jpg",
        pdfUrl: "/documents/habit-building-guide.pdf"
      },
      {
        title: "Communication Mastery Guide",
        format: "10-Page PDF Guide",
        type: "Value Articulation Guide",
        desc: "Frameworks for articulating high-leverage value, setting impenetrable boundaries, and leading agreements.",
        image: "/images/covers/course_communication.jpg",
        pdfUrl: "/documents/communication-mastery.pdf"
      }
    ],
    12: [
      {
        title: "Architecture of Human Intent Framework",
        format: "PDF Framework",
        type: "Psychological Architecture",
        desc: "Deep-dive framework on human motivations, perceived value metrics, and social positioning levers.",
        image: "/cover_human_intent.png",
        pdfUrl: "/documents/Architecture_of_Human_Intent_Framework.pdf"
      },
      {
        title: "POI Authority Positioning Worksheet",
        format: "Live Masterclass Worksheet (PDF)",
        type: "Positioning Master Guide",
        desc: "A live self-audit worksheet to identify your current influence gaps, define your category-of-one positioning, and map your personal broadcast strategy — completed during the masterclass.",
        image: "/cover_human_broadcast.png",
        pdfUrl: ""
      },
      {
        title: "Self-Image Mastery Workbook",
        format: "Interactive PDF Workbook",
        type: "Identity Restructuring",
        desc: "Tactical exercises to eliminate imposter syndrome, calibrate self-worth, and command authority.",
        image: "/images/covers/course_self_image.jpg",
        pdfUrl: "/documents/self-image-mastery-workbook.pdf"
      },
      {
        title: "Decision Making Architecture Matrix",
        format: "Strategic Matrix PDF",
        type: "Cognitive Framework",
        desc: "Mental models for high-stakes decision-making, negotiations, and agreement governance.",
        image: "/images/covers/course_decision_making.jpg",
        pdfUrl: "/documents/course-decision-making-workbook.pdf"
      },
      {
        title: "Influence Psychology & Strategic Negotiation Guide",
        format: "Full PDF Guide",
        type: "Authority Psychology Protocol",
        desc: "Tactical framework on behavioral psychology, establishing category authority, and negotiating sovereign terms.",
        image: "/masterclass_poi_cover.png",
        pdfUrl: "/documents/influence-psychology.pdf"
      }
    ],
    16: [
      {
        title: "FP Commercial Capacity Audit Sheet",
        format: "Live Workshop Worksheet (PDF)",
        type: "Execution Blueprint",
        desc: "A structured, fillable audit tool to score your current commercial positioning, identify your biggest revenue leaks, and map your priority action steps — used live during the workshop.",
        image: "/images/covers/fit_for_profit_v2.jpg",
        pdfUrl: ""
      },
      {
        title: "Vocation-to-Profit Alignment Grid",
        format: "Workshop Action Grid (PDF)",
        type: "Commercial Alignment Tool",
        desc: "A practical grid for mapping your vocational gifts against market demand, pricing anchors, and sales confidence — completed live with facilitator guidance during the session.",
        image: "/8-qa-to-selling.png",
        pdfUrl: ""
      },
      {
        title: "Sales Objection Neutralization Practice Sheet",
        format: "Live Practice Worksheet (PDF)",
        type: "Sales Mastery Tool",
        desc: "A live drill sheet to practice objection reframes, value articulation scripts, and high-integrity commercial responses — practised in pairs during the afternoon session.",
        image: "/cover_money_farming.png",
        pdfUrl: ""
      },
      {
        title: "Fit For Profit Impact Corps Field Brief",
        format: "Service Brief (PDF)",
        type: "Social Impact Framework",
        desc: "A one-page community outreach brief for Impact Corps members, outlining their role, regional targets, and mobilisation steps for the current quarter.",
        image: "/fip_wall_mockup.jpg",
        pdfUrl: ""
      }
    ]
  };

  const isEventProduct = product.id === 17 || (product.category === "courses" && (product.id === 12 || product.id === 16));
  const currentEventKey = product.id === 17 ? 7 : product.id;
  const currentDeliverables = eventDeliverablesMap[currentEventKey] || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#949E94] via-[#8A948B] to-[#7F897F] text-white font-sans selection:bg-white selection:text-[#8A948B] pb-24 overflow-x-hidden antialiased relative">
      {/* Dynamic Animated Ambient Orbs & Subtle Radial Grid Overlay (Matching Home Page) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.25, 0.45, 0.25],
            x: [0, 30, 0],
            y: [0, -25, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[650px] h-[650px] bg-white/15 blur-[180px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -35, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 w-[550px] h-[550px] bg-amber-100/15 blur-[160px] rounded-full"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60" />
      </div>

      <div className="relative z-10">
        {/* Top Header Navigation */}
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-3 sm:pb-4">
          <Link
            href="/store"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-white/90 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} /> BACK TO LIBRARY STORE
          </Link>
        </div>

        <main className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 mt-1 sm:mt-4 space-y-8 sm:space-y-12">
          {/* SIGNATURE 5:7 COLUMN SHOWCASE CONTAINER */}
          <div className="bg-[#E2E8DE] text-[#172217] rounded-[1.75rem] sm:rounded-[2.5rem] border border-[#D5DDCF] shadow-2xl p-4 sm:p-8 lg:p-12 space-y-8 sm:space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column (5 cols): Details & Purchasing Controls */}
              <div className="lg:col-span-5 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#CCD6C6] text-xs font-mono font-bold text-[#1C3B34] uppercase shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#1C3B34]" />
                  <span>
                    {isJumpstart ? "THE BECOMING INSTITUTE // 2-DAY ACCELERATOR" : `ORIGIN AUTHORIZED RELEASE // ${product.category.toUpperCase()}`}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#172217] tracking-tight leading-tight">
                  {isJumpstart ? (
                    <>
                      WAKE UP. SHAKE UP.
                      <span className="block text-2xl sm:text-3xl lg:text-4xl font-sans font-extrabold text-[#1C3B34] mt-1">
                        From Meager to Mega.
                      </span>
                      <span className="block text-sm sm:text-base font-mono font-bold text-amber-700 uppercase tracking-widest mt-1">
                        Make the shift.
                      </span>
                    </>
                  ) : product.name}
                </h1>

                {isJumpstart ? (
                  <p className="text-xs font-mono font-bold text-[#1C3B34] uppercase">
                    JUMPSTART 2-Day Live Intensive Accelerator &amp; 21-Day Cognitive Sprint
                  </p>
                ) : (
                  <p className="text-xs font-mono font-bold text-[#1C3B34] uppercase">
                    {product.id === 10 || product.id === 9 || product.id === 11 
                      ? "Original Publication • Authored by Zeki Faith" 
                      : product.category === "ebooks" 
                      ? "Original Publication • Authored by Zeki Ubor" 
                      : "Authorized Edition"}
                  </p>
                )}

                <p className="text-[#3A4D3E] text-base sm:text-lg font-light leading-relaxed">
                  {product.description}
                </p>

                {/* Format & Customer Reviews Box */}
                <div className="p-4 rounded-2xl bg-white/80 border border-[#CCD6C6] flex items-center justify-between text-xs font-mono text-[#172217]">
                  <div>
                    <span className="text-[10px] uppercase text-[#1C3B34] font-bold block">
                      {isJumpstart || isEventProduct ? "DELIVERY & ATTENDANCE" : "FORMAT"}
                    </span>
                    <span className="font-extrabold text-sm">
                      {isJumpstart 
                        ? "🌐 Virtual (Global Stream) & 🏛️ Onsite (Regional Hubs)" 
                        : product.id === 12
                        ? "🌐 Virtual (Live Stream) & 🏛️ Onsite (Studio Pass)"
                        : product.id === 16
                        ? "🌐 Virtual (Global Stream) & 🏛️ Onsite (Multi-State Hubs)"
                        : product.category === "ebooks" 
                        ? "Digital PDF Companion" 
                        : product.category === "courses" 
                        ? "🌐 Virtual & 🏛️ Onsite Hybrid Workshop" 
                        : "Premium Merchandise"}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase text-[#1C3B34] font-bold block">RATING</span>
                    <div className="flex items-center gap-1 font-extrabold text-sm">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>{product.rating}</span>
                      <span className="text-[#4E5B4B] text-xs">({product.reviews})</span>
                    </div>
                  </div>
                </div>

                {/* Price Display */}
                <div className="pt-2 flex items-baseline justify-between gap-4 border-t border-[#D0D9CA]">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#1C3B34] font-bold block">
                      {isJumpstart ? "EARLY BIRD TUITION" : "PRICE"}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-mono font-extrabold text-[#172217]">
                        ₦{(product.priceNGN || Math.round(product.price * 1500)).toLocaleString()}
                      </span>
                      <span className="text-xs font-mono text-[#4E5B4B]">
                        / ${product.price} USD
                      </span>
                    </div>
                  </div>
                  {isJumpstart ? (
                    <div className="text-right">
                      <span className="text-xs font-mono text-[#6A7B6D] line-through block">
                        Standard: ₦67,500
                      </span>
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#1C3B34] text-white text-[10px] font-mono font-bold uppercase tracking-wider mt-1">
                        SAVE 78% TODAY
                      </span>
                    </div>
                  ) : product.originalPrice && (
                    <div className="text-right">
                      <span className="text-xs font-mono text-[#6A7B6D] line-through block">
                        Standard: ₦{(product.originalPrice * 1500).toLocaleString()}
                      </span>
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#1C3B34] text-white text-[10px] font-mono font-bold uppercase tracking-wider mt-1">
                        SPECIAL EDITION
                      </span>
                    </div>
                  )}
                </div>

                {/* Bundled PDF Companions Preview Strip for Purchasing Event Products */}
                {isEventProduct && currentDeliverables.length > 0 && (
                  <div className="p-3 rounded-2xl bg-white/70 border border-[#CCD6C6] space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#1C3B34]">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#1C3B34]" />
                        <span>BUNDLED PDF COMPANIONS ({currentDeliverables.length})</span>
                      </span>
                      <span className="text-[10px] text-[#4F6352] uppercase font-normal">PORTAL UNLOCKED</span>
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {currentDeliverables.map((item, i) => (
                        <div 
                          key={i} 
                          className="relative w-12 h-16 sm:w-14 sm:h-18 rounded-lg overflow-hidden shrink-0 border border-[#CCD6C6] bg-[#172217] shadow-xs group/thumb" 
                          title={`${item.title} (${item.format})`}
                        >
                          <Image src={item.image} alt={item.title} fill className="object-cover group-hover/thumb:scale-110 transition-transform duration-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Purchasing Action Controls (Singular Solid Blue Buttons) */}
                <div className="space-y-3 pt-2">
                  {isPurchased || product.price === 0 ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[#1C3B34] bg-white/90 border border-[#1C3B34] p-3.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs">
                        <CheckCircle size={18} className="flex-shrink-0" />
                        <span>{product.price === 0 ? "Free Mindset Blueprint Guide" : "You own this resource!"}</span>
                      </div>
                      {product.pdfUrl && (
                        <a
                          href={product.pdfUrl}
                          download={`${product.name.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`}
                          className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-4 rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition-all text-center flex items-center justify-center gap-2 shadow-md cursor-pointer"
                        >
                          <Download size={16} />
                          Download Free Guide (PDF)
                        </a>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleBuyNow}
                        disabled={isProcessing}
                        className="flex-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-4 rounded-2xl font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all text-center shadow-lg shadow-blue-900/30 cursor-pointer"
                      >
                        {isProcessing ? "PROCESSING..." : isJumpstart ? "SECURE YOUR ₦15,000 TICKET NOW →" : `BUY NOW (₦${(product.priceNGN || Math.round(product.price * 1500)).toLocaleString()}) →`}
                      </button>
                      {!isJumpstart && (
                        <button
                          onClick={handleAddToCart}
                          disabled={isInCart}
                          className={`px-6 py-4 rounded-2xl font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                            isInCart
                              ? "bg-white/50 text-[#4E5B4B] border-[#D0D9CA] cursor-not-allowed"
                              : "bg-white/80 text-[#172217] border-[#CCD6C6] hover:bg-[#1C3B34] hover:text-white shadow-xs"
                          }`}
                        >
                          <ShoppingCart size={16} />
                          {isInCart ? "In Cart" : "Add to Cart"}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Interactive E-Book Reader Button for eBooks */}
                  {(product.category === "ebooks" || product.id === 4) && (
                    <button
                      onClick={() => setIsReaderOpen(true)}
                      className="w-full py-3.5 px-4 bg-white/90 border border-[#CCD6C6] hover:border-[#1C3B34] text-[#1C3B34] font-mono font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-[#1C3B34]" />
                      <span>
                        {isPurchased || product.price === 0
                          ? "Read Full E-Book / Interactive Reader"
                          : "Read Sample E-Book (Free Preview)"}
                      </span>
                    </button>
                  )}

                  {/* Fit For Profit Impact Corps Button */}
                  {(product.id === 16 || product.id === 12) && (
                    <button
                      onClick={() => setIsVolunteerModalOpen(true)}
                      className="w-full py-3.5 px-4 bg-[#1C3B34] hover:bg-[#152e29] border border-amber-400/40 text-white font-mono font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2.5 shadow-md cursor-pointer"
                    >
                      <Image src="/fip_logo.png" alt="FIP Logo" width={20} height={20} className="w-5 h-5 object-contain" />
                      <span>Join Fit For Profit Impact Corps (Free)</span>
                    </button>
                  )}

                  <div className="flex items-center gap-2 text-[11px] text-[#4E5B4B] font-mono justify-center pt-1">
                    <ShieldCheck size={14} className="text-[#1C3B34]" />
                    <span>Instant Access • 100% Secure Payment • Verified Link</span>
                  </div>
                </div>
              </div>

              {/* Right Column (7 cols): Aspect 16/11 Image Showcase Card with Frosted Badges */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative aspect-[4/5] sm:aspect-[16/13] w-full rounded-[2.5rem] overflow-hidden border border-[#D5DDCF] shadow-2xl bg-[#121316] group">
                  <Image
                    src={isJumpstart ? "/images/covers/jumpstart_cover_v2.jpg" : selectedImage}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Glass Overlay Badge */}
                  <div className="absolute top-4 left-4 right-4 bg-black/60 backdrop-blur-md border border-white/20 p-4 sm:p-5 rounded-2xl text-white flex items-center justify-between">
                    <div>
                      <span className="font-serif font-extrabold text-base sm:text-lg block leading-tight">
                        {product.name}
                      </span>
                      <span className="text-[11px] font-mono text-white/80 block mt-1">
                        {isJumpstart 
                          ? "✦ Led by Zeki Ubor" 
                          : (product.id === 10 || product.id === 9 || product.id === 11)
                          ? "Author: Zeki Faith • Origin Release"
                          : "Author: Zeki Ubor • Origin Authorized"}
                      </span>
                    </div>
                    <div className="text-right font-mono shrink-0 ml-2">
                      <span className="text-sm sm:text-base font-extrabold text-amber-300 block">
                        ₦{(product.priceNGN || Math.round(product.price * 1500)).toLocaleString()}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase">
                        {isJumpstart ? "Live Cohort" : "Instant Access"}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Floating Pill Badges Row */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20 text-xs font-mono text-white shadow-xl flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-amber-300" />
                      <span>{isJumpstart ? "Live Virtual Interactive Sessions" : product.category === "ebooks" ? "Digital PDF + E-Book Reader" : "Instant Digital Access"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-300" />
                      <span>{isJumpstart ? "21-Day Accountability Sprint" : product.category === "ebooks" ? "Verified Digital Manuscript" : "Verified Works"}</span>
                    </div>
                  </div>
                </div>

                {/* Optional Gallery Thumbnail Switcher Strip */}
                {!isJumpstart && product.galleryImages && product.galleryImages.length > 1 && (
                  <div className="p-3 rounded-2xl bg-white/80 border border-[#CCD6C6] space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#1C3B34]">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#1C3B34]" />
                        <span>AVAILABLE VIEWS &amp; EDITIONS ({product.galleryImages.length})</span>
                      </span>
                      <span className="text-[10px] text-[#4F6352] uppercase font-normal">CLICK TO PREVIEW</span>
                    </div>
                    <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
                      {product.galleryImages.map((imgUrl, i) => {
                        const viewLabel = i === 0 
                          ? "Original Cover" 
                          : i === 1 
                          ? (product.id === 10 ? "Working Class CEO" : "Corporate Reader") 
                          : i === 2 
                          ? (product.id === 10 ? "Reinventing Oneself" : "Native Reader") 
                          : `View ${i + 1}`;
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setSelectedImage(imgUrl)}
                            title={`${product.name}: ${viewLabel}`}
                            className={`relative w-16 h-20 sm:w-18 sm:h-22 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer bg-[#172217] shadow-xs group ${
                              selectedImage === imgUrl ? "border-[#1C3B34] scale-105 ring-2 ring-[#1C3B34]/40" : "border-[#CCD6C6] opacity-75 hover:opacity-100"
                            }`}
                          >
                            <Image src={imgUrl} alt={`${product.name} - ${viewLabel}`} fill className="object-cover group-hover:scale-105 transition-transform" />
                            <div className="absolute inset-x-0 bottom-0 bg-black/75 backdrop-blur-xs py-0.5 text-[8px] font-mono text-center text-white/90 truncate px-1">
                              {viewLabel}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* FULL EVENT PROGRAM ARCHITECTURE & DELIVERABLES SECTION */}
            {isEventProduct && (
              <div className="pt-8 border-t border-[#D0D9CA] space-y-12">
                
                {/* Event Schedule & Agenda Blueprint */}
                {eventAgendasMap[currentEventKey] && (
                  <div className="space-y-6">
                    <div className="text-center max-w-2xl mx-auto">
                      <span className="text-xs font-mono font-bold text-[#1C3B34] uppercase tracking-wider block mb-1">
                        INTENSIVE BLUEPRINT
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#172217]">
                        {currentEventKey === 7 ? "2-Day Live Accelerator Schedule" : (
                          currentEventKey === 12 ? "3-Hour Intensive Masterclass Agenda" : "Regional Workshop & Outreach Schedule"
                        )}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#4E5B4B] font-light mt-1">
                        Detailed session breakdown designed for irreversible personal shift and high-leverage execution.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {eventAgendasMap[currentEventKey].map((session, idx) => (
                        <div key={idx} className="p-6 sm:p-7 rounded-2xl bg-white border border-[#CCD6C6] space-y-3 shadow-md flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C3B34] text-white font-mono text-xs font-bold">
                              {session.tag}
                            </div>
                            <h4 className="text-xl font-serif font-bold text-[#172217]">
                              {session.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-[#3A4D3E] leading-relaxed font-light">
                              {session.desc}
                            </p>
                          </div>
                          <div className="pt-2 border-t border-[#E2E8DE] text-xs text-[#1C3B34] font-mono font-bold">
                            {session.focus}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Core Framework Pillars / Spectrum Units */}
                {eventPillarsMap[currentEventKey] && (
                  <div className="space-y-6">
                    <div className="text-center max-w-2xl mx-auto">
                      <span className="text-xs font-mono font-bold text-[#1C3B34] uppercase tracking-wider block mb-1">
                        CORE TRANSFORMATION FRAMEWORK
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#172217]">
                        {eventPillarsMap[currentEventKey].title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#4E5B4B] font-light mt-1">
                        {eventPillarsMap[currentEventKey].subtitle}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {eventPillarsMap[currentEventKey].pillars.map((unit, idx) => {
                        const IconComp = unit.icon;
                        return (
                          <div key={idx} className="p-5 rounded-2xl bg-white border border-[#CCD6C6] space-y-2.5 shadow-sm hover:border-[#1C3B34] transition-all flex flex-col justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-mono font-bold text-[#1C3B34]">{unit.num} // {unit.role}</span>
                                <div className="p-1.5 rounded-lg bg-[#E2E8DE] text-[#1C3B34]">
                                  <IconComp className="w-3.5 h-3.5" />
                                </div>
                              </div>
                              <h5 className="text-lg font-serif font-bold text-[#172217]">{unit.name}</h5>
                              <p className="text-xs text-[#4F6352] leading-relaxed font-light">{unit.desc}</p>
                            </div>
                            <div className="pt-2 border-t border-[#E2E8DE] text-[11px] text-[#1C3B34] font-mono">
                              {unit.shift}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Included Deliverables */}
                {eventDeliverablesMap[currentEventKey] && (
                  <div className="space-y-6">
                    <div className="text-center max-w-2xl mx-auto">
                      <span className="text-xs font-mono font-bold text-[#1C3B34] uppercase tracking-wider block mb-1">
                        INCLUDED DELIVERABLES
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#172217]">
                        Your Complete Accelerator Resource Pack
                      </h3>
                      <p className="text-xs sm:text-sm text-[#4E5B4B] font-light mt-1">
                        {currentEventKey === 16
                          ? "Purpose-built live worksheets and practical action tools — completed with facilitator guidance during the session. Not pre-downloaded; experienced on the day."
                          : "All PDF blueprint manuscripts and companion materials are unlocked inside your portal immediately upon registration."
                        }
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {eventDeliverablesMap[currentEventKey].map((item, idx) => (
                        <div 
                          key={idx} 
                          className="p-3.5 rounded-2xl bg-white border border-[#CCD6C6] shadow-xs hover:shadow-md hover:border-[#1C3B34] transition-all flex items-start gap-3.5 group"
                        >
                          {/* Compact Miniature PDF Thumbnail */}
                          <div className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-[#172217] shadow-xs border border-[#D5DDCF]">
                            <Image 
                              src={item.image} 
                              alt={item.title} 
                              fill 
                              className="object-cover group-hover:scale-105 transition-transform duration-300" 
                            />
                          </div>

                          {/* Content Body */}
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="px-2 py-0.5 rounded-md bg-[#E2E8DE] text-[9px] font-mono font-bold text-[#1C3B34] uppercase tracking-wider">
                                {item.type}
                              </span>
                              <span className="text-[10px] font-mono text-[#6A7B6D]">
                                {item.format}
                              </span>
                            </div>
                            <h5 className="font-serif font-bold text-xs sm:text-sm text-[#172217] leading-snug group-hover:text-[#1C3B34] transition-colors line-clamp-2">
                              {item.title}
                            </h5>
                            <p className="text-[11px] text-[#4F6352] font-light leading-relaxed line-clamp-2">
                              {item.desc}
                            </p>
                            <div className="pt-1 flex items-center gap-1 text-[10px] font-mono text-[#1C3B34] font-bold">
                              <CheckCircle2 className="w-3 h-3 text-[#1C3B34]" />
                              <span>Included</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Secondary Blue Action Banner */}
                <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#CCD6C6] shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="space-y-1 text-center sm:text-left">
                    <h4 className="text-xl font-serif font-bold text-[#172217]">
                      Ready to Secure Your Seat?
                    </h4>
                    <p className="text-xs text-[#4F6352]">
                      {currentEventKey === 16
                        ? `Register now at ₦${(product.priceNGN || Math.round(product.price * 1500)).toLocaleString()}. Your live worksheets, audit sheets, and practical tools will be facilitated during the session.`
                        : `Take immediate action. Register now at ₦${(product.priceNGN || Math.round(product.price * 1500)).toLocaleString()} and unlock all included materials immediately.`
                      }
                    </p>
                  </div>
                  <button
                    onClick={handleBuyNow}
                    disabled={isProcessing}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md shrink-0 cursor-pointer text-center"
                  >
                    {isJumpstart ? "REGISTER FOR JUMPSTART NOW (₦15,000) →" : (
                      product.id === 12 ? "REGISTER FOR POI MASTERCLASS (₦16,500) →" : "REGISTER FOR FIT-FOR-PROFIT (₦12,000) →"
                    )}
                  </button>
                </div>

              </div>
            )}
          </div>

          {/* DETAILED DESCRIPTION & BONUS MANUSCRIPTS CANVAS FOR REGULAR PRODUCTS */}
          {!isEventProduct && (
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-12 space-y-8">
                {/* Connected Thinking Course Alert */}
                {connectedCourse && (
                  <div className="p-6 sm:p-8 rounded-3xl bg-[#E2E8DE] text-[#172217] border border-[#D5DDCF] shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#1C3B34] font-bold tracking-wider">
                        WANT TO EXPERIENCE THIS IDEA IN ACTION?
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-[#172217]">
                        {connectedCourse.courseTitle}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#4E5B4B] font-light">
                        Experience the interactive decisions, trade-off models, and real-world missions behind this companion.
                      </p>
                    </div>
                    <Link
                      href={`/courses/${connectedCourse.courseId}`}
                      className="px-6 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold transition-all shrink-0 shadow-md"
                    >
                      EXPLORE COURSE →
                    </Link>
                  </div>
                )}

                {/* Description Body */}
                <div className="p-8 sm:p-12 rounded-3xl bg-[#E2E8DE] text-[#172217] border border-[#D5DDCF] shadow-xl space-y-6">
                  <h3 className="text-2xl font-serif font-extrabold text-[#172217]">Overview &amp; Mental Architecture</h3>
                  <div className="prose prose-zinc max-w-none text-[#4E5B4B] space-y-4 leading-relaxed font-light text-sm sm:text-base">
                    {product.rawDescription ? (
                      <div 
                        className="selar-raw-desc space-y-4"
                        dangerouslySetInnerHTML={{ __html: product.rawDescription }} 
                      />
                    ) : (
                      <p>{product.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Volunteer Registration Modal */}
      <FitForProfitVolunteerModal
        isOpen={isVolunteerModalOpen}
        onClose={() => setIsVolunteerModalOpen(false)}
      />

      {/* Interactive E-Book Reader Modal */}
      <EBookReaderModal
        isOpen={isReaderOpen}
        onClose={() => setIsReaderOpen(false)}
        productId={product.id}
        isPurchased={isPurchased}
        onBuyNow={handleBuyNow}
      />
    </div>
  );
}
