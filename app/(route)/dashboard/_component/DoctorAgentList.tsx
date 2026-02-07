import { AIDoctorAgents } from "@/shared/list";
import React from "react";
import DoctorAgentCard from "./DoctorAgentCard";

function DoctorAgentList() {
  return (
    <div className="mt-10">
      <h2 className="font-bold text-2xl">Ai Specialist Doctor Agent</h2>
      <div className="">
        {AIDoctorAgents.map((doctor) => (
          <div key={doctor.id}>
            <DoctorAgentCard doctor={doctor} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorAgentList;
