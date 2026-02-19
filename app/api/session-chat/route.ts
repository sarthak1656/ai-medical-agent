import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

// Import your database instance and schemas
import { db } from "@/config/db";
import { usersTable, SessionChatTable } from "@/config/schema";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    if (!body) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }

    const { notes, selectedDoctor } = body;

    // Get the current authenticated user from Clerk
    const user = await currentUser();

    // 1. Authentication Guard
    if (!user || !user.primaryEmailAddress?.emailAddress) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    // Standardize email to lowercase for reliable DB lookups
    const email = user.primaryEmailAddress.emailAddress.toLowerCase();

    // 2. CHECK if user exists in your Postgres DB (Supabase/Neon)
    const existingUsers = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    // 3. IF NOT, CREATE the user record first
    // This prevents the Foreign Key Constraint error
    if (existingUsers.length === 0) {
      console.log("User not found in DB, syncing from Clerk...");
      await db.insert(usersTable).values({
        name: user.fullName || "New User",
        email: email,
        credits: 10,
      });
    }

    // 4. NOW insert the session chat
    const sessionId = uuidv4();
    const result = await db
      .insert(SessionChatTable)
      .values({
        sessionId: sessionId,
        createdBy: email,
        notes: notes,
        selectedDoctor: selectedDoctor,
        conversation: [], // Initializes the JSON column as an empty list
        // createdOn is handled automatically by the DB!
      })
      .returning();

    // Return the newly created session
    return NextResponse.json(result[0]);
  } catch (error) {
    // Detailed logging for debugging
    console.error("/api/session-chat POST error:", error);

    return NextResponse.json(
      { error: "Database error occurred", details: String(error) },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");
    const user = await currentUser();

    // 1. Validation
    if (!sessionId) {
      return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
    }

    if (!user || !user.primaryEmailAddress?.emailAddress) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Query the Database
    const result = await db
      .select()
      .from(SessionChatTable)
      .where(eq(SessionChatTable.sessionId, sessionId));

    // 3. Check if session exists
    if (result.length === 0) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // 4. Return data to frontend
    return NextResponse.json(result[0]);

  } catch (error) {
    console.error("GET /api/session-chat error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}