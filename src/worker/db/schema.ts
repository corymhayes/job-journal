import { sql } from "drizzle-orm";
import * as p from "drizzle-orm/pg-core";

export const statusEnum = p.pgEnum("status", [
  "Applied",
  "Recruiter Screen",
  "Initial Interview",
  "Technical Interview",
  "Final Interview",
  "Offer",
  "Rejected",
  "Withdrawn",
]);
export const workStyleEnum = p.pgEnum("work_style", [
  "Remote",
  "Onsite",
  "Hybrid",
]);

export const applicationTable = p.pgTable("application", {
  id: p
    .uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  company: p.varchar({ length: 100 }).notNull(),
  job: p.varchar({ length: 100 }).notNull(),
  status: statusEnum().default("Applied"),
  work_style: workStyleEnum(),
  application_url: p.varchar({ length: 255 }),
  date_applied: p
    .date({ mode: "date" })
    .notNull()
    .default(sql`now()`),
  date_response: p.date({ mode: "date" }),
});

export type InsertApplication = typeof applicationTable.$inferInsert;
export type SelectApplication = typeof applicationTable.$inferSelect;
