import React from "react";
import { doctorAgent } from "./DoctorAgentCard";
import Image from "next/image";

type Props = {
  doctorAgent: doctorAgent;
  selectedDoctor?: doctorAgent;
  setSelectedDoctor: (doctor: doctorAgent) => void;
};

function SuggestedDoctorCards({
  doctorAgent,
  setSelectedDoctor,
  selectedDoctor,
}: Props) {
  const isSelected = selectedDoctor?.id === doctorAgent?.id;

  return (
    <div
      onClick={() => setSelectedDoctor(doctorAgent)}
      className={`border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer transition-colors
        ${isSelected ? "border-blue-600" : "border-slate-200 hover:border-blue-600"}
      `}
    >
      <Image
        src={doctorAgent.image}
        alt={doctorAgent.specialist}
        width={50}
        height={50}
        className="rounded-full w-[50px] h-[50px] object-cover"
      />
      <h2 className="font-semibold text-center">{doctorAgent.specialist}</h2>
      <p className="text-sm text-center text-slate-600 line-clamp-2">
        {doctorAgent.description}
      </p>
    </div>
  );
}


export default SuggestedDoctorCards;
