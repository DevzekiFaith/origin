import { STORE_PRODUCTS, StoreProduct } from "./store-products";

export interface ReadingCompanionMapping {
  courseId: string;
  courseTitle: string;
  productId: number;
  badgeText: string;
  hookText: string;
  whyReadThis: string;
  whatYouWillUnderstand: string;
}

export const COURSE_READING_COMPANIONS: ReadingCompanionMapping[] = [
  {
    courseId: "economic-principles",
    courseTitle: "Economic Principles: Money, Value & Choice",
    productId: 7, // Money Farming
    badgeText: "ORIGIN READING COMPANION",
    hookText: "Stop chasing money. Start farming it.",
    whyReadThis: "Go deeper into the foundational laws of capital velocity, asset cultivation, and compounding opportunity.",
    whatYouWillUnderstand: "How to transition from reactive income earner to intentional wealth cultivator through 7 timeless economic principles."
  },
  {
    courseId: "decision-making",
    courseTitle: "Decision Making: Critical Thinking Under Pressure",
    productId: 9, // House of Choice
    badgeText: "ORIGIN READING COMPANION",
    hookText: "Align your choices with your highest-conviction self.",
    whyReadThis: "Dismantle cognitive biases and establish internal decision perimeters before committing scarce resources.",
    whatYouWillUnderstand: "The architecture of high-stakes choices, inversion models, and eliminating second-guessing under uncertainty."
  },
  {
    courseId: "problem-solving",
    courseTitle: "Problem Solving: The Solution Mindset",
    productId: 7, // Money Farming
    badgeText: "ORIGIN READING COMPANION",
    hookText: "Diagnose root causes before spending emotional or financial capital.",
    whyReadThis: "Practical frameworks for dissecting complex market and life friction without panic.",
    whatYouWillUnderstand: "Systematic root-cause decomposition, solution trees, and turning constraints into asymmetric leverage."
  },
  {
    courseId: "communication",
    courseTitle: "Communication Mastery: Clarity & Influence",
    productId: 8, // 8 Q&A to Selling
    badgeText: "ORIGIN READING COMPANION",
    hookText: "Articulate your worth and command genuine attention.",
    whyReadThis: "Bridge the gap between internal value and external perception during negotiations and leadership moments.",
    whatYouWillUnderstand: "Structured persuasion, empathetic listening, and non-defensive influence across high-stakes discussions."
  },
  {
    courseId: "self-image",
    courseTitle: "Strengthening Self-Image & Identity",
    productId: 10, // Deep-Remake
    badgeText: "ORIGIN READING COMPANION",
    hookText: "Rebuild your internal identity from demonstrated competence.",
    whyReadThis: "Dismantle toxic self-talk and replace fragile confidence with uncompromised personal boundaries.",
    whatYouWillUnderstand: "How to construct undeniable self-conviction that survives external doubt and market pressure."
  },
  {
    courseId: "personal-adaptability",
    courseTitle: "Personal Adaptability & Antifragility",
    productId: 11, // A FREE GUIDE TO REBUILDING
    badgeText: "ORIGIN READING COMPANION",
    hookText: "5 timeless principles to rise when plans collapse.",
    whyReadThis: "A practical emergency roadmap for emotional regulation and tactical pivoting during sudden life disruptions.",
    whatYouWillUnderstand: "How to turn volatile shocks into career and psychological momentum rather than paralysis."
  }
];

export function getCompanionProductForCourse(courseId: string): (StoreProduct & ReadingCompanionMapping) | null {
  const normalizedId = courseId === "team-person" || courseId === "communication-mastery" ? "communication" : courseId;
  const mapping = COURSE_READING_COMPANIONS.find((m) => m.courseId === normalizedId);
  if (!mapping) return null;

  const product = STORE_PRODUCTS.find((p) => p.id === mapping.productId);
  if (!product) return null;

  return {
    ...product,
    ...mapping
  };
}

export function getCourseForCompanionProduct(productId: number): { courseId: string; courseTitle: string } | null {
  const mapping = COURSE_READING_COMPANIONS.find((m) => m.productId === productId);
  if (!mapping) return null;
  return {
    courseId: mapping.courseId,
    courseTitle: mapping.courseTitle
  };
}
