import { db } from "..";
import { applicationTable } from "../schema";

export async function getAllApplications() {
  return db
    .select()
    .from(applicationTable)
    .orderBy(applicationTable.date_applied);
}
