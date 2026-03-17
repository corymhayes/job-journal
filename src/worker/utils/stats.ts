// import type { Application } from "../../types/Application";
import type { Application } from "../../applicationSchema";
import { STATUS_OPTIONS } from "../../types/Options";

function calculatePercentageChange(curr: number, prev: number) {
  let calculation = 0;

  if (prev === 0) {
    calculation = Math.ceil((curr - prev) * 100);
  } else {
    calculation = Math.ceil(((curr - prev) / prev) * 100);
  }

  return calculation;
}

export function getCurrentMonth(data: Application[]) {
  const foundMonths = [];
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  for (const d of data) {
    const dateSnapshot = new Date(d.date_applied);
    const monthSnapshot = dateSnapshot.getMonth();
    const yearSnapshot = dateSnapshot.getFullYear();

    if (monthSnapshot === currentMonth && yearSnapshot === currentYear) {
      foundMonths.push(d);
    }
  }

  return foundMonths;
}

export function getPreviousMonth(data: Application[]) {
  const foundMonths = [];
  const now = new Date();
  const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevMonth = prev.getMonth();
  const prevYear = prev.getFullYear();

  for (const d of data) {
    const dateSnapshot = new Date(d.date_applied);
    const monthSnapshot = dateSnapshot.getMonth();
    const yearSnapshot = dateSnapshot.getFullYear();

    if (monthSnapshot === prevMonth && yearSnapshot === prevYear) {
      foundMonths.push(d);
    }
  }

  return foundMonths;
}

export const findApplicationsInMonth = (
  currentApps: Application[],
  prevApps: Application[],
) => {
  const numberOfApps = currentApps.length;
  const percentChange = calculatePercentageChange(
    currentApps.length,
    prevApps.length,
  );

  return {
    numberOfApps,
    percentChange,
  };
};

export const findInProgress = (
  currentApps: Application[],
  prevApps: Application[],
) => {
  let currentInProgress = 0;
  let prevInProgress = 0;
  const currentStatus = currentApps.map((d) => d.status);
  const prevStatus = prevApps.map((p) => p.status);

  for (const curr of currentStatus) {
    if (
      curr === "Recruiter Screen" ||
      curr === "Initial Interview" ||
      curr === "Technical Interview" ||
      curr === "Final Interview"
    ) {
      currentInProgress += 1;
    }
  }

  for (const prev of prevStatus) {
    if (
      prev === "Recruiter Screen" ||
      prev === "Initial Interview" ||
      prev === "Technical Interview" ||
      prev === "Final Interview"
    ) {
      prevInProgress += 1;
    }
  }

  const percentChange = calculatePercentageChange(
    currentInProgress,
    prevInProgress,
  );

  return {
    inProgress: currentInProgress,
    percentChange,
  };
};

export const findResponseRate = (
  currentApps: Application[],
  prevApps: Application[],
) => {
  const currentResponses = currentApps.filter((d) => d.date_response).length;
  const previousRespones = prevApps.filter((d) => d.date_response).length;

  const currentRate =
    currentApps.length > 0 ? (currentResponses / currentApps.length) * 100 : 0;

  const percentChange = calculatePercentageChange(
    currentResponses,
    previousRespones,
  );

  return {
    currentResponses: Math.floor(currentRate),
    percentChange,
  };
};

export const pipelineValues = (data: Application[]) => {
  const statusMap = new Map<string, number>();

  data.forEach((app) => {
    if (app.status) {
      statusMap.set(app.status, (statusMap.get(app.status) ?? 0) + 1);
    }
  });

  const total = data.length;

  return STATUS_OPTIONS.map((status) => ({
    name: status,
    value: statusMap.get(status) ?? 0,
    percentage:
      total > 0 ? Math.round(((statusMap.get(status) ?? 0) / total) * 100) : 0,
  }));
};
