import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";

type doctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
};

type props = {
  doctorAgent: doctorAgent;
};

function DoctorAgentCard({ doctorAgent }: props) {
  return (
    <div className="">
      <Image
        src={doctorAgent.image}
        alt={doctorAgent.specialist}
        width={200}
        height={300}
        className="rounded-lg w-full h-[200px] object-cover "
      />
      <h2 className="font-bold text-xl mt-1" >{doctorAgent.specialist}</h2>
      <p className="line-clamp-2 mt-1 text-sm text-slate-600" >{doctorAgent.description}</p>
      <Button className="mt-2 w-full" >
        Consult Now
        <IconArrowRight/>
        </Button>
    </div>
  );
}

export default DoctorAgentCard;
