"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddNewSessionDialog from "./AddNewSessionDialog";
import axios from "axios";
import HistoryTable from "./HistoryTable";
import { SessionDetails } from "../medical-agent/[sessionId]/page";


function HistoryList() {
  const [historyList, setHistoryList] = useState<SessionDetails[]>([]);

  useEffect(() => {
    GetHistoryList();

  }, []);

  const GetHistoryList = async () => {
    const result = await axios.get("/api/session-chat?sessionId=all");
    // console.log(result.data);

    setHistoryList(result.data);
  };

  return (
    <div>
      {historyList.length == 0 ? (
        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-2xl mt-10 p-7 bg-slate-50">
          <Image
            src="/medical-assistance.png"
            alt="Empty"
            width={150}
            height={150}
          />
          <h2 className="font-bold text-2xl mt-5">No Recent Consultations</h2>
          <p className="">
            It looks like you haven't had any consultations yet.
          </p>
          <AddNewSessionDialog />
        </div>
      ) : (
        <div>
          <HistoryTable historyList={historyList} />
        </div>
      )}
    </div>
  );
}

export default HistoryList;
