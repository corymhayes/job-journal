import { sql } from "drizzle-orm";
import * as p from "drizzle-orm/pg-core";
import { STATUS_OPTIONS, WORK_STYLE_OPTIONS } from "../../types/Options";

export const statusEnum = p.pgEnum("status", STATUS_OPTIONS);
export const workStyleEnum = p.pgEnum("work_style", WORK_STYLE_OPTIONS);

export const applicationTable = p.pgTable("application", {
  id: p
    .uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  company: p.varchar({ length: 100 }).notNull(),
  job: p.varchar({ length: 100 }).notNull(),
  status: statusEnum().default("Applied").notNull(),
  work_style: workStyleEnum().default("Remote").notNull(),
  application_url: p.varchar({ length: 255 }),
  date_applied: p
    .date({ mode: "date" })
    .notNull()
    .default(sql`now()`),
  date_response: p.date({ mode: "date" }),
});

export type InsertApplication = typeof applicationTable.$inferInsert;
export type SelectApplication = typeof applicationTable.$inferSelect;
