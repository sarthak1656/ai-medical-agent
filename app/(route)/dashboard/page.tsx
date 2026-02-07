import React from "react";
import HistoryList from "./_component/HistoryList";
import { Button } from "@/components/ui/button";
import DoctorAgentList from "./_component/DoctorAgentList";

function Dashboard() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl"> My Dashboard</h2>
        <Button>+Consult With Doctor</Button>
      </div>
      <HistoryList />
      <DoctorAgentList/>
    </div>
  );
}

export default Dashboard;
