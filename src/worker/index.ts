import * as z from "zod";
import { Hono } from "hono";
import { validator } from "hono/validator";
import { db } from "./db";
import { applicationTable } from "./db/schema";
import { insertApplication } from "./db/queries/insert";

import type { Application } from "../types/Application";
import { deleteApplication } from "./db/queries/delete";
import { updateApplication } from "./db/queries/update";

const applicationSchema = z.object({
  id: z.uuid().optional(),
  company: z.string().max(100),
  job: z.string().max(100),
  status: z
    .enum([
      "Applied",
      "Recruiter Screen",
      "Initial Interview",
      "Technical Interview",
      "Final Interview",
      "Offer",
      "Rejected",
      "Withdrawn",
    ])
    .nullable(),
  work_style: z.enum(["Remote", "Onsite", "Hybrid"]).nullable(),
  application_url: z.string().optional().nullable(),
  date_applied: z.coerce.date(),
  date_response: z.coerce.date().optional().nullable(),
});

const app = new Hono<{ Bindings: Env }>();

app.get("/api", async (c) => {
  const results = await db.select().from(applicationTable);
  const applications: Application[] = results.map((app) => ({
    ...app,
    date_applied: app.date_applied?.toISOString() ?? null,
    date_response: app.date_response?.toISOString() ?? null,
  }));

  return c.json(applications, { status: 200 });
});

app.post(
  "/api",
  validator("json", (value, c) => {
    const result = applicationSchema.safeParse(value);
    if (!result.success) {
      return c.json({ error: result.error }, 400);
    }

    return result.data;
  }),
  async (c) => {
    const data = await c.req.json();
    await insertApplication(data);
    return c.json("", { status: 200 });
  },
);

app.put(
  "/api/:id",
  validator("json", (value, c) => {
    const result = applicationSchema.safeParse(value);
    if (!result.success) {
      return c.json({ error: result.error }, 400);
    }

    return result.data;
  }),
  async (c) => {
    const id = c.req.param("id");
    const data = c.req.valid("json");
    await updateApplication(id, data);

    return c.json("", { status: 200 });
  },
);

app.delete("/api/:id", async (c) => {
  const id = c.req.param("id");
  await deleteApplication(id);

  return c.json("", { status: 200 });
});

export default app;
