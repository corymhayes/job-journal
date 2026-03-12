export type ApplicationPayload = {
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
  application_url?: string;
  date_applied: Date;
  date_response: Date | null;
};
