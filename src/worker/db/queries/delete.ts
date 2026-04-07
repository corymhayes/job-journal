import { and, eq } from "drizzle-orm";
import type { Context } from "hono";
import { createDB } from "..";
import { type SelectApplication, applicationTable } from "../schema";

export async function deleteApplication(
  c: Context,
  id: SelectApplication["id"],
  user_id: string
) {
  const db = await createDB(c);
  return db
    .delete(applicationTable)
    .where(
      and(eq(applicationTable.id, id), eq(applicationTable.user_id, user_id))
    );
}
