import { eq } from "drizzle-orm";
import { db } from "..";
import { type SelectApplication, applicationTable } from "../schema";

export async function updateApplication(
  id: SelectApplication["id"],
  data: Partial<Omit<SelectApplication, "id">>,
) {
  await db
    .update(applicationTable)
    .set(data)
    .where(eq(applicationTable.id, id));
}
