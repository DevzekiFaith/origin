"use client";

export interface EventSeatStats {
  eventId: number;
  programTitle: string;
  totalSpots: number;
  seatsTaken: number;
  spotsRemaining: number;
  fillPercentage: number;
  lastRegistrationTime?: number;
}

export interface LiveRegistration {
  id: string;
  eventId: number;
  eventTitle: string;
  attendeeName: string;
  role: string;
  city: string;
  country: string;
  ticketType: "Solo Executive Pass" | "Co-Founder Dual Pass";
  timestamp: number;
  formattedTime: string;
}

export interface UserEventRegistration {
  id: string;
  eventId: number;
  eventTitle: string;
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone?: string;
  mode: "Virtual HD Stream" | "Onsite Hub (Lagos)" | "Onsite Hub (Abuja)";
  ticketType: "Solo Executive Pass" | "Co-Founder Dual Pass";
  paymentPlan?: "full" | "deposit";
  depositPaidNGN?: number;
  balanceDueNGN?: number;
  registeredAt: string;
  accessStatus: "confirmed" | "waitlist" | "deposit_locked";
}

// Initial baseline cohort capacities and registrations (Standard 80-seat target for all executive cohorts)
export const INITIAL_EVENT_SEATS: Record<number, { total: number; taken: number; title: string }> = {
  7: { total: 80, taken: 56, title: "JUMPSTART: 2-Day Live Intensive Accelerator" },
  12: { total: 80, taken: 56, title: "MASTERCLASS: Becoming a Person of Interest (POI)" },
  22: { total: 80, taken: 56, title: "SUCCESS MULTIPLIER: How to Elevate Every Team You Step Into" },
  16: { total: 80, taken: 56, title: "FIT-FOR-PROFIT: Commercial Capacity Workshop" },
};

const STORAGE_KEY = "origin_event_live_seats_v4";
const USER_REG_KEY = "origin_user_event_registrations_v2";

export function getStoredEventSeats(): Record<number, number> {
  if (typeof window === "undefined") return { 7: 56, 12: 56, 22: 56, 16: 56 };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        7: parsed[7] ?? INITIAL_EVENT_SEATS[7].taken,
        12: parsed[12] ?? INITIAL_EVENT_SEATS[12].taken,
        22: parsed[22] ?? INITIAL_EVENT_SEATS[22].taken,
        16: parsed[16] ?? INITIAL_EVENT_SEATS[16].taken,
      };
    }
  } catch (e) {
    console.warn("Could not read event seats from localStorage", e);
  }
  return { 7: 56, 12: 56, 22: 56, 16: 56 };
}

export function saveStoredEventSeats(seats: Record<number, number>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seats));
    window.dispatchEvent(new CustomEvent("origin_event_seat_update", { detail: seats }));
  } catch (e) {
    console.warn("Could not write event seats to localStorage", e);
  }
}

export function getEventStats(eventId: number): EventSeatStats {
  const base = INITIAL_EVENT_SEATS[eventId] || { total: 80, taken: 56, title: "Origin Event" };
  const currentSeats = getStoredEventSeats();
  
  // Real active user registrations for this event
  const userRegs = getUserEventRegistrations();
  const realUserSeats = userRegs
    .filter(r => r.eventId === eventId)
    .reduce((sum, r) => sum + (r.ticketType === "Co-Founder Dual Pass" ? 2 : 1), 0);

  const baseTaken = currentSeats[eventId] ?? base.taken;
  const taken = Math.min(base.total, Math.max(baseTaken, base.taken + realUserSeats));
  const remaining = Math.max(0, base.total - taken);
  const fillPct = Math.min(100, Math.round((taken / base.total) * 100));

  return {
    eventId,
    programTitle: base.title,
    totalSpots: base.total,
    seatsTaken: taken,
    spotsRemaining: remaining,
    fillPercentage: fillPct,
  };
}

export function getAllEventsStats(): Record<number, EventSeatStats> {
  return {
    7: getEventStats(7),
    12: getEventStats(12),
    22: getEventStats(22),
    16: getEventStats(16),
  };
}

/**
 * Register a user for an event (from direct modal or checkout).
 * Increments seats taken, decreases spots remaining, stores ticket, and emits real-time event.
 */
