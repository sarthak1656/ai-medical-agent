import { openai } from "@/config/OpenAiModel";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { notes } = await req.json();
  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-lite",
      messages: [
        { role: "system", content: JSON.stringify(AIDoctorAgents) },
        {
          role: "user",
          content:
            "User notes/symptoms: " +
            notes +
            ". Based on these notes and symptoms, please suggest list of doctors from the above list. Return object in JSON only",
        },
      ],
    });
    const Rawresp = completion.choices[0].message;
    const Resp = Rawresp.content
      ?.trim()
      .replace("```json", "")
      .replace("```", "");
    const JSONResp = JSON.parse(Resp || "{}");
    console.log("Suggested Doctor JSON: ", JSONResp);
    return NextResponse.json(JSONResp);
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to suggest doctor" }), {
      status: 500,
    });
  }
}
