import React from "react";
import { doctorAgent } from "./DoctorAgentCard";
import Image from "next/image";

type props = {
  doctorAgent: doctorAgent;
  setSelecterDoctor: any;
  selectedDoctor: doctorAgent | null;
};

function SuggestedDoctorCard({
  doctorAgent,
  setSelecterDoctor,
  selectedDoctor,
}: props) {
  return (
    <div
      className={`flex items-center flex-col border rounded-2xl shadow p-5 hover:border-blue-500 cursor-pointer ${selectedDoctor?.id === doctorAgent.id ? "border-blue-500" : ""}`}
      onClick={() => setSelecterDoctor(doctorAgent)}
    >
      <Image
        src={doctorAgent?.image}
        alt={doctorAgent?.specialist}
        width={70}
        height={70}
        className="w-12.5 h-12.5 rounded-4xl object-cover"
      />
      <h2 className="font-bold text-sm text-center ">
        {doctorAgent?.specialist}
      </h2>
      <p className="text-xs text-center line-clamp-2">
        {doctorAgent?.description}
      </p>
    </div>
  );
}

export default SuggestedDoctorCard;