export function recordUserEventRegistration(
  eventId: number,
  attendee: {
    name: string;
    email: string;
    phone?: string;
    mode?: "Virtual HD Stream" | "Onsite Hub (Lagos)" | "Onsite Hub (Abuja)";
    ticketType?: "Solo Executive Pass" | "Co-Founder Dual Pass";
    paymentPlan?: "full" | "deposit";
    depositPaidNGN?: number;
    balanceDueNGN?: number;
  }
): { stats: EventSeatStats; registration: UserEventRegistration } {
  const currentSeats = getStoredEventSeats();
  const base = INITIAL_EVENT_SEATS[eventId] || { total: 80, taken: 56, title: "Origin Event" };
  const oldTaken = currentSeats[eventId] ?? base.taken;
  const seatsToAdd = attendee.ticketType === "Co-Founder Dual Pass" ? 2 : 1;
  const newTaken = Math.min(base.total, oldTaken + seatsToAdd);

  currentSeats[eventId] = newTaken;
  saveStoredEventSeats(currentSeats);

  const registration: UserEventRegistration = {
    id: `REG-${eventId}-${Date.now().toString(36).toUpperCase()}`,
    eventId,
    eventTitle: base.title,
    attendeeName: attendee.name,
    attendeeEmail: attendee.email,
    attendeePhone: attendee.phone,
    mode: attendee.mode || "Virtual HD Stream",
    ticketType: attendee.ticketType || "Solo Executive Pass",
    paymentPlan: attendee.paymentPlan || "full",
    depositPaidNGN: attendee.depositPaidNGN,
    balanceDueNGN: attendee.balanceDueNGN,
    registeredAt: new Date().toISOString(),
    accessStatus: attendee.paymentPlan === "deposit" ? "deposit_locked" : "confirmed",
  };

  // Save to user event registrations
  if (typeof window !== "undefined") {
    try {
      const existingRaw = localStorage.getItem(USER_REG_KEY);
      const existing: UserEventRegistration[] = existingRaw ? JSON.parse(existingRaw) : [];
      existing.unshift(registration);
      localStorage.setItem(USER_REG_KEY, JSON.stringify(existing));

      // Also ensure it is marked in origin_guest_purchases so purchases page sees it
      const guestPurchasesRaw = localStorage.getItem("origin_guest_purchases");
      const guestPurchases: string[] = guestPurchasesRaw ? JSON.parse(guestPurchasesRaw) : [];
      const productKey = eventId === 7 ? "store-js-solo" : eventId === 12 ? "store-poi-solo" : eventId === 22 ? "store-team-solo" : "store-ffp-solo";
      if (!guestPurchases.includes(productKey)) {
        guestPurchases.push(productKey);
      }
      if (!guestPurchases.includes(`event-${eventId}`)) {
        guestPurchases.push(`event-${eventId}`);
      }
      localStorage.setItem("origin_guest_purchases", JSON.stringify(guestPurchases));
      window.dispatchEvent(new Event("origin_purchases_updated"));
    } catch (e) {
      console.warn("Could not save user registration", e);
    }
  }

  // Create live notification payload
  const liveNotice: LiveRegistration = {
    id: registration.id,
    eventId,
    eventTitle: base.title,
    attendeeName: attendee.name,
    role: "Registered Attendee",
    city: attendee.mode?.includes("Lagos") ? "Lagos" : attendee.mode?.includes("Abuja") ? "Abuja" : "Global Virtual",
    country: "Cohort",
    ticketType: registration.ticketType,
    timestamp: Date.now(),
    formattedTime: "Just now",
  };

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("origin_live_registration_alert", { detail: liveNotice }));
  }

  const stats = getEventStats(eventId);
  return { stats, registration };
}



export function getUserEventRegistrations(): UserEventRegistration[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USER_REG_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Reconciles and clears an attendee's balance payment once paid via direct checkout link or dashboard.
 * Switches their status to 'confirmed' (100% full VIP pass) with 0 balance remaining.
 */
export function markUserRegistrationBalancePaid(eventId: number, attendeeEmail: string) {
  if (typeof window === "undefined") return;
  try {
    const registrations = getUserEventRegistrations();
    let updated = false;

    const modified = registrations.map(reg => {
      const matchEvent = reg.eventId === eventId || !eventId;
      const matchEmail = reg.attendeeEmail.toLowerCase().trim() === attendeeEmail.toLowerCase().trim();
      if (matchEvent && matchEmail) {
        updated = true;
        return {
          ...reg,
          paymentPlan: "full" as const,
          balanceDueNGN: 0,
          accessStatus: "confirmed" as const,
        };
      }
      return reg;
    });

    if (updated) {
      localStorage.setItem(USER_REG_KEY, JSON.stringify(modified));
      window.dispatchEvent(new Event("origin_user_registrations_updated"));
      window.dispatchEvent(new Event("origin_purchases_updated"));
    }
  } catch (e) {
    console.warn("Could not update user registration balance status", e);
  }
}

