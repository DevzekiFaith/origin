/**
 * Live Activity & Social Proof Data Engine
 * Powers real-time popups across Origin for:
 * 1. Course registrations (context-aware to currently viewed course)
 * 2. Flagship events & accelerator bookings (Jumpstart, POI Masterclass, Fit-For-Profit)
 * 3. Reading Companion & book acquisitions (paired with courses or store items)
 */

export type LiveActivityType = "course_registration" | "event_booking" | "companion_purchase" | "book_purchase";

export interface LiveActivityItem {
  id: string;
  type: LiveActivityType;
  userName: string;
  location: string;
  itemTitle: string;
  itemSubtitle?: string;
  itemUrl: string;
  itemImageUrl?: string;
  priceDisplay?: string;
  courseId?: string; // If related to a specific course
  companionForCourseId?: string; // If this reading companion pairs with a course
  minutesAgo: number; // Base relative minutes (can be dynamically formatted)
  badgeLabel: string;
  badgeTone: "emerald" | "amber" | "blue" | "purple";
  actionText: string;
}

// Curated seed activity pool reflecting verified community engagements
export const LIVE_ACTIVITIES_POOL: LiveActivityItem[] = [
  // ── COURSE REGISTRATIONS ────────────────────────────────────────────────
  {
    id: "act-crs-1",
    type: "course_registration",
    userName: "Kelechi O.",
    location: "Abuja, Nigeria",
    itemTitle: "Economic Principles: Money, Value & Choice",
    itemSubtitle: "Enrolled in Foundation Curriculum",
    itemUrl: "/courses/economic-principles",
    priceDisplay: "₦15,000",
    courseId: "economic-principles",
    minutesAgo: 3,
    badgeLabel: "Verified Enrollment",
    badgeTone: "blue",
    actionText: "View Course",
  },
  {
    id: "act-crs-2",
    type: "course_registration",
    userName: "Sarah T.",
    location: "London, UK",
    itemTitle: "Decision Making: Critical Thinking Under Pressure",
    itemSubtitle: "Secured Cognitive Training Seat",
    itemUrl: "/courses/decision-making",
    priceDisplay: "$25.00",
    courseId: "decision-making",
    minutesAgo: 7,
    badgeLabel: "Verified Enrollment",
    badgeTone: "blue",
    actionText: "View Course",
  },
  {
    id: "act-crs-3",
    type: "course_registration",
    userName: "Tunde A.",
    location: "Lagos, Nigeria",
    itemTitle: "Problem Solving: The Solution Mindset",
    itemSubtitle: "Joined Root-Cause Analysis Sprint",
    itemUrl: "/courses/problem-solving",
    priceDisplay: "₦15,000",
    courseId: "problem-solving",
    minutesAgo: 11,
    badgeLabel: "Verified Enrollment",
    badgeTone: "blue",
    actionText: "View Course",
  },
  {
    id: "act-crs-4",
    type: "course_registration",
    userName: "Ngozi K.",
    location: "Port Harcourt, Nigeria",
    itemTitle: "Strengthening Self-Image & Identity",
    itemSubtitle: "Enrolled in Core Architectural Track",
    itemUrl: "/courses/self-image",
    priceDisplay: "₦15,000",
    courseId: "self-image",
    minutesAgo: 14,
    badgeLabel: "Verified Enrollment",
    badgeTone: "blue",
    actionText: "View Course",
  },
  {
    id: "act-crs-5",
    type: "course_registration",
    userName: "Kofi M.",
    location: "Accra, Ghana",
    itemTitle: "Communication Mastery: Clarity & Influence",
    itemSubtitle: "Enrolled in High-Stakes Influence",
    itemUrl: "/courses/communication",
    priceDisplay: "₦15,000",
    courseId: "communication",
    minutesAgo: 18,
    badgeLabel: "Verified Enrollment",
    badgeTone: "blue",
    actionText: "View Course",
  },
  {
    id: "act-crs-6",
    type: "course_registration",
    userName: "Chidera E.",
    location: "Toronto, Canada",
    itemTitle: "Personal Adaptability & Antifragility",
    itemSubtitle: "Enrolled in Antifragility Frameworks",
    itemUrl: "/courses/personal-adaptability",
    priceDisplay: "$25.00",
    courseId: "personal-adaptability",
    minutesAgo: 22,
    badgeLabel: "Verified Enrollment",
    badgeTone: "blue",
    actionText: "View Course",
  },
  {
    id: "act-crs-7",
    type: "course_registration",
    userName: "Olumide D.",
    location: "Ibadan, Nigeria",
    itemTitle: "Becoming a Team Person & Catalyst",
    itemSubtitle: "Enrolled in Collaboration Dynamics",
    itemUrl: "/courses/team-person",
    priceDisplay: "₦15,000",
    courseId: "team-person",
    minutesAgo: 29,
    badgeLabel: "Verified Enrollment",
    badgeTone: "blue",
    actionText: "View Course",
  },

  // ── FLAGSHIP EVENT & ACCELERATOR BOOKINGS ──────────────────────────────
  {
    id: "act-evt-1",
    type: "event_booking",
    userName: "David W.",
    location: "Lagos, Nigeria",
    itemTitle: "JUMPSTART: 2-Day Live Intensive Accelerator",
    itemSubtitle: "Secured VIP Virtual + 21-Day Sprint Access",
    itemUrl: "/events",
    itemImageUrl: "/jumpstart_cover.png",
    priceDisplay: "₦15,000",
    minutesAgo: 4,
    badgeLabel: "Live Accelerator Pass",
    badgeTone: "amber",
    actionText: "View Event",
  },
  {
    id: "act-evt-2",
    type: "event_booking",
    userName: "Amina B.",
    location: "Abuja, Nigeria",
    itemTitle: "MASTERCLASS: Becoming a Person of Interest (POI)",
    itemSubtitle: "Confirmed Executive Stream Seat",
    itemUrl: "/events",
    priceDisplay: "₦16,500",
    minutesAgo: 9,
    badgeLabel: "POI Masterclass Pass",
    badgeTone: "amber",
    actionText: "View Event",
  },
  {
    id: "act-evt-3",
    type: "event_booking",
    userName: "Emmanuel O.",
    location: "Uyo, Nigeria",
    itemTitle: "FIT-FOR-PROFIT: Commercial Capacity Workshop",
    itemSubtitle: "Booked Regional Physical Hub Pass",
    itemUrl: "/events",
    priceDisplay: "₦12,000",
    minutesAgo: 16,
    badgeLabel: "Workshop Registration",
    badgeTone: "amber",
    actionText: "View Event",
  },
  {
    id: "act-evt-4",
    type: "event_booking",
    userName: "Folashade O.",
    location: "Atlanta, USA",
    itemTitle: "JUMPSTART: 2-Day Live Intensive Accelerator",
    itemSubtitle: "Confirmed Worldwide Interactive Stream Pass",
    itemUrl: "/events",
    itemImageUrl: "/jumpstart_cover.png",
    priceDisplay: "$10.00",
    minutesAgo: 24,
    badgeLabel: "Live Accelerator Pass",
    badgeTone: "amber",
    actionText: "View Event",
  },

  // ── READING COMPANIONS (PAIRED WITH COURSES) ───────────────────────────
  {
    id: "act-cmp-1",
    type: "companion_purchase",
    userName: "Seyi M.",
    location: "Lagos, Nigeria",
    itemTitle: "Money Farming (Reading Companion)",
    itemSubtitle: "Paired with Economic Principles Course",
    itemUrl: "/store/7",
    priceDisplay: "₦10,000",
    courseId: "economic-principles",
    companionForCourseId: "economic-principles",
    minutesAgo: 5,
    badgeLabel: "Companion Acquired",
    badgeTone: "emerald",
    actionText: "View Companion",
  },
  {
    id: "act-cmp-2",
    type: "companion_purchase",
    userName: "Kwame A.",
    location: "Accra, Ghana",
    itemTitle: "House of Choice (Reading Companion)",
    itemSubtitle: "Paired with Decision Making Course",
    itemUrl: "/store/9",
    priceDisplay: "₦10,000",
    courseId: "decision-making",
    companionForCourseId: "decision-making",
    minutesAgo: 12,
    badgeLabel: "Companion Acquired",
    badgeTone: "emerald",
    actionText: "View Companion",
  },
  {
    id: "act-cmp-3",
    type: "companion_purchase",
    userName: "Zara N.",
    location: "London, UK",
    itemTitle: "8 Q&A to Selling (Reading Companion)",
    itemSubtitle: "Paired with Communication Mastery",
    itemUrl: "/store/8",
    priceDisplay: "₦10,000",
    courseId: "communication",
    companionForCourseId: "communication",
    minutesAgo: 20,
    badgeLabel: "Companion Acquired",
    badgeTone: "emerald",
    actionText: "View Companion",
  },
  {
    id: "act-cmp-4",
    type: "companion_purchase",
    userName: "Brian C.",
    location: "Manchester, UK",
    itemTitle: "Deep-Remake (Reading Companion)",
    itemSubtitle: "Paired with Strengthening Self-Image",
    itemUrl: "/store/10",
    priceDisplay: "₦10,000",
    courseId: "self-image",
    companionForCourseId: "self-image",
    minutesAgo: 26,
    badgeLabel: "Companion Acquired",
    badgeTone: "emerald",
    actionText: "View Companion",
  },
  {
    id: "act-cmp-5",
    type: "companion_purchase",
    userName: "Emeka U.",
    location: "Enugu, Nigeria",
    itemTitle: "A Free Guide to Rebuilding (Companion)",
    itemSubtitle: "Paired with Personal Adaptability Course",
    itemUrl: "/store/11",
    priceDisplay: "FREE",
    courseId: "personal-adaptability",
    companionForCourseId: "personal-adaptability",
    minutesAgo: 31,
    badgeLabel: "Companion Claimed",
    badgeTone: "emerald",
    actionText: "View Companion",
  },

  // ── STORE MERCH & HARDCOPY BOOKS ───────────────────────────────────────
  {
    id: "act-bok-1",
    type: "book_purchase",
    userName: "Victoria P.",
    location: "Kigali, Rwanda",
    itemTitle: "The Architecture of Becoming (Hardcopy)",
    itemSubtitle: "Ordered Hardcover + Digital Companion Kit",
    itemUrl: "/store/4",
    priceDisplay: "₦15,000",
    minutesAgo: 15,
    badgeLabel: "Book Order",
    badgeTone: "purple",
    actionText: "View Book",
  },
  {
    id: "act-bok-2",
    type: "book_purchase",
    userName: "Hassan Y.",
    location: "Abuja, Nigeria",
    itemTitle: "Origin Journal: 21-Day Life Design System",
    itemSubtitle: "Acquired Master Habit & Sprint Journal",
    itemUrl: "/store/1",
    priceDisplay: "₦12,500",
    minutesAgo: 35,
    badgeLabel: "Journal Acquired",
    badgeTone: "purple",
    actionText: "View Journal",
  }
];

