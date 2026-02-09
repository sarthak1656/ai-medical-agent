import { openai } from "@/config/OpenAiModel";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { notes } = await req.json();
  try {
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: JSON.stringify(AIDoctorAgents),
        },
        {
          role: "user",
          content:
            "User Notes/Symptoms" +
            notes +
            ", Depends on the User Notes and symptoms ,Please suggest list of doctors, Return Object in JSON Only",
        },
      ],
    });

    const rawResp = completion.choices[0].message;
    //@ts-ignore
    const Resp = rawResp.content.trim().replace("```json", "").replace("```", "");
    const JSONResp = JSON.parse(Resp);
    return NextResponse.json(JSONResp);
  } catch (error) {
    return NextResponse.json(error);
  }
}
