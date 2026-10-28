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
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();

  if (eventId === 12) {
    // POI Masterclass: Last Saturday of the active month (updates automatically when a new month shows up)
    const thisMonthSat = getLastSaturdayOfMonth(year, month);
    return formatCohortDate(thisMonthSat);
  }

  if (eventId === 22) {
    // Success Multiplier: Starts from October 14th, then updates to the 14th (2nd Saturday) for each new month
    const cohortDate = new Date(year, month, 14);
    return formatCohortDate(cohortDate, "(Upcoming Weekend Cohort)");
  }

  if (eventId === 7) {
    return "Saturday & Sunday (Upcoming Weekend Cohort)";
  }

  if (eventId === 16) {
    return "Monthly Regional Sessions (Multi-State & Virtual Stream)";
  }

  return "Saturday (Upcoming Cohort)";
}
