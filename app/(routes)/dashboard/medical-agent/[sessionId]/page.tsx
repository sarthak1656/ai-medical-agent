"use client";
import axios from "axios";
import { log } from "console";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { doctorAgent } from "../../_components/DoctorAgentCard";
import { Circle, PhoneCall } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type SessionDetails = {
  id: number;
  notes: string;
  sessionsId: string;
  report: JSON;
  selectedDoctor: doctorAgent;
  createdOn: string;
  // createdBy: string;
  // conversation: any;
};

function MedicalVoiceAgent() {
  const { sessionId } = useParams();
  const [sessionDetails, setSessionDetails] = useState<SessionDetails>();

  useEffect(() => {
    sessionId && GetSessionDetails();
  }, [sessionId]);

  const GetSessionDetails = async () => {
    const result = axios.get("/api/session-chat?sessionId=" + sessionId);
    console.log((await result).data);
    setSessionDetails((await result).data);
  };

  return (
    <div className="p-5 border rounded-3xl bg-secondary" >
      <div className="flex items-center justify-between">
        <h2 className=" p-1 px-2 border rounded-md flex items-center gap-2">
          <Circle className="h-4 w-4" size={12} /> Not connected
        </h2>
        <h2 className="font-bold text-xl text-gray-400">00:00</h2>
      </div>
      {sessionDetails && (
        <div className="flex flex-col items-center mt-10 gap-4">
          <Image
            src={sessionDetails?.selectedDoctor?.image}
            alt={sessionDetails?.selectedDoctor?.specialist}
            width={120}
            height={120}
            className="h-[100px] w-[100px] object-cover rounded-full"
          />
          <h2 className=" mt-1 font-bold text-lg">
            {sessionDetails?.selectedDoctor?.specialist}
          </h2>
          <div className="mt-32">
            <h2 className="text-gray-500">Assistant message</h2>
            <h2 className="text-lg">User message</h2>
          </div>
          <Button className="mt-20">
            {" "}
            <PhoneCall /> Start Call
          </Button>
        </div>
      )}
    </div>
  );
}

export default MedicalVoiceAgent;
