import { eq } from "drizzle-orm";
import { db, assertDbConnection } from "../index.js";
import { notesTable, type NewNote } from "../schema.js";

export async function createNote(note: NewNote) {
	assertDbConnection();
	// biome-ignore lint/style/noNonNullAssertion: db is guaranteed non-null after assertDbConnection
	const rows = await db!.insert(notesTable).values(note).returning();
	if (rows.length === 0) {
		throw new Error("Failed to create note");
	}

	return rows[0];
}

export async function getNote(id: string) {
	assertDbConnection();
	// biome-ignore lint/style/noNonNullAssertion: db is guaranteed non-null after assertDbConnection
	const rows = await db!.select().from(notesTable).where(eq(notesTable.id, id));
	return rows.length > 0 ? rows[0] : null;
}

export async function getNotesForUser(id: string) {
	assertDbConnection();
	// biome-ignore lint/style/noNonNullAssertion: db is guaranteed non-null after assertDbConnection
	const rows = await db!
		.select()
		.from(notesTable)
		.where(eq(notesTable.userId, id));
	return rows;
}
