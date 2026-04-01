import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import type { Context } from "hono";

// export async function createDB(env: string) {
//   return drizzle({
//     connection: {
//       connectionString: env,
//     },
//   });
// }

export const db = async (c: Context) => {
  const client = new Client({ connectionString: c.env.HYPERDRIVE.connectionString })
  await client.connect();
  return drizzle(client);
}
