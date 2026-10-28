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
  const todayStart = new Date(year, month, referenceDate.getDate()).getTime();

  if (eventId === 12) {
    // POI Masterclass: Last Saturday of every month
    const thisMonthSat = getLastSaturdayOfMonth(year, month);
    const thisMonthSatStart = new Date(thisMonthSat.getFullYear(), thisMonthSat.getMonth(), thisMonthSat.getDate()).getTime();

    // If today is on or before this month's last Saturday, show this month's date
    if (todayStart <= thisMonthSatStart) {
      return formatCohortDate(thisMonthSat);
    }

    // Otherwise, transition to next month's last Saturday
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    return formatCohortDate(getLastSaturdayOfMonth(nextYear, nextMonth));
  }

  if (eventId === 22) {
    // Success Multiplier: 2nd Saturday of every month
    const thisMonthSat = getNthSaturdayOfMonth(year, month, 2);
    const thisMonthSatStart = new Date(thisMonthSat.getFullYear(), thisMonthSat.getMonth(), thisMonthSat.getDate()).getTime();

    if (todayStart <= thisMonthSatStart) {
      return formatCohortDate(thisMonthSat, "(Upcoming Weekend Cohort)");
    }

    // Otherwise, transition to next month's 2nd Saturday
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    return formatCohortDate(getNthSaturdayOfMonth(nextYear, nextMonth, 2), "(Upcoming Weekend Cohort)");
  }

  if (eventId === 7) {
    return "Saturday & Sunday (Upcoming Weekend Cohort)";
  }

  if (eventId === 16) {
    return "Monthly Regional Sessions (Multi-State & Virtual Stream)";
  }

  return "Saturday (Upcoming Cohort)";
}
