import { Hono } from "hono";
import { validator } from "hono/validator";
import { db } from "./db";
import * as z from "zod";
import { type Application, applicationSchema } from "../applicationSchema";
import { applicationTable } from "./db/schema";
import { getAllApplications } from "./db/queries/select";
import { insertApplication } from "./db/queries/insert";
import { deleteApplication } from "./db/queries/delete";
import { updateApplication } from "./db/queries/update";
import {
  findApplicationsInMonth,
  findInProgress,
  findResponseRate,
  getCurrentMonth,
  getPreviousMonth,
  pipelineValues,
} from "./utils/stats";

type Env = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Env }>();

app.get("/api", async (c) => {
  console.log(c.env);
  const results = await getAllApplications(c.env.DATABASE_URL);
  return c.json(results, { status: 200 });
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
    const data = c.req.valid("json");
    await insertApplication(data);
    return c.json("", { status: 200 });
  },
);

app.put(
  "/api/:id",
  validator("param", (value, c) => {
    const schema = z.object({ id: z.uuid() });
    const result = schema.safeParse(value);

    if (!result.success) {
      return c.json({ error: result.error }, 400);
    }

    return result.data;
  }),
  validator("json", (value, c) => {
    const result = applicationSchema.safeParse(value);
    if (!result.success) {
      return c.json({ error: result.error }, 400);
    }

    return result.data;
  }),
  async (c) => {
    const id = c.req.valid("param");
    const data = c.req.valid("json");
    await updateApplication(id.id, data);

    return c.json("", { status: 200 });
  },
);

app.delete("/api/:id", async (c) => {
  const id = c.req.param("id");
  await deleteApplication(id);

  return c.json("", { status: 200 });
});

// app.get("/api/stats", async (c) => {
//   const results: Application[] = await db.select().from(applicationTable);
//   const currentMonth = getCurrentMonth(results);
//   const previousMonth = getPreviousMonth(results);

//   return c.json({
//     applications_in_month: findApplicationsInMonth(currentMonth, previousMonth),
//     in_progress: findInProgress(currentMonth, previousMonth),
//     response_rate: findResponseRate(currentMonth, previousMonth),
//     pipeline: pipelineValues(results),
//   });
// });

export default app;
