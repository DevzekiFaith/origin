import React from "react";
import { Zap, Target, Users, TrendingUp, Heart, MessageSquare, Coins } from "lucide-react";

export interface Course {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  ageRange: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  bgGradient: string;
  imageUrl?: string;
  featured?: boolean;
  duration: string;
  priceUSD: number;
  instructor: string;
  instructorTitle: string;
  rating: number;
  reviewCount: number;
  studentCount: number;
  level: string;
  modules: string[];
  outcomes: string[];
  isArchive?: boolean;
}

export const simplifiedCourses: Course[] = [
  {
    id: "economic-principles",
    title: "Economic Principles: Understanding Money, Choice, Value & Opportunity",
    description: "Master scarcity, opportunity cost, value perception, and asymmetric leverage in everyday life.",
    fullDescription: "What if understanding money starts with understanding choice? Master scarcity, opportunity cost, value perception, and asymmetric leverage in everyday life through real-world missions.",
    ageRange: "10-45",
    icon: Coins,
    iconColor: "text-amber-400",
    bgGradient: "from-amber-500/30 to-[#121212]",
    imageUrl: "/images/covers/course_economic_principles.jpg",
    featured: true,
    duration: "6 experiential stages",
    priceUSD: 14,
    instructor: "The Becoming Institute & Origin Faculty",
    instructorTitle: "Practical Philosophy & Commercial Architecture",
    rating: 4.95,
    reviewCount: 1420,
    studentCount: 7890,
    level: "Foundations",
    modules: [
      "Scarcity & The Reality of Limits",
      "Opportunity Cost & The Invisible Price",
      "Value, Perception & Exchange",
      "Supply, Demand & Price Mechanics",
      "Cost-Benefit & Asymmetric Upside",
      "Resource Optimization & The Builder's Plan"
    ],
    outcomes: [
      "Recognise trade-offs before you make irreversible commitments",
      "Think about resources (money, time, energy) with deliberate precision",
      "Understand why prices rise, fall, and fluctuate in everyday markets",
      "Evaluate high-leverage opportunities vs shiny distractions",
      "Make more deliberate, calculated personal and business decisions"
    ]
  },
  {
    id: "decision-making",
    title: "Decision Making: Frameworks for Critical Thinking Under Pressure",
    description: "Develop critical thinking skills, inversion, and mental models for making high-stakes decisions under pressure.",
    fullDescription: "Every day, we make countless decisions that shape our lives. Master mental models, inversion thinking, and probability calculation to decide with calm conviction under real market pressures.",
    ageRange: "12-45",
    icon: Target,
    iconColor: "text-[#60a5fa]",
    bgGradient: "from-[#60a5fa]/30 to-[#121212]",
    imageUrl: "/images/covers/course_decision_making.jpg",
    featured: true,
    duration: "5 experiential stages",
    priceUSD: 17,
    instructor: "The Becoming Institute",
    instructorTitle: "Human Architecture Specialist",
    rating: 4.8,
    reviewCount: 723,
    studentCount: 4231,
    level: "Foundations",
    modules: [
      "Decision-Making Fundamentals",
      "Critical Thinking Skills",
      "Information Gathering & Noise Filtering",
      "Inversion & Risk Analysis Frameworks",
      "Execution Under Pressure",
      "Second-Order Consequence Engine"
    ],
    outcomes: [
      "Make faster, better decisions under pressure",
      "Reduce decision fatigue and emotional bias",
      "Apply inversion to avoid catastrophic mistakes",
      "Make calculated choices with limited information",
      "Build calm confidence in your long-term choices"
    ]
  },
  {
    id: "problem-solving",
    title: "Problem Solving: Solution Mindset & Analytical Decomposition",
    description: "Deconstruct complex friction into root causes rather than fighting surface symptoms.",
    fullDescription: "Problem solving is at the heart of human capability. Learn to deconstruct hard challenges systematically, build multi-perspective solution trees, and separate root causes from distracting symptoms.",
    ageRange: "12-45",
    icon: Zap,
    iconColor: "text-[#60a5fa]",
    bgGradient: "from-[#60a5fa]/30 to-[#121212]",
    imageUrl: "/images/covers/course_problem_solving.jpg",
    featured: true,
    duration: "5 experiential stages",
    priceUSD: 17,
    instructor: "Zeki Ubor & The Becoming Institute",
    instructorTitle: "The Becoming Institute",
    rating: 4.7,
    reviewCount: 892,
    studentCount: 5621,
    level: "Foundations",
    modules: [
      "Problem Diagnostics Fundamentals",
      "Root Cause vs Superficial Symptom Analysis",
      "Analytical Decomposition Frameworks",
      "Creative Solution Architectures",
      "Overcoming Cognitive & Emotional Blocks",
      "Real-World Field Execution"
    ],
    outcomes: [
      "Approach messy problems systematically",
      "Distinguish underlying root causes from superficial symptoms",
      "Build multi-perspective solution trees",
      "Overcome cognitive blocks in complex situations",
      "Execute high-impact solutions with composure"
    ]
  },
  {
    id: "communication",
    title: "Communication Mastery: Clarity, Listening & Strategic Influence",
    description: "Master structured speech, empathetic listening, and non-defensive influence in critical moments.",
    fullDescription: "Communication is the universal lever. Master structured articulation, active listening to decode intent, and navigating high-stakes conversations with composure.",
    ageRange: "10-45",
    icon: MessageSquare,
    iconColor: "text-[#60a5fa]",
    bgGradient: "from-[#60a5fa]/30 to-[#121212]",
    imageUrl: "/images/ng_communication.jpg",
    featured: true,
    duration: "4 experiential stages",
    priceUSD: 14,
    instructor: "The Becoming Institute",
    instructorTitle: "Communication & Strategy Lead",
    rating: 4.7,
    reviewCount: 756,
    studentCount: 4456,
    level: "Foundations",
    modules: [
      "Communication Architecture Fundamentals",
      "Intent Decoding & Deep Listening",
      "Precision & Structured Articulation",
      "Non-Defensive Persuasion & Negotiation",
      "High-Stakes Conversational Composure"
    ],
    outcomes: [
      "Structure complex messages for instant clarity",
      "Listen deeply to uncover emotional subtext and hidden intent",
      "Navigate difficult negotiations without conflict",
      "Speak with calm, persuasive authority in any setting",
      "Align teams and relationships around shared clarity"
    ]
  },
  {
    id: "self-image",
    title: "Strengthening Self-Image: Perception, Identity & Self-Conviction",
    description: "Construct unshakeable internal conviction from demonstrated competence rather than empty affirmations.",
    fullDescription: "Self-image shapes every decision, boundary, and aspiration. Build unshakeable internal conviction based on demonstrated competence and kept promises to yourself over time.",
    ageRange: "10-45",
    icon: Heart,
    iconColor: "text-[#60a5fa]",
    bgGradient: "from-[#60a5fa]/30 to-[#121212]",
    imageUrl: "/images/covers/course_self_image.jpg",
    featured: true,
    duration: "4 experiential stages",
    priceUSD: 14,
    instructor: "Zeki Ubor & The Becoming Institute",
    instructorTitle: "The Becoming Institute",
    rating: 4.9,
    reviewCount: 892,
    studentCount: 5123,
    level: "Foundations",
    modules: [
      "Perception & Self-Image Mechanics",
      "The Kept-Promise Competence Architecture",
      "Identity Formation & Personal Values",
      "Overcoming Doubt & Dismantling False Conditioning",
      "Healthy Boundaries & Sovereignty"
    ],
    outcomes: [
      "Establish healthy, uncompromised personal boundaries",
      "Replace fragile self-talk with quiet competence",
      "Align personal identity with long-term aspirations",
      "Build resilience against external social pressures",
      "Maintain positive self-image rooted in actual capability"
    ]
  },
  {
    id: "personal-adaptability",
    title: "Personal Adaptability: Resilience & Antifragility in Changing Realities",
    description: "Develop cognitive flexibility and emotional regulation required to thrive during sudden disruption.",
    fullDescription: "Change is inevitable; resilience is engineered. Develop the cognitive flexibility, antifragile habits, and emotional regulation required to turn unexpected disruption into personal leverage.",
    ageRange: "10-45",
    icon: TrendingUp,
    iconColor: "text-[#60a5fa]",
    bgGradient: "from-[#60a5fa]/30 to-[#121212]",
    imageUrl: "/images/covers/course_adaptability.jpg",
    featured: true,
    duration: "4 experiential stages",
    priceUSD: 14,
    instructor: "Zeki Ubor & The Becoming Institute",
    instructorTitle: "The Becoming Institute",
    rating: 4.8,
    reviewCount: 521,
    studentCount: 2987,
    level: "Foundations",
    modules: [
      "The Anatomy of Disruption & Volatility",
      "Antifragile Thinking vs Passive Coping",
      "Emotional Equilibrium & Regulation",
      "Pivot Architecture: Changing Path Without Losing Momentum",
      "Continuous Calibration in Real Markets"
    ],
    outcomes: [
      "Recover emotional equilibrium quickly after setbacks",
      "Pivot strategy without losing operational momentum",
      "Build antifragile habits in unpredictable environments",
      "Regulate stress responses during high-volatility events",
      "Maintain steady, compounding personal progress"
    ]
  },
  {
    id: "team-person",
    title: "Team Collaboration: 8 Ways to Excel as a Team Person",
    description: "Learn the fundamentals of collaborative teamwork: communication, trust, accountability, and collective momentum.",
    fullDescription: "Teamwork is a high-leverage life skill. In this extended foundational module, learn how to communicate clearly, collaborate effectively, handle conflict, and build mutual trust.",
    ageRange: "10-45",
    icon: Users,
    iconColor: "text-[#60a5fa]",
    bgGradient: "from-[#60a5fa]/30 to-[#121212]",
    imageUrl: "/images/covers/course_communication.jpg",
    featured: false,
    duration: "4 experiential stages",
    priceUSD: 14,
    instructor: "The Becoming Institute",
    instructorTitle: "Leadership & Collaboration Lead",
    rating: 4.8,
    reviewCount: 654,
    studentCount: 3892,
    level: "Archive / Extended",
    isArchive: true,
    modules: [
      "Team Fundamentals & Alignment",
      "Communication in Collaborative Environments",
      "Building Mutual Trust",
      "Constructive Conflict Resolution",
      "Accountability & Execution",
      "Collaborative Leadership Basics"
    ],
    outcomes: [
      "Communicate effectively within multidisciplinary teams",
      "Build deep trust with colleagues and collaborators",
      "Handle friction and disagreement constructively",
      "Take unwavering accountability for actions",
      "Achieve high-trust collective momentum"
    ]
  }
];
