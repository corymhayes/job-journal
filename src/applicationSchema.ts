import * as z from "zod";
import { STATUS_OPTIONS, WORK_STYLE_OPTIONS } from "./types/Options";

export const applicationSchema = z.object({
  id: z.uuid().optional(),
  company: z.string().max(100),
  job: z.string().max(100),
  status: z.enum(STATUS_OPTIONS).default("Applied"),
  work_style: z.enum(WORK_STYLE_OPTIONS).default("Remote"),
  application_url: z.string().nullish(),
  date_applied: z.coerce.date(),
  date_response: z.coerce.date().nullish(),
});

export const applicationFormSchema = z.object({
  id: z.uuid().optional(),
  company: z.string().max(100),
  job: z.string().max(100),
  status: z.enum(STATUS_OPTIONS),
  work_style: z.enum(WORK_STYLE_OPTIONS),
  application_url: z.string().nullish(),
  date_applied: z.date(),
  date_response: z.date().nullish(),
});

export const applicationPayloadSchema = z.object({
  id: z.uuid().optional(),
  company: z.string().max(100),
  job: z.string().max(100),
  status: z.enum(STATUS_OPTIONS),
  work_style: z.enum(WORK_STYLE_OPTIONS),
  application_url: z.string().optional(),
  date_applied: z.string(), // ISO date string
  date_response: z.string().nullable(),
});

export type Application = z.infer<typeof applicationSchema>;
export type ApplicationFormValues = z.infer<typeof applicationFormSchema>;
export type ApplicationPayload = z.infer<typeof applicationPayloadSchema>;
