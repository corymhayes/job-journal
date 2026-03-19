import { eq } from "drizzle-orm";
import { createDb } from "..";
import { type SelectApplication, applicationTable } from "../schema";

export async function updateApplication(
  env,
  id: SelectApplication["id"],
  data: Partial<Omit<SelectApplication, "id">>,
) {
  const db = createDb(env);
  await db
    .update(applicationTable)
    .set(data)
    .where(eq(applicationTable.id, id));
}
