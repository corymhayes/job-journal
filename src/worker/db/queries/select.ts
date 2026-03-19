import { createDb } from "../";
import { applicationTable } from "../schema";

export async function getAllApplications(env) {
  const db = createDb(env);
  return db
    .select()
    .from(applicationTable)
    .orderBy(applicationTable.date_applied);
}
