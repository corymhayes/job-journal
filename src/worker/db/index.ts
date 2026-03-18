import { drizzle } from "drizzle-orm/neon-http";

export const db = drizzle(process.env.DATABASE_URL!);

export default {
  async fetch(env) {
    console.log(await env.DB_URL.get());
  },
};
