/**
 * Dynamic Recurring Event Date Engine for Origin Cohorts & Masterclasses
 * 
 * Rules:
 * - Event 12 (POI Masterclass): Last Saturday of every month.
 * - Event 22 (Success Multiplier): 2nd Saturday of every month.
 * - When a new month shows up, or once the current month's scheduled cohort date has passed,
 *   the system automatically computes and displays the next active scheduled Saturday.
 */

/**
 * Returns the Date for the last Saturday of a given year and month (0-indexed).
 */
export function getLastSaturdayOfMonth(year: number, monthIndex: number): Date {
  // Last day of the month
  const lastDay = new Date(year, monthIndex + 1, 0);
  const dayOfWeek = lastDay.getDay(); // 0 = Sunday, 6 = Saturday
  const diff = (dayOfWeek - 6 + 7) % 7;
  lastDay.setDate(lastDay.getDate() - diff);
  lastDay.setHours(17, 0, 0, 0); // 5:00 PM WAT
  return lastDay;
}

/**
 * Returns the Date for the Nth Saturday of a given year and month (0-indexed).
 * e.g., nth = 3 for the 3rd Saturday.
 */
export function getNthSaturdayOfMonth(year: number, monthIndex: number, nth: number = 3): Date {
  const firstDay = new Date(year, monthIndex, 1);
  const dayOfWeek = firstDay.getDay(); // 0 = Sunday, 6 = Saturday
  const daysToFirstSat = (6 - dayOfWeek + 7) % 7;
  const firstSatDate = 1 + daysToFirstSat;
  const targetDate = firstSatDate + (nth - 1) * 7;
  const result = new Date(year, monthIndex, targetDate);
  result.setHours(10, 0, 0, 0); // 10:00 AM WAT
  return result;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function formatCohortDate(date: Date, suffix?: string): string {
  const month = MONTH_NAMES[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const base = `Saturday, ${month} ${day}, ${year}`;
  return suffix ? `${base} ${suffix}` : base;
}

/**
 * Computes the upcoming cohort date string for any event.
 * Synchronizes across the website dynamically when a new month shows up.
 */
export function getUpcomingCohortDate(eventId: number, referenceDate: Date = new Date()): string {
  const targetDate = getNextCohortTargetDate(eventId, referenceDate);

  if (eventId === 12) {
    // POI Masterclass: Last Saturday of the active month (updates automatically when a new month shows up)
    return formatCohortDate(targetDate);
  }

  if (eventId === 22) {
    // Success Multiplier: 2nd Saturday of active month (automatically rolls over to November once October date passes)
    return formatCohortDate(targetDate, "(Upcoming Weekend Cohort)");
  }

  if (eventId === 7) {
    return "Saturday & Sunday (Upcoming Weekend Cohort)";
  }

  if (eventId === 16) {
    return "Monthly Regional Sessions (Multi-State & Virtual Stream)";
  }

  return formatCohortDate(targetDate, "(Upcoming Cohort)");
}

/**
 * Returns the exact upcoming Date object for any event cohort.
 * Synchronizes with real calendar time.
 */
export function getNextCohortTargetDate(eventId: number, referenceDate: Date = new Date()): Date {
  const now = referenceDate.getTime();
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();

  if (eventId === 12) {
    // Last Saturday of current month at 5:00 PM WAT
    let target = getLastSaturdayOfMonth(year, month);
    if (target.getTime() <= now) {
      target = getLastSaturdayOfMonth(year, month + 1);
    }
    return target;
  }

  if (eventId === 22) {
    // Success Multiplier: 2nd Saturday of month at 10:00 AM WAT (e.g. November 14, 2026)
    // Rollover to next month when current month's scheduled date is in the past
    let target = getNthSaturdayOfMonth(year, month, 2);
    if (target.getTime() <= now) {
      target = getNthSaturdayOfMonth(year, month + 1, 2);
    }
    return target;
  }

  if (eventId === 7) {
    // Jumpstart: Next upcoming Saturday at 5:00 PM WAT (17:00)
    const dayOfWeek = referenceDate.getDay();
    const daysUntilSat = (6 - dayOfWeek + 7) % 7;
    const target = new Date(
      year,
      month,
      referenceDate.getDate() + (daysUntilSat === 0 && referenceDate.getHours() >= 17 ? 7 : daysUntilSat),
      17,
      0,
      0,
      0
    );
    return target;
  }

  if (eventId === 16) {
    // Fit-For-Profit: 3rd Saturday of month at 10:00 AM WAT
    let target = getNthSaturdayOfMonth(year, month, 3);
    if (target.getTime() <= now) {
      target = getNthSaturdayOfMonth(year, month + 1, 3);
    }
    return target;
  }

  // Default fallback: next Saturday 5:00 PM
  const dayOfWeek = referenceDate.getDay();
  const daysUntilSat = (6 - dayOfWeek + 7) % 7;
  return new Date(
    year,
    month,
    referenceDate.getDate() + (daysUntilSat === 0 ? 7 : daysUntilSat),
    17,
    0,
    0,
    0
  );
}

/**
 * Returns the final balance payment deadline (exactly 3 days before the cohort begins, Wednesday midnight WAT).
 */
export function getBalanceDeadlineDate(eventTargetDate: Date): Date {
  return getDepositCutoffDate(eventTargetDate);
}

/**
 * Returns the exact cutoff time when the 2-Stage Deposit option closes.
 * Option 2: The 2-Stage Deposit option stays open until exactly 3 days before the event (Wednesday midnight WAT),
 * since that is when balances are due.
 * Inside the final 48–72 hours (Thursday 00:00:00 WAT onwards), it switches to instant Pay In Full.
 */
export function getDepositCutoffDate(eventTargetDate: Date): Date {
  const cutoff = new Date(eventTargetDate);
  // Subtract 3 calendar days (Saturday -> Wednesday)
  cutoff.setDate(cutoff.getDate() - 3);
  // Set to end of Wednesday (23:59:59.999 WAT)
  cutoff.setHours(23, 59, 59, 999);
  return cutoff;
}

/**
 * Checks whether the 2-Stage Deposit option is available for an event cohort.
 * Per Option 2:
 * - Deposit is allowed until Wednesday midnight (23:59:59 WAT) exactly 3 days prior.
 * - Inside the final 48–72 hours (Thursday 00:00:00 WAT through event start), it switches to instant Pay In Full.
 */
export function isDepositWindowActive(eventId: number, referenceDate: Date = new Date()): boolean {
  const cohortDate = getNextCohortTargetDate(eventId, referenceDate);
  const cutoff = getDepositCutoffDate(cohortDate);
  return referenceDate.getTime() <= cutoff.getTime();
}

/**
 * Calculates remaining time components to any target date.
 */
export function calculateCohortTimeRemaining(targetDate: Date, fromDate: Date = new Date()) {
  const diff = targetDate.getTime() - fromDate.getTime();
  if (diff <= 0) {
    return { totalMs: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { totalMs: diff, days, hours, minutes, seconds, isPast: false };
}

/**
 * Checks whether Early-Bird pricing is currently active for an event cohort.
 * Early-Bird remains active until 5 days (5 * 24 * 60 * 60 * 1000 ms) before the cohort starts.
 * Within the final 5 days, tuition transitions to the Standard General Admission rate (₦50,000 for Jumpstart).
 */
export function isEarlyBirdActive(eventId: number, referenceDate: Date = new Date()): boolean {
  const cohortDate = getNextCohortTargetDate(eventId, referenceDate);
  const diffMs = cohortDate.getTime() - referenceDate.getTime();
  const fiveDaysMs = 5 * 24 * 60 * 60 * 1000;
  return diffMs > fiveDaysMs;
}

export interface DynamicPricingConfig {
  isEarlyBird: boolean;
  tierName: string;
  badgeText: string;
  soloNGN: number;
  soloUSD: number;
  duoNGN: number;
  duoUSD: number;
  anchorStandardNGN: number;
  anchorStandardUSD: number;
  allowsDeposit: boolean;
  depositNGN: number;
  depositUSD: number;
  balanceNGN: number;
  balanceUSD: number;
  duoDepositNGN: number;
  duoDepositUSD: number;
  duoBalanceNGN: number;
  duoBalanceUSD: number;
}

/**
 * Returns dynamic event pricing based on real calendar distance to the upcoming cohort.
 * Option 2 Rules:
 * - The price increases from ₦35,000 to ₦50,000 at 5 days prior.
 * - The 2-Stage Deposit option stays open until exactly 3 days before the event (Wednesday midnight WAT),
 *   since that is when balances are due.
 * - Inside the final 48–72 hours (Thursday 00:00:00 WAT onwards), it switches to instant Pay In Full.
 * - Existing deposit holders who locked in earlier keep their locked ₦20,000 balance!
 */
export function getDynamicEventPricing(eventId: number, referenceDate: Date = new Date()): DynamicPricingConfig {
  const earlyBird = isEarlyBirdActive(eventId, referenceDate);
  const depositAllowed = isDepositWindowActive(eventId, referenceDate);

  if (eventId === 7) {
    // Jumpstart: 2-Day Live Intensive Accelerator
    const soloNGN = earlyBird ? 35000 : 50000;
    const soloUSD = earlyBird ? 25 : 35;
    const duoNGN = earlyBird ? 61250 : 87500; // 15% off duo
    const duoUSD = earlyBird ? 44 : 60;

    return {
      isEarlyBird: earlyBird,
      tierName: earlyBird ? "Founder Early-Bird Rate" : "Standard General Admission",
      badgeText: earlyBird ? "Limited Early-Bird Cohort" : "Late General Admission (Closing Soon)",
      soloNGN,
      soloUSD,
      duoNGN,
      duoUSD,
      anchorStandardNGN: 95000,
      anchorStandardUSD: 70,
      allowsDeposit: depositAllowed,
      depositNGN: earlyBird ? 15000 : 20000,
      depositUSD: earlyBird ? 11 : 14,
      balanceNGN: earlyBird ? 20000 : 30000,
      balanceUSD: earlyBird ? 14 : 21,
      duoDepositNGN: earlyBird ? 26250 : 37500,
      duoDepositUSD: earlyBird ? 19 : 26,
      duoBalanceNGN: earlyBird ? 35000 : 50000,
      duoBalanceUSD: earlyBird ? 25 : 34,
    };
  }

  if (eventId === 12) {
    // POI Masterclass: Becoming a Person of Interest
    const soloNGN = earlyBird ? 30000 : 45000;
    const soloUSD = earlyBird ? 20 : 30;
    const duoNGN = earlyBird ? 51000 : 76500;
    const duoUSD = earlyBird ? 34 : 50;

    return {
      isEarlyBird: earlyBird,
      tierName: earlyBird ? "Founder Early-Bird Rate" : "Standard General Admission",
      badgeText: earlyBird ? "Limited Early-Bird Cohort" : "Late General Admission (Closing Soon)",
      soloNGN,
      soloUSD,
      duoNGN,
      duoUSD,
      anchorStandardNGN: 85000,
      anchorStandardUSD: 60,
      allowsDeposit: depositAllowed,
      depositNGN: earlyBird ? 12000 : 20000,
      depositUSD: earlyBird ? 9 : 14,
      balanceNGN: earlyBird ? 18000 : 25000,
      balanceUSD: earlyBird ? 11 : 16,
      duoDepositNGN: earlyBird ? 21000 : 36500,
      duoDepositUSD: earlyBird ? 14 : 24,
      duoBalanceNGN: earlyBird ? 30000 : 40000,
      duoBalanceUSD: earlyBird ? 20 : 26,
    };
  }

  if (eventId === 22) {
    // Success Multiplier: How to Elevate Every Team You Step Into
    const soloNGN = earlyBird ? 25000 : 35000;
    const soloUSD = earlyBird ? 18 : 25;
    const duoNGN = earlyBird ? 42000 : 55000;
    const duoUSD = earlyBird ? 30 : 38;

    return {
      isEarlyBird: earlyBird,
      tierName: earlyBird ? "Leadership Early-Bird Rate" : "Standard General Admission",
      badgeText: earlyBird ? "Limited Early-Bird Cohort" : "Standard Admission",
      soloNGN,
      soloUSD,
      duoNGN,
      duoUSD,
      anchorStandardNGN: 60000,
      anchorStandardUSD: 45,
      allowsDeposit: depositAllowed,
      depositNGN: earlyBird ? 10000 : 15000,
      depositUSD: earlyBird ? 7 : 11,
      balanceNGN: earlyBird ? 15000 : 20000,
      balanceUSD: earlyBird ? 11 : 14,
      duoDepositNGN: earlyBird ? 18000 : 25000,
      duoDepositUSD: earlyBird ? 13 : 18,
      duoBalanceNGN: earlyBird ? 24000 : 30000,
      duoBalanceUSD: earlyBird ? 17 : 20,
    };
  }

  // Fallback for Fit-For-Profit / Other Events
  const soloNGN = earlyBird ? 35000 : 50000;
  const soloUSD = earlyBird ? 25 : 35;
  const duoNGN = earlyBird ? 61250 : 87500;
  const duoUSD = earlyBird ? 44 : 60;

  return {
    isEarlyBird: earlyBird,
    tierName: earlyBird ? "Early-Bird Rate" : "Standard General Admission",
    badgeText: earlyBird ? "Limited Early-Bird" : "Standard Admission",
    soloNGN,
    soloUSD,
    duoNGN,
    duoUSD,
    anchorStandardNGN: 95000,
    anchorStandardUSD: 70,
    allowsDeposit: depositAllowed,
    depositNGN: earlyBird ? 15000 : 20000,
    depositUSD: earlyBird ? 11 : 14,
    balanceNGN: earlyBird ? 20000 : 30000,
    balanceUSD: earlyBird ? 14 : 21,
    duoDepositNGN: earlyBird ? 26250 : 37500,
    duoDepositUSD: earlyBird ? 19 : 26,
    duoBalanceNGN: earlyBird ? 35000 : 50000,
    duoBalanceUSD: earlyBird ? 25 : 34,
  };
}


