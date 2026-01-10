import { db } from "@/config/db";
import { sessionsTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { Sessions } from "openai/resources/beta/realtime/sessions.mjs";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { notes, selectedDoctor } = await req.json();
  const user = await currentUser();
  try {
    const sessionId = uuidv4();
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    if (!userEmail) {
      return NextResponse.json(
        { message: "User email not found" },
        { status: 401 }
      );
    }
    const result = await db
      .insert(sessionsTable)
      .values({
        sessionsId: sessionId,
        createdBy: userEmail,
        notes: notes,
        selectedDoctor: selectedDoctor,
        createdOn: new Date().toISOString(),
      })
      .returning();
    return NextResponse.json({
      message: "Session chat created successfully",
      sessionId: result[0].sessionsId,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating session chat" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");
  const user = await currentUser();

  const result = await db
    .select()
    .from(sessionsTable)
    //@ts-ignore
    .where(eq(sessionsTable.sessionsId, sessionId));

  return NextResponse.json(result[0]);
}
