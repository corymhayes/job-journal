import type { Status, WorkStyle } from "../types/Options";

export type Application = {
  id: string;
  company: string;
  job: string;
  status: Status;
  work_style: WorkStyle;
  application_url: string | null;
  date_applied: string;
  date_response: string | null;
};
