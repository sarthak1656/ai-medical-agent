import { db } from "@/config/db";
import { openai } from "@/config/OpenAiModel";
import { SessionChatTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const REPORT_GENERATION_PROMPT = `
You are an AI Medical Voice Agent that just finished a voice conversation with a user. Based on the doctor Ai agent info and Conversation between user and Ai medical agent, Generate the report as per the below format, generate a structured report with the following fields:

1. sessionId: a unique session identifier
2. agent: the medical specialist name (e.g., "General Physician AI")
3. user: name of the patient or "Anonymous" if not provided
4. timestamp: current date and time in ISO format
5. chiefComplaint: one-sentence summary of the main health concern
6. summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations
7. symptoms: list of symptoms mentioned by the user
8. duration: how long the user has experienced the symptoms
9. severity: mild, moderate, or severe
10. medicationsMentioned: list of any medicines mentioned
11. recommendations: list of AI suggestions (e.g., rest, see a doctor)
12. suggestedMedications: list of medicines the AI may consider suggesting (only include medicine names, no dosages). If providing suggestions, include a short safety warning advising the user to consult a licensed physician and do not provide dosages or treatment plans.
Return the result in this JSON format:
{
 "sessionId": "string",
 "agent": "string",
 "user": "string",
 "timestamp": "ISO Date string",
 "chiefComplaint": "string",
 "summary": "string",
 "symptoms": ["symptom1", "symptom2"],
 "duration": "string",
 "severity": "string",
 "medicationsMentioned": ["med1", "med2"],
"suggestedMedications": ["suggestedMed1", "suggestedMed2"],
 "recommendations": ["rec1", "rec2"],
}

Only include valid fields. Respond with nothing else.





`;

export async function POST(req: NextRequest) {
  const { sessionId, sessionDetails, messages } = await req.json();

  try {
    const UserInput =
      "Ai Doctor Agent Info" +
      JSON.stringify(sessionDetails) +
      ",User Doctor Conversation Transcript" +
      JSON.stringify(messages);
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: REPORT_GENERATION_PROMPT,
        },
        {
          role: "user",
          content: UserInput,
        },
      ],
    });

    const rawResp = completion.choices[0].message;
    //@ts-ignore
    const Resp = rawResp.content
      .trim()
      .replace("```json", "")
      .replace("```", "");
    const JSONResp = JSON.parse(Resp);

    //save to database
    const result = await db
      .update(SessionChatTable)
      .set({
        report: JSONResp,
        conversation: messages,
      })
      .where(eq(SessionChatTable.sessionId, sessionId));

    return NextResponse.json(JSONResp);
  } catch (error) {
    return new Response(JSON.stringify({ error: "Report generation failed" }), {
      status: 500,
    });
  }
}
