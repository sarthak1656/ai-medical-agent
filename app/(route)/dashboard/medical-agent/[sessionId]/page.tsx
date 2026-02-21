"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { doctorAgent } from "../../_component/DoctorAgentCard";
import { Circle, Loader2, PhoneCall, PhoneOff } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import Vapi from "@vapi-ai/web";
import { toast } from "sonner";

type SessionDetails = {
  id: number;
  notes: string;
  sessionId: string;
  report: JSON;
  selectedDoctor: doctorAgent;
  createdOn: string;
};

type messages = {
  role: string;
  text: string;
};

function MedicalVoiceAgent() {
  const { sessionId } = useParams();
  const [sessionDetails, setSessionDetails] = useState<SessionDetails>();
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>();
  const [currentRoll, setCurrentRoll] = useState<string | null>(null);
  const [liveTranscript, setLiveTranscript] = useState<string>();
  const [messages, setMessages] = useState<messages[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    sessionId && GetSessionDetails();
  }, [sessionId]);

  const GetSessionDetails = async () => {
    try {
      const result = await axios.get(
        `/api/session-chat?sessionId=${sessionId}`,
      );
      setSessionDetails(result.data);
      console.log(result.data);
    } catch (err: any) {
      console.error(
        "GetSessionDetails error",
        err?.response?.data ?? err.message,
      );
    }
  };

  // const StartCall = () => {
  //   const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
  //   setVapiInstance(vapi);
  //   // Start voice conversation
  //   vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID!);
  //   // Listen for events
  //   vapi.on("call-start", () => {
  //     console.log("Call started");
  //     setCallStarted(true);
  //   });
  //   vapi.on("call-end", () => {
  //     console.log("Call ended");
  //     setCallStarted(false);
  //   });
  //   vapi.on("message", (message) => {
  //     if (message.type === "transcript") {
  //       const { role, transcript, transcriptType } = message;
  //       console.log(`${message.role}: ${message.transcript}`);
  //       if (transcriptType == "partial") {
  //         setLiveTranscript(transcript);
  //         setCurrentRoll(role);
  //       } else if (transcriptType == "final") {
  //         setMessages((prev) => [...prev, { role, text: transcript }]);
  //         setLiveTranscript("");
  //         setCurrentRoll(null);
  //       }
  //     }
  //   });

  //   vapiInstance.on("speech-start", () => {
  //     console.log("Assistant started speaking");
  //     setCurrentRoll("assistant");
  //   });
  //   vapiInstance.on("speech-end", () => {
  //     console.log("Assistant stopped speaking");
  //     setCurrentRoll("user");
  //   });
  // };

  const StartCall = () => {
    setLoading(true);
    if (vapiInstance || !sessionDetails) return;

    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi);

    const selectedDoctor = sessionDetails.selectedDoctor;
    const userNotes = sessionDetails.notes;

