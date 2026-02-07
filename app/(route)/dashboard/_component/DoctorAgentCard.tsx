import React from "react";

type doctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
  voiceId: string;
  subscriptionRequired: boolean;
};

type props = {
  doctor: doctorAgent;
};

function DoctorAgentCard({ doctor }: props) {
  return <div>DoctorAgentCard</div>;
}

export default DoctorAgentCard;
