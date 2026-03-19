import { eq } from "drizzle-orm";
import { createDb } from "..";
import { type SelectApplication, applicationTable } from "../schema";

export async function deleteApplication(env, id: SelectApplication["id"]) {
  const db = createDb(env);
  await db.delete(applicationTable).where(eq(applicationTable.id, id));
}
