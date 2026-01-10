"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";
import DoctorAgentCard, { doctorAgent } from "./DoctorAgentCard";
import SuggestedDoctorCards from "./SuggestedDoctorCards";
import { AIDoctorAgents } from "@/shared/list";
import { useRouter } from "next/navigation";
function AddNewSessionDialog() {
  const [note, setnote] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [suggestedDoctor, setSuggestedDoctor] = useState<doctorAgent[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent>();
  const router = useRouter();

  const onClickNext = async () => {
    setLoading(true);
    const result = await axios.post("api/suggest-doctors", { notes: note });
    console.log("Suggested Doctor: ", result.data);
    // Normalize response: ensure each doctor has a valid image path.
    const resp = result.data;
    const doctorsArray = Array.isArray(resp) ? resp : resp?.data || [];
    const normalized = (doctorsArray || []).map((d: any) => {
      // find matching agent from local list by id or specialist
      const match = AIDoctorAgents.find(
        (a) => a.id === d.id || a.specialist === d.specialist
      );
      const img =
        d.image && d.image !== "" ? d.image : match?.image || "/file.svg";
      const specialist = d.specialist || match?.specialist || "Unknown";
      const description = d.description || match?.description || "";
      return { ...d, image: img, specialist, description };
    });
    setSuggestedDoctor(normalized);
    setLoading(false);
  };

  const onStartConsultation = async () => {
    setLoading(true);
    const result = await axios.post("/api/session-chat", {
      notes: note,
      selectedDoctor: selectedDoctor,
    });
    console.log(result.data);

    if (result.data?.sessionId) {
      console.log(result.data?.sessionId);
      router.push(`/dashboard/medical-agent/${result.data?.sessionId}`);
    }
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-3">+ Start a consultation</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add basic details</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Add Symptoms or any other details you want the doctor to know before
          starting the consultation.
        </DialogDescription>
        {suggestedDoctor.length === 0 ? (
          <div>
            <Textarea
              className="mt-2 text-slate-600 h-[200px]"
              placeholder="Add details here.."
              onChange={(e) => setnote(e.target.value)}
            />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-5">
            {/* Suggested doctors UI */}
            {suggestedDoctor.map((doctor, index) => (
              <SuggestedDoctorCards
                key={index}
                doctorAgent={doctor}
                setSelectedDoctor={() => setSelectedDoctor(doctor)}
                selectedDoctor={selectedDoctor}
              />
            ))}
          </div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel </Button>
          </DialogClose>
          {suggestedDoctor.length === 0 ? (
            <Button disabled={!note || loading} onClick={onClickNext}>
              Next
              {loading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                <ArrowRight className="ml-2" />
              )}
            </Button>
          ) : (
            <Button
              disabled={loading || !selectedDoctor}
              onClick={() => onStartConsultation()}
            >
              Start Consultation
              {loading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                <ArrowRight className="ml-2" />
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewSessionDialog;
