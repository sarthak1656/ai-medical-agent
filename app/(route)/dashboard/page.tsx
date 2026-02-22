"use client"
import React from "react";
import dynamic from 'next/dynamic'; // Add this import
import HistoryList from "./_component/HistoryList";
import DoctorAgentList from "./_component/DoctorAgentList";

// Import the dialog dynamically and disable server-side rendering
const AddNewSessionDialog = dynamic(
  () => import('./_component/AddNewSessionDialog'),
  { ssr: false }
);

function Dashboard() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl"> My Dashboard</h2>
        <AddNewSessionDialog />
      </div>
      <HistoryList />
      <DoctorAgentList/>
    </div>
  );
}

export default Dashboard;