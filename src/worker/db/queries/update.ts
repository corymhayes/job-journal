import { and, eq } from "drizzle-orm";
import { createDB } from "..";
import { type SelectApplication, applicationTable } from "../schema";
import type { Context } from "hono";

export async function updateApplication(
  c: Context,
  id: SelectApplication["id"],
  data: Partial<Omit<SelectApplication, "id">>,
  user_id: string
) {
  const db = await createDB(c);
  return db
    .update(applicationTable)
    .set(data)
    .where(
      and(eq(applicationTable.id, id), eq(applicationTable.user_id, user_id))
    );
}