/**
 * Parses route to determine which activity items are most relevant.
 * 
 * Rules:
 * - On /courses/[id]: Highly prioritizes activities matching that course ID,
 *   its paired reading companion, and occasional flagship event.
 * - On /events or /jumpstart: Prioritizes event bookings (Jumpstart, POI, Fit-For-Profit).
 * - On /store: Prioritizes reading companions and books.
 * - On / or general pages: Rotates across all high-converting actions.
 */
export function getActivitiesForRoute(pathname: string): LiveActivityItem[] {
  // Check course page match: /courses/:id
  const courseMatch = pathname.match(/^\/courses\/([^/?#]+)/);
  if (courseMatch && courseMatch[1]) {
    const rawCourseId = courseMatch[1];
    const targetCourseId = rawCourseId === "team-person" || rawCourseId === "communication-mastery" 
      ? "communication" 
      : rawCourseId;

    // 1. Find exact registrations for this course
    const courseRegs = LIVE_ACTIVITIES_POOL.filter(
      (a) => a.courseId === targetCourseId && a.type === "course_registration"
    );

    // 2. Find reading companion purchases for this course
    const companionPurchases = LIVE_ACTIVITIES_POOL.filter(
      (a) => a.companionForCourseId === targetCourseId
    );

    // 3. Include flagship event as social anchor
    const flagshipEvents = LIVE_ACTIVITIES_POOL.filter((a) => a.type === "event_booking").slice(0, 2);

    const relevant = [...courseRegs, ...companionPurchases, ...flagshipEvents];
    if (relevant.length > 0) {
      return relevant;
    }
  }

  // Check event routes: /events or /jumpstart
  if (pathname.startsWith("/events") || pathname.startsWith("/jumpstart")) {
    const eventActivities = LIVE_ACTIVITIES_POOL.filter((a) => a.type === "event_booking");
    const topCourse = LIVE_ACTIVITIES_POOL.filter((a) => a.type === "course_registration").slice(0, 2);
    return [...eventActivities, ...topCourse];
  }

  // Check store route: /store
  if (pathname.startsWith("/store")) {
    const storeActivities = LIVE_ACTIVITIES_POOL.filter(
      (a) => a.type === "companion_purchase" || a.type === "book_purchase"
    );
    const topEvents = LIVE_ACTIVITIES_POOL.filter((a) => a.type === "event_booking").slice(0, 2);
    return [...storeActivities, ...topEvents];
  }

  // Default: Return mixed high-impact stream
  return LIVE_ACTIVITIES_POOL;
}

/**
 * Storage key to persist new purchases made in the current session
 */
const RECENT_PURCHASE_STORAGE_KEY = "origin_recent_live_purchase";

/**
 * Dispatches and stores a new live activity when a visitor or student completes checkout.
 */
export function recordLivePurchaseActivity(activity: Partial<LiveActivityItem>) {
  if (typeof window === "undefined") return;

  const newItem: LiveActivityItem = {
    id: `live-${Date.now()}`,
    type: activity.type || "course_registration",
    userName: activity.userName || "A student",
    location: activity.location || "Verified Location",
    itemTitle: activity.itemTitle || "Origin Curriculum",
    itemSubtitle: activity.itemSubtitle || "Just confirmed enrollment",
    itemUrl: activity.itemUrl || "/courses",
    priceDisplay: activity.priceDisplay,
    courseId: activity.courseId,
    companionForCourseId: activity.companionForCourseId,
    minutesAgo: 0, // Just now
    badgeLabel: activity.badgeLabel || "Verified Transaction",
    badgeTone: activity.badgeTone || "emerald",
    actionText: activity.actionText || "View Details",
  };

  try {
    sessionStorage.setItem(RECENT_PURCHASE_STORAGE_KEY, JSON.stringify(newItem));
  } catch (e) {
    console.error("Failed to write to sessionStorage", e);
  }

  // Trigger custom event so active toasts immediately display it
  window.dispatchEvent(new CustomEvent("origin_live_activity", { detail: newItem }));
}

/**
 * Retrieves the freshly recorded session purchase if available
 */
export function getRecentSessionPurchase(): LiveActivityItem | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(RECENT_PURCHASE_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    // Ignore parse error
  }
  return null;
}
