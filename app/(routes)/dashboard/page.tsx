import React from "react";
import HistoryList from "./_components/HistoryList";
import { Button } from "@/components/ui/button";

function Dashboard() {
  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h2 className="font-bold text-2xl" >My Dashboard</h2>
        <Button>+ Consult with the doctor </Button>
      </div> 
        <HistoryList />
    </div>
  );
}

export default Dashboard;
