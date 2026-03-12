import { eq } from "drizzle-orm";
import { db } from "..";
import { type SelectApplication, applicationTable } from "../schema";

export async function deleteApplication(id: SelectApplication["id"]) {
  await db.delete(applicationTable).where(eq(applicationTable.id, id));
}
