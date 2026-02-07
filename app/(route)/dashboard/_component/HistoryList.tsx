"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";

function HistoryList() {
  const [historyList, setHistoryList] = useState([]);
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
          <Button className="mt-5">+Start Consultation</Button>
        </div>
      ) : (
        <div>list</div>
      )}
    </div>
  );
}

export default HistoryList;