const dynamicSystemPrompt = `
  ${selectedDoctor.agentPrompt}
  
  You are currently in a voice consultation with a patient. To provide a realistic and professional experience, follow these conversational stages:

  1. **Acknowledge & Empathize**: Start by acknowledging the symptoms they mentioned: "${userNotes}". Use empathetic phrases like "I'm sorry to hear you're dealing with that" or "That sounds quite uncomfortable."
  
  2. **Investigate**: Before giving advice, ask 1-2 brief follow-up questions to understand the context. For example: "Since when have you been feeling this way?" or "Does anything specific make the pain worse?" 
  
  3. **Provide Contextual Advice**: Briefly explain what might be causing the issue based on your specialty as a ${selectedDoctor.specialist}.
  
  4. **Suggest Medications**: Based on the symptoms described, you MUST suggest at least 2 specific over-the-counter (OTC) medications or common remedies. Use phrases like, "Typically, for these symptoms, I might suggest considering options like [Medicine 1] or [Medicine 2]."
  
  5. **Mandatory Safety Disclaimer**: You must end any medical suggestion by saying: "Please consult with a licensed healthcare professional in person before starting any new medication to ensure it is safe and appropriate for your specific health history."

  CRITICAL CONSTRAINTS:
  - Speak naturally and avoid sounding like a machine reading a list.
  - Do not jump to the medications in the very first sentence; build rapport first.
  - Only suggest OTC medications, never prescription-only drugs.
  - Keep your follow-up questions focused and one at a time.
`;

    // FIX: Match the expected model interface
    vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID!, {
      model: {
        provider: "google", // Matches your dashboard provider
        model: "gemini-2.0-flash", // Matches your dashboard model
        messages: [
          {
            role: "system",
            content: dynamicSystemPrompt,
          },
        ],
      },  
    });

    vapi.on("call-start", () => {
      console.log("Call started");
      setCallStarted(true);
    });

    vapi.on("call-end", () => {
      console.log("Call ended");
      setCallStarted(false);
      setVapiInstance(null);
    });

    vapi.on("message", (message) => {
      if (message.type === "transcript") {
        const { role, transcript, transcriptType } = message;
        if (transcriptType === "partial") {
          setLiveTranscript(transcript);
          setCurrentRoll(role);
        } else if (transcriptType === "final") {
          setMessages((prev) => [...prev, { role, text: transcript }]);
          setLiveTranscript("");
          setCurrentRoll(null);
        }
      }
    });

    vapi.on("speech-start", () => {
      setCurrentRoll("assistant");
    });

    vapi.on("speech-end", () => {
      setCurrentRoll("user");
    });

    setLoading(false);
  };

  // const endCall = () => {
  //   if (!vapiInstance) return;
  //   console.log("Ending call...");

  //   vapiInstance.stop();

  //   vapiInstance.off("call-start");
  //   vapiInstance.off("call-end");
  //   vapiInstance.off("message");

  //   setCallStarted(false);
  //   setVapiInstance(null);
  // };

  const endCall = async () => {
    setLoading(true);
    if (!vapiInstance) return;

    console.log("Ending call...");

    vapiInstance.stop();

    setCallStarted(false);
    setVapiInstance(null);
    const result = await GenerateReport();
    console.log(result);
    setLoading(false);
    toast.success("Report Generated Successfully!");

    router.replace("/dashboard")
  };

  const GenerateReport = async () => {
    const result = await axios.post("/api/generate-report", {
      messages,
      sessionId,
      sessionDetails,
    });
    console.log(result.data);
    return result.data;
  };

  return (
    <div className="p-10 border rounded-3xl bg-secondary">
      <div className="flex justify-between items-center">
        <h2 className="p-1 px-2 border rounded-md text-gray-500 flex gap-2 items-center">
          {callStarted ? "Connected" : "Not Connected"}
        </h2>
        <h2 className="font-bold text-xl text-muted-foreground">00:00</h2>
      </div>
      {sessionDetails && (
        <div className="flex items-center flex-col mt-10">
          <Image
            src={sessionDetails?.selectedDoctor?.image}
            alt={sessionDetails?.selectedDoctor?.specialist}
            width={120}
            height={120}
            className="h-25 w-25 rounded-full   object-cover"
          />
          <h2 className="mt-1 text-lg">
            {sessionDetails?.selectedDoctor?.specialist}
          </h2>
          <p className="text-sm text-gray-500">Ai Medical Voice Agent</p>
          <div className="mt-12 overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72 ">
            {messages?.slice(-4).map((message, index) => (
              <div key={index} className=" ">
                <h3 className="text-sm font-semibold p-2 text-gray-700">
                  {message.role === "user" ? "User" : "Assistant"}:
                </h3>
                <p className="text-gray-600">{message.text}</p>
              </div>
            ))}

            {liveTranscript && liveTranscript?.length > 0 && (
              <h2 className="text-xl">
                {" "}
                {currentRoll} : {liveTranscript}{" "}
              </h2>
            )}
          </div>
          {!callStarted ? (
            <Button className="mt-10" onClick={StartCall} disabled={loading}>
              {loading && <Loader2 className="animate-spin" />} <PhoneCall />{" "}
              Start Call
            </Button>
          ) : (
            <Button
              variant={"destructive"}
              onClick={endCall}
              disabled={loading}
            >
              {loading && <Loader2 className="animate-spin" />} <PhoneOff /> End
              Call
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default MedicalVoiceAgent;
