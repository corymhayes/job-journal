import type { Context } from "hono";
import { createDB } from "..";
import { type InsertApplication, applicationTable } from "../schema";

export async function insertApplication(c: Context, data: InsertApplication) {
  const db = await createDB(c);
  await db.insert(applicationTable).values(data);
}
