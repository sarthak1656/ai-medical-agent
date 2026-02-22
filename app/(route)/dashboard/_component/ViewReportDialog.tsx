import React from "react";
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
import { SessionDetails } from "../medical-agent/[sessionId]/page";
import moment from "moment";

type ViewReportDialogProps = {
  record: SessionDetails;
};

function ViewReportDialog({ record }: ViewReportDialogProps) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            View Report
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle asChild>
              <h2 className="text-center text-lg font-bold">
                Medical Voice Agent Report
              </h2>
            </DialogTitle>
            <DialogDescription asChild>
              <div className="mt-4">
                <h3 className="font-semibold text-sm text-muted-foreground">
                  {record.selectedDoctor?.specialist} •{" "}
                  {moment(record.createdOn).format("MMMM Do YYYY, h:mm a")}
                </h3>
              </div>
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2">
            {(() => {
              let report: any = {};
              try {
                report =
                  typeof record.report === "string"
                    ? JSON.parse(record.report as any)
                    : record.report || {};
              } catch (e) {
                report = record.report || {};
              }

              // Data Extraction
              const chiefComplaint =
                report.chiefComplaint || record.notes || "Not specified";
              const summary = report.summary || "Not specified";
              const symptoms = report.symptoms || report.symptomList || [];
              const duration = report.duration || "Not specified";
              const severity =
                report.severity || report.severityLevel || "Not specified";
              const medications =
                report.medications ||
                report.meds ||
                report.suggestedMedications ||
                [];
              const recommendations =
                report.recommendations || report.advice || [];

              return (
                <div className="space-y-6">
                  {/* --- NEW SECTION: SESSION INFO --- */}
                  <section>
                    <h4 className="text-blue-500 font-semibold">
                      Session Info
                    </h4>
                    <div className="border-t border-blue-200 mt-2 pt-3">
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                        <div>
                          <div className="font-semibold">Doctor:</div>
                          <div className="text-gray-600">
                            {record.selectedDoctor?.specialist ||
                              "General Physician"}
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold">User:</div>
                          <div className="text-gray-600">
                            {report.user || "Anonymous"}
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold">Consulted On:</div>
                          <div className="text-gray-600">
                            {moment(record.createdOn).format(
                              "MMMM Do YYYY, h:mm a",
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold">Agent:</div>
                          <div className="text-gray-600">
                            {report.agent || "General Physician AI"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* --- NEW SECTION: CHIEF COMPLAINT --- */}
                  <section>
                    <h4 className="text-blue-500 font-semibold">
                      Chief Complaint
                    </h4>
                    <div className="border-t border-blue-200 mt-2 pt-3">
                      <p className="text-sm text-gray-700">{chiefComplaint}</p>
                    </div>
                  </section>

                  {/* --- EXISTING SECTIONS --- */}
                  <section>
                    <h4 className="text-blue-500 font-semibold">Summary</h4>
                    <div className="border-t border-blue-200 mt-2 pt-3">
                      <p className="text-sm text-gray-700">{summary}</p>
                    </div>
                  </section>

                  <section>
                    <h4 className="text-blue-500 font-semibold">Symptoms</h4>
                    <div className="border-t border-blue-200 mt-2 pt-3">
                      {symptoms && symptoms.length > 0 ? (
                        <ul className="list-disc ml-6 text-sm text-gray-700">
                          {symptoms.map((s: string, i: number) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-600">Not specified</p>
                      )}
                    </div>
                  </section>

                  <section>
                    <h4 className="text-blue-500 font-semibold">
                      Duration &amp; Severity
                    </h4>
                    <div className="border-t border-blue-200 mt-2 pt-3">
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                        <div>
                          <div className="font-semibold">Duration:</div>
                          <div className="text-gray-600">{duration}</div>
                        </div>
                        <div>
                          <div className="font-semibold">Severity:</div>
                          <div className="text-gray-600">{severity}</div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h4 className="text-blue-500 font-semibold">
                      Medications Mentioned
                    </h4>
                    <div className="border-t border-blue-200 mt-2 pt-3">
                      {medications && medications.length > 0 ? (
                        <ul className="list-disc ml-6 text-sm text-gray-700">
                          {medications.map((m: string, i: number) => (
                            <li key={i} className="py-1">
                              <span className="px-1 py-0.5 rounded bg-slate-100 text-slate-800">
                                {m}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-600">None mentioned</p>
                      )}
                    </div>
                  </section>

                  <section>
                    <h4 className="text-blue-500 font-semibold">
                      Recommendations
                    </h4>
                    <div className="border-t border-blue-200 mt-2 pt-3">
                      {recommendations && recommendations.length > 0 ? (
                        <ul className="list-disc ml-6 text-sm text-gray-700">
                          {recommendations.map((r: string, i: number) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-600">
                          No recommendations
                        </p>
                      )}
                    </div>
                  </section>
                  {/* --- NEW SECTION: AI DISCLAIMER --- */}
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-[10px] text-center text-muted-foreground italic uppercase tracking-wider">
                      This is an AI-generated report for informational purposes
                      only.
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>

          <DialogFooter showCloseButton className="mt-4" />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ViewReportDialog;
