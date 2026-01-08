import { db } from "@/config/db";
import { sessionsTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

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
   return  NextResponse.json(
      { message: "Error creating session chat" },
      { status: 500 }
    );
  }
}
