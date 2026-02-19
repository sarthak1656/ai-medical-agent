import { integer, json, pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits: integer().default(10), // Set default here so you don't have to in API
});

export const SessionChatTable = pgTable("sessionChatTable", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  sessionId: varchar().notNull(),
  notes: text(),
  selectedDoctor: json(),
  conversation: json(), // Fixed typo from 'conversatoion'
  report: json(),
  // Referencing email is fine, but make sure it's always lowercase in your API
  createdBy: varchar().references(() => usersTable.email), 
  createdOn: timestamp().defaultNow(), // Automatically sets the date
});