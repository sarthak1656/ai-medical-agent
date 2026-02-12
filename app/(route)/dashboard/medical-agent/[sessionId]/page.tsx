"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { doctorAgent } from "../../_component/DoctorAgentCard";
import { Circle, PhoneCall, PhoneOff } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import Vapi from "@vapi-ai/web";

type SessionDetails = {
  id: number;
  notes: string;
  sessionId: string;
  report: JSON;
  selectedDoctor: doctorAgent;
  createdOn: string;
};

function MedicalVoiceAgent() {
  const { sessionId } = useParams();
  const [sessionDetails, setSessionDetails] = useState<SessionDetails>();
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>();

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

  const StartCall = () => {
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi);
    // Start voice conversation
    vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID!);
    // Listen for events
    vapi.on("call-start", () => {
      console.log("Call started");
      setCallStarted(true);
    });
    vapi.on("call-end", () => {
      console.log("Call ended");
      setCallStarted(false);
    });
    vapi.on("message", (message) => {
      if (message.type === "transcript") {
        console.log(`${message.role}: ${message.transcript}`);
      }
    });
  };
  const endCall = () => {
    if (!vapiInstance) return;
    console.log("Ending call...");

    vapiInstance.stop();

    vapiInstance.off("call-start");
    vapiInstance.off("call-end");
    vapiInstance.off("message");

    setCallStarted(false);
    setVapiInstance(null);
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
          <div className="mt-28">
            <h2 className="text-gray-500">Assistant </h2>
            <h2 className="text-xl">user </h2>
          </div>
          {!callStarted ? (
            <Button className="mt-10" onClick={StartCall}>
              {" "}
              <PhoneCall /> Start Call
            </Button>
          ) : (
            <Button variant={"destructive"} onClick={endCall}>
              {" "}
              <PhoneOff /> End Call
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default MedicalVoiceAgent;
