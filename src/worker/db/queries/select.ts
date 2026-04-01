import { eq } from "drizzle-orm";
// import { createDB } from "..";
import { applicationTable } from "../schema";
// import { Client } from "pg";
// import { drizzle } from "drizzle-orm/node-postgres";
import { db } from "../"
import type { Context } from "hono";

// export async function getAllApplications(env: string, user_id: string) {
  // const db = createDB(env);
export const getAllApplications = async (c: Context, user_id: string) => {
  const dbClient = await db(c);

  return dbClient
    .select()
    .from(applicationTable)
    .where(eq(applicationTable.user_id, user_id))
    .orderBy(applicationTable.date_applied);
}
