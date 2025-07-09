import { eq } from "drizzle-orm";
import { db, assertDbConnection } from "../index.js";
import { usersTable, type NewUser } from "../schema.js";

export async function createUser(user: NewUser) {
  assertDbConnection();
  // biome-ignore lint/style/noNonNullAssertion: db is guaranteed non-null after assertDbConnection
  const rows = await db!.insert(usersTable).values(user).returning();
  if (rows.length === 0) {
    throw new Error("Failed to create user");
  }

  return rows[0];
}

export async function getUser(apiKey: string) {
  assertDbConnection();
  // biome-ignore lint/style/noNonNullAssertion: db is guaranteed non-null after assertDbConnection
  const rows = await db!
    .select()
    .from(usersTable)
    .where(eq(usersTable.apiKey, apiKey));
  return rows.length > 0 ? rows[0] : null;
}
