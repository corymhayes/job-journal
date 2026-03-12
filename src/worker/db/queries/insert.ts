import { db } from "..";
import { type InsertApplication, applicationTable } from "../schema";

export async function insertApplication(data: InsertApplication) {
  await db.insert(applicationTable).values(data);
}
