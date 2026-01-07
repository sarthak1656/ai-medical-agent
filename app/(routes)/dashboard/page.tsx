import React from "react";
import HistoryList from "./_components/HistoryList";
import { Button } from "@/components/ui/button";
import DoctorAgentList from "./_components/DoctorAgentList";

function Dashboard() {
  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h2 className="font-bold text-2xl" >My Dashboard</h2>
        <Button>+ Consult with the doctor </Button>
      </div> 
        <HistoryList />
        <DoctorAgentList />
    </div>
  );
}

export default Dashboard;
