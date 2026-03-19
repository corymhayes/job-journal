import { drizzle } from "drizzle-orm/neon-http";

// export const db = drizzle(process.env.DATABASE_URL!);

export function createDb(env) {
  return drizzle(env);
}
