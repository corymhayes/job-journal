export type Application = {
  id?: string;
  company: string;
  job: string;
  status:
    | "Applied"
    | "Recruiter Screen"
    | "Initial Interview"
    | "Technical Interview"
    | "Final Interview"
    | "Offer"
    | "Rejected"
    | "Withdrawn"
    | null;
  work_style: "Remote" | "Onsite" | "Hybrid" | null;
  application_url: string | null;
  date_applied: string | null;
  date_response: string | null;
};
