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
function AddNewSessionDialog() {
  const [note, setnote] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [suggestedDoctor, setSuggestedDoctor] = useState<doctorAgent[]>([]);

  const onClickNext = async () => {
    setLoading(true);
    const result = await axios.post("api/suggest-doctors", { notes: note });
    console.log("Suggested Doctor: ", result.data);
    setSuggestedDoctor(result.data);
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
          <div className="grid grid-cols-2 gap-5" >
            {/* Suggested doctors UI */}
            {suggestedDoctor.map((doctor, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-lg p-4 mb-2"
              >
              </div>
            ))}
          </div>
        )}

        <DialogFooter>
          <DialogClose>
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
            <Button>Start Consultation</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewSessionDialog;
