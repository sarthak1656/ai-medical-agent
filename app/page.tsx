"use client";

import { motion } from "motion/react";
import { Stethoscope } from "lucide-react";
import { FeatureBentoGrid } from "./_components/FeatureBentoGrid";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSectionOne() {
  return (
    <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center bg-linear-to-b from-blue-50 to-white dark:from-neutral-950 dark:to-neutral-950">
      <Navbar />
      <div className="pointer-events-none absolute -top-24 left-1/2 size-112 -translate-x-1/2 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-900/20" />
      <div className="pointer-events-none absolute top-32 right-24 size-64 rounded-full bg-cyan-200/40 blur-2xl dark:bg-cyan-900/20" />
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-linear-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-linear-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-linear-to-r from-transparent via-blue-500 to-transparent" />
      </div>

      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-5xl text-center text-2xl font-bold text-slate-800 md:text-4xl lg:text-7xl dark:text-slate-200">
          <span className="inline-flex items-center justify-center align-middle mr-3 text-slate-800 dark:text-slate-200">
            <Stethoscope className="size-9 md:size-12 lg:size-13" />
          </span>
          {"Patient Care with AI Voice Agents".split(" ").map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
              className="mr-2"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="relative z-10 mx-auto max-w-2xl py-4 text-center text-lg font-normal text-neutral-700 dark:text-neutral-300"
        >
          Deliver instant, accurate medical assistance through natural voice
          conversations. Automate appointment scheduling, symptom triage, and
          follow-up care — 24/7.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.9 }}
          className="relative z-10 mx-auto mt-2 flex max-w-2xl flex-wrap items-center justify-center gap-2"
        >
          {[
            "HIPAA‑ready",
            "Secure & Private",
            "For education — not diagnosis",
          ].map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50 px-3 py-1 text-sm text-blue-700 shadow-sm dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-300"
            >
              <span className="size-1.5 rounded-full bg-blue-500" />
              {label}
            </span>
          ))}
        </motion.div>

        <Link href={"/sign-in"}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1 }}
            className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <button className="w-60 rounded-lg bg-black px-6 py-2 font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20">
              Explore Now
            </button>

       
          </motion.div>
        </Link>

        <div className="relative z-10 mt-12 grid w-full mx-auto max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-blue-100 bg-white/70 p-4 backdrop-blur-sm dark:border-blue-900/30 dark:bg-neutral-950/40">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M12 2a7 7 0 0 0-7 7c0 3.866 3.134 7 7 7s7-3.134 7-7a7 7 0 0 0-7-7Zm1 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-3 9.5c.9-.6 2.1-.5 3 0v1.5h-3V15.5Z" />
                </svg>
              </div>
              <div className="text-base font-semibold">Symptom Guidance</div>
            </div>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Conversational triage and next steps based on common symptoms.
            </p>
          </div>
          <div className="rounded-2xl border border-blue-100 bg-white/70 p-4 backdrop-blur-sm dark:border-blue-900/30 dark:bg-neutral-950/40">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M7 4h10a2 2 0 0 1 2 2v8l-4 4H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm9 10h3l-3 3v-3Z" />
                </svg>
              </div>
              <div className="text-base font-semibold">Medication Info</div>
            </div>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Dosage guidance, interactions and reminders in plain language.
            </p>
          </div>
          <div className="rounded-2xl border border-blue-100 bg-white/70 p-4 backdrop-blur-sm dark:border-blue-900/30 dark:bg-neutral-950/40">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Zm0 2.2L19 8l-7 3.8L5 8l7-3.8Z" />
                </svg>
              </div>
              <div className="text-base font-semibold">Clinic Locator</div>
            </div>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Find nearby care centers and contact details by voice.
            </p>
          </div>
          <div className="rounded-2xl border border-blue-100 bg-white/70 p-4 backdrop-blur-sm dark:border-blue-900/30 dark:bg-neutral-950/40">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M8 2h8v2H8V2Zm-4 6h16v2H4V8Zm3 6h10v2H7v-2Zm-2 6h14v2H5v-2Z" />
                </svg>
              </div>
              <div className="text-base font-semibold">
                Appointment Reminders
              </div>
            </div>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Keep track of visits and follow‑ups with gentle prompts.
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1.2 }}
          className="relative z-10 mt-16 rounded-3xl border border-blue-200 bg-linear-to-br from-blue-50 to-cyan-50 p-4 shadow-md dark:border-blue-900/40 dark:from-neutral-900 dark:to-neutral-900"
        >
          <div className="w-full overflow-hidden rounded-xl border border-blue-200 dark:border-blue-900/40">
            <img
              src="/generated_image_0.png"
              alt="AI Medical Voice Assistant Hero"
              className="aspect-video h-auto w-full object-cover"
              height={1000}
              width={1000}
            />
          </div>
        </motion.div>
      </div>
      <FeatureBentoGrid />
    </div>
  );
}

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-blue-100 px-4 py-4 dark:border-blue-900/40">
      <div className="flex items-center gap-2">
        <div className="flex size-7 items-center justify-center rounded-md bg-blue-600 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4"
          >
            <path d="M11 4h2v6h6v2h-6v6h-2v-6H5v-2h6V4Z" />
          </svg>
        </div>
        <h1 className="text-base font-bold text-slate-800 md:text-2xl dark:text-slate-200">
          MediVoice AI
        </h1>
      </div>

      {!user ? (
        <Link href={"/sign-in"}>
          <button className="w-24 rounded-lg bg-blue-600 px-6 py-2 font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 md:w-32">
            Login
          </button>
        </Link>
      ) : (
        <div className="flex gap-4 items-center">
          <UserButton />
          <Button>Dashboard</Button>
        </div>
      )}
    </nav>
  );
};
