import type { Application } from "../../applicationSchema";
import { STATUS_OPTIONS } from "../../types/Options";
import type { Pipeline } from "../../types/Pipeline";

// Define in-progress statuses as a constant (also fixes the hardcoded enum issue)
const IN_PROGRESS_STATUSES = [
  "Recruiter Screen",
  "Initial Interview",
  "Technical Interview",
  "Final Interview",
] as const;
type InProgressStatuses = (typeof IN_PROGRESS_STATUSES)[number];

/**
 * Calculate percentage change between two values
 * @param curr Current value
 * @param prev Previous value
 * @returns Percentage change rounded up
 */
function calculatePercentageChange(curr: number, prev: number) {
  if (prev === 0) {
    return curr > 0 ? 100 : 0;
  }

  return Math.ceil(((curr - prev) / prev) * 100);
}

/**
 * Filter applications by a specific year and month
 * @param data Array of applications
 * @param year Target year
 * @param month Target month (0-indexed)
 * @returns Filtered applications
 */
export function getMonthlyApplications(data: Application[]) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const prevMonthDate = new Date(currentYear, currentMonth - 1, 1);
  const prevMonth = prevMonthDate.getMonth();
  const prevYear = prevMonthDate.getFullYear();

  const currentMonthApps: Application[] = [];
  const previousMonthApps: Application[] = [];

  for (const app of data) {
    const date = new Date(app.date_applied);
    const year = date.getFullYear();
    const month = date.getMonth();

    if (year === currentYear && month === currentMonth) {
      currentMonthApps.push(app);
    } else if (year === prevYear && month === prevMonth) {
      previousMonthApps.push(app);
    }
  }

  return { currentMonthApps, previousMonthApps };
}

export function calculateAllStats(data: Application[]) {
  const { currentMonthApps, previousMonthApps } = getMonthlyApplications(data);

  let currentInProgress = 0;
  let currentResponses = 0;
  let prevInProgress = 0;
  let prevResponses = 0;

  const statusCounts = new Map<string, number>();

  for (const app of data) {
    const status = app.status as string;
    statusCounts.set(status, (statusCounts.get(status) ?? 0) + 1);
  }

  for (const app of currentMonthApps) {
    if (IN_PROGRESS_STATUSES.includes(app.status as InProgressStatuses)) {
      currentInProgress += 1;
    }

    if (app.date_response) {
      currentResponses += 1;
    }
  }

  for (const app of previousMonthApps) {
    if (IN_PROGRESS_STATUSES.includes(app.status as InProgressStatuses)) {
      prevInProgress += 1;
    }

    if (app.date_response) {
      prevResponses += 1;
    }
  }

  const currentRate =
    currentMonthApps.length > 0
      ? (currentResponses / currentMonthApps.length) * 100
      : 0;
  // const prevRate = previousMonthApps.length > 0 ? (prevResponses / previousMonthApps.length) * 100 : 0;

  const pipeline: Pipeline[] = STATUS_OPTIONS.map((status) => ({
    name: status,
    value: statusCounts.get(status) ?? 0,
    percentage:
      data.length > 0
        ? Math.round(((statusCounts.get(status) ?? 0) / data.length) * 100)
        : 0,
  }));

  return {
    applications_in_month: {
      numberOfApps: currentMonthApps.length,
      percentageChange: calculatePercentageChange(
        currentMonthApps.length,
        previousMonthApps.length
      ),
    },
    in_progress: {
      inProgress: currentInProgress,
      percentageChange: calculatePercentageChange(
        currentInProgress,
        prevInProgress
      ),
    },
    response_rate: {
      currentResponses: Math.floor(currentRate),
      percentageChange: calculatePercentageChange(currentResponses, prevResponses),
    },
    pipeline,
  };
}
