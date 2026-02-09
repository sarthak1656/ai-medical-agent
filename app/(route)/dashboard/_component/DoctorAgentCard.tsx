import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { ArrowRight } from "lucide-react";

export type doctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
  voiceId: string;
  subscriptionRequired: boolean;
};

type props = {
  doctorAgent: doctorAgent;
};

function DoctorAgentCard({ doctorAgent }: props) {
  return (
    <div className=" ">
      <Image
        src={doctorAgent.image}
        alt={doctorAgent.specialist}
        width={200}
        height={200}
        className=" w-full h-62.5 object-cover rounded-2xl"
      />
      <h2 className="font-bold ">{doctorAgent.specialist} </h2>
      <p className="line-clamp-2 mt-1 text-sm text-gray-500">
        {" "}
        {doctorAgent.description}{" "}
      </p>
      <Button className="w-full mt-2">
        Start Consultation
        <ArrowRight className="ml-2" />
      </Button>
    </div>
  );
}

export default DoctorAgentCard;
