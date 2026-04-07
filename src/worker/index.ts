import { type Context, Hono, type Next } from "hono";
import { validator } from "hono/validator";
import * as jose from "jose";
import * as z from "zod";
import { type Application, applicationSchema } from "../applicationSchema";
import { deleteApplication } from "./db/queries/delete";
import { insertApplication } from "./db/queries/insert";
import { getAllApplications } from "./db/queries/select";
import { updateApplication } from "./db/queries/update";
import { calculateAllStats } from "./utils/stats";

type AppVariables = { userId: string };

type Env = {
  HYPERDRIVE: Hyperdrive;
};

const app = new Hono<{ Bindings: Env }>();

if (!import.meta.env.VITE_NEON_AUTH_URL) {
  console.error("URL not set")
}

const JWKS = jose.createRemoteJWKSet(
  new URL(`${import.meta.env.VITE_NEON_AUTH_URL}/.well-known/jwks.json`)
);

const authMiddleware = async (
  c: Context<{ Variables: AppVariables }>,
  next: Next
) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  const token = authHeader.split(" ")[1];

  try {
    const { payload } = await jose.jwtVerify(token, JWKS, {
      issuer: new URL(import.meta.env.VITE_NEON_AUTH_URL).origin,
    });
    if (!payload.sub) {
      return c.json({ error: "Invalid Token" }, 401);
    }

    c.set("userId", payload.sub);
    await next();
  } catch {
    return c.json({ error: "Invalid Token" }, 401);
  }
};

app.get("/api", authMiddleware, async (c: Context) => {
  const user_id = c.get("userId");
  const results = await getAllApplications(c, user_id);

  const data: Application[] = results.map((app) => ({
    ...app,
    user_id: app.user_id ?? undefined,
  }));

  return c.json({ data }, 200);
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
  authMiddleware,
  async (c) => {
    const user_id = c.get("userId");
    const data = c.req.valid("json");
    const res = { ...data, user_id };
    await insertApplication(c, res);
    return c.json({ success: true }, 200);
  }
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
  authMiddleware,
  async (c) => {
    const id = c.req.valid("param");
    const data = c.req.valid("json");
    const user_id = c.get("userId");
    const res = { ...data, user_id };

    await updateApplication(c, id.id, res, user_id);

    return c.json({ success: true }, 200);
  }
);


app.delete(
  "/api/:id",
  validator("param", (value, c) => {
    const schema = z.object({ id: z.uuid() });
    const result = schema.safeParse(value);

    if (!result.success) {
      return c.json({ error: result.error }, 400);
    }

    return result.data;
  }),
  authMiddleware,
  async (c) => {
    const userId = c.get("userId");
    const id = c.req.param("id");
    await deleteApplication(c, id, userId);

    return c.json({ success: true }, 200);
  }
);


app.get("/api/stats", authMiddleware, async (c) => {
  const user_id = c.get("userId");
  const results = await getAllApplications(c, user_id);

  const data: Application[] = results.map((app) => ({
    ...app,
    user_id: app.user_id ?? undefined,
  }));

  const stats = calculateAllStats(data);

  return c.json({ stats }, 200);
});
export default app;
