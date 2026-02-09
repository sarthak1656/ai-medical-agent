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
import { ArrowRight } from "lucide-react";
import axios from "axios";
import { doctorAgent } from "./DoctorAgentCard";
function AddNewSessionDialog() {
  const [note, setNote] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<
    doctorAgent[] | null
  >(null);

  const onClickNext = async () => {
    setLoading(true);
    const result = await axios.post("/api/suggest-doctors", {
      notes: note,
    });
    console.log(result.data);
    setSuggestedDoctors(result.data);
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mt-5">+Start Consultation</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Basic Details</DialogTitle>
          <DialogDescription>
            <div className="">
              <h2 className="">Add Symptoms or Any Other Details</h2>
              <Textarea
                placeholder="Add Details here..."
                className="h-60 mt-1    "
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button type="submit" disabled={!note} onClick={() => onClickNext()}>
            Next <ArrowRight />{" "}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewSessionDialog;
