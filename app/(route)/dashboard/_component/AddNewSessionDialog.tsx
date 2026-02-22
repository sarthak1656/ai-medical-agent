"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Loader } from "lucide-react";
import axios from "axios";
import DoctorAgentCard, { doctorAgent } from "./DoctorAgentCard";
import SuggestedDoctorCard from "./SuggestedDoctorCard";
import { useRouter } from "next/navigation";
function AddNewSessionDialog() {
  const [note, setNote] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<
    doctorAgent[] | null
  >(null);
  const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent | null>(
    null,
  );
  const route = useRouter();

  const onClickNext = async () => {
    setLoading(true);
    const result = await axios.post("/api/suggest-doctors", {
      notes: note,
    });
    // console.log(result.data);
    setSuggestedDoctors(result.data);
    setLoading(false);
  };

  const onStartConsultation = async () => {
    setLoading(true);
    const result = await axios.post("/api/session-chat", {
      notes: note,
      selectedDoctor: selectedDoctor,
    });
    // console.log(result.data);

    if (result.data?.sessionId) {
      // console.log(result.data?.sessionId);
      route.push(`/dashboard/medical-agent/${result.data?.sessionId}`);
    }
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-5">+Start Consultation</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Basic Details</DialogTitle>
          <DialogDescription asChild>
            {!suggestedDoctors ? (
              <div className="">
                <h2 className="">Add Symptoms or Any Other Details</h2>
                <Textarea
                  placeholder="Add Details here..."
                  className="h-60 mt-1    "
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            ) : (
              <div className="">
                <h2 className="">Select the doctor</h2>
                <div className="grid grid-cols-2 gap-5">
                  {suggestedDoctors.map((doctor) => (
                    <SuggestedDoctorCard
                      doctorAgent={doctor}
                      key={doctor.id}
                      setSelecterDoctor={() => setSelectedDoctor(doctor)}
                      selectedDoctor={selectedDoctor}
                    />
                  ))}
                </div>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          {!suggestedDoctors ? (
            <Button
              type="submit"
              disabled={!note || loading}
              onClick={() => onClickNext()}
            >
              Next{" "}
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                <ArrowRight />
              )}{" "}
            </Button>
          ) : (
            <Button
              onClick={() => onStartConsultation()}
              disabled={!selectedDoctor || loading}
            >
              {" "}
              Start consulting
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                <ArrowRight />
              )}{" "}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewSessionDialog;
