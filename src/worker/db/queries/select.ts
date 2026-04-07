import { eq } from "drizzle-orm";
import type { Context } from "hono";
import { createDB } from "..";
import { applicationTable } from "../schema";

// export async function getAllApplications(env: string, user_id: string) {
// const db = createDB(env);
export const getAllApplications = async (c: Context, user_id: string) => {
  const db = await createDB(c);
  return db
    .select()
    .from(applicationTable)
    .where(eq(applicationTable.user_id, user_id))
    .orderBy(applicationTable.date_applied);
};
