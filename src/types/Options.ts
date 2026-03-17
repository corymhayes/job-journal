export const STATUS_OPTIONS = [
  "Applied",
  "Recruiter Screen",
  "Initial Interview",
  "Technical Interview",
  "Final Interview",
  "Offer",
  "Rejected",
  "Withdrawn",
] as const;

export const WORK_STYLE_OPTIONS = ["Remote", "Onsite", "Hybrid"] as const;

export type Status = (typeof STATUS_OPTIONS)[number];
export type WorkStyle = (typeof WORK_STYLE_OPTIONS)[number];
