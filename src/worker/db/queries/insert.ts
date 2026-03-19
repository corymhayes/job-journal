import { createDb } from "..";
import { type InsertApplication, applicationTable } from "../schema";

export async function insertApplication(env, data: InsertApplication) {
  const db = createDb(env);
  await db.insert(applicationTable).values(data);
}
