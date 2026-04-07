import { drizzle } from "drizzle-orm/node-postgres";
import type { Context } from "hono";

export async function createDB(c: Context) {
  return drizzle({
    connection: {
      connectionString: c.env.HYPERDRIVE.connectionString,
    },
  });
}
